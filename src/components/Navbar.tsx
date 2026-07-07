import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logoBlue from "@/assets/Logos/logo-blue.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/admin", label: "Admin" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdmin) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logoBlue}
            alt="iDeals"
            className="h-9 w-auto transition-transform group-hover:scale-105"
          />
          <span className="text-xl font-semibold tracking-tight text-gray-900 hidden sm:block">
            iDeals
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-600">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`px-4 py-2 rounded-full transition-all hover:bg-gray-100/80 ${
                  location.pathname === l.to
                    ? "text-primary bg-primary/5"
                    : "hover:text-gray-900"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden p-2 -mr-2 rounded-full hover:bg-gray-100/80 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-gray-100/50 bg-white/95 backdrop-blur-xl">
          <ul className="px-6 py-4 flex flex-col gap-1 text-sm font-medium">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-xl transition-all hover:bg-gray-50 ${
                    location.pathname === l.to
                      ? "text-primary bg-primary/5"
                      : "text-gray-600"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
