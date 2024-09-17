import { Id } from "@/convex/_generated/dataModel";
import { Button } from "./ui/button";
import { Save, Loader } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useState } from "react";

export const EditNoteBtn = ({ noteId, noteValue }: { noteId: Id<"notes">, noteValue: string }) => {

    const editNote = useMutation(api.notes.editNote);
    const [isLoading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        await editNote({
            noteId,
            newNote: noteValue
        })
        setLoading(false);
        toast.success("Done.");
    }

    return (
        <Button
            disabled={isLoading}
            className="gap-x-2"
            onClick={handleClick}
        >
            Save
            <Save className="w-4 h-4" />
        </Button>
    );
}