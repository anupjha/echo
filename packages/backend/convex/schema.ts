import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  conversations: defineTable({
    threadId: v.string(),
    organizationId: v.string(),
    contactSessionId: v.id("contactSessions"),
    status: v.union(
      v.literal("unresolved"),
      v.literal("esclated"),
      v.literal("resolved")
    ),
  })
    .index("by_organization_id", ["organizationId"])
    .index("by_contact_session_id", ["contactSessionId"])
    .index("by_threadid", ["threadId"])
    .index("by_status_and_organization_id", ["status", "organizationId"]),

  contactSessions: defineTable({
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
  }).index("by_expires_at", ["expiresAt"])
    .index("by_organization_id", ["organizationId"]),

  users: defineTable({
    name: v.string(),
  }),


});