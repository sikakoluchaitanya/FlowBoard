import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

interface RectangleProps {
    id: string;
    layer: RectangleLayer;
    selectionColor?: string;
    onLayerPointDown: (e: React.PointerEvent, id: string) => void;
}

export const Rectangle = ({
    id,
    layer,
    selectionColor,
    onLayerPointDown
}: RectangleProps) => {
    const { x, y, width, height, fill } = layer;

    console.log("Rendering Rectangle:", id, "Fill:", fill); // Debugging

    return (
        <rect
            className="drop-shadow-md"
            onPointerDown={(e) => onLayerPointDown(e, id)}
            style={{    
                transform: `translate(${x}px, ${y}px)`,
            }}
            x={0}
            y={0}
            width={width}
            height={height}
            strokeWidth={1}
            fill={fill ? colorToCss(fill) : "#000"}
            stroke={selectionColor || "transparent"}
        />
    );
};
