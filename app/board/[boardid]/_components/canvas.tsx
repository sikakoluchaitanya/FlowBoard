"use client";

import { CanvasState, CanvasMode, camera } from "@/types/canvas";
import { useCallback, useState } from "react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useHistory, useCanRedo, useCanUndo, useMutation } from "@/liveblocks.config"
import { CursorPresence } from "./cursor-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";

const MAX_LAYERS = 100;

interface CanvasProps {
    boardId: string;
}
export const Canvas = ({ boardId }: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    });
    const [camera, setCamera] = useState<camera>({ x: 0, y: 0 });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

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

        setMyPresence({
            cursor: current
        })
    },[])

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({
            cursor: null
        })
    },[])

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
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`
                    }}
                >
                    <CursorPresence/>
                </g>
            </svg>
        </main>
    )
};

export default Canvas;