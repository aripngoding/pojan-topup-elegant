import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Gamepad2,
  Ticket,
  Wallet,
  Tv,
  Smartphone,
  Trophy,
  ArrowRight,
  Star,
  Flame,
} from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { products, formatIDR } from "@/data/catalog";
import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pojan Topup — Top Up Game & Voucher Digital Instan" },
      {
        name: "description",
        content:
          "Top up diamond, UC, dan voucher digital di Pojan Topup. Proses otomatis, harga bersaing, pembayaran aman 24 jam.",
      },
      { property: "og:title", content: "Pojan Topup — Top Up Game & Voucher Digital Instan" },
      {
        property: "og:description",
        content: "Top up game favoritmu dalam hitungan detik dengan harga terbaik.",
      },
    ],
  }),
  component: Home,
});

const categories = [
  { icon: Gamepad2, label: "Top Up Game" },
  { icon: Ticket, label: "Voucher" },
  { icon: Wallet, label: "E-Money" },
  { icon: Tv, label: "Hiburan" },
  { icon: Smartphone, label: "Pulsa & Data" },
  { icon: Trophy, label: "Joki Rank" },
];

function Home() {
  const [tab, setTab] = useState<"Semua" | "Games" | "Voucher" | "Hiburan">("Semua");
  const filtered = tab === "Semua" ? products : products.filter((p) => p.category === tab);
  const popular = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-surface">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-16">
          <div className="text-primary-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Flame className="size-3.5" /> Promo September berjalan
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Top up game favoritmu, <span className="text-accent">cepat dan elegan.</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
              Ribuan item digital dengan proses otomatis, harga transparan, dan checkout yang
              simpel. Cukup pilih nominal, isi ID, bayar — selesai.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#katalog"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-elegant transition hover:brightness-105"
              >
                Mulai Top Up <ArrowRight className="size-4" />
              </a>
            </div>
            <dl className="mt-9 grid max-w-md grid-cols-3 gap-4">
              {[
                ["1.2 Jt+", "Transaksi"],
                ["350+", "Produk digital"],
                ["4.9/5", "Rating pembeli"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-xl font-bold text-accent">{v}</dt>
                  <dd className="text-xs text-primary-foreground/65">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid gap-4">
            <img
              src={banner1}
              alt="Promo top up diamond dan koin game"
              width={1600}
              height={700}
              className="h-44 w-full rounded-2xl object-cover shadow-elegant sm:h-56"
            />
            <img
              src={banner2}
              alt="Pembayaran dompet digital di Pojan Topup"
              width={1600}
              height={700}
              loading="lazy"
              className="h-32 w-full rounded-2xl object-cover sm:h-40"
            />
          </div>
        </div>
      </section>

      {/* Kategori */}
      <section className="mx-auto -mt-8 max-w-7xl px-4">
        <div className="grid grid-cols-3 gap-3 rounded-2xl border border-border bg-card p-4 shadow-card sm:grid-cols-6">
          {categories.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex flex-col items-center gap-2 rounded-xl px-2 py-4 text-center transition hover:bg-primary-soft"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="size-5" />
              </span>
              <span className="text-xs font-medium text-foreground">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Populer */}
      <section className="mx-auto mt-14 max-w-7xl px-4">
        <SectionHead title="Paling Populer" subtitle="Produk yang paling sering dibeli minggu ini" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((p) => (
            <Link
              key={p.slug}
              to="/game/$slug"
              params={{ slug: p.slug }}
              className="group flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-card transition hover:-translate-y-0.5 hover:border-primary/30"
            >
              <img
                src={p.image}
                alt={p.name}
                width={640}
                height={640}
                loading="lazy"
                className="size-20 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-foreground">
                  {p.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">{p.publisher}</p>
                <p className="mt-2 text-xs text-muted-foreground">Mulai dari</p>
                <p className="font-semibold text-primary">
                  {formatIDR(Math.min(...p.denoms.map((dn) => dn.price)))}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Katalog */}
      <section id="katalog" className="mx-auto mt-16 max-w-7xl px-4">
        <SectionHead title="Katalog Top Up" subtitle="Pilih produk, semua diproses otomatis" />
        <div className="mt-5 flex flex-wrap gap-2">
          {(["Semua", "Games", "Voucher", "Hiburan"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              to="/game/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={`Cover ${p.name}`}
                  width={640}
                  height={640}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {p.tag ? (
                  <span className="absolute left-3 top-3 rounded-lg bg-accent px-2 py-1 text-[11px] font-semibold text-accent-foreground">
                    {p.tag}
                  </span>
                ) : null}
              </div>
              <div className="p-4">
                <p className="truncate font-display text-sm font-semibold text-foreground">
                  {p.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">{p.publisher}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">
                    {formatIDR(Math.min(...p.denoms.map((dn) => dn.price)))}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="size-3.5 fill-accent text-accent" /> 4.9
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Cara kerja */}
      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-12">
          <h2 className="font-display text-2xl font-bold">Tiga langkah, pesanan langsung masuk</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              ["01", "Pilih produk & nominal", "Semua harga sudah termasuk biaya layanan."],
              ["02", "Isi data akun", "Masukkan User ID dan server jika diperlukan."],
              ["03", "Bayar & terima", "Item masuk otomatis setelah pembayaran terverifikasi."],
            ].map(([n, t, s]) => (
              <div key={n} className="rounded-2xl border border-primary-foreground/10 p-5">
                <span className="font-display text-3xl font-bold text-accent">{n}</span>
                <p className="mt-3 font-semibold">{t}</p>
                <p className="mt-1 text-sm text-primary-foreground/70">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function SectionHead({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <span className="hidden h-1 flex-1 rounded-full bg-gradient-line sm:block" />
    </div>
  );
}
