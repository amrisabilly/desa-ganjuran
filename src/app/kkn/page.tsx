import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

type TeamMember = {
  name: string;
  role: string;
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

const teamMembers: TeamMember[] = [
  { name: "Andi Wijaya", role: "Ketua Tim" },
  { name: "Siti Aminah", role: "Sekretaris" },
  { name: "Budi Santoso", role: "Bendahara" },
  { name: "Dewi Lestari", role: "Sekretaris" },
  { name: "Ricky Prasetyo", role: "Sub Koordinator" },
  { name: "Lia Novita", role: "Humas" },
  { name: "Agus Salim", role: "Logistik" },
  { name: "Dhiya Sari", role: "Pendamping" },
  { name: "Hendro Kusuma", role: "Dokumentasi" },
  { name: "Nina Amelia", role: "Desain & Publikasi" },
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
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f6b58]">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-extrabold text-[#143122] sm:text-4xl">
        {title}
      </h1>
      {caption ? (
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-[#4b5e50] sm:text-base">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#c1dab1] text-lg font-semibold text-[#214d36] shadow-sm">
      {initials}
    </div>
  );
}

export default function KKNPage() {
  return (
    <div className="min-h-screen bg-[#f3efe4] text-[#143122]">
      <Navbar />
    <section className="relative overflow-hidden rounded-[2rem] bg-[#1f5136] text-white shadow-[0_30px_90px_-45px_rgba(16,38,22,0.85)] sm:px-10 sm:py-16">
          <div className="absolute inset-0 opacity-70">
            <Image
              src="/bg2.jpg"
              alt="Tim KKN UPN Veteran Yogyakarta"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#0f3521]/85" />
          </div>

          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center">
            <div className="lg:w-1/2">
              <p className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                KKN Tematik 2024
              </p>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                Tim KKN UPN Veteran Yogyakarta
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                Membangun bersama Dusun Ganjuran. Dedikasi nyata mahasiswa untuk pemberdayaan
                masyarakat, digitalisasi desa, dan pelestarian tradisi lokal yang harmonis.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex rounded-full bg-[#f5f4cc] px-6 py-3 text-sm font-semibold text-[#1f5136] transition hover:-translate-y-0.5 hover:bg-[#faf8e3]"
                  href="#struktur"
                >
                  Kenali Kami
                </a>
                <a
                  className="inline-flex rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                  href="#program"
                >
                  Program Kerja
                </a>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-xl shadow-black/20 backdrop-blur-md sm:p-5">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem]">
                  <Image
                    src="/bg2.jpg"
                    alt="Foto Tim KKN UPN Veteran Yogyakarta"
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                </div>
                <div className="mt-5 rounded-[1.5rem] bg-black/20 p-4 text-sm text-white/90">
                  <p className="font-semibold text-white">Tim KKN UPN Veteran</p>
                  <p className="mt-2 leading-relaxed text-white/80">
                    Bersama masyarakat Desa Dusun Ganjuran, kami berkolaborasi untuk
                    memajukan potensi lokal dengan semangat gotong royong.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden text-[#f3efe4]">
            <svg viewBox="0 0 1440 120" className="h-full w-full" preserveAspectRatio="none">
              <path
                d="M0,80 C360,120 1080,0 1440,80 L1440,120 L0,120 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </section>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 pb-20 pt-28 sm:px-8 lg:px-10">
        
        <section id="struktur" className="space-y-8">
          <SectionHeading
            title="Struktur Organisasi"
            caption="Tim KKN kami terdiri dari anggota dengan peran yang jelas untuk menjalankan program kerja dan menjalin kemitraan dengan warga dusun."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="rounded-[2rem] border border-[#d7dccf] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4">
                  <Avatar name={member.name} />
                </div>
                <h3 className="text-lg font-semibold text-[#214d36]">{member.name}</h3>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-[#4f6b58]">
                  {member.role}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading
            eyebrow="Program Kerja"
            title="Fokus Kegiatan Tim KKN"
            caption="Program kerja yang dirancang untuk mendukung pertumbuhan ekonomi, kesejahteraan warga, dan pelestarian budaya lokal."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programCards.map((program) => (
              <article
                key={program.title}
                className="rounded-[2rem] border border-[#d7dccf] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-[#214d36]">{program.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5e50]">
                  {program.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="galeri" className="space-y-8">
          <SectionHeading
            title="Galeri Kegiatan"
            caption="Dokumentasi kegiatan lapangan yang dilaksanakan oleh tim KKN bersama warga Desa Dusun Ganjuran."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[2rem] border border-[#d7dccf] bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#214d36]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4b5e50]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#d7dccf] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#214d36]">Ingin berkolaborasi?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#4b5e50]">
                Hubungi tim kami untuk mendiskusikan program KKN, pendampingan UMKM, atau kegiatan pelestarian budaya.
              </p>
            </div>
            <Link
              href="mailto:timkkn@example.id"
              className="inline-flex rounded-full bg-[#1f573c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#173d2c]"
            >
              Kirim Email Tim KKN
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
