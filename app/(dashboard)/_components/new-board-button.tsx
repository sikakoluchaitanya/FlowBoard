"use client";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useApiMutations } from "@/hooks/use-api-mutations";
import { toast } from "sonner";

interface NewBoardButtonProps {
    orgId: string
    disabled?: boolean
}

export const NewBoardButton = ({
    orgId,
    disabled
}: NewBoardButtonProps) => {
    const { mutate, pending } = useApiMutations(api.board.create);

    const onclick = () => {
        mutate({
            orgId,
            title: "Untitled Board",
        })
            .then((id) => {
            toast.success("Board created successfully");
            })
            .catch((error) => {
            toast.error("failed to create board");
            });
    }
    return (
        <button
            disabled={pending || disabled}
            onClick={onclick}
            className={cn(
                "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
                (pending || disabled) && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
            )}
        >
            <div/>
            <Plus className="h-12 w-12 text-white stroke-1" />
            <p className="text-sm text-white font-light">
                New Board
            </p>
        </button>
    )
}