import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { Eye, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { TypeWriter } from "./type-writer";

export const DocumentCard = ({ document }: { document: Doc<"documents"> }) => {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/document/${document._id}`);
    }

    return (
        <Card
            className="cursor-pointer hover:scale-105 transition duration-150"
            onClick={handleClick}
        >
            <CardHeader>
                <CardTitle>{document.title}</CardTitle>
            </CardHeader>
            <CardContent>
                {document == undefined && <Loader2 className="animate-spin" />}
                {(document.description && document.isDescriptionNew) && <TypeWriter documentId={document._id} text={document.description} delay={50} />}
                {(document.description && !document.isDescriptionNew) && <p>{document.description}</p>}
                {/* {!document.description ? <Loader2 className="animate-spin" /> : <p>{document.description}</p> } */}
                {/* {!document.description ? <Loader2 className="animate-spin" /> : <TypeWriter text={document.description} delay={25} /> } */}
            </CardContent>
        </Card>
    );
}