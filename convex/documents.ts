import { action, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { api } from "./_generated/api";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY, // This is the default and can be omitted
});

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

        await ctx.db.insert("documents", {
            title: args.title,
            tokenIdentifier: userId,
            storageId: args.storageId
        });
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
        // check authentication
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            return null;
        }

        const document = await ctx.db.get(args.documentId);

        if (!document) {
            return null;
        }

        // check authorization
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

        const message = await anthropic.messages.create({
            max_tokens: 1024,
            system: `Here is a text file ${fileContent}`,
            messages: [
                {
                    role: "user",
                    content: `Please answer the question ${args.question}`
                }
            ],
            model: 'claude-3-opus-20240229',
        });

        console.log(message.content);

    }
});