"use client";

import { memo } from "react";
import { Cursor } from "./cursor";
import { shallow } from "@liveblocks/client";
import { useOthersMapped, useOthersConnectionIds } from "@/liveblocks.config";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";

const Cursors = () => {
    const ids = useOthersConnectionIds();

    return (
        <>
            {ids.map((connectionId) => (
                <Cursor
                    key={connectionId}
                    connectionId={connectionId}
                />
            ))}    
        </>
    )
}

const Drafts = () => {
    const others = useOthersMapped((other) => ({
        pencilDraft: other.presence.pencilDraft,
        penColor: other.presence.penColor,
    }), shallow);

    return (
        <>
            {others.map(([Key, other]) => {
                if(other.pencilDraft) {
                    return  (
                        <Path
                            key={Key}
                            x={0}
                            y={0}
                            points={other.pencilDraft}
                            fill={other.penColor ? colorToCss(other.penColor) : "#000"}
                        />
                    )
                }
                return null
            })}
        </>
    )
}

export const CursorPresence = memo(() => {
    return (
        <>
            <p>
                <Drafts />
                <Cursors />
            </p>
        </>
    )
})

CursorPresence.displayName = "CursorPresence"