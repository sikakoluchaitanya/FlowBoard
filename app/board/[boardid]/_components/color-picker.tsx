"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
    onChange: (color: Color) => void;
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
    // Store colors in an array for better scalability
    const colors: Color[] = [
        { r: 244, g: 88, b: 34 },  // Orange
        { r: 0, g: 0, b: 0 },      // Black
        { r: 255, g: 255, b: 255 },// White
        { r: 34, g: 177, b: 76 },  // Bright Green
        { r: 63, g: 72, b: 204 },  // Deep Blue
        { r: 255, g: 242, b: 0 },  // Yellow
        { r: 163, g: 73, b: 164 }, // Purple
        { r: 237, g: 28, b: 36 },  // Bright Red
        { r: 0, g: 162, b: 232 }   // Cyan
    ];

    return (
        <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-2 border-neutral-200">
            {colors.map((color, index) => (
                <ColorButton key={index} color={color} onClick={onChange} />
            ))}
        </div>
    );
}

interface ColorButtonProps {
    onClick: (color: Color) => void;
    color: Color;
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
    return (
        <button
            className="w-8 h-8 items-center justify-center hover:opacity-75 transition"
            onClick={() => onClick(color)}
        >
            <div
                className="h-8 w-8 rounded-full border border-neutral-300"
                style={{ background: colorToCss(color) }}
            />
        </button>
    );
};
