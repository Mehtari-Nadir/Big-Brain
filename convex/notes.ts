import { internalAction, internalMutation, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { internal } from "./_generated/api";

// * Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "text-embedding-004"});

export const embed = async (text: string) => {
    const result = await model.embedContent(text);
    return result.embedding.values;
}

export const setNodeEmbedding = internalMutation({
    args: {
        noteId: v.id("notes"),
        embedding: v.array(v.float64())
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.noteId, {
            embedding: args.embedding
        });
    }
});

export const createNoteEmbedding = internalAction({
    args: {
        noteId: v.id("notes"),
        text: v.string()
    },
    handler: async (ctx, args) => {
        
        const embedding = await embed(args.text);

        await ctx.runMutation(internal.notes.setNodeEmbedding, {
            noteId: args.noteId,
            embedding,
        });
    }
});

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
            text: args.text,
        });

        await ctx.scheduler.runAfter(0, internal.notes.createNoteEmbedding, {
            noteId,
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
});

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
});

export const editNote = mutation({
    args: {
        noteId: v.id("notes"),
        newNote: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.noteId, {
            text: args.newNote
        })
    }
});

export const getNote = query({
    args: {
        noteId: v.id("notes"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.noteId);
    }
});