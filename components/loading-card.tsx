import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const LoadingCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="space-y-2">
                    <Skeleton className="w-[150px] h-[20px] rounded-full" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="w-[150px] h-[20px] rounded-full" />
                <Skeleton className="w-[120px] h-[20px] rounded-full" />
            </CardContent>
            <CardFooter>
                <Skeleton className="w-[95px] h-[35px] rounded-md" />
            </CardFooter>
        </Card>
    );
}