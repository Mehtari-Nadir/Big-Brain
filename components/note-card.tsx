import { Doc } from "@/convex/_generated/dataModel";
import { Card } from "@/components/ui/card";

export const NoteCard = ({ note, onClick }: { note: Doc<"notes">, onClick: () => void }) => {
    return (
        <Card
            onClick={onClick}
            className="cursor-pointer p-5 truncate"
        >
            {note.text}
        </Card>
    );
}