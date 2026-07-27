export type UmkmProduct = {
  slug: string;
  name: string;
  owner: string;
  category: string;
  description: string;
  accent: string;
  image: string;
  photos: string[];
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
    description:
      "Slondok renyah khas Dusun Ganjuran, dibuat dari singkong pilihan yang direbus, digiling, lalu dijemur dan digoreng dengan resep turun-temurun hingga menghasilkan tekstur garing dan rasa gurih yang khas.",
    accent:
      "radial-gradient(circle at 20% 20%, #f6e8b6 0%, #c89d5c 35%, #7a5a2c 100%)",
    image: "/nuryani/1.webp",
    photos: [
      "/nuryani/1.webp",
      "/nuryani/2.webp",
      "/nuryani/3.webp",
    ],
    price: 100000,
    oldPrice: 60000,
    discountLabel: "25%",
    location: "RT 06, Dusun Ganjuran",
    features: ["100% Singkong Pilihan", "Tanpa Bahan Pengawet", "Digoreng Renyah & Gurih"],
  },
  {
    slug: "slondok-sb",
    name: "Slondok SB",
    owner: "Ibu Maryati",
    category: "Makanan",
    description:
      "Camilan slondok produksi rumahan berbahan dasar singkong asli, diolah secara tradisional tanpa bahan pengawet sehingga tetap aman dikonsumsi dengan cita rasa gurih yang otentik.",
    accent:
      "radial-gradient(circle at 25% 25%, #f4cf7f 0%, #b36c2b 45%, #4b2f1b 100%)",
    image: "/slondok_sb/1.webp",
    photos: [
      "/slondok_sb/1.webp",
      "/slondok_sb/2.webp",
      "/slondok_sb/3.webp",
      "/slondok_sb/4.webp",
      "/slondok_sb/5.webp",
    ],
    price: 100000,
    oldPrice: 30000,
    discountLabel: "20%",
    location: "RT 04, Dusun Ganjuran",
    features: ["100% Alami", "Tanpa Pengawet", "Produksi Lokal"],
  },
  {
    slug: "slondok-mawar",
    name: "Slondok Mawar",
    owner: "Pak Joko",
    category: "Makanan",
    description:
      "Slondok dengan tekstur renyah dan tahan lama, diproses secara tradisional dari singkong berkualitas untuk menghasilkan camilan gurih khas pedesaan yang cocok dinikmati kapan saja.",
    accent:
      "radial-gradient(circle at 30% 20%, #d2b28c 0%, #7a5337 45%, #2f2017 100%)",
    image: "/slondok_mawar/1.webp",
    photos: [
      "/slondok_mawar/1.webp",
      "/slondok_mawar/2.webp",
      "/slondok_mawar/3.webp",
    ],
    price: 80000,
    oldPrice: 75000,
    discountLabel: "13%",
    location: "RT 01, Dusun Ganjuran",
    features: ["Tekstur Renyah Tahan Lama", "Bahan Singkong Berkualitas", "Diproses Secara Tradisional"],
  },
  {
    slug: "slomdok-pak-nurohim",
    name: "Slondok Pak Nurohim",
    owner: "Pak Nurohim",
    category: "Makanan",
    description:
      "Slondok hasil olahan singkong pilihan yang dibuat manual dengan cara digiling dan dijemur alami di bawah sinar matahari, menghasilkan camilan renyah dengan rasa gurih khas Dusun Ganjuran.",
    accent:
      "radial-gradient(circle at 30% 20%, #9ac5b0 0%, #456f5a 45%, #243f34 100%)",
    image: "/nurohim/1.webp",
    photos: [
      "/nurohim/1.webp",
      "/nurohim/2.webp",
    ],
    price: 100000,
    oldPrice: 400000,
    discountLabel: "12%",
    location: "RT 03, Dusun Ganjuran",
    features: ["Diolah Secara Manual", "Dijemur Alami", "Rasa Gurih Khas Lokal"],
  },
];

export function getUmkmBySlug(slug: string): UmkmProduct | undefined {
  return umkmProducts.find((item) => item.slug === slug);
}