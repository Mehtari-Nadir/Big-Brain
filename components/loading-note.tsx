import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const LoadingNoteSkeleton = () => {
    return (
        <Card className="p-5 w-[35vw]">
            <Skeleton className="w-[120px] h-[20px] rounded-full" />
        </Card>
    );
}