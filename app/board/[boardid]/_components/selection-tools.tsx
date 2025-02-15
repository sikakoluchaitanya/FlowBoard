"use client";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useMutation, useSelf } from "@/liveblocks.config";
import { camera, Color } from "@/types/canvas";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import { memo } from "react";
import { ColorPicker } from "./color-picker";

interface SelectionToolsProps {
  camera: camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection: string[] | null = useSelf((self) => self.presence.selection);
    const deleteLayers = useDeleteLayers();
    const selectionBounds = useSelectionBounds();

    const handleMoveLayers = useMutation(
      ({ storage }, toFront: boolean) => {
        const liveLayerIds = storage.get("layersIds");
        const arr = liveLayerIds.toImmutable();
        const indices = arr.reduce((acc, id, index) => {
          if (selection?.includes(id)) acc.push(index);
          return acc;
        }, [] as number[]);

        const sortedIndices = toFront
          ? [...indices].sort((a, b) => b - a)
          : [...indices].sort((a, b) => a - b);

        sortedIndices.forEach((index, i) => {
          const targetIndex = toFront
            ? arr.length - 1 - i
            : i;
          liveLayerIds.move(index, targetIndex);
        });
      },
      [selection]
    );

    const handleColorChange = useMutation(
      ({ storage }, fill: Color) => {
        if (!selection) return;

        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    if (!selectionBounds) return null;

    const x = selectionBounds.width / 2 + selectionBounds.x - camera.x;
    const y = selectionBounds.y + camera.y;

    const translateX = `${x}px - 50%`;
    const translateY = `${y - 16}px - 100%`;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(calc(${translateX}), calc(${translateY}))`,
        }}
      >
        <ColorPicker onChange={handleColorChange} />
        <div className="flex flex-col gap-y-0.5">
          <Hint label="Bring to front">
            <Button
              variant="board"
              size="icon"
              onClick={() => handleMoveLayers(true)}
            >
              <BringToFront />
            </Button>
          </Hint>
          <Hint label="Bring to back" side="bottom">
            <Button
              variant="board"
              size="icon"
              onClick={() => handleMoveLayers(false)}
            >
              <SendToBack />
            </Button>
          </Hint>
        </div>
        <div className="flex items-center pl-2 ml-2 border-l">
          <Hint label="Delete">
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";