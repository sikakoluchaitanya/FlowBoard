export type Color = {
    r: number,
    g: number,
    b: number
}

export type camera = {
    x: number,
    y: number
}

export enum LayerType {
    Rectangle,
    Text,
    Circle,
    Note,
    Path
}

export type RectangleLayer = {
    type: LayerType.Rectangle;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string;
}

export type CircleLayer = {
    type: LayerType.Circle;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
}

export type Pathlayer = {
    type: LayerType.Path;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    points: number[][];
    value?: string;
}

export type Textlayer = {
    type: LayerType.Text;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string;
}

export type NoteLayer = {
    type: LayerType.Note;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
}

export type Point = {
    x: number,
    y: number
}

export type XYWH = {
    x: number,
    y: number,
    width: number,
    height: number
}

export enum Side {
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8
}

export type CanvasState = 
 | { mode: CanvasMode.None }
 | { 
        mode: CanvasMode.Pressing
        origin: Point
    }
 | { 
        mode: CanvasMode.SelectionNet
        origin: Point;
        current?: Point;
    }
 | { 
        mode: CanvasMode.Translating
        current: Point
    }
 | {   
        mode: CanvasMode.Resizing 
        initialBounds: XYWH;
        corner: Side;
    }
 | { mode: CanvasMode.pencil }
 | { 
        mode: CanvasMode.inserting
        layerType: LayerType.Circle | LayerType.Rectangle | LayerType.Note | LayerType.Text
    }

export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Translating,
    Resizing,
    pencil,
    inserting,
};

export type Layer = RectangleLayer | CircleLayer | Pathlayer | Textlayer | NoteLayer