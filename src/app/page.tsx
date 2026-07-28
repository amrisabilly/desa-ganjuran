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
 * — Fraunces carries the headlines: a bold, high-contrast serif built for
 *   impact, echoing the oversized display type of the reference design.
 * — Plus Jakarta Sans (designed for the city of Jakarta) carries the body
 *   copy, a small deliberate nod to place.
 * — JetBrains Mono is used only for figures — section numbers, stats,
 *   prices, dates — to read like entries in a village ledger (buku induk)
 *   and to power the numbered index in the hero.
 */
const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

/* --------------------------------- Palette --------------------------------
   White stage (#FFFFFF) with a single earthy-green accent (#4F7942),
   evoking sawah/pertanian tones. Hero and two feature panels (Jelajahi,
   Kontak) keep a dark photographic treatment for contrast; everything
   else sits on a clean white ground with dark-ink text.
------------------------------------------------------------------------- */

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

type SectionIndex = {
  number: string;
  label: string;
  href: string;
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
  { label: "Kepala Keluarga", value: "250" },
  { label: "RT Aktif", value: "6" },
  { label: "Pelaku UMKM", value: "4" },
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

// Real sequence: the sections a visitor moves through, top to bottom —
// mirrors the reference's numbered slide index, but here the numbers
// encode actual page order rather than decoration.
const sectionIndex: SectionIndex[] = [
  { number: "01", label: "Profil", href: "#profil" },
  { number: "02", label: "Sorotan", href: "#sorotan" },
  { number: "03", label: "Tentang", href: "#profil-desa" },
  { number: "04", label: "Peta", href: "#peta" },
  { number: "05", label: "UMKM", href: "#umkm" },
];

const heroFacts = [
  {
    title: "Letak Wilayah",
    description:
      "Dusun Ganjuran berada di Kecamatan Ngluwar, Kabupaten Magelang, dikelilingi lahan pertanian dan permukiman warga.",
  },
  {
    title: "Semangat Warga",
    description:
      "Gotong royong menjadi denyut utama setiap kegiatan, dari perawatan fasilitas umum hingga acara tradisi.",
  },
  {
    title: "Ekonomi Lokal",
    description:
      "Pelaku UMKM dusun menghasilkan produk unggulan yang menopang perputaran ekonomi warga sehari-hari.",
  },
];

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

const galleryImages: GalleryImage[] = [
  { src: "/galeri.webp", alt: "Lanskap Dusun Ganjuran", caption: "Lanskap Dusun" },
  { src: "/kerja_bakti.webp", alt: "Suasana warga Ganjuran", caption: "Kerja Bakti" },
  { src: "/senam.webp", alt: "Peta wilayah Dusun Ganjuran", caption: "Senam" },
  { src: "/gal.webp", alt: "Sudut Dusun Ganjuran", caption: "Sudut Dusun" },
];

const featuredProducts = umkmProducts.slice(0, 3);
const rankLabels = ["Produk No. 01", "Produk No. 02", "Produk No. 03"];

// Highlights shown directly under the hero, styled after the reference's
// ranked destination grid — here it ranks the dusun's own products.
const highlightProducts = umkmProducts.slice(0, 4);
const highlightLabels = ["Favorit #1", "Favorit #2", "Favorit #3", "Favorit #4"];

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
  color = "#4F7942",
  opacity = 0.1,
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
      <p className={`${ledger.className} text-[11px] uppercase tracking-[0.28em] text-[#4F7942]`}>
        {eyebrow}
      </p>
      <h2 className={`${display.className} text-2xl font-semibold uppercase tracking-tight text-[#1C2818] sm:text-3xl`}>
        {title}
      </h2>
      {caption ? (
        <p className="text-sm leading-relaxed text-[#5B6355]">{caption}</p>
      ) : null}
    </div>
  );
}

/**
 * Ambient background accents used behind the main content — soft, blurred
 * glows in the earthy-green accent plus a faint dot-grid, the kind of quiet
 * depth modern light-mode sites use so sections don't read as flat white
 * panels while text and cards stay fully legible on top.
 */
