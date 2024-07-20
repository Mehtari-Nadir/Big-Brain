"use client";

import { ChatPanel } from "@/components/chat-panel";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DocumentPage({ params }: { params: { documentId: Id<"documents"> } }) {

    const document = useQuery(api.documents.getDocument, {
        documentId: params.documentId,
    });

    if (!document) {
        return (
            <main className="p-16">
                <div className="flex mb-6">
                    <h1 className="text-xl font-bold">
                        You Don't have access to view this document.
                    </h1>
                </div>
            </main>
        );
    }

    return (
        <main className="p-10 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">{document.title}</h1>
            </div>
            <div>
                <Tabs defaultValue="document" className="w-full">
                    <TabsList>
                        <TabsTrigger value="document">Document</TabsTrigger>
                        <TabsTrigger value="chat">Chat</TabsTrigger>
                    </TabsList>
                    <TabsContent value="document">
                        <div className="bg-gray-900 p-2 rounded flex-1 h-[350px] w-full">
                            { document.documentUrl && 
                                <iframe
                                    className="bg-gray-900 w-full h-full"
                                    src={document.documentUrl}
                                />
                            }
                        </div>
                    </TabsContent>
                    <TabsContent value="chat">
                        <ChatPanel documentId={document._id} />
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}