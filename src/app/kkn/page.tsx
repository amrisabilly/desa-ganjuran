"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Fraunces } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

type TeamMember = {
  name: string;
  role: string;
  tier: "inti" | "bidang";
  image: string;
  description: string;
};

type GalleryItem = {
  title: string;
  description: string;
  image: string;
};

type ProgramCard = {
  title: string;
  description: string;
};

type QuickStat = {
  label: string;
  value: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Maulana Ashim",
    role: "Ketua Tim",
    tier: "inti",
    image: "/kkn/anggota/maulana.jpg",
    description:
      "Memimpin koordinasi tim dan menjadi penghubung utama dengan warga serta pihak kampus.",
  },
  {
    name: "Siti Aminah",
    role: "Wakil Ketua",
    tier: "inti",
    image: "/kkn/anggota/siti.jpg",
    description:
      "Mendukung ketua dalam pengambilan keputusan dan mengawasi jalannya program kerja harian.",
  },
  {
    name: "Ricky Prasetyo",
    role: "Sub Koordinator",
    tier: "bidang",
    image: "/kkn/anggota/ricky.jpg",
    description:
      "Mengelola pembagian tugas antar bidang agar program berjalan sesuai target.",
  },
  {
    name: "Lia Novita",
    role: "Humas",
    tier: "bidang",
    image: "/kkn/anggota/lia.jpg",
    description:
      "Menjembatani komunikasi antara tim KKN dengan masyarakat dan perangkat dusun.",
  },
  {
    name: "Agus Salim",
    role: "Logistik",
    tier: "bidang",
    image: "/kkn/anggota/agus.jpg",
    description:
      "Bertanggung jawab atas perlengkapan dan kebutuhan operasional setiap kegiatan.",
  },
  {
    name: "Dhiya Sari",
    role: "Pendamping",
    tier: "bidang",
    image: "/kkn/anggota/dhiya.jpg",
    description:
      "Mendampingi warga dalam pelaksanaan program pemberdayaan dan pelatihan.",
  },
  {
    name: "Hendro Kusuma",
    role: "Dokumentasi",
    tier: "bidang",
    image: "/kkn/anggota/hendro.jpg",
    description:
      "Mengabadikan setiap momen kegiatan untuk keperluan arsip dan publikasi tim.",
  },
  {
    name: "Nina Amelia",
    role: "Desain & Publikasi",
    tier: "bidang",
    image: "/kkn/anggota/nina.jpg",
    description:
      "Merancang materi visual dan mengelola publikasi kegiatan tim di media sosial.",
  },
];

const galleryItems: GalleryItem[] = [
  {
    title: "Cengkrama Mengajar",
    description:
      "Sesi berbagi pengetahuan dan diskusi kreatif di tengah masyarakat dusun.",
    image: "/bg2.jpg",
  },
  {
    title: "Pelatihan UMKM",
    description:
      "Pendampingan usaha kecil untuk meningkatkan kualitas produk lokal.",
    image: "/bg2.jpg",
  },
  {
    title: "Resik Dusun",
    description:
      "Aksi gotong royong menjaga kebersihan lingkungan dan fasilitas umum.",
    image: "/bg2.jpg",
  },
];

const programCards: ProgramCard[] = [
  {
    title: "Program Pemberdayaan",
    description:
      "Membantu penguatan UMKM, pelatihan digital, dan manajemen produk lokal.",
  },
  {
    title: "Pembangunan Infrastruktur",
    description:
      "Mendukung perbaikan fasilitas umum dan akses lingkungan dusun.",
  },
  {
    title: "Pelestarian Budaya",
    description:
      "Mengangkat kearifan lokal dan tradisi melalui kegiatan kreatif warga.",
  },
];

const heroStats: QuickStat[] = [
  { label: "Anggota Tim", value: "10" },
  { label: "Program Kerja", value: "3" },
  { label: "Angkatan", value: "2026" },
];

/* --------------------------- Motion primitive ---------------------------- */

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