function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(28,40,24,0.9) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="absolute -left-32 top-[6%] h-[380px] w-[380px] rounded-full bg-[#4F7942]/15 blur-[130px]" />
      <div className="absolute -right-40 top-[32%] h-[460px] w-[460px] rounded-full bg-[#4F7942]/10 blur-[150px]" />
      <div className="absolute left-[8%] top-[58%] h-[340px] w-[340px] rounded-full bg-black/[0.02] blur-[130px]" />
      <div className="absolute -right-24 bottom-[4%] h-[420px] w-[420px] rounded-full bg-[#4F7942]/12 blur-[140px]" />
    </div>
  );
}

/** Circular outlined play button, used on the CTA panel below the highlights grid. */
function PlayIcon({ size = "sm" }: { size?: "sm" | "lg" }) {
  const wrap = size === "lg" ? "h-14 w-14" : "h-8 w-8";
  const glyph = size === "lg" ? "h-5 w-5" : "h-3 w-3";
  return (
    <span
      className={`inline-flex ${wrap} shrink-0 items-center justify-center rounded-full border border-white/70 bg-black/30 backdrop-blur-sm transition group-hover:border-[#4F7942] group-hover:bg-[#4F7942]/20`}
    >
      <svg viewBox="0 0 24 24" className={`${glyph} translate-x-[1px] fill-white`} aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>
  );
}

/* --------------------------------- Page ----------------------------------- */

