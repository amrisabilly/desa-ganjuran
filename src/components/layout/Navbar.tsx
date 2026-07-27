"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Beranda", href: "#profil" },
  { label: "Tentang", href: "#profil-desa" },
  { label: "Peta", href: "#peta" },
  { label: "UMKM", href: "#umkm" },
  { label: "KKN", href: "/kkn" },
  { label: "Kontak", href: "#kontak" },
];

const scrollLinks = new Set(["#profil", "#profil-desa", "#peta", "#umkm", "#kontak"]);

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const getHref = (href: string) => {
    if (scrollLinks.has(href) && pathname !== "/") {
      return `/${href}`;
    }
    return href;
  };

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

  // Beri latar solid begitu halaman digulir, seperti garis tegas pada referensi
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[9999] px-4 transition-colors duration-300 sm:px-8 lg:px-12 ${
          isScrolled ? "bg-black/30 backdrop-blur-md" : "bg-gradient-to-b from-black/60 to-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between py-4 text-white sm:py-5">
          <Link
            href={getHref("#profil")}
            className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-80"
            onClick={() => setIsOpen(false)}
          >
            <span className="h-2 w-2 rounded-full bg-[#4F7942]" />
            Dusun Ganjuran
          </Link>

          {/* Menu desktop */}
          <ul className="hidden items-center gap-8 text-sm font-medium text-white/80 sm:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={getHref(item.href)}
                  className="relative py-1 transition hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[#4F7942] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </Link>
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
                className={`h-[1.5px] w-full origin-center rounded-full bg-white transition-all duration-300 ease-out ${
                  isOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-full rounded-full bg-white transition-all duration-200 ease-out ${
                  isOpen ? "scale-x-0 opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-[1.5px] w-full origin-center rounded-full bg-white transition-all duration-300 ease-out ${
                  isOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* garis bawah navbar: putih redup + segmen hijau aktif, seperti pada referensi */}
        <div className="mx-auto flex max-w-6xl items-center pb-3">
          <span className="h-px w-16 bg-[#4F7942]" />
          <span className="h-px flex-1 bg-white/15" />
        </div>
      </nav>

      {/* Overlay gelap di belakang panel */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[9997] bg-black/60 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      {/* Panel menu mobile — slide dari kanan, gelap dengan aksen hijau */}
      <div
        className={`fixed inset-y-0 right-0 z-[9998] flex w-[78%] max-w-xs flex-col border-l border-white/10 bg-black shadow-[-8px_0_32px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out sm:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-6">
          <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-white">
            <span className="h-2 w-2 rounded-full bg-[#4F7942]" />
            Menu
          </span>
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
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
              <Link
                href={getHref(item.href)}
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium text-white/85 transition hover:bg-white/5 hover:text-[#4F7942]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-white/10 px-5 py-5 text-xs text-white/40">
          © {new Date().getFullYear()} Dusun Ganjuran
        </div>
      </div>
    </>
  );
}