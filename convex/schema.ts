import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

    documents: defineTable({
        title: v.string(),
        tokenIdentifier: v.string(),
        storageId: v.id("_storage"),
        description: v.string(),
        isDescriptionNew: v.boolean()
    }).index("by_tokenIdentifier", ["tokenIdentifier"]),

    chats: defineTable({
        documentId: v.id("documents"),
        tokenIdentifier: v.string(),
        text: v.string(),
        isHuman: v.boolean()
    }).index("by_documentId_tokenIdentifier", ["documentId", "tokenIdentifier"]),

    notes: defineTable({
        text: v.string(),
        tokenIdentifier: v.string(),
        embedding: v.optional(v.array(v.float64()))
    })
        .index("by_tokenIdentifier", ["tokenIdentifier"])
        .vectorIndex("by_embedding", {
        vectorField: "embedding",
        dimensions: 1536,
        filterFields: ["tokenIdentifier"]
    })
});