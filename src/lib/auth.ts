/**
 * Auth utilities — server-side only.
 * Menggunakan Node.js crypto built-in, tidak perlu library tambahan.
 */

import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { users, sessions } from "@/db/schema";
import type { User } from "@/db/schema";

// ─── Password hashing (SHA-256 + salt, no external deps) ─────────────────────

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = createHash("sha256").update(salt + password).digest("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const attempt = createHash("sha256").update(salt + password).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(attempt, "hex"));
  } catch {
    return false;
  }
}

// ─── Session management ───────────────────────────────────────────────────────

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 hari
export const SESSION_COOKIE = "pojan_session";

export function generateSessionId(): string {
  return randomBytes(32).toString("hex");
}

export async function createSession(userId: number): Promise<string> {
  const db = getDb();
  const id = generateSessionId();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  db.insert(sessions).values({ id, userId, expiresAt }).run();
  return id;
}

export async function validateSession(
  sessionId: string
): Promise<{ user: Omit<User, "passwordHash"> } | null> {
  const db = getDb();

  const session = db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .get();

  if (!session) return null;
  if (session.expiresAt < new Date()) {
    db.delete(sessions).where(eq(sessions.id, sessionId)).run();
    return null;
  }

  const user = db.select().from(users).where(eq(users.id, session.userId)).get();
  if (!user || !user.isActive) return null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _, ...safeUser } = user;
  return { user: safeUser };
}

export async function deleteSession(sessionId: string): Promise<void> {
  const db = getDb();
  db.delete(sessions).where(eq(sessions.id, sessionId)).run();
}

// ─── User lookup ──────────────────────────────────────────────────────────────

export async function findUserByUsername(username: string) {
  const db = getDb();
  return db.select().from(users).where(eq(users.username, username)).get() ?? null;
}

export async function findUserByEmail(email: string) {
  const db = getDb();
  return db.select().from(users).where(eq(users.email, email)).get() ?? null;
}

export async function createUser(data: {
  username: string;
  email: string;
  password: string;
  displayName: string;
  role?: "user" | "admin";
}) {
  const db = getDb();
  const passwordHash = hashPassword(data.password);
  const [user] = db
    .insert(users)
    .values({
      username: data.username,
      email: data.email,
      passwordHash,
      displayName: data.displayName,
      role: data.role ?? "user",
    })
    .returning()
    .all();
  return user!;
}
