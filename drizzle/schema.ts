import { pgTable, text, timestamp, numeric, uuid, integer, boolean, jsonb } from "drizzle-orm/pg-core";

// --- Users & Organizations ---
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  ownerId: uuid("owner_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- Sales & Finance ---
export const sales = pgTable("sales", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: uuid("org_id").references(() => organizations.id).notNull(),
  externalTransactionId: text("external_transaction_id").notNull().unique(), // Idempotency key
  platform: text("platform").notNull(), // 'sharkbot', 'atenaspay', etc.
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  productName: text("product_name"),
  productId: text("product_id"),

  grossAmount: numeric("gross_amount", { precision: 12, scale: 2 }).notNull(),
  netAmount: numeric("net_amount", { precision: 12, scale: 2 }).notNull(),

  status: text("status").notNull(), // 'approved', 'pending', 'refunded', 'declined', 'chargeback'
  paymentMethod: text("payment_method"),

  // UTMs & Attribution
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmContent: text("utm_content"),
  utmTerm: text("utm_term"),
  affiliateCode: text("affiliate_code"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Webhook Logs (For Diagnostics & Auditing) ---
export const webhookEvents = pgTable("webhook_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: uuid("org_id").references(() => organizations.id),
  platform: text("platform").notNull(),
  payload: jsonb("payload").notNull(),
  responseCode: integer("response_code"),
  processed: boolean("processed").default(false).notNull(),
  errorMessage: text("error_message"),
  receivedAt: timestamp("received_at").defaultNow().notNull(),
});

// --- Push Notifications ---
export const pushSubscriptions = pgTable("push_subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  subscription: jsonb("subscription").notNull(), // Stores the WebPush subscription object
  deviceToken: text("device_token"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notificationHistory = pgTable("notification_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  saleId: uuid("sale_id").references(() => sales.id),
  title: text("title").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull(), // 'sent', 'failed'
  sentAt: timestamp("sent_at").defaultNow().notNull(),
});
