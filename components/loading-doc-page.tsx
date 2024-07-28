import { Skeleton } from "./ui/skeleton";

export const LoadingDocumentPage = () => {
    return (
        <div className="flex flex-col gap-y-2">
            <div>
                <Skeleton className="w-[160px] h-[35px] rounded-lg" />
            </div>
            <div>
                <Skeleton className="w-full h-[400px] rounded-lg" />
            </div>
        </div>
    )
};