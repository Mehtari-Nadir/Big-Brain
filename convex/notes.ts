import { argv } from "process";
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

export const deleteNote = mutation({
    args: {
        noteId: v.id("notes"),
    },
    handler: async (ctx, args) => {

        // check auth
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            throw new ConvexError("Not authenticated");
        }

        // check if the note is exist in db
        const note = await ctx.db.get(args.noteId);
        if (!note) {
            throw new ConvexError("Note not found");
        }

        // check authorization
        if (userId !== note.tokenIdentifier) {
            throw new ConvexError("You don't have permission to delete this note.");
        }

        await ctx.db.delete(args.noteId);
    }
})