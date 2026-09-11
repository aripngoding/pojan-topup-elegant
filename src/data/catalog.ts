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

export type ProductCategory = "Games" | "Voucher" | "Hiburan" | "E-Money" | "Pulsa & Data";

export type Product = {
  slug: string;
  name: string;
  publisher: string;
  category: ProductCategory;
  image: string;
  unit: string;
  needsServer?: boolean;
  tag?: string;
  denoms: Denom[];
};

const d = (list: [string, number, string?][]): Denom[] =>
  list.map(([label, price, bonus], i) => ({ id: `d${i + 1}`, label, price, bonus }));

export const products: Product[] = [
  // ── GAMES ──────────────────────────────────────────────
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
    slug: "shadow-hunters",
    name: "Shadow Hunters",
    publisher: "Dark Arc Studio",
    category: "Games",
    image: game7,
    unit: "Gems",
    needsServer: true,
    tag: "Baru",
    denoms: d([
      ["50 Gems", 10000],
      ["130 Gems", 25000],
      ["270 Gems", 50000, "+10 bonus"],
      ["560 Gems", 99000, "+25 bonus"],
      ["1180 Gems", 199000, "+60 bonus"],
      ["2500 Gems", 399000, "+150 bonus"],
    ]),
  },
  {
    slug: "valor-clash",
    name: "Valor Clash",
    publisher: "Nexon Play",
    category: "Games",
    image: game8,
    unit: "VP",
    denoms: d([
      ["575 VP", 52000],
      ["1150 VP", 99000],
      ["2300 VP", 195000, "+50 bonus"],
      ["4600 VP", 379000, "+200 bonus"],
    ]),
  },
  {
    slug: "dragon-empire",
    name: "Dragon Empire",
    publisher: "CelestialSoft",
    category: "Games",
    image: game1,
    unit: "Jade",
    needsServer: true,
    tag: "Promo",
    denoms: d([
      ["30 Jade", 5000],
      ["80 Jade", 12500],
      ["180 Jade", 27000, "+10 bonus"],
      ["400 Jade", 58000, "+25 bonus"],
      ["900 Jade", 129000, "+60 bonus"],
      ["2000 Jade", 278000, "+150 bonus"],
    ]),
  },
  {
    slug: "galaxy-siege",
    name: "Galaxy Siege",
    publisher: "Orbital Games",
    category: "Games",
    image: game2,
    unit: "Orbs",
    denoms: d([
      ["100 Orbs", 19000],
      ["300 Orbs", 55000],
      ["650 Orbs", 115000, "+50 bonus"],
      ["1350 Orbs", 225000, "+100 bonus"],
      ["2800 Orbs", 449000, "+300 bonus"],
    ]),
  },
  {
    slug: "pixel-wars",
    name: "Pixel Wars",
    publisher: "RetroBox",
    category: "Games",
    image: game3,
    unit: "Token",
    tag: "Instan",
    denoms: d([
      ["50 Token", 8000],
      ["150 Token", 22500],
      ["350 Token", 50000, "+20 bonus"],
      ["800 Token", 110000, "+50 bonus"],
      ["1600 Token", 215000, "+100 bonus"],
    ]),
  },
  {
    slug: "thunder-road",
    name: "Thunder Road",
    publisher: "Velocity Labs",
    category: "Games",
    image: game4,
    unit: "Gold",
    needsServer: false,
    denoms: d([
      ["100 Gold", 12000],
      ["300 Gold", 35000],
      ["700 Gold", 78000, "+50 bonus"],
      ["1500 Gold", 155000, "+100 bonus"],
      ["3200 Gold", 310000, "+250 bonus"],
    ]),
  },

  // ── VOUCHER ────────────────────────────────────────────
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
    slug: "voucher-game-store",
    name: "Voucher Game Store",
    publisher: "Pojan Store",
    category: "Voucher",
    image: game5,
    unit: "Voucher",
    denoms: d([
      ["Voucher 25rb", 26000],
      ["Voucher 50rb", 52000],
      ["Voucher 100rb", 102000],
      ["Voucher 200rb", 202000],
    ]),
  },
  {
    slug: "voucher-belanja",
    name: "Voucher Belanja Digital",
    publisher: "Pojan Store",
    category: "Voucher",
    image: game6,
    unit: "Voucher",
    tag: "Promo",
    denoms: d([
      ["Voucher 10rb", 11000],
      ["Voucher 20rb", 21000],
      ["Voucher 50rb", 51500, "Hemat 500"],
      ["Voucher 100rb", 102000, "Hemat 1rb"],
      ["Voucher 200rb", 203000, "Hemat 3rb"],
    ]),
  },
  {
    slug: "voucher-skin-game",
    name: "Voucher Skin Eksklusif",
    publisher: "GameSkin Co",
    category: "Voucher",
    image: game8,
    unit: "Voucher",
    tag: "Terlaris",
    denoms: d([
      ["Skin Bundle S", 35000],
      ["Skin Bundle M", 75000],
      ["Skin Bundle L", 149000, "+1 item bonus"],
      ["Skin Bundle XL", 299000, "+3 item bonus"],
    ]),
  },

  // ── HIBURAN ────────────────────────────────────────────
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
  {
    slug: "vidmax-premium",
    name: "VidMax Premium",
    publisher: "VidMax Inc",
    category: "Hiburan",
    image: game7,
    unit: "Paket",
    tag: "Terlaris",
    denoms: d([
      ["1 Bulan", 59000],
      ["3 Bulan", 169000, "Hemat 8rb"],
      ["6 Bulan", 325000, "Hemat 29rb"],
      ["12 Bulan", 609000, "Hemat 99rb"],
    ]),
  },
  {
    slug: "music-unlimited",
    name: "Music Unlimited",
    publisher: "SoundWave",
    category: "Hiburan",
    image: game6,
    unit: "Paket",
    tag: "Baru",
    denoms: d([
      ["1 Bulan Individual", 29000],
      ["1 Bulan Duo", 39000],
      ["1 Bulan Keluarga", 49000, "s/d 6 akun"],
      ["3 Bulan Individual", 79000, "Hemat 8rb"],
      ["12 Bulan Individual", 289000, "Hemat 59rb"],
    ]),
  },
  {
    slug: "animeflix",
    name: "AnimeFlix",
    publisher: "AnimeFlix Ltd",
    category: "Hiburan",
    image: game5,
    unit: "Paket",
    denoms: d([
      ["1 Bulan", 45000],
      ["3 Bulan", 120000, "Hemat 15rb"],
      ["6 Bulan", 225000, "Hemat 45rb"],
      ["12 Bulan", 420000, "Hemat 120rb"],
    ]),
  },

  // ── E-MONEY ────────────────────────────────────────────
  {
    slug: "gopay-saldo",
    name: "GoPay",
    publisher: "Gojek",
    category: "E-Money",
    image: game1,
    unit: "Saldo",
    denoms: d([
      ["Saldo 10rb", 10500],
      ["Saldo 20rb", 20500],
      ["Saldo 50rb", 51000],
      ["Saldo 100rb", 101500],
      ["Saldo 200rb", 202000],
      ["Saldo 500rb", 503000],
    ]),
  },
  {
    slug: "ovo-saldo",
    name: "OVO Cash",
    publisher: "OVO",
    category: "E-Money",
    image: game2,
    unit: "Saldo",
    tag: "Instan",
    denoms: d([
      ["Saldo 10rb", 10500],
      ["Saldo 25rb", 25800],
      ["Saldo 50rb", 51200],
      ["Saldo 100rb", 101800],
      ["Saldo 200rb", 202500],
      ["Saldo 500rb", 504000],
    ]),
  },
  {
    slug: "dana-saldo",
    name: "DANA",
    publisher: "DANA Indonesia",
    category: "E-Money",
    image: game3,
    unit: "Saldo",
    denoms: d([
      ["Saldo 10rb", 10500],
      ["Saldo 20rb", 20600],
      ["Saldo 50rb", 51000],
      ["Saldo 100rb", 101500],
      ["Saldo 200rb", 202000],
      ["Saldo 500rb", 502500],
    ]),
  },
  {
    slug: "shopeepay-saldo",
    name: "ShopeePay",
    publisher: "Shopee",
    category: "E-Money",
    image: game4,
    unit: "Saldo",
    tag: "Promo",
    denoms: d([
      ["Saldo 10rb", 10400],
      ["Saldo 25rb", 25700],
      ["Saldo 50rb", 50900],
      ["Saldo 100rb", 101200],
      ["Saldo 200rb", 201500],
      ["Saldo 500rb", 501500],
    ]),
  },

  // ── PULSA & DATA ───────────────────────────────────────
  {
    slug: "pulsa-telkomsel",
    name: "Pulsa Telkomsel",
    publisher: "Telkomsel",
    category: "Pulsa & Data",
    image: game5,
    unit: "Pulsa",
    tag: "Terlaris",
    denoms: d([
      ["Pulsa 5rb", 6000],
      ["Pulsa 10rb", 11000],
      ["Pulsa 20rb", 21500],
      ["Pulsa 25rb", 26500],
      ["Pulsa 50rb", 52000],
      ["Pulsa 100rb", 102500],
    ]),
  },
  {
    slug: "pulsa-xl",
    name: "Pulsa XL / Axis",
    publisher: "XL Axiata",
    category: "Pulsa & Data",
    image: game6,
    unit: "Pulsa",
    denoms: d([
      ["Pulsa 5rb", 5700],
      ["Pulsa 10rb", 10700],
      ["Pulsa 20rb", 20700],
      ["Pulsa 50rb", 51200],
      ["Pulsa 100rb", 102000],
    ]),
  },
  {
    slug: "data-telkomsel",
    name: "Paket Data Telkomsel",
    publisher: "Telkomsel",
    category: "Pulsa & Data",
    image: game7,
    unit: "Data",
    tag: "Promo",
    denoms: d([
      ["1 GB / 1 Hari", 3000],
      ["2 GB / 7 Hari", 9000],
      ["5 GB / 30 Hari", 22000, "12 GB malam"],
      ["10 GB / 30 Hari", 39000, "20 GB malam"],
      ["25 GB / 30 Hari", 79000, "Unlimited malam"],
      ["50 GB / 30 Hari", 149000, "Unlimited malam"],
    ]),
  },
  {
    slug: "data-xl",
    name: "Paket Data XL",
    publisher: "XL Axiata",
    category: "Pulsa & Data",
    image: game8,
    unit: "Data",
    denoms: d([
      ["1.5 GB / 1 Hari", 3500],
      ["3 GB / 7 Hari", 10000],
      ["6 GB / 30 Hari", 24000],
      ["15 GB / 30 Hari", 45000],
      ["30 GB / 30 Hari", 82000, "+10 GB bonus"],
    ]),
  },
  {
    slug: "data-indosat",
    name: "Paket Data Indosat",
    publisher: "Indosat Ooredoo",
    category: "Pulsa & Data",
    image: game1,
    unit: "Data",
    tag: "Baru",
    denoms: d([
      ["2 GB / 1 Hari", 4000],
      ["5 GB / 7 Hari", 12000],
      ["8 GB / 30 Hari", 27000],
      ["18 GB / 30 Hari", 52000, "+5 GB apps"],
      ["40 GB / 30 Hari", 98000, "+20 GB apps"],
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
