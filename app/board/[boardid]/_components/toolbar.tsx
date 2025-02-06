import { Circle, MousePointer2, Pencil, RectangleHorizontal, Redo2, StickyNote, Type, Undo2 } from "lucide-react"
import { ToolButton } from "./tool-button"
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";


interface ToolbarProps {
    canvasState: CanvasState;
    setCanvasState: (state: CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}


export const Toolbar = ({
    canvasState,
    setCanvasState,
    undo,
    redo,
    canUndo,
    canRedo
}: ToolbarProps) => {
    return (
        <div className="absolute top-[50%] translate-y-[-50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <ToolButton 
                    label="Select"
                    icon={MousePointer2}
                    onClick={()=> setCanvasState({ mode: CanvasMode.None})}
                    isActive = {
                        canvasState.mode === CanvasMode.None ||
                        canvasState.mode === CanvasMode.SelectionNet ||
                        canvasState.mode === CanvasMode.Translating ||
                        canvasState.mode === CanvasMode.Resizing ||
                        canvasState.mode === CanvasMode.Pressing
                    }
                />
                <ToolButton 
                    label="Text"
                    icon={Type}
                    onClick={()=> setCanvasState({ 
                        mode: CanvasMode.inserting,
                        layerType: LayerType.Text
                    })}
                    isActive = {
                        canvasState.mode === CanvasMode.inserting &&
                        canvasState.layerType === LayerType.Text
                    }
                />
                <ToolButton 
                    label="Sticky note"
                    icon={StickyNote}
                    onClick={()=> setCanvasState({
                        mode: CanvasMode.inserting,
                        layerType: LayerType.Note
                    })}
                    isActive = {
                        canvasState.mode === CanvasMode.inserting &&
                        canvasState.layerType === LayerType.Note
                    }
                />
                <ToolButton 
                    label="Rectangle"
                    icon={RectangleHorizontal}
                    onClick={()=> setCanvasState({
                        mode: CanvasMode.inserting,
                        layerType: LayerType.Rectangle
                    })}
                    isActive = {
                        canvasState.mode === CanvasMode.inserting &&
                        canvasState.layerType === LayerType.Rectangle
                    }
                />
                <ToolButton 
                    label="Circle"
                    icon={Circle}
                    onClick={()=> setCanvasState({
                        mode: CanvasMode.inserting,
                        layerType: LayerType.Circle
                    })}
                    isActive = {
                        canvasState.mode === CanvasMode.inserting &&
                        canvasState.layerType === LayerType.Circle
                    }
                />
                <ToolButton 
                    label="Pencil"
                    icon={Pencil}
                    onClick={()=> setCanvasState({ mode: CanvasMode.pencil})}
                    isActive = {canvasState.mode === CanvasMode.pencil}
                />
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <ToolButton 
                    label="Undo"
                    icon={Undo2}
                    onClick={undo}
                    isDisabled = {!canUndo}
                />
                <ToolButton 
                    label="Redo"
                    icon={Redo2}
                    onClick={redo}
                    isDisabled = {!canRedo}
                />
            </div>
        </div>
    )
}

export const ToolbarSkeleton = () => {
    return (
        <div className="absolute top-[50%] translate-y-[-50%] left-2 flex flex-col gap-y-4 w-[52px] h-[360px] bg-white shadow-md rpunded-md"/>
    )
}