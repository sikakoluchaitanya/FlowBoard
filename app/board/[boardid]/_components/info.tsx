"use client";

import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

interface InfoProps {
    boardId: string
}

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

const TabSeprator = () => {
    return <div className="h-6 w-[1px] bg-neutral-300 mx-2" />;
};

export const Info = ({ boardId }: InfoProps) => {
    const { onOpen } = useRenameModal();
    const data = useQuery(api.board.get, { 
        id: boardId as Id<"boards"> 
    });

    if (!data) return <InfoSkeleton />;

    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 shadow-md flex items-center space-x-2">
            {/* Logo & Board Text in Flex */}
            <Hint label="Go to Boards" side="bottom" sideOffset={10}>
                <Button asChild variant="board" className="px-2 flex items-center space-x-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/logo.svg"
                            alt="Flowboard Logo"
                            height={40}
                            width={40}
                        />
                        <span className={cn("font-semibold text-2xl", font.className)}>
                            Board
                        </span>
                    </Link>
                </Button>
            </Hint>

            <TabSeprator />

            {/* Board Title */}
            <Hint label="Edit title" side="bottom" sideOffset={10}>
                <Button
                    variant="board"
                    className="text-base font-normal px-2"
                    onClick={() => onOpen(data._id, data.title)}
                >
                    {data.title}
                </Button>
            </Hint>

            <TabSeprator />

            {/* Actions Menu */}
            <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
                <Hint label="Main Menu" side="bottom" sideOffset={10}>
                    <Button size="icon" variant="board">
                        <Menu />
                    </Button>
                </Hint>
            </Actions>
        </div>
    );
};

export const InfoSkeleton = () => {
    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 shadow-md w-[300px]" />
    );
};
