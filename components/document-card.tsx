import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";

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
                <Button variant={"secondary"} className="gap-x-2">
                    <Eye size={"16"} />
                    View
                </Button>
            </CardFooter>
        </Card>
    );
}