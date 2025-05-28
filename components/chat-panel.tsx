import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { ChatForm } from "./chat-form";
import MarkDown from 'react-markdown';

export const ChatPanel = ({ documentId }: { documentId: Id<"documents"> }) => {

    const chats = useQuery(api.chats.getDocumentChats, {
        documentId: documentId
    });

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-1 overflow-y-auto p-4">
                {chats?.map((chat, index) => (
                    <div key={index} className={`flex ${chat.isHuman ? "justify-end" : "justify-start"} mb-4`}>
                        <div
                            className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${chat.isHuman ? "bg-blue-500 text-white" : "bg-white text-gray-800"
                                }`}
                        >
                            <MarkDown>{chat.text}</MarkDown>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center">
                    <div className="w-full text-black">
                        <ChatForm documentId={documentId} />
                    </div>
                </div>
            </div>
        </div>
    );
}