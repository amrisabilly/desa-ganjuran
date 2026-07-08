import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { umkmProducts } from "@/data/umkm";



type VillageRole = {
  title: string;
  name: string;
  description: string;
};

type QuickStat = {
  label: string;
  value: string;
};

const villageRoles: VillageRole[] = [
  {
    title: "Kepala Dusun",
    name: "Mugianto",
    description: "Memimpin perencanaan dan koordinasi kegiatan warga.",
  },
  {
    title: "Ketua RW",
    name: "Wahyudi",
    description: "Menguatkan komunikasi antar RT dan forum masyarakat.",
  },
  {
    title: "Tokoh Masyarakat",
    name: "Sutrisno",
    description: "Mendorong gotong royong dan pendampingan UMKM lokal.",
  },
];

const featuredProducts = umkmProducts.slice(0, 3);

const quickStats: QuickStat[] = [
  { label: "Kepala Keluarga", value: "312" },
  { label: "RT Aktif", value: "6" },
  { label: "Pelaku UMKM", value: "6" },
  { label: "Luas Wilayah", value: "15 Ha" },
];

function ProductImage({ style, label }: { style: CSSProperties; label: string }) {
  return (
    <div
      aria-hidden="true"
      className="h-36 w-full rounded-2xl border border-white/35 shadow-inner"
      style={style}
      title={label}
    />
  );
}

function SectionHeading({
  eyebrow = "Profil Desa",
  title,
  caption,
}: {
  eyebrow?: string;
  title: string;
  caption?: string;
}) {
  return (
    <div className="space-y-2 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f6b58]">
        {eyebrow}
      </p>
      <h2 className="text-xl font-bold text-[#214d36] sm:text-2xl">{title}</h2>
      {caption ? (
        <p className="mx-auto max-w-2xl text-sm text-[#506554]">{caption}</p>
      ) : null}
    </div>
  );
}

