import { api } from "@/convex/_generated/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useAction, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

export const ChatPanel = ({ documentId }: { documentId: Id<"documents"> }) => {

    const askQuestion = useAction(api.documents.askQuestion);
    const chats = useQuery(api.chats.getDocumentChats, {
        documentId: documentId
    });

    return (
        <div className="bg-gray-900 w-full h-[350px] p-2 rounded flex flex-col gap-2">

            <div className="h-[300px] overflow-y-auto flex flex-col gap-y-2">
                {chats?.map((chat, index) => {
                    return (
                        <div key={index} className={cn({"flex items-center justify-end": chat.isHuman})}>
                            <div
                                className={cn(
                                    {
                                        "bg-gray-500 text-right": chat.isHuman,
                                        "bg-gray-950": !chat.isHuman
                                    },
                                    "rounded p-2 w-fit"
                                )}
                            >
                                {chat.text}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div>
                <form
                    className="flex gap-x-1"
                    onSubmit={async (event) => {
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