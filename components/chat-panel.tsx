import { api } from "@/convex/_generated/api";
import { useAction, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChatForm } from "./chat-form";

export const ChatPanel = ({ documentId }: { documentId: Id<"documents"> }) => {

    const chats = useQuery(api.chats.getDocumentChats, {
        documentId: documentId
    });

    return (
        <div className="bg-gray-900 w-full h-[350px] p-2 rounded flex flex-col gap-2">

            <div className="h-[300px] overflow-y-auto flex flex-col gap-y-2">
                {chats?.map((chat, index) => {
                    return (
                        <div
                            key={index}
                            className={cn(
                                {
                                    "flex items-center justify-end ml-10": chat.isHuman,
                                    "mr-10": !chat.isHuman
                                },
                                "p-2"
                            )}
                        >
                            <div
                                className={cn(
                                    {
                                        "bg-gray-500 text-right": chat.isHuman,
                                        "bg-gray-950 whitespace-pre-line": !chat.isHuman
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
            <ChatForm documentId={documentId} />
        </div>
    );
}