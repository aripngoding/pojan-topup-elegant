/**
 * TanStack Start Server Functions
 * Dipanggil dari loaders / komponen — hanya berjalan di server.
 */

import { createServerFn } from "@tanstack/react-start";
import { getWebRequest, setCookie, deleteCookie } from "@tanstack/react-start/server";
import { z } from "zod";
import {
  createSession,
  validateSession,
  deleteSession,
  verifyPassword,
  findUserByUsername,
  findUserByEmail,
  createUser,
  SESSION_COOKIE,
} from "@/lib/auth";
import {
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
  getPaymentMethods,
  createOrder,
  getOrderByInvoice,
  updateOrderStatus,
} from "@/db/queries";

// ─── Auth ─────────────────────────────────────────────────────────────────────

/** Ambil user yang sedang login dari cookie session */
export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  const request = getWebRequest();
  const cookieHeader = request?.headers.get("cookie") ?? "";
  const sessionId = parseCookie(cookieHeader, SESSION_COOKIE);
  if (!sessionId) return null;
  const result = await validateSession(sessionId);
  return result?.user ?? null;
});

const loginSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export const login = createServerFn({ method: "POST" })
  .validator(loginSchema)
  .handler(async ({ data }) => {
    const user = await findUserByUsername(data.username);
    if (!user || !verifyPassword(data.password, user.passwordHash)) {
      throw new Error("Username atau password salah");
    }
    if (!user.isActive) {
      throw new Error("Akun tidak aktif");
    }

    const sessionId = await createSession(user.id);
    setCookie(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser };
  });

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(20, "Maksimal 20 karakter")
    .regex(/^[a-zA-Z0-9_]+$/, "Hanya huruf, angka, dan underscore"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
  displayName: z.string().min(2, "Minimal 2 karakter").max(50),
});

export const register = createServerFn({ method: "POST" })
  .validator(registerSchema)
  .handler(async ({ data }) => {
    const existingUsername = await findUserByUsername(data.username);
    if (existingUsername) throw new Error("Username sudah digunakan");

    const existingEmail = await findUserByEmail(data.email);
    if (existingEmail) throw new Error("Email sudah digunakan");

    const user = await createUser({
      username: data.username,
      email: data.email,
      password: data.password,
      displayName: data.displayName,
    });

    const sessionId = await createSession(user.id);
    setCookie(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  const request = getWebRequest();
  const cookieHeader = request?.headers.get("cookie") ?? "";
  const sessionId = parseCookie(cookieHeader, SESSION_COOKIE);
  if (sessionId) await deleteSession(sessionId);
  deleteCookie(SESSION_COOKIE, { path: "/" });
  return { ok: true };
});

// ─── Products ─────────────────────────────────────────────────────────────────

export const fetchAllProducts = createServerFn({ method: "GET" }).handler(async () => {
  return getAllProducts();
});

export const fetchProductBySlug = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    return getProductBySlug(data.slug);
  });

export const fetchProductsByCategory = createServerFn({ method: "GET" })
  .validator(
    z.object({
      category: z.enum(["Games", "Voucher", "Hiburan", "E-Money", "Pulsa & Data"]),
    })
  )
  .handler(async ({ data }) => {
    return getProductsByCategory(data.category);
  });

// ─── Payment Methods ──────────────────────────────────────────────────────────

export const fetchPaymentMethods = createServerFn({ method: "GET" }).handler(async () => {
  return getPaymentMethods();
});

// ─── Orders ───────────────────────────────────────────────────────────────────

const createOrderSchema = z.object({
  slug: z.string().min(1),
  denomKey: z.string().min(1),
  userId: z.string().min(1),
  serverId: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  paymentMethod: z.string().min(1),
});

export const submitOrder = createServerFn({ method: "POST" })
  .validator(createOrderSchema)
  .handler(async ({ data }) => {
    return createOrder({
      ...data,
      email: data.email === "" ? undefined : data.email,
    });
  });

export const fetchOrderByInvoice = createServerFn({ method: "GET" })
  .validator(z.object({ invoiceNumber: z.string().min(1) }))
  .handler(async ({ data }) => {
    return getOrderByInvoice(data.invoiceNumber);
  });

export const payOrder = createServerFn({ method: "POST" })
  .validator(z.object({ invoiceNumber: z.string().min(1) }))
  .handler(async ({ data }) => {
    const paid = await updateOrderStatus(data.invoiceNumber, "paid");
    const completed = await updateOrderStatus(data.invoiceNumber, "completed");
    return completed ?? paid;
  });

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseCookie(cookieHeader: string, name: string): string | undefined {
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(name + "="));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}
