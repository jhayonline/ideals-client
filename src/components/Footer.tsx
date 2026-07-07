import { Link } from "react-router-dom";
import {
  Youtube,
  Instagram,
  Facebook,
  MessageCircle,
  Ghost,
  ArrowUpRight,
  ShieldCheck,
  Truck,
  Music2,
  MapPin,
} from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/format";
import logoBlue from "@/assets/Logos/logo-blue.png";

const socials = [
  {
    label: "YouTube",
    href: "https://youtube.com/@idealsgh?si=X1qFf4IxlGZylUrp",
    Icon: Youtube,
    hover: "hover:text-red-500 hover:border-red-200",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ideals239?igsh=Y3ZncGhjY2oyYnN2&utm_source=qr",
    Icon: Instagram,
    hover: "hover:text-pink-500 hover:border-pink-200",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1H6ey99RUZ/?mibextid=wwXIfr",
    Icon: Facebook,
    hover: "hover:text-blue-600 hover:border-blue-200",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ideals_gh?_r=1&_t=ZS-96qOtPrCyu5",
    Icon: Music2,
    hover: "hover:text-gray-900 hover:border-gray-300",
  },
  {
    label: "Snapchat",
    href: "https://snapchat.com/t/Mx3NyDu0",
    Icon: Ghost,
    hover: "hover:text-yellow-500 hover:border-yellow-200",
  },
];

const shopLinks = [
  { label: "iPhones", to: "/products" },
  { label: "MacBooks", to: "/products" },
  { label: "AirPods & Watch", to: "/products" },
  { label: "Accessories", to: "/products" },
];

const companyLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/products" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100/80">
      {/* Perforation seam — callback to the claim-ticket motif used elsewhere on site */}
      <div
        aria-hidden
        className="h-px w-full"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(var(--color-primary, 99 102 241) / 0.35) 1.5px, transparent 1.5px)",
          backgroundSize: "8px 1px",
          backgroundRepeat: "repeat-x",
        }}
      />

      {/* CTA strip, styled as a tear-off ticket stub */}
      <div className="border-b border-gray-100/80 bg-primary/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <span className="hidden sm:flex h-11 w-11 shrink-0 rounded-full bg-white border border-gray-100 items-center justify-center text-primary shadow-sm">
              <MessageCircle size={18} />
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900">
                Have a question before you buy?
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Chat with us on WhatsApp — real replies, no bots.
              </p>
            </div>
          </div>

          <a
            href={buildWhatsAppUrl("Hello iDeals 👋")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-primary text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all shrink-0"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <Link to="/" className="inline-block">
            <img src={logoBlue} alt="iDeals" className="h-9 w-auto" />
          </Link>

          <p className="mt-4 text-sm text-gray-500 max-w-sm leading-relaxed">
            Premium iPhones, MacBooks and accessories. Trusted across Ghana,
            based in Accra, Circle.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-x-4 gap-y-2.5 text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <ShieldCheck size={16} className="text-primary" />
              </span>
              <span>2-week warranty on every device</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Truck size={16} className="text-primary" />
              </span>
              <span>Nationwide delivery, same-day in Accra</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-primary" />
              </span>
              <span>Located at Circle, Accra</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Shop</h4>

          <ul className="space-y-2.5 text-sm text-gray-500">
            {shopLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Company</h4>

          <ul className="space-y-2.5 text-sm text-gray-500">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}

            <li>
              <a
                href={buildWhatsAppUrl(
                  "Hello iDeals, I have a question about a product.",
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors duration-200"
              >
                Ask a question
                <ArrowUpRight size={14} />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Follow us
          </h4>

          <div className="flex flex-wrap gap-2">
            {socials.map(({ label, href, Icon, hover }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={`h-11 w-11 grid place-items-center rounded-full border border-gray-200 bg-white text-gray-500 hover:shadow-md transition-all duration-200 ${hover}`}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-100/80">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} iDeals · Accra, Ghana.</p>
          <p className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60" />
            Apple deals in 🇬🇭
          </p>
        </div>
      </div>
    </footer>
  );
}
