import Image from "next/image";

export const EmptySearch = () => {
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <Image
                src="/emptysearch.jpg"
                alt="Empty search"
                width={140}
                height={140}
                className="animate-pulse duration-700"
            />
            <h2 className="text-2xl font-semibold mt-6">
                No results found!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try searching for something else
            </p>
        </div>
    );
};