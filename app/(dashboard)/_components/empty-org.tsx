import { Button } from "@/components/ui/button";
import { CreateOrganization } from "@clerk/nextjs";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export const EmptyOrg = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <img src="https://lottie.host/embed/42772900-5e80-44ce-b4ed-53e855ec3c7c/GiOUxtGAAc.json" alt="empty" />
            <h2 className="text-2xl font-semibold mt-6">
                Welcome to Board
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Create an organization to get started
            </p>
            <div className="mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default" size="lg">
                            Create Organization
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-[500px]">
                        <DialogTitle></DialogTitle>
                        <CreateOrganization />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}