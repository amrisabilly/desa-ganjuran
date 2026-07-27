import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ganjuran.web.id"),
  title: {
    default: "Dusun Ganjuran, Plosogede, Ngluwar, Magelang",
    template: "%s | Dusun Ganjuran, Ngluwar, Magelang",
  },
  description:
    "Portal digital resmi Dusun Ganjuran, Desa Plosogede, Kecamatan Ngluwar, Kabupaten Magelang, Jawa Tengah. Info perangkat dusun, peta wilayah, dan produk UMKM unggulan warga.",
  keywords: [
    "Dusun Ganjuran",
    "Ganjuran Ngluwar",
    "Ganjuran Magelang",
    "Desa Plosogede",
    "Kecamatan Ngluwar",
    "UMKM Ganjuran",
    "Portal Digital Dusun",
  ],
  alternates: {
    canonical: "https://ganjuran.web.id",
  },
  openGraph: {
    title: "Dusun Ganjuran, Plosogede, Ngluwar, Magelang",
    description:
      "Portal digital resmi Dusun Ganjuran, Desa Plosogede, Kecamatan Ngluwar, Kabupaten Magelang. Info perangkat dusun, peta wilayah, dan produk UMKM unggulan.",
    url: "https://ganjuran.web.id",
    siteName: "Dusun Ganjuran",
    locale: "id_ID",
    type: "website",
    // images: [
    //   {
    //     url: "/bg3.webp",
    //     width: 1200,
    //     height: 630,
    //     alt: "Lanskap Dusun Ganjuran, Ngluwar, Magelang",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dusun Ganjuran, Plosogede, Ngluwar, Magelang",
    description:
      "Portal digital resmi Dusun Ganjuran, Kecamatan Ngluwar, Kabupaten Magelang.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-site-verification": "Q9kskgDVkAPNjTMlyCNYFSaesfQlS6mt9ai0vJ66_hg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}