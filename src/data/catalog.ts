import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";
import game4 from "@/assets/game-4.jpg";
import game5 from "@/assets/game-5.jpg";
import game6 from "@/assets/game-6.jpg";
import game7 from "@/assets/game-7.jpg";
import game8 from "@/assets/game-8.jpg";

export type Denom = {
  id: string;
  label: string;
  price: number;
  bonus?: string | undefined;
};

export type Product = {
  slug: string;
  name: string;
  publisher: string;
  category: "Games" | "Voucher" | "Hiburan";
  image: string;
  unit: string;
  needsServer?: boolean;
  tag?: string;
  denoms: Denom[];
};

const d = (list: [string, number, string?][]): Denom[] =>
  list.map(([label, price, bonus], i) => ({ id: `d${i + 1}`, label, price, bonus }));

export const products: Product[] = [
  {
    slug: "arena-legends",
    name: "Arena Legends",
    publisher: "Nova Games",
    category: "Games",
    image: game1,
    unit: "Diamond",
    needsServer: true,
    tag: "Terlaris",
    denoms: d([
      ["5 Diamond", 1500],
      ["12 Diamond", 3400],
      ["28 Diamond", 7600, "+2 bonus"],
      ["59 Diamond", 15500],
      ["85 Diamond", 22000, "+5 bonus"],
      ["170 Diamond", 43500],
      ["355 Diamond", 89000, "+20 bonus"],
      ["720 Diamond", 178000],
    ]),
  },
  {
    slug: "battle-island",
    name: "Battle Island",
    publisher: "Tropic Studio",
    category: "Games",
    image: game2,
    unit: "UC",
    tag: "Promo",
    denoms: d([
      ["60 UC", 13500],
      ["120 UC", 26500],
      ["325 UC", 68000, "+15 bonus"],
      ["660 UC", 135000],
      ["1800 UC", 355000],
      ["3850 UC", 710000, "+150 bonus"],
    ]),
  },
  {
    slug: "aether-quest",
    name: "Aether Quest",
    publisher: "Skybound",
    category: "Games",
    image: game3,
    unit: "Crystal",
    denoms: d([
      ["60 Crystal", 15000],
      ["300 Crystal", 74000],
      ["980 Crystal", 235000, "+110 bonus"],
      ["1980 Crystal", 468000],
      ["3280 Crystal", 780000],
    ]),
  },
  {
    slug: "neon-strike",
    name: "Neon Strike",
    publisher: "Vector Interactive",
    category: "Games",
    image: game4,
    unit: "Point",
    tag: "Instan",
    denoms: d([
      ["475 Point", 49000],
      ["1000 Point", 99000],
      ["2050 Point", 195000, "+50 bonus"],
      ["3650 Point", 345000],
      ["5350 Point", 495000],
    ]),
  },
  {
    slug: "cube-realm",
    name: "Cube Realm",
    publisher: "Blocklab",
    category: "Games",
    image: game5,
    unit: "Coin",
    denoms: d([
      ["100 Coin", 12000],
      ["500 Coin", 55000],
      ["1200 Coin", 125000, "+80 bonus"],
      ["2500 Coin", 245000],
    ]),
  },
  {
    slug: "mecha-front",
    name: "Mecha Front",
    publisher: "Iron Core",
    category: "Games",
    image: game6,
    unit: "Credit",
    needsServer: true,
    denoms: d([
      ["80 Credit", 16000],
      ["240 Credit", 47000],
      ["610 Credit", 118000, "+30 bonus"],
      ["1280 Credit", 235000],
    ]),
  },
  {
    slug: "gift-card-premium",
    name: "Gift Card Premium",
    publisher: "Pojan Store",
    category: "Voucher",
    image: game7,
    unit: "Voucher",
    tag: "Best Deal",
    denoms: d([
      ["Voucher 50rb", 51000],
      ["Voucher 100rb", 101000],
      ["Voucher 250rb", 251000],
      ["Voucher 500rb", 499000, "Hemat 1rb"],
    ]),
  },
  {
    slug: "stream-plus",
    name: "Stream Plus",
    publisher: "Pojan Store",
    category: "Hiburan",
    image: game8,
    unit: "Paket",
    denoms: d([
      ["1 Bulan", 54000],
      ["3 Bulan", 155000],
      ["6 Bulan", 298000, "Hemat 26rb"],
      ["12 Bulan", 565000, "Hemat 83rb"],
    ]),
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const paymentMethods = [
  { group: "E-Wallet", items: ["GoPay", "OVO", "DANA", "ShopeePay"] },
  { group: "Transfer Bank", items: ["BCA Virtual Account", "Mandiri VA", "BNI VA", "BRI VA"] },
  { group: "Retail", items: ["Alfamart", "Indomaret"] },
];

export const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
