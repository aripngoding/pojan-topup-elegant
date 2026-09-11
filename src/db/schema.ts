import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ─── Products ────────────────────────────────────────────────────────────────
export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  publisher: text("publisher").notNull(),
  category: text("category", {
    enum: ["Games", "Voucher", "Hiburan", "E-Money", "Pulsa & Data"],
  }).notNull(),
  image: text("image").notNull(),
  unit: text("unit").notNull(),
  needsServer: integer("needs_server", { mode: "boolean" }).notNull().default(false),
  tag: text("tag"), // e.g. "Terlaris", "Promo", "Baru"
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

// ─── Denominations ───────────────────────────────────────────────────────────
export const denoms = sqliteTable("denoms", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  denomKey: text("denom_key").notNull(), // e.g. "d1", "d2"
  label: text("label").notNull(),        // e.g. "5 Diamond"
  price: integer("price").notNull(),     // in IDR (Rupiah)
  bonus: text("bonus"),                  // e.g. "+2 bonus"
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
});

// ─── Orders ──────────────────────────────────────────────────────────────────
export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  invoiceNumber: text("invoice_number").notNull().unique(), // e.g. "PJN-123456"
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  denomId: integer("denom_id")
    .notNull()
    .references(() => denoms.id),
  productName: text("product_name").notNull(),
  denomLabel: text("denom_label").notNull(),
  price: integer("price").notNull(),
  serviceFee: integer("service_fee").notNull().default(1000),
  totalPrice: integer("total_price").notNull(),
  userId: text("user_id").notNull(),     // in-game user ID
  serverId: text("server_id"),           // optional server ID
  email: text("email"),                  // buyer email (optional)
  paymentMethod: text("payment_method").notNull(),
  status: text("status", {
    enum: ["pending", "paid", "processing", "completed", "failed", "refunded"],
  })
    .notNull()
    .default("pending"),
  paidAt: integer("paid_at", { mode: "timestamp" }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

// ─── Payment Methods ─────────────────────────────────────────────────────────
export const paymentMethods = sqliteTable("payment_methods", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  group: text("group").notNull(),   // e.g. "E-Wallet"
  name: text("name").notNull(),     // e.g. "GoPay"
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ─── Type exports ─────────────────────────────────────────────────────────────
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Denom = typeof denoms.$inferSelect;
export type NewDenom = typeof denoms.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type PaymentMethod = typeof paymentMethods.$inferSelect;

// ─── Users ────────────────────────────────────────────────────────────────────
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  displayName: text("display_name").notNull(),
  role: text("role", { enum: ["user", "admin"] }).notNull().default("user"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

// ─── Sessions ─────────────────────────────────────────────────────────────────
export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(), // random token
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
