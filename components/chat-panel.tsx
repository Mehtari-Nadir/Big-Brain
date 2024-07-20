import { api } from "@/convex/_generated/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useAction } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

export const ChatPanel = ({documentId}: {documentId: Id<"documents">}) => {

    const askQuestion = useAction(api.documents.askQuestion);

    return (
        <div className="bg-gray-900 w-full h-[350px] p-2 rounded flex flex-col gap-2">

            <div className="h-[300px] overflow-y-auto flex flex-col gap-y-1">
                <div className="bg-gray-950 rounded p-2">
                    ASk any question using Ai about this document
                </div>
                <div
                    className={cn(
                        {
                            "bg-gray-700 text-right": true
                        },
                        "rounded p-2"
                    )}
                >
                    Ask any question using Ai about this document
                </div>
            </div>

            <div>
                <form
                    className="flex gap-x-1"
                    onSubmit={ async (event) => {
                        event.preventDefault();
                        const form = event.target as HTMLFormElement;
                        const formData = new FormData(form);
                        const inputValue = formData.get("text") as string;

                        // call convex
                        await askQuestion({
                            documentId: documentId,
                            question: inputValue
                        });
                    }}
                >
                    <Input required name="text" />
                    <Button variant={"outline"} size={"icon"}>
                        <PaperPlaneIcon className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}