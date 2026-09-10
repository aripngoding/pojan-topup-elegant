import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Copy, ShoppingBag } from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { formatIDR } from "@/data/catalog";
import { readPendingOrder, clearPendingOrder, type PendingOrder } from "@/lib/order-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout Pesanan — Pojan Topup" },
      {
        name: "description",
        content: "Selesaikan pembayaran top up kamu di Pojan Topup dengan aman dan cepat.",
      },
      { property: "og:title", content: "Checkout Pesanan — Pojan Topup" },
      { property: "og:description", content: "Konfirmasi pesanan dan selesaikan pembayaran." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const [order, setOrder] = useState<PendingOrder | null>(null);
  const [paid, setPaid] = useState(false);
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrder(readPendingOrder());
    setReady(true);
  }, []);

  const fee = order ? 1000 : 0;
  const total = (order?.price ?? 0) + fee;
  const invoice = "PJN-" + String(Math.abs(hash(order?.userId ?? "0") % 900000) + 100000);

  return (
    <div className="min-h-screen bg-surface">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-12">
        {!ready ? null : !order ? (
          <EmptyState />
        ) : paid ? (
          <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-card">
            <CheckCircle2 className="mx-auto size-14 text-accent-strong" />
            <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
              Pembayaran berhasil
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Pesanan <span className="font-semibold text-foreground">{order.denomLabel}</span> untuk{" "}
              {order.productName} sedang diproses ke akun {order.userId}.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Nomor invoice: {invoice}</p>
            <Link
              to="/"
              onClick={() => clearPendingOrder()}
              className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Belanja Lagi
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">Checkout</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Periksa kembali detail pesananmu sebelum membayar.
                </p>
              </div>

              <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <h2 className="font-display text-base font-bold text-foreground">Detail Pesanan</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <Row label="Produk" value={order.productName} />
                  <Row label="Item" value={order.denomLabel} />
                  <Row label="User ID" value={order.userId} />
                  {order.serverId ? <Row label="Server ID" value={order.serverId} /> : null}
                  <Row label="Metode pembayaran" value={order.payment} />
                </dl>
                <Link
                  to="/game/$slug"
                  params={{ slug: order.slug }}
                  className="mt-4 inline-block text-xs font-medium text-primary underline-offset-4 hover:underline"
                >
                  Ubah pesanan
                </Link>
              </section>

              <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <h2 className="font-display text-base font-bold text-foreground">Kontak Pembeli</h2>
                <label className="mt-4 block">
                  <span className="text-xs font-medium text-muted-foreground">
                    Email untuk bukti pembayaran (opsional)
                  </span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                  />
                </label>
              </section>

              <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <h2 className="font-display text-base font-bold text-foreground">
                  Instruksi Pembayaran
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Selesaikan pembayaran {order.payment} ke nomor virtual berikut sebelum 15 menit.
                </p>
                <div className="mt-3 flex items-center justify-between rounded-xl bg-primary-soft px-4 py-3">
                  <span className="font-display text-lg font-bold tracking-wider text-primary">
                    8808 1234 5678
                  </span>
                  <Copy className="size-4 text-primary" />
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-32 lg:h-fit">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <h2 className="font-display text-base font-bold text-foreground">Ringkasan Bayar</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <Row label="Subtotal" value={formatIDR(order.price)} />
                  <Row label="Biaya layanan" value={formatIDR(fee)} />
                </dl>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm text-muted-foreground">Total bayar</span>
                  <span className="font-display text-xl font-bold text-primary">
                    {formatIDR(total)}
                  </span>
                </div>
                <button
                  onClick={() => setPaid(true)}
                  className="mt-4 w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
                >
                  Bayar Sekarang
                </button>
                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  Transaksi ini masih simulasi, belum terhubung ke pembayaran asli.
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-border bg-card p-12 text-center shadow-card">
      <ShoppingBag className="mx-auto size-12 text-muted-foreground" />
      <h1 className="mt-4 font-display text-xl font-bold text-foreground">Belum ada pesanan</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Pilih produk terlebih dahulu untuk melanjutkan ke pembayaran.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
      >
        Lihat Katalog
      </Link>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="truncate font-medium text-foreground">{value}</dd>
    </div>
  );
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return h;
}
