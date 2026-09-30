"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { primaryNav } from "@/lib/nav";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [transparencyOpen, setTransparencyOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── Main bar ─────────────────────────────────────────── */}
      <div
        className={[
          "backdrop-blur-2xl transition-all duration-500",
          scrolled || !isHome ? "bg-[#1a6a9a]/75" : "bg-white/5",
        ].join(" ")}
      >
        <div
          className={[
            "w-full pl-2 pr-4 sm:pr-6 lg:pr-8 flex items-center transition-all duration-500",
            scrolled ? "h-14" : "h-[72px]",
          ].join(" ")}
        >
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo.png"
              alt="TMCWD seal"
              width={52}
              height={52}
              className={[
                "shrink-0 transition-all duration-500",
                scrolled ? "size-8" : "size-[52px]",
              ].join(" ")}
              priority
            />
            <span
              className={[
                "font-semibold text-white tracking-tight transition-all duration-500",
                scrolled ? "text-sm" : "text-base",
              ].join(" ")}
            >
              <span className="hidden sm:inline">Trece Martires City Water District</span>
              <span className="sm:hidden">TMCWD</span>
            </span>
          </Link>

          {/* gov.ph external link */}
          <a
            href="https://www.gov.ph/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 shrink-0 group ml-4"
            aria-label="Visit gov.ph"
          >
            <Image
              src="/bago.ph.png"
              alt="Bagong Pilipinas"
              width={52}
              height={52}
              className={[
                "shrink-0 transition-all duration-500",
                scrolled ? "size-8" : "size-[52px]",
              ].join(" ")}
              priority
            />
            <span
              className={[
                "font-semibold text-white/70 tracking-tight transition-all duration-150 group-hover:text-white",
                scrolled ? "text-xs" : "text-sm",
              ].join(" ")}
            >
              gov.ph
            </span>
          </a>

          {/* Desktop nav */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-6 ml-auto"
          >
            {primaryNav.map(({ label, href, children }) => {
              const hasDropdown = children && children.length > 0;
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

              if (hasDropdown) {
                return (
                  <div
                    key={label}
                    className="relative"
                    onMouseEnter={() => setDesktopOpen(label)}
                    onMouseLeave={() => setDesktopOpen(null)}
                    onFocus={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) setDesktopOpen(label);
                    }}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) setDesktopOpen(null);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        event.preventDefault();
                        event.currentTarget.querySelector("button")?.focus();
                        setDesktopOpen(null);
                      }
                    }}
                  >
                    {/* Trigger */}
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={desktopOpen === label}
                      onClick={() => setDesktopOpen(label)}
                      className={[
                        "flex items-center gap-1 text-sm transition-colors duration-150 whitespace-nowrap cursor-pointer",
                        active
                          ? "text-white font-medium"
                          : "text-white/60 hover:text-white/90 font-normal",
                      ].join(" ")}
                    >
                      {label}
                      {/* Chevron — rotates 180° on group hover/focus-within */}
                      <svg
                        className={`size-3.5 transition-transform duration-200 ${desktopOpen === label ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    {/* Dropdown panel */}
                    <div
                      role="menu"
                      inert={desktopOpen !== label}
                      aria-label={`${label} submenu`}
                      className={[
                        // position — pt-3 bridges the gap so hover doesn't break
                        `absolute left-0 top-full pt-3 ${label === "Services" ? "w-[268px]" : "w-[232px]"} z-50`,
                        // visibility / animation
                        desktopOpen === label
                          ? "opacity-100 visible pointer-events-auto translate-y-0"
                          : "opacity-0 invisible pointer-events-none translate-y-1",
                        "transition-all duration-200 ease-out",


                      ].join(" ")}
                    >
                      {label === "Announcement" ? (
                        /* ── Two-layer heavy liquid-glass panel ── */
                        /* Relative wrapper so the caret can escape the overflow:hidden boundary */
                        <div className="relative">
                          <div className="announcement-dropdown">
                            {/* Layer 1 — blur + tint, no content */}
                            <div aria-hidden="true" className="announcement-blur" />
                            {/* Layer 2 — content floats above blur */}
                            <div className="announcement-content">
                              <ul role="none" className="services-menu-list services-menu-list--no-scroll">
                                {children!.map((item) => (
                                  <li key={item.href} role="none">
                                    {item.dividerBefore && (
                                      <div aria-hidden="true" className="my-1.5 mx-2 h-px bg-white/15" />
                                    )}
                                    <Link
                                      href={item.href}
                                      role="menuitem" onClick={() => setDesktopOpen(null)}
                                      className="services-menu-item"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* ── Existing single-layer glass card (Services / Transparency) ── */
                        <div className="services-glass relative px-2 py-2">
                          <ul role="none" className={`services-menu-list${label !== "Services" ? " services-menu-list--no-scroll" : ""}`}>
                            {children!.map((item) => (
                              <li key={item.href} role="none">
                                {item.dividerBefore && (
                                  <div aria-hidden="true" className="my-1.5 mx-2 h-px bg-white/15" />
                                )}
                                <Link
                                  href={item.href}
                                  role="menuitem" onClick={() => setDesktopOpen(null)}
                                  className="services-menu-item"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={label}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "text-sm transition-colors duration-150 whitespace-nowrap",
                    active
                      ? "text-white font-medium"
                      : "text-white/60 hover:text-white/90 font-normal",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => { setMenuOpen((v) => !v); setServicesOpen(false); setTransparencyOpen(false); setAnnouncementOpen(false); }}
            className="lg:hidden ml-auto text-white/70 hover:text-white transition-colors p-1"
          >
            {menuOpen ? (
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ──────────────────────────────────────── */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="lg:hidden backdrop-blur-2xl bg-[#1a6a9a]/95 border-t border-white/10"
        >
          <ul className="w-full px-4 py-2 flex flex-col">
            {primaryNav.map(({ label, href, children }) => {
              const hasChildren = children && children.length > 0;
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

              if (hasChildren) {
                const isServices      = label === "Services";
                const isTransparency  = label === "Transparency";
                const isAnnouncement  = label === "Announcement";
                const isOpen          = isServices
                  ? servicesOpen
                  : isTransparency
                    ? transparencyOpen
                    : isAnnouncement
                      ? announcementOpen
                      : false;
                const toggleOpen      = isServices
                  ? () => setServicesOpen((v) => !v)
                  : isTransparency
                    ? () => setTransparencyOpen((v) => !v)
                    : isAnnouncement
                      ? () => setAnnouncementOpen((v) => !v)
                      : () => {};
                const panelId = `mobile-${label.toLowerCase().replace(/\s+/g, "-")}-menu`;

                return (
                  <li key={label}>
                    {/* Accordion trigger */}
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={toggleOpen}
                      className="w-full flex items-center justify-between py-2.5 text-sm transition-colors border-b border-white/5 text-white/60 hover:text-white"
                    >
                      <span className={active ? "text-white font-medium" : ""}>{label}</span>
                      <svg
                        className={[
                          "size-3.5 transition-transform duration-200",
                          isOpen ? "rotate-180" : "",
                        ].join(" ")}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    {/* Accordion panel — grid trick: rows animate 0fr → 1fr for smooth height */}
                    <div
                      id={panelId}
                      className={[
                        "grid transition-[grid-template-rows] duration-200 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      ].join(" ")}
                    >
                      <ul
                        className="overflow-hidden flex flex-col mt-0.5 mb-1 rounded-xl bg-white/10"
                      >
                        {children.map((item) => (
                          <li key={item.href}>
                            {item.dividerBefore && (
                              <div aria-hidden="true" className="mx-3 h-px bg-white/15" />
                            )}
                            <Link
                              href={item.href}
                              onClick={() => { setMenuOpen(false); setServicesOpen(false); setTransparencyOpen(false); setAnnouncementOpen(false); }}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors text-white/70 hover:text-white hover:bg-white/10"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }

              return (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "block py-2.5 text-sm transition-colors border-b border-white/5 last:border-0",
                      active ? "text-white font-medium" : "text-white/60 hover:text-white",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
