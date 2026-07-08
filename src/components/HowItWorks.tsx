import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  CreditCard,
  Truck,
  CheckCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const STEP_DURATION = 6000; // ms per auto-advance

const steps = [
  {
    icon: Package,
    label: "Choose",
    title: "Pick your device",
    description:
      "Choose from brand-new sealed iPhones or hand-checked UK-used devices. Every phone is tested before handover, so you know exactly what you're getting.",
    highlights: [
      "Factory-sealed brand new",
      "Hand-checked UK used",
      "Tested before handover",
    ],
    cta: "Browse iPhones",
    ctaLink: "/products",
  },
  {
    icon: CreditCard,
    label: "Pay",
    title: "Choose your plan",
    description:
      "Put down 40% or 60% upfront, then spread the balance over 12 weeks or 3 months. The total payable is shown upfront — no hidden fees.",
    highlights: [
      "40% or 60% deposit",
      "12-week or 3-month plans",
      "Total payable shown clearly",
    ],
    cta: "See how it works",
    ctaLink: "/product/iphone-17-pro",
  },
  {
    icon: Truck,
    label: "Collect",
    title: "Get it delivered",
    description:
      "Pay your deposit and walk away same-day from our shop at American Mall, Circle. Or get free delivery anywhere in Accra.",
    highlights: [
      "Free delivery in Accra",
      "Same-day pickup at Circle",
      "Free parking in-store",
    ],
    cta: "Chat to order",
    ctaLink: "https://wa.me/233123456789",
  },
];

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const advance = () => {
    setActiveIndex((i) => (i + 1) % steps.length);
    setProgressKey((k) => k + 1);
  };

  // Handle auto-advance with timeout
  useEffect(() => {
    if (paused) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    timeoutRef.current = setTimeout(() => {
      advance();
    }, STEP_DURATION);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [activeIndex, paused]);

  const active = steps[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-28">
      <style>{`
        @keyframes howitworks-fill { 
          from { width: 0% } 
          to { width: 100% } 
        }
        @keyframes howitworks-fade {
          from { opacity: 0; transform: translateY(8px) }
          to { opacity: 1; transform: translateY(0) }
        }
        .howitworks-progress {
          animation: howitworks-fill ${STEP_DURATION}ms linear forwards;
        }
        .howitworks-progress.paused { animation-play-state: paused; }
        .howitworks-panel { animation: howitworks-fade .4s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .howitworks-progress { animation: none !important; }
          .howitworks-panel { animation: none !important; }
        }
      `}</style>

      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-primary bg-primary/5 px-4 py-1.5 rounded-full mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Why iDeals
        </div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-gray-900">
          Built for
          <br />
          <span className="text-primary">quality you can trust</span>
        </h2>
      </div>

      {/* Step tabs with auto-advancing progress */}
      <div
        className="grid grid-cols-3 gap-3 sm:gap-8 mb-12 max-w-3xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          return (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setProgressKey((k) => k + 1);
              }}
              className="group text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors duration-300 ${
                    isActive
                      ? "bg-primary text-white"
                      : isPast
                        ? "bg-primary/15 text-primary"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-sm font-medium transition-colors duration-300 hidden sm:inline ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                {isActive && (
                  <div
                    key={`progress-${progressKey}`}
                    className={`howitworks-progress h-full rounded-full bg-primary ${
                      paused ? "paused" : ""
                    }`}
                  />
                )}
                {isPast && (
                  <div className="h-full w-full rounded-full bg-primary" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: active step detail */}
        <div key={`content-${activeIndex}`} className="howitworks-panel">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ActiveIcon size={22} />
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Step {activeIndex + 1} · {active.label}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            {active.title}
          </h3>
          <p className="mt-3 text-gray-500 leading-relaxed max-w-md">
            {active.description}
          </p>

          <div className="mt-5 space-y-2">
            {active.highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-center gap-2.5 text-sm text-gray-600"
              >
                <CheckCircle size={14} className="text-primary shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 flex items-center gap-3">
            {active.ctaLink.startsWith("http") ? (
              <a
                href={active.ctaLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all"
              >
                {active.cta}
                <ArrowRight size={14} />
              </a>
            ) : (
              <Link
                to={active.ctaLink}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all"
              >
                {active.cta}
                <ArrowRight size={14} />
              </Link>
            )}
            <a
              href="https://wa.me/233123456789"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-all"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* Right: claim-ticket visual */}
        <div className="flex justify-center lg:justify-end">
          <div
            key={`ticket-${activeIndex}`}
            className="howitworks-panel relative w-full max-w-sm rounded-2xl bg-white shadow-xl shadow-gray-900/5 border border-gray-100 flex overflow-hidden"
          >
            <div className="w-24 shrink-0 bg-primary/5 flex flex-col items-center justify-center gap-2 py-8 border-r-2 border-dashed border-gray-200">
              <ActiveIcon size={24} className="text-primary" />
              <span className="text-[10px] font-semibold tracking-widest text-primary/70">
                {String(activeIndex + 1).padStart(2, "0")}/
                {String(steps.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex-1 p-6">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
                iDeals · Claim ticket
              </div>
              <div className="text-base font-semibold text-gray-900 leading-snug">
                {active.title}
              </div>
              <div className="mt-2 text-xs text-gray-500 leading-relaxed">
                {active.description}
              </div>
              <div className="mt-4 pt-4 border-t border-dashed border-gray-200 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-gray-400">
                  Next
                </span>
                <span className="text-xs font-medium text-gray-600">
                  {steps[(activeIndex + 1) % steps.length].title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
