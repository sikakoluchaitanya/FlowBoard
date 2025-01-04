"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { useRenameModal } from "@/store/use-rename-modal";
import { FormEventHandler, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutations } from "@/hooks/use-api-mutations";
import { toast } from "sonner";
import { Input } from "../ui/input";

export const RenameModal = () => {
    const { mutate, pending } = useApiMutations(api.board.update);

    const {
        isOpen,
        onClose,
        initialValues = { id: { id: "", title: "" }, title: "" }, // Ensure defaults
    } = useRenameModal();

    const [title, setTitle] = useState(initialValues?.title || "");

    useEffect(() => {
        setTitle(initialValues?.title || ""); // Reset title when `initialValues` change
    }, [initialValues]);

    const onsubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const boardId = typeof initialValues.id === 'object' ? initialValues.id.id : ""; // Access the correct id property

        if (!boardId || typeof boardId !== "string") {
            console.error("Invalid ID format:", boardId);
            toast.error("Invalid board ID format");
            return;
        }

        mutate({ id: boardId, title })
            .then(() => {
                toast.success("Board renamed successfully");
                onClose();
            })
            .catch((err) => {
                console.error("Mutation error:", err);
                toast.error("Failed to rename board");
            });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit board title</DialogTitle>
                </DialogHeader>
                <DialogDescription>Enter a new title for this board</DialogDescription>
                <form onSubmit={onsubmit} className="space-y-4">
                    <Input
                        disabled={pending}
                        required
                        value={title}
                        maxLength={100}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Board title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={pending} type="submit">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
