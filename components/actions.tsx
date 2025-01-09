"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import  {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutations } from "@/hooks/use-api-mutations";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";


interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
};

export const Actions = ({
    children,
    side,
    sideOffset = 5,
    id,
    title,
}: ActionsProps) => {
    const { onOpen } = useRenameModal();
    const { mutate, pending } = useApiMutations(api.board.remove);
    const handleCopyLink = () => {
        navigator.clipboard
            .writeText(`${window.location.origin}/boards/${id}`)
            .then(() => toast.success("Link copied!"))
            .catch(() => toast.error("Failed to copy link"));
    };

    const handleDelete = () => {
        mutate({ id })
            .then(() => toast.success("Board deleted successfully"))
            .catch(() => toast.error("Failed to delete board"));
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.preventDefault()} 
                side={side} 
                sideOffset={sideOffset}
                className="w-60"
            >
                <DropdownMenuItem
                    className=" flex items-center p-3 cursor-pointer hover:bg-gray-100"
                    onClick={handleCopyLink}
                >
                    <Link2 className=" h-4 w-4 mr-2"/>
                    copy board link
                </DropdownMenuItem>
                <DropdownMenuItem
                    className=" flex items-center p-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => onOpen(id, title)}
                >
                    <Pencil className=" h-4 w-4 mr-2"/>
                    Rename
                </DropdownMenuItem>
                <ConfirmModal
                    header="Delete board?"
                    description="Are you sure you want to delete this board?"
                    disabled={pending}
                    onConfirm={handleDelete}
                >
                <Button
                    variant={"ghost"}
                    className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                >
                    <Trash2 className=" h-4 w-4 mr-2"/>
                    Delete
                </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}