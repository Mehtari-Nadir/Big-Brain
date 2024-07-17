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
import Link from "next/link";

export const DocumentCard = ({ document }: { document: Doc<"documents"> }) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>{document.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Content here.</p>
            </CardContent>
            <CardFooter>
                <Button asChild variant={"secondary"} className="gap-x-2">
                    <Link
                        href={`/document/${document._id}`}
                    >
                        <Eye size={"16"} />
                        View
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}