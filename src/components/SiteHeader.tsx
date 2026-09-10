import { Link } from "@tanstack/react-router";
import { Search, ShieldCheck, Zap, Headphones } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-accent font-display text-lg font-bold text-accent-foreground">
              P
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Pojan<span className="text-accent">Topup</span>
            </span>
          </Link>

          <div className="relative ml-2 hidden flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Cari game, voucher, atau layanan..."
              className="h-10 w-full rounded-xl border border-transparent bg-background pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-accent"
            />
          </div>

          <nav className="ml-auto flex items-center gap-2">
            <Link
              to="/checkout"
              className="hidden rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-primary-soft sm:block"
            >
              Cek Pesanan
            </Link>
            <button className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:brightness-105">
              Masuk
            </button>
          </nav>
        </div>
      </div>

      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-2 text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Zap className="size-3.5 text-accent" /> Proses otomatis 3 detik
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <ShieldCheck className="size-3.5 text-accent" /> Pembayaran aman & terenkripsi
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Headphones className="size-3.5 text-accent" /> Layanan 24 jam
          </span>
        </div>
      </div>
    </header>
  );
}
