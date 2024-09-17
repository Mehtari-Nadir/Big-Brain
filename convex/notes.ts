import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createNote = mutation({
    args: {
        text: v.string(),
    },
    handler: async (ctx, args) => {
        
        // check auth
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            throw new ConvexError("Not authenticated");
        }

        const noteId = await ctx.db.insert("notes", {
            tokenIdentifier: userId,
            text: args.text
        });
    }
});

export const getNotes = query({
    args: {},
    handler: async (ctx) => {
        
        // check auth
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            return [];
        }

        return await ctx.db.query("notes")
            .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
            .collect();
    }
})