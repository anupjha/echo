import { v } from "convex/values";
import { mutation } from "../_generated/server.js";

const SESSION_DURATION = 1000 * 60 * 60 * 24; // 24 hours

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    organizationId: v.string(),
    expiresAt: v.number(),
    metadata: v.optional(v.object({
      userAgent: v.string(),
      language: v.string(),
      languages: v.optional(v.string()),
      platform: v.optional(v.string()),
      vendor: v.optional(v.string()),
      screenResolution: v.optional(v.string()),
      viewportSize: v.optional(v.string()),
      colorDepth: v.optional(v.number()),
      timezone: v.optional(v.string()),
      referrer: v.optional(v.string()),
      referrerDomain: v.optional(v.string()),
      currentUrl: v.optional(v.string()),
      currentDomain: v.optional(v.string()),
      cookieEnabled: v.optional(v.boolean()),
    })),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const expiresAt = now + SESSION_DURATION;
    const contactSessionsId = await ctx.db.insert("contactSessions", {
      name: args.name,
      email: args.email,
      organizationId: args.organizationId,
      expiresAt,
      metadata: args.metadata,
    });
    return contactSessionsId;
  },
});
