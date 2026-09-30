import Link from "next/link";
import Image from "next/image";

const govLinks = [
  { label: "Office of the President",      href: "https://president.gov.ph" },
  { label: "Office of the Vice President", href: "https://ovp.gov.ph" },
  { label: "Senate of the Philippines",    href: "https://senate.gov.ph" },
  { label: "House of Representatives",     href: "https://congress.gov.ph" },
  { label: "Supreme Court",                href: "https://sc.judiciary.gov.ph" },
  { label: "Court of Appeals",             href: "https://ca.judiciary.gov.ph" },
  { label: "Sandiganbayan",                href: "https://sb.judiciary.gov.ph/" },
];

// CAWD and STAWD remain text until official website URLs are confirmed.
const partners = [
  { label: "Cavite Assn. of Water Districts",           href: null },
  { label: "Southern Tagalog Assn. of Water Districts", href: null },
  { label: "Philippine Assn. of Water Districts",       href: "https://www.pawd.org.ph/" },
  { label: "Philippine Water Works Association",         href: "https://pwwainc.carrd.co/" },
  { label: "Local Water Utilities Administration",       href: "https://lwua.gov.ph/" },
  { label: "Local Govt of Trece Martires City",          href: "https://trecemartirescity.gov.ph/" },
  { label: "Provincial Government of Cavite",            href: "https://cavite.gov.ph/" },
  { label: "Office of the Ombudsman",                    href: "https://www.ombudsman.gov.ph/" },
  { label: "Commission on Audit",                        href: "https://www.coa.gov.ph/" },
  { label: "Dept. of Budget and Management",             href: "https://www.dbm.gov.ph/" },
  { label: "GSIS",                                       href: "https://www.gsis.gov.ph/" },
  { label: "PhilHealth",                                 href: "https://www.philhealth.gov.ph/" },
  { label: "Civil Service Commission",                   href: "https://csc.gov.ph/" },
  { label: "Pag-IBIG Fund",                              href: "https://www.pagibigfund.gov.ph/" },
  { label: "Bureau of Internal Revenue",                 href: "https://www.bir.gov.ph/" },
  { label: "PhilGEPS",                                    href: "https://notices.philgeps.gov.ph/" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2A2A29] text-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        {/* ── Main grid: Identity | Transparency | Navigation | Government ── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">

          {/* Col 1–2: Identity + Contact */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <Image src="/logo.png" alt="TMCWD seal" width={20} height={20} className="size-5 shrink-0" />
              <span className="text-xs font-semibold text-white/90 tracking-tight leading-snug">
                Trece Martires City Water District
              </span>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed max-w-xs mb-3">
              Government-owned corporation under P.D. 198, serving Trece Martires City, Cavite.
            </p>
            <address className="not-italic text-[11px] text-white/50 space-y-0.5">
              <p>2nd Flr., TMCWD Bldg., Governor&apos;s Drive, Brgy. San Agustin, Trece Martires City, Cavite 4109</p>
              <p>
                <a href="tel:+63464192664" className="hover:text-white transition-colors">(046) 419-2664</a>
                {" · "}
                <a href="tel:+63464190054" className="hover:text-white transition-colors">(046) 419-0054</a>
                {" · Fax "}
                <a href="tel:+63464190378" className="hover:text-white transition-colors">(046) 419-0378</a>
              </p>
              <p>
                <a href="mailto:tmcwd@yahoo.com" className="hover:text-white transition-colors">tmcwd@yahoo.com</a>
                {" · "}
                <a href="https://facebook.com/tmcwdCMUHelpDesk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  fb.com/tmcwdCMUHelpDesk
                </a>
              </p>
              <p className="text-white/30">Mon – Fri · 8:00 AM – 5:00 PM</p>
            </address>

            {/* Republika seal — fills the empty space below contact info */}
            <div className="mt-4 flex items-center gap-3">
              <Image
                src="/republika.png"
                alt="Republika ng Pilipinas"
                width={64}
                height={64}
                className="w-16 h-16 object-contain shrink-0 opacity-75"
              />
              <div className="text-[11px] text-white/35 leading-snug">
                <p className="font-medium text-white/45">Republic of the Philippines</p>
                <p>All content is in the public domain</p>
                <p>unless otherwise stated.</p>
              </div>
            </div>
          </div>

          {/* Col 3–4: Transparency + Government always side by side */}
          <div className="flex gap-8 sm:col-span-2 lg:col-span-2">

            {/* Transparency */}
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2">
                Transparency
              </p>
              <ul className="space-y-1 text-[11px] text-white/50">
                {[
                  ["Transparency Seal", "/transparency/seal/"],
                  ["Freedom of Information", "/transparency/foi/"],
                  ["Bidding & Procurement",      "/transparency/procurement/"],
                  ["Citizen's Charter",      "/transparency/citizens-charter/"],
                  ["Financial Reports",      "/transparency/seal/#documents-1"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Government Links */}
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2">
                Government
              </p>
              <ul className="space-y-1">
                {govLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-white/50 hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* ── Partners ── */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2">
            Partners
          </p>
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {partners.map(({ label, href }, i) => (
              <span key={label} className="flex items-center gap-2">
                {href ? <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-white/40 hover:text-white transition-colors"
                >
                  {label}
                </a> : <span className="text-[11px] text-white/40">{label}</span>}
                {i < partners.length - 1 && (
                  <span className="text-white/15 select-none" aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-white/30">
          <p>&copy; {year} Trece Martires City Water District. All rights reserved.</p>
          <div className="flex items-center gap-3 shrink-0">
            <a href="https://www.gov.ph" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">GOV.PH</a>
            <span className="text-white/15">·</span>
            <a href="https://data.gov.ph" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Open Data</a>
            <span className="text-white/15">·</span>
            <a href="https://www.officialgazette.gov.ph" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Official Gazette</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
