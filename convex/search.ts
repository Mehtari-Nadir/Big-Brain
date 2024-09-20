import { api } from "./_generated/api";
import { action } from "./_generated/server";
import { embed } from "./notes";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

export const searchAction = action({
    args: {
        search: v.string()
    },
    handler: async (ctx, args) => {

        // check auth
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            return null;
        }

        const embedding = await embed(args.search);
        const results = await ctx.vectorSearch("notes", "by_embedding", {
            vector: embedding,
            limit: 16,
            filter: (q) => q.eq("tokenIdentifier", userId)
        });

        const notes = (await Promise.all(
            results.map(async (result) => {
                const note = await ctx.runQuery(api.notes.getNote, {
                    noteId: result._id,
                });
                return note;
            }).filter(Boolean)
        )) as Doc<"notes">[];

        return notes;
    }
});