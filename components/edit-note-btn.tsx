import { Button } from "./ui/button";
import { Save } from "lucide-react";

export const EditNoteBtn = () => {
    return (
        <Button
            className="gap-x-2"
        >
            Save
            <Save className="w-4 h-4" />
        </Button>
    );
}