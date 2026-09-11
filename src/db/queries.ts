/**
 * Server-side query functions — dipanggil dari server functions / loaders.
 * Semua fungsi ini hanya berjalan di sisi server.
 */

import { eq, and, asc } from "drizzle-orm";
import { getDb } from "./client";
import { products, denoms, orders, paymentMethods } from "./schema";
import type { NewOrder } from "./schema";

// ─── Products ─────────────────────────────────────────────────────────────────

/** Ambil semua produk aktif beserta denominasinya */
export async function getAllProducts() {
  const db = getDb();
  const rows = db
    .select()
    .from(products)
    .where(eq(products.isActive, true))
    .all();

  const result = await Promise.all(
    rows.map(async (product) => {
      const productDenoms = db
        .select()
        .from(denoms)
        .where(and(eq(denoms.productId, product.id), eq(denoms.isActive, true)))
        .orderBy(asc(denoms.sortOrder))
        .all();
      return { ...product, denoms: productDenoms };
    })
  );

  return result;
}

/** Ambil satu produk berdasarkan slug, beserta denominasinya */
export async function getProductBySlug(slug: string) {
  const db = getDb();
  const product = db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.isActive, true)))
    .get();

  if (!product) return null;

  const productDenoms = db
    .select()
    .from(denoms)
    .where(and(eq(denoms.productId, product.id), eq(denoms.isActive, true)))
    .orderBy(asc(denoms.sortOrder))
    .all();

  return { ...product, denoms: productDenoms };
}

/** Ambil produk berdasarkan kategori */
export async function getProductsByCategory(
  category: "Games" | "Voucher" | "Hiburan" | "E-Money" | "Pulsa & Data"
) {
  const db = getDb();
  const rows = db
    .select()
    .from(products)
    .where(and(eq(products.category, category), eq(products.isActive, true)))
    .all();

  const result = await Promise.all(
    rows.map(async (product) => {
      const productDenoms = db
        .select()
        .from(denoms)
        .where(and(eq(denoms.productId, product.id), eq(denoms.isActive, true)))
        .orderBy(asc(denoms.sortOrder))
        .all();
      return { ...product, denoms: productDenoms };
    })
  );

  return result;
}

// ─── Payment Methods ──────────────────────────────────────────────────────────

/** Ambil semua metode pembayaran aktif, dikelompokkan per group */
export async function getPaymentMethods() {
  const db = getDb();
  const rows = db
    .select()
    .from(paymentMethods)
    .where(eq(paymentMethods.isActive, true))
    .orderBy(asc(paymentMethods.sortOrder))
    .all();

  // Group by group name
  const grouped = rows.reduce<Record<string, string[]>>((acc, row) => {
    if (!acc[row.group]) acc[row.group] = [];
    acc[row.group]!.push(row.name);
    return acc;
  }, {});

  return Object.entries(grouped).map(([group, items]) => ({ group, items }));
}

// ─── Orders ───────────────────────────────────────────────────────────────────

/** Buat invoice number unik */
function generateInvoice(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = (hash << 5) - hash + userId.charCodeAt(i);
    hash |= 0;
  }
  const base = Math.abs(hash % 900000) + 100000;
  return `PJN-${base}-${Date.now().toString(36).toUpperCase()}`;
}

/** Buat order baru */
export async function createOrder(input: {
  slug: string;
  denomKey: string;
  userId: string;
  serverId?: string;
  email?: string;
  paymentMethod: string;
}) {
  const db = getDb();

  // Ambil product
  const product = db
    .select()
    .from(products)
    .where(eq(products.slug, input.slug))
    .get();

  if (!product) throw new Error("Produk tidak ditemukan");

  // Ambil denom
  const denom = db
    .select()
    .from(denoms)
    .where(and(eq(denoms.productId, product.id), eq(denoms.denomKey, input.denomKey)))
    .get();

  if (!denom) throw new Error("Nominal tidak ditemukan");

  const serviceFee = 1000;
  const totalPrice = denom.price + serviceFee;

  const newOrder: NewOrder = {
    invoiceNumber: generateInvoice(input.userId),
    productId: product.id,
    denomId: denom.id,
    productName: product.name,
    denomLabel: denom.label,
    price: denom.price,
    serviceFee,
    totalPrice,
    userId: input.userId,
    serverId: input.serverId,
    email: input.email,
    paymentMethod: input.paymentMethod,
    status: "pending",
  };

  const [created] = db.insert(orders).values(newOrder).returning().all();
  return created;
}

/** Ambil order berdasarkan invoice number */
export async function getOrderByInvoice(invoiceNumber: string) {
  const db = getDb();
  return db
    .select()
    .from(orders)
    .where(eq(orders.invoiceNumber, invoiceNumber))
    .get() ?? null;
}

/** Update status order */
export async function updateOrderStatus(
  invoiceNumber: string,
  status: "pending" | "paid" | "processing" | "completed" | "failed" | "refunded"
) {
  const db = getDb();
  const now = new Date();

  const updateData: Partial<typeof orders.$inferInsert> = {
    status,
    updatedAt: now,
  };

  if (status === "paid") updateData.paidAt = now;
  if (status === "completed") updateData.completedAt = now;

  const [updated] = db
    .update(orders)
    .set(updateData)
    .where(eq(orders.invoiceNumber, invoiceNumber))
    .returning()
    .all();

  return updated;
}

/** Ambil semua order (untuk admin, bisa dipaginasi nanti) */
export async function getAllOrders(limit = 50) {
  const db = getDb();
  return db
    .select()
    .from(orders)
    .orderBy(asc(orders.createdAt))
    .limit(limit)
    .all()
    .reverse(); // terbaru dulu
}
