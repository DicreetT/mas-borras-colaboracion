"use client";

import { Menu, Sprout, UserRound, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/programa", label: "El programa" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/cuenta", label: "Mi cuenta" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-background/92 backdrop-blur">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
      >
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-olive">
            <Sprout className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm uppercase tracking-[0.18em] text-muted">
              Logotipo real
            </span>
            <span className="block text-base">El Mas de Borràs</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition hover:bg-surface ${
                pathname === link.href ? "bg-surface text-olive-dark" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/acceso"
          className="hidden min-h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-semibold hover:border-olive md:inline-flex"
        >
          <UserRound className="h-4 w-4" aria-hidden="true" />
          Acceder
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-line bg-background px-4 py-4 md:hidden">
          <div className="mx-auto grid max-w-6xl gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[8px] px-4 py-3 text-base font-medium hover:bg-surface"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/acceso"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-olive px-4 py-3 text-center font-semibold text-white"
            >
              Acceder o crear cuenta
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
