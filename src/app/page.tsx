"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { umkmProducts } from "@/data/umkm";

/**
 * Type system
 * — Fraunces carries the headlines: a warm, slightly rustic serif.
 * — Plus Jakarta Sans (designed for the city of Jakarta) carries the body copy,
 *   a small deliberate nod to place.
 * — JetBrains Mono is used only for figures — stats, prices, dates — to read
 *   like entries in a village ledger (buku induk).
 */
const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const ledger = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ledger",
});

/* ---------------------------------- Data --------------------------------- */

type VillageRole = {
  title: string;
  name: string;
  description: string;
  since: string;
};

type QuickStat = {
  label: string;
  value: string;
};

type HistoryPoint = {
  title: string;
  description: string;
};

const villageRoles: VillageRole[] = [
  {
    title: "Ketua RW",
    name: "Siti Nur Arifah",
    description:
      "Menguatkan komunikasi antar RT dan forum masyarakat.",
    since: "Menjabat sejak 2019",
  },
  {
    title: "Tokoh Masyarakat",
    name: "Sujari",
    description:
      "Mendorong gotong royong dan pendampingan UMKM lokal.",
    since: "Aktif sejak 2016",
  },
];

const quickStats: QuickStat[] = [
  { label: "Kepala Keluarga", value: "312" },
  { label: "RT Aktif", value: "6" },
  { label: "Pelaku UMKM", value: "6" },
  { label: "Luas Wilayah", value: "15 Ha" },
];

const historyPoints: HistoryPoint[] = [
  {
    title: "Nama dan Asal Usul",
    description:
      "Nama Ganjuran tumbuh dari cerita lokal dan lingkungan pertanian yang hangat, tempat masyarakat berkumpul untuk berbagi hasil panen.",
  },
  {
    title: "Nilai Gotong Royong",
    description:
      "Sejak awal, warga saling mendukung dalam pembangunan sarana, tradisi, dan kegiatan sosial yang memperkuat kebersamaan.",
  },
];

const featuredProducts = umkmProducts.slice(0, 3);

/* --------------------------- Motion primitives ---------------------------- */

