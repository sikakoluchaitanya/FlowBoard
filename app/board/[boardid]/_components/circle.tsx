import { colorToCss } from "@/lib/utils";
import { CircleLayer } from "@/types/canvas";

interface CircleProps {
    id: string;
    layer: CircleLayer;
    selectionColor?: string;
    onLayerPointDown: (e: React.PointerEvent, layerId: string) => void;
}

export const Circle = ({
    id,
    layer,
    onLayerPointDown,
    selectionColor
}: CircleProps) => {
    return (
        <circle
            className="drop-shadow-md"
            onPointerDown = {(e) => onLayerPointDown(e, id)}
            style = {{
                transform: `transform(
                    ${layer.x}px,
                    ${layer.y}px,
                )`
            }}
            cx={layer.width / 2}
            cy={layer.height / 2}
            rx={layer.width / 2}
            ry={layer.height / 2}
            fill={layer.fill ? colorToCss(layer.fill) : "#000"}
            stroke={selectionColor || "transparent" }
            strokeWidth="1"
            
        />
    )
}