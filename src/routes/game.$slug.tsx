import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ShieldCheck, Zap } from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getProduct, paymentMethods, formatIDR } from "@/data/catalog";
import { savePendingOrder } from "@/lib/order-store";

export const Route = createFileRoute("/game/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Produk tidak ditemukan — Pojan Topup" }, { name: "robots", content: "noindex" }] };
    }
    const t = `Top Up ${loaderData.product.name} Murah — Pojan Topup`;
    const desc = `Beli ${loaderData.product.unit} ${loaderData.product.name} dengan proses otomatis dan harga terbaik di Pojan Topup.`;
    return {
      meta: [
        { title: t },
        { name: "description", content: desc },
        { property: "og:title", content: t },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: GamePage,
});

function GamePage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();

  const [denomId, setDenomId] = useState(product.denoms[0]!.id);
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [payment, setPayment] = useState("GoPay");
  const [error, setError] = useState("");

  const denom = product.denoms.find((d) => d.id === denomId)!;

  function handleSubmit() {
    if (!userId.trim() || (product.needsServer && !serverId.trim())) {
      setError("Lengkapi User ID" + (product.needsServer ? " dan Server ID" : "") + " terlebih dahulu.");
      return;
    }
    setError("");
    savePendingOrder({
      slug: product.slug,
      productName: product.name,
      denomLabel: denom.label,
      price: denom.price,
      userId: userId.trim(),
      serverId: serverId.trim(),
      payment,
    });
    navigate({ to: "/checkout" });
  }

  return (
    <div className="min-h-screen bg-surface">
      <SiteHeader />

      <div className="bg-primary">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-8">
          <img
            src={product.image}
            alt={`Cover ${product.name}`}
            width={640}
            height={640}
            className="size-24 rounded-2xl object-cover shadow-elegant sm:size-28"
          />
          <div className="text-primary-foreground">
            <nav className="text-xs text-primary-foreground/60">
              <Link to="/" className="hover:text-accent">
                Beranda
              </Link>{" "}
              / {product.category}
            </nav>
            <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{product.name}</h1>
            <p className="text-sm text-primary-foreground/70">{product.publisher}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-primary-foreground/75">
              <span className="flex items-center gap-1.5">
                <Zap className="size-3.5 text-accent" /> Proses instan
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-accent" /> Garansi 100%
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Panel step="1" title="Masukkan data akun">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="User ID" value={userId} onChange={setUserId} placeholder="Contoh: 12345678" />
              {product.needsServer ? (
                <Field label="Server ID" value={serverId} onChange={setServerId} placeholder="Contoh: 2201" />
              ) : null}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Cek User ID pada menu profil di dalam game. Pastikan data benar sebelum membayar.
            </p>
          </Panel>

          <Panel step="2" title={`Pilih nominal ${product.unit}`}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {product.denoms.map((d) => {
                const active = d.id === denomId;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDenomId(d.id)}
                    className={`rounded-xl border p-3 text-left transition ${
                      active
                        ? "border-primary bg-primary-soft ring-1 ring-primary"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <p className="text-sm font-semibold text-foreground">{d.label}</p>
                    {d.bonus ? <p className="text-[11px] text-accent-strong">{d.bonus}</p> : null}
                    <p className="mt-2 text-sm font-semibold text-primary">{formatIDR(d.price)}</p>
                  </button>
                );
              })}
            </div>
          </Panel>

          <Panel step="3" title="Pilih metode pembayaran">
            <div className="space-y-5">
              {paymentMethods.map((group) => (
                <div key={group.group}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {group.group}
                  </p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {group.items.map((item) => {
                      const active = payment === item;
                      return (
                        <button
                          key={item}
                          onClick={() => setPayment(item)}
                          className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition ${
                            active
                              ? "border-primary bg-primary-soft font-semibold text-foreground"
                              : "border-border bg-card text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          {item}
                          {active ? <Check className="size-4 text-primary" /> : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <aside className="lg:sticky lg:top-32 lg:h-fit">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-foreground">Ringkasan Pesanan</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <Row label="Produk" value={product.name} />
              <Row label="Item" value={denom.label} />
              <Row label="User ID" value={userId || "-"} />
              {product.needsServer ? <Row label="Server" value={serverId || "-"} /> : null}
              <Row label="Pembayaran" value={payment} />
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display text-xl font-bold text-primary">
                {formatIDR(denom.price)}
              </span>
            </div>
            {error ? <p className="mt-3 text-xs text-destructive">{error}</p> : null}
            <button
              onClick={handleSubmit}
              className="mt-4 w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
            >
              Lanjut ke Pembayaran
            </button>
          </div>
        </aside>
      </main>

      <SiteFooter />
    </div>
  );
}

function Panel({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center gap-3">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
          {step}
        </span>
        <h2 className="font-display text-base font-bold text-foreground">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary"
      />
    </label>
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