export default function Home() {
  const idrCurrency = new Intl.NumberFormat("id-ID");
  const [activeSection, setActiveSection] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div
      className={`${display.variable} ${body.variable} ${ledger.variable} min-h-screen bg-white font-[var(--font-body)] text-[#1C2818]`}
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
      <header className="relative isolate flex min-h-screen flex-col overflow-hidden bg-black px-4 pb-28 pt-4 text-white sm:px-8 sm:pb-32 sm:pt-6 lg:px-12 lg:pb-32">
        <Image
          src="/bg3_bright.webp"
          alt="Lanskap Dusun Ganjuran"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-0 object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(11,11,11,0.55)_0%,rgba(11,11,11,0.75)_50%,rgba(10,20,13,0.92)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(79,121,66,0.14),transparent_45%)]" />

        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* numbered section index, right edge — a real sequence: hero → perangkat → sejarah → peta → umkm */}
        <nav
          aria-label="Navigasi bagian"
          className="pointer-events-auto absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-end gap-3 sm:right-8 sm:flex lg:right-12"
        >
          {sectionIndex.map((item, i) => {
            const isActive = i === activeSection;
            return (
              <a
                key={item.number}
                href={item.href}
                onMouseEnter={() => setActiveSection(i)}
                className={`${ledger.className} flex items-center gap-3 transition-all duration-300 ${
                  isActive ? "text-white" : "text-white/35 hover:text-white/70"
                }`}
              >
                {isActive && <span className="h-px w-6 bg-[#4F7942]" />}
                <span className={isActive ? "text-2xl font-medium" : "text-sm"}>{item.number}</span>
              </a>
            );
          })}
        </nav>

        <section
          id="profil"
          className="relative z-10 mx-auto my-auto flex w-full max-w-3xl flex-col items-center pb-8 pt-12 text-center sm:pt-16 lg:pt-[5em]"
        >
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4F7942]" />
              Kecamatan Ngluwar &middot; Magelang
            </p>
          </Reveal>

          <h1
            className={`${display.className} mt-6 text-balance text-5xl font-semibold uppercase leading-[0.95] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] sm:text-7xl lg:text-7xl`}
          >
            <WordReveal text="Portal Digital" />
            <br />
            <WordReveal
              text="Dusun Ganjuran"
              baseDelay={140}
              className="text-[#8FCB74]"
            />
          </h1>

          <Reveal delay={420}>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-base">
              Platform informasi warga untuk memperkenalkan perangkat dusun,
              pemetaan wilayah, dan produk UMKM unggulan secara terbuka.
            </p>
          </Reveal>

          <Reveal delay={520}>
            <div className="mt-9 flex w-full max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                className="group relative w-full overflow-hidden rounded-full bg-[#4F7942] px-6 py-2.5 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(79,121,66,0.55)] sm:w-auto"
                href="#peta"
              >
                <span className="relative z-10">Lihat Peta</span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <a
                className="w-full rounded-full border border-white/30 px-6 py-2.5 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10 sm:w-auto"
                href="#umkm"
              >
                Lihat Potensi UMKM
              </a>
            </div>
          </Reveal>
        </section>

        {/* three short facts, echoing the reference's caption row, tied to real anchors below */}
        <Reveal delay={600} className="relative z-10 mt-auto mx-auto grid gap-6 pt-10 sm:grid-cols-3 sm:gap-8">
          {heroFacts.map((fact) => (
            <div key={fact.title} className="max-w-xs">
              <p className={`${ledger.className} text-[11px] font-bold uppercase tracking-[0.18em] text-[#8FCB74]`}>
                {fact.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/70 sm:text-[13px]">
                {fact.description}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={700} className="relative z-10 mt-8">
          <a
            href="#sorotan"
            className="inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
          >
            Jelajahi
            <span aria-hidden="true">&gt;&gt;</span>
          </a>
          <div className="mt-4 flex h-px w-full max-w-xl items-center">
            <span className="h-px w-24 bg-[#4F7942]" />
            <span className="h-px flex-1 bg-white/20" />
          </div>
        </Reveal>

        <WaveDivider fill="#FFFFFF" />
      </header>

      
      <div className="relative">
        <AmbientBackground />
        <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 pb-24 pt-16 sm:px-8 sm:pt-20 lg:px-10 lg:pt-24">
        {/* ------------------------ Sorotan Dusun (galeri foto) ------------ */}
      <section id="sorotan" aria-labelledby="sorotan-title" className="scroll-mt-24 space-y-8">
        <Reveal>
          <div id="sorotan-title" className="mx-auto max-w-2xl space-y-3 text-center">
            <p className="text-sm text-[#6E7566]">Sekilas suasana dusun kami</p>
            <h2 className={`${display.className} text-2xl font-semibold uppercase tracking-tight text-[#1C2818] sm:text-3xl`}>
              Sorotan Dusun Ganjuran
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {galleryImages.map((img, i) => (
            <Reveal key={img.src + i} delay={i * 90}>
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group block w-full text-left"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-black/10">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                    <span className="rounded-full border border-white/70 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                      Lihat
                    </span>
                  </span>
                </div>
                <p className={`${display.className} mt-3 text-base font-semibold text-[#1C2818]`}>
                  {img.caption}
                </p>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="flex items-center gap-4 pt-2">
            <span className="h-px w-24 bg-[#4F7942]" />
            <span className="h-px flex-1 bg-black/10" />
          </div>
        </Reveal>
      </section>

      {/* Lightbox overlay */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white hover:bg-white/10"
            aria-label="Tutup"
          >
            &times;
          </button>

          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length
                  );
                }}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white hover:bg-white/10 sm:left-6"
                aria-label="Sebelumnya"
              >
                &lsaquo;
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev === null ? null : (prev + 1) % galleryImages.length
                  );
                }}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white hover:bg-white/10 sm:right-6"
                aria-label="Berikutnya"
              >
                &rsaquo;
              </button>
            </>
          )}

          <div
            className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              fill
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="object-cover"
            />
          </div>
          <p className="absolute bottom-6 text-sm text-white/80">
            {galleryImages[lightboxIndex].caption}
          </p>
        </div>
      )}

        {/* --------------------- Jelajahi & Nikmati (CTA panel) ------------ */}
        <section id="jelajahi" aria-labelledby="jelajahi-title" className="scroll-mt-24">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-[2rem] border border-black/10 bg-black">
              <Image
                src="/bg3.webp"
                alt="Suasana Dusun Ganjuran"
                fill
                sizes="100vw"
                className="object-cover object-center opacity-60"
              />
              <div className="pointer-events-none absolute inset-0 " />

              <div className="relative z-10 flex flex-col gap-10 p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-md">
                  <h2
                    id="jelajahi-title"
                    className={`${display.className} text-3xl font-semibold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl`}
                  >
                    Jelajahi dan
                    <br />
                    Nikmati
                    <br />
                    Dusun Ganjuran
                  </h2>

                  <a href="#umkm" className="group mt-6 inline-flex items-center gap-3 text-sm font-semibold text-white">
                    <PlayIcon />
                    Pilih tujuan jelajahmu
                  </a>

                  <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
                    Dusun Ganjuran berada di Kecamatan Ngluwar, Kabupaten
                    Magelang — dikelilingi lahan pertanian, permukiman warga,
                    dan semangat gotong royong yang menghidupkan setiap
                    kegiatan bersama.
                  </p>
                </div>

                <div className="flex gap-3">
                  <a
                    href="#peta"
                    className="group relative h-32 w-40 shrink-0 overflow-hidden rounded-xl border border-white/10 sm:h-36 sm:w-48"
                  >
                    <Image
                      src="/peta.jpeg"
                      alt="Peta Dusun Ganjuran"
                      fill
                      sizes="200px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/25" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <PlayIcon size="lg" />
                    </span>
                  </a>
                  <a
                    href="#profil-desa"
                    className="group relative h-32 w-40 shrink-0 overflow-hidden rounded-xl border border-white/10 sm:h-36 sm:w-48"
                  >
                    <Image
                      src="/bg2.jpg"
                      alt="Suasana Dusun Ganjuran"
                      fill
                      sizes="200px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </a>
                </div>
              </div>

              <p className="relative z-10 px-6 pb-5 text-right text-xs text-white/35 sm:px-10 sm:pb-6">
                instagram.com/dusun.ganjuran_
              </p>
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
              <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
                <div className="relative aspect-4/3 w-full overflow-hidden sm:aspect-video">
                  <Image
                    src="/peta.jpeg"
                    alt="Peta Dusun Ganjuran"
                    fill
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="object-cover object-center transition duration-700 hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5">
                    <div>
                      <p className={`${ledger.className} text-[11px] uppercase tracking-[0.16em] text-white/70`}>
                        Peta Wilayah
                      </p>
                      <p className={`${display.className} text-lg font-semibold text-white sm:text-xl`}>
                        Dusun Ganjuran
                      </p>
                    </div>
                    <a
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#4F7942] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-8px_rgba(79,121,66,0.55)]"
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
              <div className="flex h-full flex-col justify-between gap-5 rounded-2xl border border-black/10 bg-white p-6">
                <div>
                  <p className={`${ledger.className} text-[11px] uppercase tracking-[0.14em] text-[#4F7942]`}>
                    Sekilas Wilayah
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5B6355]">
                    Wilayah dusun terbagi ke dalam beberapa RT dengan pusat
                    layanan warga dan kegiatan gotong royong tersebar merata.
                  </p>
                </div>
                <dl className="grid grid-cols-2 gap-3">
                  {quickStats.map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-[#F3F5EE] px-3 py-2.5 text-center">
                      <dd className={`${ledger.className} text-lg font-medium text-[#1C2818]`}>
                        <CountUp value={stat.value} />
                      </dd>
                      <dt className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-[#6E7566]">
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
            <div id="umkm-title" className="mx-auto max-w-2xl space-y-3 text-center">
              <p className="text-sm text-[#6E7566]">Bingung pilih produk mana? Ini rekomendasi kami</p>
              <h2 className={`${display.className} text-2xl font-semibold uppercase tracking-tight text-[#1C2818] sm:text-3xl`}>
                Produk Unggulan Warga
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {featuredProducts.map((product, i) => (
              <Reveal key={product.name} delay={i * 110}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition duration-300 hover:-translate-y-1.5 hover:border-[#4F7942]/40 hover:shadow-[0_24px_44px_-28px_rgba(28,40,24,0.25)]">
                  <div className="relative">
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    </div>
                    <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                      {product.category}
                    </span>
                    <div className="absolute inset-x-4 bottom-4">
                      <p className={`${ledger.className} text-[11px] uppercase tracking-[0.16em] text-[#8FCB74]`}>
                        {rankLabels[i] ?? `Produk No. ${i + 1}`}
                      </p>
                      <h3 className={`${display.className} mt-1 text-xl font-semibold text-white`}>
                        {product.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    {/* <p className="text-sm font-medium text-[#5B6355]">{product.owner}</p> */}
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5B6355]">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-dashed border-black/10 pt-3">
                      <p className={`${ledger.className} text-sm font-medium text-[#1C2818]`}>
                        Rp {idrCurrency.format(product.price)}
                      </p>
                      <Link
                        className="inline-flex items-center gap-1 rounded-full border border-black/15 px-3 py-1 text-xs font-semibold text-[#1C2818] transition group-hover:border-[#4F7942] group-hover:bg-[#4F7942] group-hover:text-white"
                        href={`/umkm/${product.slug}`}
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center">
            <a
              className="inline-flex rounded-full bg-[#4F7942] px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#3D5F34]"
              href="#kontak"
            >
              Jelajahi Produk Lain
            </a>
          </Reveal>
        </section>

        
        </main>
      </div>

      <Footer />
    </div>
  );
}