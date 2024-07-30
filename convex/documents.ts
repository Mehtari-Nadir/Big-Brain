import { action, internalAction, internalMutation, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import { GoogleGenerativeAI } from "@google/generative-ai";

// * Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const createDocument = mutation({
    args: {
        title: v.string(),
        storageId: v.id("_storage")
    },
    handler: async (ctx, args) => {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            throw new ConvexError("Not authenticated");
        }

        const documentId = await ctx.db.insert("documents", {
            title: args.title,
            tokenIdentifier: userId,
            storageId: args.storageId,
            description: "",
            isDescriptionNew: true
        });

        await ctx.scheduler.runAfter(0, internal.documents.generateDocumentDescription, {
            fileId: args.storageId,
            documentId
        })
    }
});

export const getDocuments = query({
    args: {},
    handler: async (ctx) => {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            return [];
        }

        return await ctx.db.query("documents")
            .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
            .collect();
    }
});

export const getDocument = query({
    args: {
        documentId: v.id("documents")
    },
    handler: async (ctx, args) => {
        // * check authentication
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            return null;
        }

        const document = await ctx.db.get(args.documentId);

        if (!document) {
            return null;
        }

        // * check authorization
        if (document.tokenIdentifier !== userId) {
            return null;
        }

        return {
            ...document,
            documentUrl: await ctx.storage.getUrl(document.storageId)
        };
    }
});

export const askQuestion = action({
    args: {
        question: v.string(),
        documentId: v.id("documents")
    },
    handler: async (ctx, args) => {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            throw new ConvexError("Not authenticated");
        }

        const document = await ctx.runQuery(api.documents.getDocument, {
            documentId: args.documentId
        });

        if (!document) {
            throw new ConvexError("Document not found");
        }

        const file = await ctx.storage.get(document.storageId);

        if (!file) {
            throw new ConvexError("File not found");
        }

        const fileContent = await file.text();

        // * Google AI
        const prompt = `Here is a text file ${fileContent}\n\nPlease answer the question ${args.question}`;
        const result = await model.generateContent([prompt]);

        // * store user prompt as a chat record
        await ctx.runMutation(internal.chats.createChatRecord, {
            documentId: args.documentId,
            tokenIdentifier: userId,
            text: args.question,
            isHuman: true
        });

        // * store the AI response as a chat record
        await ctx.runMutation(internal.chats.createChatRecord, {
            documentId: args.documentId,
            tokenIdentifier: userId,
            text: result.response.text(),
            isHuman: false
        });
    }
});

export const generateDocumentDescription = internalAction({
    args: {
        documentId: v.id("documents"),
        fileId: v.id("_storage")
    },
    handler: async (ctx, args) => {

        const file = await ctx.storage.get(args.fileId);
        if (!file) {
            throw new ConvexError("Document Not Found");
        }
        const fileContent = await file.text();

        const prompt = `Here is a text file ${fileContent}\n\nPlease generate 1 sentence description for this document.`;
        const result = await model.generateContentStream([prompt]);

        let text = "";
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            text += chunkText;
            // * run mutation
            await ctx.runMutation(internal.documents.updateDocumentDescription, {
                documentId: args.documentId,
                description: text
            });
        }
    }
});

export const updateDocumentDescription = internalMutation({
    args: {
        documentId: v.id("documents"),
        description: v.string()
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.documentId, {
            description: args.description
        })
    }
});

export const updateDescriptionState = mutation({
    args: {
        documentId: v.id("documents"),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.documentId, {
            isDescriptionNew: false
        })
    }
});

export const deleteDocument = mutation({
    args: {
        documentId: v.id("documents"),
        fileId: v.id("_storage")
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.documentId);
        await ctx.storage.delete(args.fileId);
    }
})