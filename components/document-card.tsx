import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "./ui/button";

export const DocumentCard = ({document}: {document: Doc<"documents">}) => {
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>{document.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Content here.</p>
            </CardContent>
            <CardFooter>
                <Button variant={"secondary"}>View</Button>
            </CardFooter>
        </Card>
    );
}