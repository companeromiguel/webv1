export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  /** When true, renders a divider above this item in the dropdown */
  dividerBefore?: boolean;
}

export const primaryNav: NavItem[] = [
  {
    label: "Services",
    href: "/services/",
    children: [
      { label: "New Water Application",     href: "/services/new-water-application/" },
      { label: "Meter Reading & Statement", href: "/services/meter-reading/" },
      { label: "Payment of Water Bill",     href: "/services/payment/" },
      { label: "Change Ball Valve",         href: "/services/change-ball-valve/" },
      { label: "Leak Repair Request",       href: "/services/leak-repair/" },
      { label: "Water Supply Operation",    href: "/services/water-supply/" },
      { label: "Temporary Disconnection",   href: "/services/temporary-disconnection/" },
      { label: "Reconnection Service",      href: "/services/reconnection/" },
      { label: "Change Name/Address",       href: "/services/change-name-address/" },
      { label: "Change Meter Request",      href: "/services/change-meter/" },
      { label: "Senior Citizen Discount",   href: "/services/senior-citizen-discount/" },
      { label: "Feedback & Complaints",     href: "/services/feedback/", dividerBefore: true },
    ],
  },
  {
    label: "Transparency",
    href: "/transparency/",
    children: [
      { label: "Transparency Seal",   href: "/transparency/seal/"  },
      { label: "Freedom of Information",   href: "/transparency/foi/"              },
      { label: "Citizen's Charter",        href: "/transparency/citizens-charter/" },
      { label: "Bidding", href: "/transparency/bidding/" },
      { label: "Procurement",        href: "/transparency/procurement/"       },
    ],
  },
  {
    label: "Announcement",
    href: "/news/",
    children: [
      { label: "Announcement", href: "/news/" },
      { label: "Event",        href: "/events/" },
      { label: "Gallery",      href: "/gallery/" },
    ],
  },
  { label: "About us", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "Home",             href: "/" }
];