/** A smooth wave marking the hero-to-content transition, matching the Home page. */
function WaveDivider({ fill }: { fill: string }) {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 z-10 h-14 w-full sm:h-20"
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

/** Ambient blurred glows behind the main content, matching the Home page treatment. */
function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-32 top-[8%] h-[360px] w-[360px] rounded-full bg-[#4F7942]/10 blur-[130px]" />
      <div className="absolute -right-40 top-[45%] h-[420px] w-[420px] rounded-full bg-[#4F7942]/8 blur-[150px]" />
      <div className="absolute -right-24 bottom-[6%] h-[380px] w-[380px] rounded-full bg-[#4F7942]/10 blur-[140px]" />
    </div>
  );
}

function SectionHeading({
  eyebrow = "KKN UPN Veteran",
  title,
  caption,
}: {
  eyebrow?: string;
  title: string;
  caption?: string;
}) {
  return (
    <div className="space-y-3 text-center">
      <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#4F7942]">
        <span className="h-px w-6 bg-[#4F7942]/50" />
        {eyebrow}
        <span className="h-px w-6 bg-[#4F7942]/50" />
      </p>
      <h2 className="text-3xl font-extrabold text-[#1C2818] sm:text-4xl">
        {title}
      </h2>
      {caption ? (
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-[#5B6355] sm:text-base">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

/** Prominent photo card for core leadership, with hover-reveal description. */
function CoreMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="group relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] border border-black/20 shadow-[0_20px_45px_-28px_rgba(11,20,11,0.7)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-24px_rgba(11,20,11,0.85)]">
      <Image
        src={member.image}
        alt={member.name}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />

      {/* Base gradient — always visible, keeps name legible over any photo */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      {/* Extra dark scrim that fades in on hover so the description reads clearly */}
      <div className="pointer-events-none absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span
        aria-hidden
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#8FCB74]/90 text-xs font-bold text-[#0B0B0B]"
      >
        {getInitials(member.name)}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className={`${display.className} text-lg font-semibold text-white`}>
          {member.name}
        </h3>
        <span className="mt-2 inline-flex w-fit rounded-full bg-[#8FCB74]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8FCB74]">
          {member.role}
        </span>

        {/* Description — hidden by default, fades in on hover */}
        <p className="mt-3 max-h-0 overflow-hidden text-xs leading-relaxed text-white/85 opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-32 group-hover:opacity-100">
          {member.description}
        </p>
      </div>
    </article>
  );
}

/** Compact photo card for division coordinators, with hover-reveal description. */
function DivisionMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-black/10 shadow-[0_1px_0_rgba(28,40,24,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#4F7942]/40 hover:shadow-[0_20px_40px_-24px_rgba(28,40,24,0.25)]">
      <Image
        src={member.image}
        alt={member.name}
        fill
        sizes="(min-width: 1024px) 33vw, 50vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="text-base font-semibold text-white">{member.name}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-[#8FCB74]">
          {member.role}
        </p>

        <p className="mt-2 max-h-0 overflow-hidden text-xs leading-relaxed text-white/85 opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100">
          {member.description}
        </p>
      </div>
    </article>
  );
}

export default function KKNPage() {
  const coreTeam = teamMembers.filter((member) => member.tier === "inti");
  const divisionTeam = teamMembers.filter((member) => member.tier === "bidang");

  return (
    <div className={`${display.variable} min-h-screen bg-white text-[#1C2818]`}>
      <Navbar />

      {/* ---------------------------------- Hero --------------------------------- */}
      <header className="relative isolate min-h-screen overflow-hidden bg-black px-4 pb-24 pt-32 text-white sm:px-8 sm:pb-28 sm:pt-40 lg:px-12">
        <Image
          src="/kkn/kkn1.webp"
          alt="Tim KKN UPN Veteran Yogyakarta"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-0 object-cover object-center opacity-60"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(11,11,11,0.55)_0%,rgba(11,11,11,0.75)_50%,rgba(10,20,13,0.92)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(79,121,66,0.14),transparent_45%)]" />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
          <div className="lg:w-1/2">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8FCB74]" />
                KKN 2026 &middot; Dusun Ganjuran
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1
                className={`${display.className} mt-6 text-balance text-4xl font-semibold leading-[1.08] drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)] sm:text-5xl`}
              >
                Tim KKN UPN
                <br />
                <span className="italic text-[#8FCB74]">&ldquo;Veteran&rdquo; Yogyakarta</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                Membangun bersama Dusun Ganjuran. Dedikasi nyata mahasiswa untuk
                pemberdayaan masyarakat, digitalisasi desa, dan pelestarian tradisi
                lokal yang harmonis.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="group relative inline-flex justify-center overflow-hidden rounded-full bg-[#4F7942] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(79,121,66,0.55)]"
                  href="#struktur"
                >
                  <span className="relative z-10">Kenali Kami</span>
                  <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
                </a>
                <a
                  className="inline-flex justify-center rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/15"
                  href="#program"
                >
                  Program Kerja
                </a>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-10 flex max-w-sm items-center divide-x divide-white/15">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="flex-1 pr-4 text-left first:pl-0 [&:not(:first-child)]:pl-4">
                    <p className={`${display.className} text-2xl font-semibold text-white`}>
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-white/55">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={250} className="lg:w-1/2">
            <div className="relative mx-auto max-w-xl overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/5 p-3 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.4rem]">
                <Image
                  src="/kkn/foto_bareng.webp"
                  alt="Foto Tim KKN UPN &ldquo;Veteran&rdquo; Yogyakarta"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8FCB74]">
                    Bersama Warga
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                    Berkolaborasi memajukan potensi lokal dengan semangat gotong royong.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <WaveDivider fill="#FFFFFF" />
      </header>

      <div className="relative">
        <AmbientBackground />
        <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-10">
        {/* ----------------------------- Struktur Organisasi ----------------------- */}
        <section id="struktur" className="scroll-mt-24 space-y-10">
          <SectionHeading
            title="Struktur Organisasi"
            caption="Tim KKN kami terdiri dari anggota dengan peran yang jelas untuk menjalankan program kerja dan menjalin kemitraan dengan warga dusun."
          />

          <div className="space-y-5">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#6E7566]">
              Pengurus Inti
            </p>
            <div className="mx-auto w-full max-w-5xl">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {coreTeam.map((member) => (
                  <Reveal key={member.name}>
                    <CoreMemberCard member={member} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#6E7566]">
              Koordinator Bidang
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {divisionTeam.map((member) => (
                <Reveal key={member.name}>
                  <DivisionMemberCard member={member} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------- Program -------------------------------- */}
        <section id="program" className="scroll-mt-24 space-y-8">
          <SectionHeading
            eyebrow="Program Kerja"
            title="Fokus Kegiatan Tim KKN"
            caption="Program kerja yang dirancang untuk mendukung pertumbuhan ekonomi, kesejahteraan warga, dan pelestarian budaya lokal."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {programCards.map((program, i) => (
              <article
                key={program.title}
                className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#F3F5EE] p-6 shadow-[0_1px_0_rgba(28,40,24,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#4F7942]/40 hover:shadow-[0_20px_40px_-24px_rgba(28,40,24,0.25)]"
              >
                <span className={`${display.className} text-xs font-semibold text-[#4F7942]/60`}>
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-[#1C2818]">{program.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5B6355]">
                  {program.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* --------------------------------- Galeri --------------------------------- */}
        <section id="galeri" className="scroll-mt-24 space-y-8">
          <SectionHeading
            title="Galeri Kegiatan"
            caption="Dokumentasi kegiatan lapangan yang dilaksanakan oleh tim KKN bersama warga Desa Dusun Ganjuran."
          />

          <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
            {galleryItems.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-2xl border border-black/10 bg-[#F3F5EE] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(28,40,24,0.25)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#1C2818]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5B6355]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------------------------- Kolaborasi ---------------------------- */}
        <section className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(120deg,#0B0B0B_0%,#101710_55%,#152A12_100%)] p-8 text-white shadow-[0_20px_45px_-24px_rgba(0,0,0,0.85)] sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Ingin berkolaborasi?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
                Hubungi tim kami untuk mendiskusikan program KKN, pendampingan UMKM, atau kegiatan
                pelestarian budaya.
              </p>
            </div>
            <Link
              href="mailto:timkkn@example.id"
              className="inline-flex shrink-0 rounded-full bg-[#4F7942] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#3D5F34] hover:shadow-[0_12px_28px_-8px_rgba(79,121,66,0.55)]"
            >
              Kirim Email Tim KKN
            </Link>
          </div>
        </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}