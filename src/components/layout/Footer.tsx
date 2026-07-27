export default function Footer() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="bg-[#283d21] px-4 py-12 text-white sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-center">
          <span className="h-px w-16 bg-[#4F7942]" />
          <span className="h-px flex-1 bg-white/15" />
        </div>

        <div className="mt-9 grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.14em] text-white">
              <span className="h-2 w-2 rounded-full bg-[#4F7942]" />
              Dusun Ganjuran
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              Dusun Ganjuran, Plosogede, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4F7942]">
              Tautan Cepat
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <a className="transition hover:text-white" href="#profil-desa">
                  Profil Dusun
                </a>
              </li>
              <li>
                <a className="transition hover:text-white" href="#peta">
                  Peta Digital
                </a>
              </li>
              <li>
                <a className="transition hover:text-white" href="#umkm">
                  UMKM Unggulan
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4F7942]">
              Layanan
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Layanan Administrasi Warga</li>
              <li>Informasi Agenda Dusun</li>
              <li>Pendampingan UMKM Lokal</li>
            </ul>
          </div>
        </div>

        <p className="mt-9 border-t border-white/10 pt-6 text-xs text-white/40">
          © {currentYear} Dusun Ganjuran. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
}