export default function Footer() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="bg-[#173d2b] px-4 py-12 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-semibold">Dusun Ganjuran</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
            Kelurahan Caturharjo, Kapanewon Pandak, Kabupaten Bantul,
            Daerah Istimewa Yogyakarta.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
            Tautan Cepat
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <a className="transition hover:text-[#f3f2cb]" href="#profil">
                Profil Dusun
              </a>
            </li>
            <li>
              <a className="transition hover:text-[#f3f2cb]" href="#peta">
                Peta Digital
              </a>
            </li>
            <li>
              <a className="transition hover:text-[#f3f2cb]" href="#umkm">
                UMKM Unggulan
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
            Layanan
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>Layanan Administrasi Warga</li>
            <li>Informasi Agenda Dusun</li>
            <li>Pendampingan UMKM Lokal</li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-9 w-full max-w-6xl border-t border-white/20 pt-6 text-xs text-white/70">
        © {currentYear} Dusun Ganjuran. Semua hak dilindungi.
      </p>
    </footer>
  );
}