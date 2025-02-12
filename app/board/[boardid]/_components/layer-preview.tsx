"use client";

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import { memo } from "react";
import { Rectangle } from "./rectangle";
import { Circle } from "./circle";


interface LayerPreviewProps {
    id: string
    onLayerPointDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor?: string;
}

export const LayerPreview = memo(({
    id,
    onLayerPointDown,
    selectionColor
}: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id))
    
    if(!layer) {
        return null
    }

    switch(layer.type) {
        case LayerType.Circle:
            return (
                <Circle
                    id={id}
                    layer={layer}
                    selectionColor={selectionColor}
                    onLayerPointDown={onLayerPointDown}
                />
            )
        case LayerType.Rectangle:
            return (
                <div>
                    <Rectangle 
                        id={id}
                        layer={layer}
                        selectionColor={selectionColor}
                        onLayerPointDown={onLayerPointDown}
                    />
                </div>
            );
            default:
                console.warn(`Unknown layer type: ${layer.type}`);
                return null;
    }
})

LayerPreview.displayName = "LayerPreview";