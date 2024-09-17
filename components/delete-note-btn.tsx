import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export const DeleteNoteBtn = ({
    noteId,
    clearStates,
}: { 
    noteId: Id<"notes">,
    clearStates: () => void
}) => {

    const deleteNote = useMutation(api.notes.deleteNote);

    const handleDelete = async () => {
        await deleteNote({ noteId });
        clearStates();
        toast.success("Note is successfully deleted.");
    }

    return (
        <Button
            size={"icon"}
            variant={"destructive"}
            onClick={() => {
                toast.warning("Are you sure you want to delete this note?", {
                    description: "Your note can not be recovered after it's been deleted.",
                    action: {
                        label: "Sure",
                        onClick: handleDelete,
                    }
                })
            }}
        >
            <Trash className="w-4 h-4" />
        </Button>
    );
}