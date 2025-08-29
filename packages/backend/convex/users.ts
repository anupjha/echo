import { mutation, query } from "./_generated/server.js";

export const getMany = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new Error("Missing organization.");
    }
    const users = await ctx.db.query("users").collect();
    return users;
  },
});

export const add = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const userId = await ctx.db.insert("users", {
      name: "Atharv",
    });
    return userId;
  },
});