type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Profil", href: "#profil" },
  { label: "Perangkat", href: "#perangkat" },
  { label: "Peta", href: "#peta" },
  { label: "UMKM", href: "#umkm" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  return (
    <nav className="fixed left-1/2 top-0 z-[9999] flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/25 bg-[#113523]/80 px-4 py-3 text-white backdrop-blur-md sm:top-4 sm:rounded-full sm:px-6 sm:py-3.5">
      <a href="#profil" className="text-sm font-bold tracking-wide text-[#f3f2cb] sm:text-base">
        Dusun Ganjuran
      </a>

      <ul className="order-3 flex w-full items-center justify-center gap-3.5 pt-1 text-xs font-medium text-white/90 sm:order-2 sm:w-auto sm:gap-5 sm:pt-0 sm:text-sm">
        {navItems.map((item) => (
          <li key={item.label}>
            <a className="transition hover:text-[#f3f2cb]" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}