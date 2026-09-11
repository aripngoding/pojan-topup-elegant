import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

// Only runs on the server side (SSR / server functions)
const DB_PATH = process.env["DATABASE_URL"] ?? "pojan-topup.db";

// Singleton pattern — reuse the same connection across the app
let _db: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function getDb() {
  if (!_db) {
    const sqlite = new Database(DB_PATH);

    // Enable WAL mode for better concurrent read performance
    sqlite.pragma("journal_mode = WAL");
    sqlite.pragma("foreign_keys = ON");

    _db = drizzle(sqlite, { schema });
  }
  return _db;
}

export type Db = ReturnType<typeof getDb>;