export default function Home() {
  const idrCurrency = new Intl.NumberFormat("id-ID");

  return (
    <div className="min-h-screen bg-[#ece9df] text-[#143122]">
      <Navbar />

      <header className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#1b4c35] px-4 pb-28 pt-4 text-white  sm:px-8 sm:pb-32 sm:pt-6 lg:px-12 lg:pb-36">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,#163d2b_0%,#234e36_58%,#102619_100%)]" />
        <Image
          src="/bg2.jpg"
          alt="Lanskap Dusun Ganjuran"
          fill
          priority
          sizes="50vw"
          className="pointer-events-none absolute inset-0 object-cover object-center opacity-80"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(191,255,169,.2),transparent_45%),radial-gradient(circle_at_75%_35%,rgba(255,252,199,.16),transparent_40%),linear-gradient(to_bottom,rgba(9,27,19,.35),rgba(9,27,19,.65))]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[length:28px_28px] opacity-20" />

        <section
          id="profil"
          className="relative z-10 mx-auto my-auto flex w-full max-w-4xl flex-col items-center pb-8 pt-12 text-center sm:pt-16 lg:pt-20"
        >
          <p className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 shadow-sm">
            Website Profil & Potensi Dusun
          </p>
          <h1 className="mt-5 text-balance text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Portal Digital Dusun Ganjuran
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
            Platform informasi warga untuk memperkenalkan perangkat dusun,
            pemetaan wilayah, dan produk UMKM unggulan secara terbuka.
          </p>
          <div className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#173d2c] transition hover:-translate-y-0.5 hover:bg-[#f5f4cc]"
              href="#peta"
            >
              Lihat Peta
            </a>
            <a
              className="rounded-full border border-white/50 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              href="#umkm"
            >
              Lihat Potensi UMKM
            </a>
          </div>
        </section>

        {/* Stats ribbon: elemen identitas dusun, menempel di bawah hero */}
        <div className="relative z-10 mx-auto -mb-24 w-full max-w-4xl px-2 sm:-mb-28">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/15 bg-[#143323]/80 p-4 backdrop-blur-sm sm:grid-cols-4 sm:gap-4 sm:p-5">
            {quickStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-extrabold text-[#f5f2c9] sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wide text-white/75 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider organik menuju konten utama */}
        <svg
          className="pointer-events-none absolute bottom-0 left-0 z-0 h-16 w-full text-[#ece9df] sm:h-20"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,50 L1440,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-10 lg:pt-24">
        <section
          id="perangkat"
          aria-labelledby="perangkat-title"
          className="scroll-mt-24 space-y-7"
        >
          <div id="perangkat-title">
            <SectionHeading
              title="Perangkat Dusun"
              caption="Struktur kepemimpinan dan penggerak kegiatan masyarakat Dusun Ganjuran."
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {villageRoles.map((role) => (
              <article
                key={role.title}
                className="group flex h-full flex-col rounded-3xl border border-[#d7dccf] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#9cc4ac] hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1f573c] text-xs font-bold text-white transition group-hover:bg-[#173d2c]">
                  {role.title
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <h3 className="text-base font-semibold text-[#21442f]">{role.title}</h3>
                <p className="mt-1 text-sm font-medium text-[#38704e]">{role.name}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4b5e50]">
                  {role.description}
                </p>
                <a
                  className="mt-4 inline-flex w-fit rounded-full border border-[#1f573c] px-3 py-1 text-xs font-semibold text-[#1f573c] transition hover:bg-[#1f573c] hover:text-white"
                  href="#kontak"
                >
                  Hubungi
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="peta" aria-labelledby="map-title" className="scroll-mt-24 space-y-6">
          <div id="map-title">
            <SectionHeading
              title="Peta Digital Ganjuran"
              caption="Visualisasi wilayah, titik layanan publik, dan pusat aktivitas warga."
            />
          </div>
          <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
            <div className="relative overflow-hidden rounded-3xl border border-[#d7dccf] bg-white shadow-sm lg:col-span-2">
              <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9]">
                <Image
                  src="/gambar_peta.jpeg"
                  alt="Peta Dusun Ganjuran"
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
                      Peta Wilayah
                    </p>
                    <p className="text-lg font-bold text-white sm:text-xl">Dusun Ganjuran</p>
                  </div>
                  <a
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-[#173d2c] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f5f4cc]"
                    href="https://maps.app.goo.gl/o3215mKgHBZuEE4F7"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Buka di Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-5 rounded-3xl border border-[#d7dccf] bg-white p-6 shadow-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f6b58]">
                  Sekilas Wilayah
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#4b5e50]">
                  Wilayah dusun terbagi ke dalam beberapa RT dengan pusat layanan
                  warga dan kegiatan gotong royong tersebar merata.
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-3">
                {quickStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-[#f4f2e6] px-3 py-2.5 text-center">
                    <dd className="text-lg font-extrabold text-[#1f573c]">{stat.value}</dd>
                    <dt className="mt-0.5 text-[11px] uppercase tracking-wide text-[#5c6f60]">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="umkm" aria-labelledby="umkm-title" className="scroll-mt-24 space-y-7">
          <div id="umkm-title">
            <SectionHeading
              title="Produk UMKM Unggulan"
              caption="Karya terbaik pelaku usaha lokal yang menjadi kekuatan ekonomi dusun."
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {featuredProducts.map((product) => (
              <article
                key={product.name}
                className="flex h-full flex-col rounded-3xl border border-[#d7dccf] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative">
                  <ProductImage style={{ background: product.accent }} label={product.name} />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#1f573c] shadow-sm">
                    {product.category}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#21442f]">{product.name}</h3>
                <p className="mt-1 text-sm font-medium text-[#38704e]">{product.owner}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4b5e50]">
                  {product.description}
                </p>
                <p className="mt-3 text-sm font-bold text-[#1f573c]">
                  Rp {idrCurrency.format(product.price)}
                </p>
                <Link
                  className="mt-4 w-fit rounded-full border border-[#1f573c] px-3 py-1 text-xs font-semibold text-[#1f573c] transition hover:bg-[#1f573c] hover:text-white"
                  href={`/umkm/${product.slug}`}
                >
                  Lihat Detail
                </Link>
              </article>
            ))}
          </div>
          <div className="text-center">
            <a
              className="inline-flex rounded-full bg-[#1f573c] px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#173d2c]"
              href="#kontak"
            >
              Jelajahi Produk Lain
            </a>
          </div>
        </section>

        <section id="kontak" aria-labelledby="contact-title" className="scroll-mt-24 pt-2">
          <div className="rounded-3xl border border-[#d7dccf] bg-[linear-gradient(120deg,#214e37_0%,#356447_70%,#3f7652_100%)] p-6 text-white shadow-[0_16px_30px_-18px_rgba(18,40,29,.95)] sm:p-8 md:p-10">
            <h2 id="contact-title" className="text-center text-2xl font-bold">
              Tetap Terhubung dengan Kami
            </h2>
            <p className="mt-2 text-center text-sm text-white/90">
              Bagikan aspirasi, kebutuhan layanan, atau kolaborasi kegiatan dusun.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1c4833] transition hover:bg-[#f2f6e8]"
                href="mailto:dusunganjuran@example.id"
              >
                Email Aparat Dusun
              </a>
              <a
                className="rounded-full border border-white/55 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                href="https://wa.me/620000000000"
                rel="noopener noreferrer"
                target="_blank"
              >
                WhatsApp Layanan
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
