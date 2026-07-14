export type UmkmProduct = {
  slug: string;
  name: string;
  owner: string;
  category: string;
  description: string;
  accent: string;
  image: string;
  price: number;
  oldPrice?: number;
  discountLabel?: string;
  location: string;
  features: string[];
};

export const umkmProducts: UmkmProduct[] = [
  {
    slug: "slondok-bu-nuryani",
    name: "Slondok Bu Nuryani",
    owner: "Bu Nuryani",
    category: "Makanan",
    description: "Slondok terbuat dari singkong",
    accent:
      "radial-gradient(circle at 20% 20%, #f6e8b6 0%, #c89d5c 35%, #7a5a2c 100%)",
    image: "/umkm/slondok-bu-nuryani.svg",
    price: 45000,
    oldPrice: 60000,
    discountLabel: "25%",
    location: "RT 06, Dusun Ganjuran",
    features: ["100% Alami", "Ramah Lingkungan", "Produksi Lokal"],
  },
  {
    slug: "gula-jawa-organik",
    name: "Gula Jawa Organik",
    owner: "Ibu Maryati",
    category: "Makanan & Minuman",
    description: "Gula jawa murni dari nira kelapa tanpa campuran bahan kimia.",
    accent:
      "radial-gradient(circle at 25% 25%, #f4cf7f 0%, #b36c2b 45%, #4b2f1b 100%)",
    image: "/umkm/gula-jawa-organik.svg",
    price: 25000,
    oldPrice: 30000,
    discountLabel: "20%",
    location: "RT 04, Dusun Ganjuran",
    features: ["100% Alami", "Tanpa Pengawet", "Produksi Lokal"],
  },
  {
    slug: "kopi-robusta-ganjuran",
    name: "Kopi Robusta Ganjuran",
    owner: "Pak Joko",
    category: "Makanan & Minuman",
    description: "Biji kopi pilihan yang diproses secara tradisional.",
    accent:
      "radial-gradient(circle at 30% 20%, #d2b28c 0%, #7a5337 45%, #2f2017 100%)",
    image: "/umkm/kopi-robusta-ganjuran.svg",
    price: 65000,
    oldPrice: 75000,
    discountLabel: "13%",
    location: "RT 01, Dusun Ganjuran",
    features: ["Single Origin", "Aroma Kuat", "Roasted Lokal"],
  },
  {
    slug: "batik-tulis-ganjuran",
    name: "Batik Tulis Ganjuran",
    owner: "Ibu Narti",
    category: "Tekstil",
    description: "Motif batik khas ganjuran dengan pewarna alami.",
    accent:
      "radial-gradient(circle at 30% 20%, #9ac5b0 0%, #456f5a 45%, #243f34 100%)",
    image: "/umkm/batik-tulis-ganjuran.svg",
    price: 350000,
    oldPrice: 400000,
    discountLabel: "12%",
    location: "RT 03, Dusun Ganjuran",
    features: ["Motif Khas", "Pewarna Alami", "Dibuat Manual"],
  },
];

export function getUmkmBySlug(slug: string): UmkmProduct | undefined {
  return umkmProducts.find((item) => item.slug === slug);
}