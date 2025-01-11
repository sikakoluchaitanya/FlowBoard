import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loading";

interface BoardIdPageProps {
    params: Promise<{
        boardid: string;
    }>;
}

const boardIdPage = async ({ params }: BoardIdPageProps) => {
    const { boardid } = await params; // Await the params object
    return (
        <Room roomId={boardid} fallback={<Loading />}>
            <Canvas boardId={boardid} />
        </Room>
    );
};

export default boardIdPage