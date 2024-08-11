
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const DeleteDocumentButton = ({ documentId }: { documentId: Id<"documents"> }) => {

    const deleteDocument = useMutation(api.documents.deleteDocument);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        await deleteDocument({ documentId });
        router.push("/");
        toast.success("The document has been deleted successfully");
    }

    return (
        <Button
            className="gap-x-2"
            variant="destructive"
            onClick={() =>
                toast.warning("Are you sure you want to delete this document?", {
                    description: "Your document can not be recovered after it's been deleted.",
                    action: {
                        label: "Sure",
                        onClick: handleDelete,
                    },
                })
            }
        >
            <Trash2 className="w-4 h-4" />
            Delete
        </Button>
    )
}