/** Fades + rises an element into place the first time it enters the viewport. */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Counts a numeric stat up from 0 once it scrolls into view. Preserves any suffix ("Ha"). */
function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [shown, setShown] = useState(target === null ? 0 : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 900;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setShown(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  if (target === null) {
    return <span ref={ref}>{value}</span>;
  }
  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}

/* ------------------------------ Ornaments -------------------------------- */

/** A quiet diagonal wave motif, distantly related to parang batik — used as ambient texture, never as a focal image. */
function WaveMotif({
  id,
  className = "",
  color = "#EFEAD9",
  opacity = 0.12,
}: {
  id: string;
  className?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg
      className={`motion-safe:animate-[motif-drift_36s_linear_infinite] ${className}`}
      aria-hidden="true"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={id}
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <path d="M-4 8 Q6 -2 16 8 T36 8" stroke={color} strokeWidth="1.3" fill="none" opacity={opacity} />
          <path d="M-4 26 Q6 16 16 26 T36 26" stroke={color} strokeWidth="1.3" fill="none" opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** A smooth wave marking the hero-to-content transition. */
function WaveDivider({ fill }: { fill: string }) {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 z-0 h-16 w-full sm:h-24"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,64 C180,110 360,10 600,40 C840,70 1020,10 1260,50 C1350,68 1400,66 1440,56 L1440,120 L0,120 Z"
        fill={fill}
      />
    </svg>
  );
}

/** Reveals a headline word by word, each masked and sliding up into place. */
function WordReveal({
  text,
  className = "",
  baseDelay = 0,
  stagger = 70,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <span
            className="inline-block transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transitionDelay: `${baseDelay + i * stagger}ms`,
              transform: visible ? "translateY(0%)" : "translateY(115%)",
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
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
    <div className="mx-auto max-w-2xl space-y-3 text-center">
      <p className={`${display.className} text-xs italic tracking-[0.2em] text-[#B97F27]`}>
        {eyebrow}
      </p>
      <h2 className={`${display.className} text-2xl font-semibold text-[#1B3A28] sm:text-3xl`}>
        {title}
      </h2>
      {caption ? (
        <p className="text-sm leading-relaxed text-[#5B6B5E]">{caption}</p>
      ) : null}
    </div>
  );
}

function ProductImage({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={label}
        fill
        sizes="(min-width: 1024px) 25vw, 100vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  );
}

/* --------------------------------- Page ----------------------------------- */

export default function Home() {
  const idrCurrency = new Intl.NumberFormat("id-ID");

  return (
    <div
      className={`${display.variable} ${body.variable} ${ledger.variable} min-h-screen bg-[#EFEAD9] font-[var(--font-body)] text-[#182A1E]`}
    >
      <style jsx global>{`
        @keyframes motif-drift {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(36px, 36px);
          }
        }
      `}</style>

      <Navbar />

      {/* ------------------------------- Hero ---------------------------- */}
      <header className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#0E1F15] px-4 pb-28 pt-4 text-white sm:px-8 sm:pb-32 sm:pt-6 lg:px-12 lg:pb-32">
        <Image
          src="/bg3.webp"
          alt="Lanskap Dusun Ganjuran"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-0 object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(11,24,16,0.25)_0%,rgba(23,50,34,0.35)_50%,rgba(10,20,13,0.55)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A140D]/70 via-[#0A140D]/10 to-transparent" />
        {/* <WaveMotif
          id="hero-motif"
          className="pointer-events-none absolute inset-0 h-full w-full"
          color="#DFA23A"
          opacity={0.07}
        /> */}
        {/* fine grain for depth, kept extremely subtle */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden="true">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(223,162,58,0.1),transparent_45%)]" />

        <section
          id="profil"
          className="relative z-10 mx-auto my-auto flex w-full max-w-3xl flex-col items-center pb-8 pt-12 text-center sm:pt-16 lg:pt-10"
        >
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
              <span className="h-1 w-1 rounded-full bg-[#DFA23A]" />
              Kecamatan Ngluwar &middot; Magelang
            </p>
          </Reveal>

          <h1
            className={`${display.className} mt-6 text-balance text-4xl font-semibold leading-[1.05] drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl`}
          >
            <WordReveal text="Portal Digital" />
            <br />
            <WordReveal
              text="Dusun Ganjuran"
              baseDelay={140}
              className="italic text-[#E7C777]"
            />
          </h1>

          <Reveal delay={420}>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-base">
              Platform informasi warga untuk memperkenalkan perangkat dusun,
              pemetaan wilayah, dan produk UMKM unggulan secara terbuka.
            </p>
          </Reveal>

          <Reveal delay={520}>
            <div className="mt-9 flex w-full max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                className="group relative w-full overflow-hidden rounded-full bg-[#DFA23A] px-6 py-2.5 text-center text-sm font-semibold text-[#12271A] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(223,162,58,0.55)] sm:w-auto"
                href="#peta"
              >
                <span className="relative z-10">Lihat Peta</span>
                <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <a
                className="w-full rounded-full border border-white/30 px-6 py-2.5 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10 sm:w-auto"
                href="#umkm"
              >
                Lihat Potensi UMKM
              </a>
            </div>
          </Reveal>

          <Reveal delay={620}>
            <div className="mx-auto mt-11 flex max-w-lg items-center justify-center divide-x divide-white/15">
              {quickStats.map((stat) => (
                <div key={stat.label} className="flex-1 px-3 text-center sm:px-5">
                  <p className={`${ledger.className} text-lg font-medium text-white sm:text-2xl`}>
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-0.5 text-[9px] uppercase tracking-[0.1em] text-white/55 sm:text-[10px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* scroll cue */}
        <a
          href="#perangkat"
          aria-label="Gulir ke bawah"
          className="relative z-10 mx-auto hidden flex-col items-center gap-2 text-white/50 transition hover:text-white/80 motion-safe:animate-bounce sm:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Gulir</span>
          <span className="h-8 w-px bg-gradient-to-b from-white/60 to-transparent" />
        </a>

        <WaveDivider fill="#EFEAD9" />
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 pb-24 pt-16 sm:px-8 sm:pt-20 lg:px-10 lg:pt-24">
        {/* --------------------------- Perangkat Dusun -------------------- */}
        <section id="perangkat" aria-labelledby="perangkat-title" className="scroll-mt-24 space-y-8">
          <Reveal>
            <div id="perangkat-title">
              <SectionHeading
                title="Perangkat Dusun"
                caption="Struktur kepemimpinan dan penggerak kegiatan masyarakat Dusun Ganjuran."
              />
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            {villageRoles.map((role, i) => (
              <Reveal key={role.title} delay={i * 120}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#D9D2B8] bg-[#F7F4E9] p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#DFA23A]/50 hover:shadow-[0_20px_40px_-24px_rgba(27,58,40,0.35)]">
                  <span className="absolute right-0 top-0 h-14 w-14 -translate-y-7 translate-x-7 rotate-45 bg-[#DFA23A]/90 transition group-hover:bg-[#DFA23A]" />
                  <p className={`${ledger.className} text-[11px] uppercase tracking-[0.14em] text-[#B97F27]`}>
                    {role.title}
                  </p>
                  <h3 className={`${display.className} mt-2 text-xl font-semibold text-[#1B3A28]`}>
                    {role.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5B6B5E]">
                    {role.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#D9D2B8] pt-3">
                    <span className={`${ledger.className} text-[11px] text-[#7C8A7E]`}>{role.since}</span>
                    <a
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B3A28] transition group-hover:gap-1.5 group-hover:text-[#B97F27]"
                      href="#kontak"
                    >
                      Hubungi <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* -------------------------------- Sejarah ------------------------ */}
        <section id="sejarah" aria-labelledby="history-title" className="scroll-mt-24 space-y-8">
          <Reveal>
            <div id="history-title">
              <SectionHeading
                eyebrow="Sejarah Desa"
                title="Jejak Sejarah Dusun Ganjuran"
                caption="Menilik akar budaya, nama, dan tradisi gotong royong yang menjadi fondasi komunitas kami."
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#D9D2B8] bg-[#F7F4E9] p-6 shadow-[0_25px_70px_-45px_rgba(21,45,33,0.55)] lg:p-8">
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1fr] lg:items-stretch">
                <div className="relative min-h-[260px] overflow-hidden rounded-[1.5rem] bg-[#12271A] shadow-[0_30px_60px_-30px_rgba(12,38,24,0.7)]">
                  <Image
                    src="/bg2.jpg"
                    alt="Sejarah Dusun Ganjuran"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                    <p className={`${ledger.className} text-[11px] uppercase tracking-[0.2em] text-[#E7C777]`}>
                      Warisan Budaya
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/90">
                      Jejak perjalanan desa dari ladang dan gotong royong menuju
                      komunitas yang tumbuh bersama.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-6">
                  <p className="text-sm leading-relaxed text-[#5B6B5E]">
                    Dusun Ganjuran lahir dari kearifan lokal dan semangat gotong
                    royong. Sejarah desa tercatat bukan hanya melalui angka,
                    namun juga melalui budaya dan cerita generasi yang terus
                    dirawat.
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[#EFEAD9] p-4">
                      <p className={`${ledger.className} text-[11px] uppercase tracking-[0.14em] text-[#B97F27]`}>
                        Tahun Berdiri
                      </p>
                      <p className={`${display.className} mt-2 text-3xl font-semibold text-[#1B3A28]`}>
                        1924
                      </p>
                      <p className="mt-1 text-xs text-[#7C8A7E]">
                        Awal komunitas pertanian dan tradisi gotong royong.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-[#EFEAD9] p-4">
                      <p className={`${ledger.className} text-[11px] uppercase tracking-[0.14em] text-[#B97F27]`}>
                        Nilai Utama
                      </p>
                      <p className={`${display.className} mt-2 text-2xl font-semibold text-[#1B3A28]`}>
                        Gotong Royong
                      </p>
                      <p className="mt-1 text-xs text-[#7C8A7E]">
                        Landasan semua aktivitas pembangunan dan budaya desa.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 border-l-2 border-dashed border-[#D9D2B8] pl-5">
                    {historyPoints.map((point, idx) => (
                      <div key={point.title} className="relative">
                        <span
                          className={`${ledger.className} absolute -left-[26px] top-0.5 flex h-5 w-5 items-center justify-center rounded-sm bg-[#1B3A28] text-[10px] font-medium text-[#E7C777]`}
                        >
                          {idx + 1}
                        </span>
                        <h3 className="text-base font-semibold text-[#1B3A28]">{point.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#5B6B5E]">
                          {point.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------------------------------- Peta ------------------------- */}
        <section id="peta" aria-labelledby="map-title" className="scroll-mt-24 space-y-8">
          <Reveal>
            <div id="map-title">
              <SectionHeading
                title="Peta Digital Ganjuran"
                caption="Visualisasi wilayah, titik layanan publik, dan pusat aktivitas warga."
              />
            </div>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
            <Reveal delay={100} className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-2xl border border-[#D9D2B8] bg-[#F7F4E9] shadow-sm">
                <div className="relative aspect-4/3 w-full overflow-hidden sm:aspect-video">
                  <Image
                    src="/peta.jpeg"
                    alt="Peta Dusun Ganjuran"
                    fill
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="object-cover object-center transition duration-700 hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-black/5 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5">
                    <div>
                      <p className={`${ledger.className} text-[11px] uppercase tracking-[0.16em] text-white/75`}>
                        Peta Wilayah
                      </p>
                      <p className={`${display.className} text-lg font-semibold text-white sm:text-xl`}>
                        Dusun Ganjuran
                      </p>
                    </div>
                    <a
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#DFA23A] px-4 py-2 text-xs font-semibold text-[#12271A] shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-8px_rgba(223,162,58,0.6)]"
                      href="https://maps.app.goo.gl/o3215mKgHBZuEE4F7"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Buka di Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex h-full flex-col justify-between gap-5 rounded-2xl border border-[#D9D2B8] bg-[#F7F4E9] p-6">
                <div>
                  <p className={`${ledger.className} text-[11px] uppercase tracking-[0.14em] text-[#B97F27]`}>
                    Sekilas Wilayah
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5B6B5E]">
                    Wilayah dusun terbagi ke dalam beberapa RT dengan pusat
                    layanan warga dan kegiatan gotong royong tersebar merata.
                  </p>
                </div>
                <dl className="grid grid-cols-2 gap-3">
                  {quickStats.map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-[#EFEAD9] px-3 py-2.5 text-center">
                      <dd className={`${ledger.className} text-lg font-medium text-[#1B3A28]`}>
                        {stat.value}
                      </dd>
                      <dt className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-[#7C8A7E]">
                        {stat.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </section>

        {/* --------------------------------- UMKM --------------------------- */}
        <section id="umkm" aria-labelledby="umkm-title" className="scroll-mt-24 space-y-8">
          <Reveal>
            <div id="umkm-title">
              <SectionHeading
                title="Produk UMKM Unggulan"
                caption="Karya terbaik pelaku usaha lokal yang menjadi kekuatan ekonomi dusun."
              />
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {featuredProducts.map((product, i) => (
              <Reveal key={product.name} delay={i * 110}>
                <article className="group flex h-full flex-col rounded-2xl border border-[#D9D2B8] bg-[#F7F4E9] p-4 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_44px_-28px_rgba(27,58,40,0.4)]">
                  <div className="relative">
                    <ProductImage src={product.image} label={product.name} />
                    <span
                      className="absolute left-0 top-3 bg-[#1B3A28] py-1 pl-3 pr-4 text-[11px] font-semibold text-white shadow-sm"
                      style={{ clipPath: "polygon(0 0, 100% 0, 88% 100%, 0% 100%)" }}
                    >
                      {product.category}
                    </span>
                  </div>
                  <h3 className={`${display.className} mt-4 text-base font-semibold text-[#1B3A28]`}>
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#B97F27]">{product.owner}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5B6B5E]">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#D9D2B8] pt-3">
                    <p className={`${ledger.className} text-sm font-medium text-[#1B3A28]`}>
                      Rp {idrCurrency.format(product.price)}
                    </p>
                    <Link
                      className="inline-flex items-center gap-1 rounded-full border border-[#1B3A28] px-3 py-1 text-xs font-semibold text-[#1B3A28] transition group-hover:bg-[#1B3A28] group-hover:text-white"
                      href={`/umkm/${product.slug}`}
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center">
            <a
              className="inline-flex rounded-full bg-[#1B3A28] px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#12271A]"
              href="#kontak"
            >
              Jelajahi Produk Lain
            </a>
          </Reveal>
        </section>

        {/* -------------------------------- Kontak -------------------------- */}
        <section id="kontak" aria-labelledby="contact-title" className="scroll-mt-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#123321] bg-[linear-gradient(120deg,#12271A_0%,#1B3A28_65%,#234A34_100%)] p-6 text-white shadow-[0_20px_45px_-24px_rgba(18,40,29,0.85)] sm:p-8 md:p-10">
              <WaveMotif
                id="contact-motif"
                className="pointer-events-none absolute inset-0 h-full w-full"
                color="#DFA23A"
                opacity={0.08}
              />
              <div className="relative z-10">
                <h2
                  id="contact-title"
                  className={`${display.className} text-center text-2xl font-semibold sm:text-3xl`}
                >
                  Tetap Terhubung dengan Kami
                </h2>
                <p className="mt-3 text-center text-sm text-white/80">
                  Bagikan aspirasi, kebutuhan layanan, atau kolaborasi kegiatan
                  dusun.
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    className="rounded-full bg-[#DFA23A] px-5 py-2.5 text-sm font-semibold text-[#12271A] transition hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-8px_rgba(223,162,58,0.6)]"
                    href="mailto:dusunganjuran@example.id"
                  >
                    Email Aparat Dusun
                  </a>
                  <a
                    className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
                    href="https://wa.me/620000000000"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    WhatsApp Layanan
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}