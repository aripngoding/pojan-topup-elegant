import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-accent font-display text-lg font-bold text-accent-foreground">
              P
            </span>
            <span className="font-display text-lg font-bold">
              Pojan<span className="text-accent">Topup</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            Platform top up game dan voucher digital dengan proses instan, harga bersahabat, dan
            layanan 24 jam.
          </p>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold">Layanan</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li>Top Up Game</li>
            <li>Voucher Digital</li>
            <li>Langganan Hiburan</li>
            <li>Joki & Jasa</li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold">Bantuan</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li>Cara Top Up</li>
            <li>Lacak Pesanan</li>
            <li>Kebijakan Privasi</li>
            <li>Syarat & Ketentuan</li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold">Mulai Belanja</h3>
          <p className="mt-4 text-sm text-primary-foreground/70">
            Pilih produk favoritmu dan selesaikan pembayaran dalam hitungan detik.
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
          >
            Lihat Katalog
          </Link>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Pojan Topup. Seluruh merek dagang milik pemiliknya masing-masing.
      </div>
    </footer>
  );
}
