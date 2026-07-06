import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUmkmBySlug, umkmProducts } from "@/data/umkm";

type UmkmDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function toRupiah(value: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
}

function ProductTile({
  style,
  label,
}: {
  style: string;
  label: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="h-24 w-full rounded-2xl border border-[#e1ddd2] shadow-inner"
      style={{ background: style }}
      title={label}
    />
  );
}

export function generateStaticParams() {
  return umkmProducts.map((item) => ({ slug: item.slug }));
}

export default async function UmkmDetailPage({ params }: UmkmDetailPageProps) {
  const { slug } = await params;
  const product = getUmkmBySlug(slug);

  if (!product) {
    notFound();
  }

  const recommended = umkmProducts
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#ece9df] text-[#153524]">
      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-6 sm:px-8 sm:pt-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="text-xs text-[#5f6f61] sm:text-sm">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link className="transition hover:text-[#1b4d35]" href="/">
                Home
              </Link>
            </li>
            <li aria-hidden="true">&gt;</li>
            <li>
              <Link className="transition hover:text-[#1b4d35]" href="/#umkm">
                UMKM
              </Link>
            </li>
            <li aria-hidden="true">&gt;</li>
            <li className="font-semibold text-[#1b4d35]">{product.name}</li>
          </ol>
        </nav>

        <section className="mt-4 rounded-3xl border border-[#ddd9ce] bg-[#f6f3eb] p-4 shadow-sm sm:p-6 lg:p-7">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
            <div>
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-[#e1ddd2]">
                <Image
                  src="/bg2.jpg"
                  alt={product.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-3">
                <ProductTile style={product.accent} label={`${product.name} varian 1`} />
                <ProductTile
                  style="radial-gradient(circle at 25% 20%, #f8dca8 0%, #af7840 45%, #4e301f 100%)"
                  label={`${product.name} varian 2`}
                />
                <ProductTile
                  style="radial-gradient(circle at 70% 20%, #b7d59f 0%, #4f7a4f 45%, #223b2a 100%)"
                  label={`${product.name} varian 3`}
                />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-[#1c4b33]">{product.name}</h1>

              <div className="mt-2 flex flex-wrap items-center gap-2.5">
                <p className="text-2xl font-bold text-[#214f36]">{toRupiah(product.price)}</p>
                {product.oldPrice ? (
                  <p className="text-sm text-[#7d7b72] line-through">{toRupiah(product.oldPrice)}</p>
                ) : null}
                {product.discountLabel ? (
                  <span className="rounded-full bg-[#d6e8c9] px-2 py-0.5 text-xs font-semibold text-[#3d643e]">
                    {product.discountLabel}
                  </span>
                ) : null}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#4f6052]">
                {product.name} diproduksi oleh {product.owner} menggunakan bahan baku pilihan
                dari warga sekitar. Produk ini menjaga cita rasa dan karakter lokal agar tetap
                autentik untuk konsumsi keluarga sehari-hari.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#4f6052]">
                <span className="font-semibold text-[#2a533b]">Manfaat:</span> Produk dikerjakan
                secara higienis, minim bahan tambahan, dan mendukung ekonomi pelaku usaha desa.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {product.features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-xl border border-[#e0dbc9] bg-[#f0ece2] px-3 py-2 text-center text-xs font-semibold text-[#425945]"
                  >
                    {feature}
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-[#dfd9cb] bg-[#efe9dc] p-3.5">
                <p className="text-sm font-semibold text-[#264f37]">{product.owner}</p>
                <p className="text-xs text-[#5a685c]">di {product.location}</p>
              </div>

              <a
                href="https://wa.me/620000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#2f6a42] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#255737]"
              >
                Pesan via WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="mt-9">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-[#183f2d]">Produk Unggulan Lainnya</h2>
            <Link className="text-sm font-semibold text-[#275b3f] transition hover:underline" href="/#umkm">
              Lihat Semua
            </Link>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((item) => (
              <article
                key={item.slug}
                className="overflow-hidden rounded-2xl border border-[#d8d4c8] bg-white shadow-sm"
              >
                <div className="h-32" style={{ background: item.accent }} />
                <div className="p-4">
                  <h3 className="text-base font-semibold text-[#234530]">{item.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#526354]">{item.description}</p>
                  <p className="mt-3 text-sm font-bold text-[#1f573c]">{toRupiah(item.price)}</p>
                  <Link
                    href={`/umkm/${item.slug}`}
                    className="mt-3 inline-flex rounded-full border border-[#1f573c] px-3 py-1 text-xs font-semibold text-[#1f573c] transition hover:bg-[#1f573c] hover:text-white"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[#2e603d] px-4 py-10 text-white sm:px-8">
        <div className="mx-auto w-full max-w-6xl text-center">
          <h2 className="text-xl font-semibold">Dusun Ganjuran</h2>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-white/85 sm:text-sm">
            <Link className="transition hover:text-[#f3f2cb]" href="/">
              Tentang Kami
            </Link>
            <Link className="transition hover:text-[#f3f2cb]" href="/#kontak">
              Kontak
            </Link>
            <Link className="transition hover:text-[#f3f2cb]" href="/#peta">
              Peta Desa
            </Link>
            <Link className="transition hover:text-[#f3f2cb]" href="/#umkm">
              Informasi Publik
            </Link>
          </div>
          <p className="mt-7 border-t border-white/20 pt-4 text-xs text-white/70">
            © 2024 Dusun Ganjuran, Desa Pleret. Terhubung dalam Kebersamaan.
          </p>
        </div>
      </footer>
    </div>
  );
}
