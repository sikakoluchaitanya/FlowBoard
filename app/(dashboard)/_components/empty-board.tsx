"use client";

import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutations } from "@/hooks/use-api-mutations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const EmptyBoard = () => {
    const router = useRouter();
    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutations(api.board.create);

    const onclick = () => {
        if (!organization) return;

        mutate({
            orgId: organization.id,
            title: "Untitled Board",
        })
            .then((id) => {
                toast.success("Board created successfully");
                router.push(`/board/${id}`);
            })
            .catch((error) => {
                toast.error("failed to create board");
            });

    }
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <Image
                src="/note.svg"
                alt="Empty board"
                width={140}
                height={140}
                className=""
            />            
            <h2 className="text-2xl font-semibold mt-6">
                No boards found!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Create a board to get started
            </p>
            <div>
            <Button disabled={pending} onClick={onclick}>
                Create Board
            </Button>
            </div>
        </div>
    );
};