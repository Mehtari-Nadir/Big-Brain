import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";


export const createChatRecord = internalMutation({
    args: {
        documentId: v.id("documents"),
        isHuman: v.boolean(),
        text: v.string(),
        tokenIdentifier: v.string()
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("chats", {
            documentId: args.documentId,
            isHuman: args.isHuman,
            tokenIdentifier: args.tokenIdentifier,
            text: args.text
        });
    }
});

export const getDocumentChats = query({
    args: {
        documentId: v.id("documents")
    },
    handler: async (ctx, args) => {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            return [];
        }

        return await ctx.db.query('chats')
            .withIndex("by_documentId_tokenIdentifier",
                (q) => q.eq("documentId", args.documentId).eq("tokenIdentifier", userId)
            ).collect();
    }
});