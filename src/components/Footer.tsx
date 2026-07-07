import { Link } from "react-router-dom";
import {
  Youtube,
  Instagram,
  Facebook,
  MessageCircle,
  ArrowUpRight,
  ShieldCheck,
  Truck,
  Music2,
} from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/format";
import logoBlue from "@/assets/Logos/logo-blue.png";

const socials = [
  {
    label: "YouTube",
    href: "https://youtube.com/@idealsgh?si=X1qFf4IxlGZylUrp",
    Icon: Youtube,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ideals239?igsh=Y3ZncGhjY2oyYnN2&utm_source=qr",
    Icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1H6ey99RUZ/?mibextid=wwXIfr",
    Icon: Facebook,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ideals_gh?_r=1&_t=ZS-96qOtPrCyu5",
    Icon: Music2,
  },
  {
    label: "Snapchat",
    href: "https://snapchat.com/t/Mx3NyDu0",
    Icon: MessageCircle,
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
  { label: "Admin", to: "/admin" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      {/* CTA strip */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Have a question before you buy?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Chat with us on WhatsApp — real replies, no bots.
            </p>
          </div>

          <a
            href={buildWhatsAppUrl("Hello iDeals 👋")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-white text-sm font-medium hover:opacity-90 transition shrink-0"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-2 md:grid-cols-5">
        <div className="md:col-span-2">
          <img src={logoBlue} alt="iDeals" className="h-8 w-auto mb-4" />

          <p className="text-sm text-muted-foreground max-w-sm">
            Premium iPhones, MacBooks and accessories. Trusted across Ghana,
            based in Accra, Circle.
          </p>

          <div className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-primary" />
              2-week warranty on every device
            </div>

            <div className="flex items-center gap-2">
              <Truck size={15} className="text-primary" />
              Nationwide delivery, same-day in Accra
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Shop</h4>

          <ul className="space-y-2 text-sm text-muted-foreground">
            {shopLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Company</h4>

          <ul className="space-y-2 text-sm text-muted-foreground">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="hover:text-primary transition-colors"
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
                className="inline-flex items-center gap-1 hover:text-primary transition-colors"
              >
                Ask a question
                <ArrowUpRight size={12} />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Follow us</h4>

          <div className="flex flex-wrap gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="h-10 w-10 grid place-items-center rounded-full border border-border bg-background hover:border-primary hover:text-primary transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} iDeals · Accra, Ghana.</p>
          <p>Apple deals in 🇬🇭.</p>
        </div>
      </div>
    </footer>
  );
}
