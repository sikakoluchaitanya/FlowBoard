"use client";

import { CanvasState, CanvasMode, camera, Color, LayerType, Point, Side, XYWH } from "@/types/canvas";
import { useCallback, useMemo, useState } from "react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useHistory, useCanRedo, useCanUndo, useMutation, useStorage, useOthersMapped } from "@/liveblocks.config"
import { CursorPresence } from "./cursor-presence";
import { connectionIdToColor, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";

const MAX_LAYERS = 100;

interface CanvasProps {
    boardId: string;
}
export const Canvas = ({ boardId }: CanvasProps) => {
    const layerIds = useStorage((root) => {
        return root.layersIds || []
    }) || []
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    });
    const [camera, setCamera] = useState<camera>({ x: 0, y: 0 });
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0
    });
    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const insertLayers = useMutation((
        { storage, setMyPresence },
        layertype: LayerType.Circle | LayerType.Rectangle | LayerType.Note | LayerType.Text,
        position: Point,
    ) => {
        const liveLayers = storage.get("layers");
        if(liveLayers.size >= MAX_LAYERS) {
            return;
        }

        const liveLayerIds = storage.get("layersIds");
        const layerId = nanoid();
        const layer = new LiveObject({
            type: layertype,
            x: position.x,
            y: position.y,
            height: 100,
            width: 100,
            fill: lastUsedColor
        });

        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);

        setMyPresence({ selection: [layerId] }, {addToHistory: true});
        setCanvasState({ mode: CanvasMode.None });
    },[lastUsedColor])

    const translateSelectedLayer = useMutation((
        { storage, self },
        point: Point,
    ) => {
        if(canvasState.mode !== CanvasMode.Translating) {
            return;
        }

        const offset = {
            x: point.x - canvasState.current.x,
            y: point.y - canvasState.current.y
        };

        const liveLayers = storage.get("layers");

        for(const id of self.presence.selection) {
            const layer = liveLayers.get(id);
            if(layer) {
                layer.update({
                    x: layer.get("x") + offset.x, 
                    y: layer.get("y") + offset.y
                });
            }
        }

        setCanvasState({
            mode: CanvasMode.Translating, current: point
        });
    },[canvasState])

    const resizeSelectedLayer = useMutation((
        { storage, self },
        point: Point,
    ) => {
        if(canvasState.mode !== CanvasMode.Resizing) {
            return;
        }

        const bounds = resizeBounds(
            canvasState.initialBounds, 
            canvasState.corner, 
            point
        );
        const liveLayers = storage.get("layers");
        const layer = liveLayers.get(self.presence.selection[0]);

        if(layer) {
            layer.update(bounds);
        }
    },[canvasState])

    const onResizeHandlePointerDown = useCallback((
        corner: Side,
        initialBounds: XYWH
    ) => {
        history.pause();
        setCanvasState({
            mode: CanvasMode.Resizing,
            corner,
            initialBounds
        });
    },[history])

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY
        }))
    },[])
    
    const onPointerMove = useMutation((
        { setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();
        const current = pointerEventToCanvasPoint(e, camera);

        if(canvasState.mode === CanvasMode.Translating) {
            translateSelectedLayer(current);
        }

        if(canvasState.mode === CanvasMode.Resizing) {
            resizeSelectedLayer(current);
        }

        setMyPresence({
            cursor: current
        })
    },[canvasState, camera, resizeSelectedLayer, translateSelectedLayer])

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({
            cursor: null
        })
    },[])

    const onPointerUp = useMutation((
        {},
        e
    ) => {
        const point = pointerEventToCanvasPoint(e, camera);

        if(canvasState.mode === CanvasMode.inserting) {
            insertLayers(canvasState.layerType, point);
        } else {
            setCanvasState({ mode: CanvasMode.None });
        }

        history.resume();

    },[
        camera,
        canvasState,
        history,
        insertLayers
    ])

    const selections = useOthersMapped((other) => other.presence.selection);

    const onLayerPointerDown = useMutation((
        { self, setMyPresence },
        e: React.PointerEvent,
        layerId: string,
    ) => {
        if(
            canvasState.mode === CanvasMode.pencil ||
            canvasState.mode === CanvasMode.inserting
        ) {
            return ;
        }
        history.pause();
        e.stopPropagation();

        const point = pointerEventToCanvasPoint(e, camera);

        if(!self.presence.selection.includes(layerId)) {
            setMyPresence({ selection:[layerId] }, {addToHistory: true});
        }
        setCanvasState({ mode: CanvasMode.Translating, current: point });
    }, [])

    const layerIdsToColorSelection = useMemo(() => {
        const layerIdsToColorSelection: Record<string, string> = {};

        for (const user of selections) {
            const [connectionId, selection ] = user;

            for (const layerId of selection) {
                layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
            }
        }

        return layerIdsToColorSelection;
    },[selections])

    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId} />
            <Participants />
            <Toolbar 
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                undo={history.undo}
                redo={history.redo}
                canUndo={canUndo}
                canRedo={canRedo}
            />
            <svg
                className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerUp={onPointerUp}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`
                    }}
                >
                    {layerIds.map((layerId) => (
                        <LayerPreview
                            key={layerId}
                            id={layerId}
                            onLayerPointDown={onLayerPointerDown}
                            selectionColor={layerIdsToColorSelection[layerId]}
                        />
                    ))}
                    <SelectionBox
                        onResizeHandlePointerDown={onResizeHandlePointerDown}
                    />
                    <CursorPresence/>
                </g>
            </svg>
        </main>
    )
};

export default Canvas;