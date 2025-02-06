"use client";

// npm packages
import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";

// alias to a file
import { RoomProvider } from "@/liveblocks.config"; 

interface RoomProps {
    children: ReactNode
    roomId: string;
    fallback: NonNullable<ReactNode> | null;
}

export const Room = ({ 
    children,
    roomId,
    fallback
}: RoomProps ) => {
    return (
        <RoomProvider id={roomId} initialPresence={{
            cursor: null
        }}>
            <ClientSideSuspense fallback={fallback}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    )
}
