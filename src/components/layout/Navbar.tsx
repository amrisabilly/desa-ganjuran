"use client";

import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Beranda", href: "#profil" },
  { label: "Perangkat", href: "#perangkat" },
  { label: "Peta", href: "#peta" },
  { label: "UMKM", href: "#umkm" },
  { label: "KKN", href: "/kkn" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Kunci scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Tutup menu otomatis kalau layar dilebarkan ke ukuran desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="fixed left-1/2 top-0 z-[9999] w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 rounded-2xl border border-white/15 bg-[#0d2a1a]/50 px-4 py-3 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 sm:top-4 sm:rounded-full sm:px-6 sm:py-3.5">
        {/* Highlight tipis di tepi atas, aksen kaca */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent sm:rounded-full"
        />

        <div className="relative flex items-center justify-between">
          <a
            href="#profil"
            className="text-sm font-bold tracking-wide text-[#f3f2cb] transition-opacity hover:opacity-80 sm:text-base"
            onClick={() => setIsOpen(false)}
          >
            Dusun Ganjuran
          </a>

          {/* Menu desktop */}
          <ul className="hidden items-center gap-6 text-sm font-medium text-white/90 sm:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  className="relative py-1 transition hover:text-[#f3f2cb] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[#f3f2cb] after:transition-all after:duration-300 hover:after:w-full"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Tombol hamburger custom animasi (mobile) */}
          <button
            type="button"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="group relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10 active:scale-95 sm:hidden"
          >
            <span className="relative flex h-4 w-5 flex-col items-center justify-between">
              <span
                className={`h-[1.5px] w-full origin-center rounded-full bg-[#f3f2cb] transition-all duration-300 ease-out ${
                  isOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-full rounded-full bg-[#f3f2cb] transition-all duration-200 ease-out ${
                  isOpen ? "scale-x-0 opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-[1.5px] w-full origin-center rounded-full bg-[#f3f2cb] transition-all duration-300 ease-out ${
                  isOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Overlay gelap di belakang panel */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[9997] bg-black/50 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      {/* Panel menu mobile — slide dari kanan, kaca gelap */}
      <div
        className={`fixed inset-y-0 right-0 z-[9998] flex w-[78%] max-w-xs flex-col border-l border-white/15 bg-[#0d2a1a]/80 shadow-[-8px_0_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-300 ease-out sm:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-6">
          <span className="text-sm font-bold tracking-wide text-[#f3f2cb]">Menu</span>
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#f3f2cb] transition hover:bg-white/10"
          >
            <span className="relative block h-3.5 w-3.5">
              <span className="absolute left-1/2 top-1/2 h-[1.5px] w-full -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
              <span className="absolute left-1/2 top-1/2 h-[1.5px] w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
            </span>
          </button>
        </div>

        <ul className="mt-6 flex flex-col gap-1 px-3">
          {navItems.map((item, index) => (
            <li
              key={item.label}
              className={`transition-all duration-300 ease-out ${
                isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: isOpen ? `${index * 50 + 100}ms` : "0ms" }}
            >
              <a
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium text-white/90 transition hover:bg-white/10 hover:text-[#f3f2cb]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-white/10 px-5 py-5 text-xs text-white/50">
          © {new Date().getFullYear()} Dusun Ganjuran
        </div>
      </div>
    </>
  );
}