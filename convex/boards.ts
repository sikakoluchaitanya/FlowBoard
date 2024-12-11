// this endpoint is different from the one in convex/boards.ts 
// this endpoint is to manage and get all the boards of the organization

import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
    args: {
        orgId: v.string(),
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if(!identity) {
            throw new Error("Unauthorized");
        }

        const boards = await ctx.db
            .query("boards")
            .withIndex("by_org", (q) =>(q).eq("orgId", args.orgId))
            .order("desc")
            .collect();

        return boards;
    }
})