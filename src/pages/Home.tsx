import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  MessageCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import VideoShowcase from "@/components/VideoShowcase";
import VideoMasonryGrid from "@/components/VideoMasonryGrid";
import { buildWhatsAppUrl } from "@/lib/format";
import { api, type Product } from "@/lib/api";

import banner1 from "@/assets/Banner/banner1.png";
import banner2 from "@/assets/Banner/banner2.png";
import carousel1 from "@/assets/Carousel/17.png";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getProducts();
        if (response.success && response.data) {
          setProducts(response.data);
        } else {
          const { products: localProducts } = await import("@/data/products");
          setProducts(localProducts as any);
        }
      } catch (error) {
        try {
          const { products: localProducts } = await import("@/data/products");
          setProducts(localProducts as any);
        } catch (fallbackError) {
          console.error("Failed to load products:", fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getFeaturedPhones = (allProducts: Product[]): Product[] => {
    const specs: { model: string; prefer: (name: string) => boolean }[] = [
      { model: "17", prefer: (n) => /pro max/i.test(n) },
      { model: "13", prefer: (n) => !/pro/i.test(n) },
      { model: "15", prefer: (n) => !/pro/i.test(n) },
      { model: "12", prefer: (n) => !/pro/i.test(n) },
    ];

    const featured: Product[] = [];

    for (const spec of specs) {
      const candidates = allProducts.filter(
        (p) =>
          p.model === spec.model &&
          !featured.some((f) => f.productId === p.productId),
      );
      const match =
        candidates.find((p) => spec.prefer(p.name)) ?? candidates[0];
      if (match) featured.push(match);
    }

    if (featured.length < 4) {
      for (const p of allProducts) {
        if (featured.length >= 4) break;
        if (
          p.category === "iPhone" &&
          !featured.some((f) => f.productId === p.productId)
        ) {
          featured.push(p);
        }
      }
    }

    return featured;
  };

  const accessories = products.filter((p) => {
    return (
      p.category === "Accessory" ||
      p.category === "Watch" ||
      p.category === "iPad" ||
      p.category === "AirPods"
    );
  });

  const featuredPhones = getFeaturedPhones(products);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary/20 border-t-primary" />
      </div>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-16 sm:pt-24 pb-12 grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-wider text-primary bg-primary/10 px-4 py-2 rounded-full mb-6">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              New · iPhone 18 Series coming soon
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Premium tech.
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-purple-600 bg-clip-text text-transparent">
                Smart prices.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-500 max-w-lg leading-relaxed">
              Shop the latest iPhones, MacBooks and accessories. <br />
              Flexible installments, instant delivery across Accra.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 hover:shadow-xl"
              >
                View products
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/product/iphone-17-pro"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-primary text-white text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl"
              >
                <Sparkles size={16} />
                Check installment
              </Link>
              <a
                href={buildWhatsAppUrl(
                  "Hello iDeals, I'd like to chat about a product.",
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-gray-200 bg-white text-sm font-medium hover:border-primary hover:text-primary hover:shadow-lg transition-all"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={carousel1}
                alt="Featured iPhones"
                className="w-full h-auto object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <VideoShowcase />

      <section className="mx-auto max-w-7xl px-6 sm:px-8 py-8">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={banner1}
            alt="Promotional Banner"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      <section className="border-y border-gray-100/80 bg-white/50">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { Icon: ShieldCheck, label: "2-Week Warranty" },
            { Icon: Truck, label: "Nation Wide Delivery" },
            { Icon: BadgeCheck, label: "Trusted Seller · 5★" },
            { Icon: MessageCircle, label: "Chat on WhatsApp" },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-sm">
              <span className="h-10 w-10 rounded-full bg-primary/10 border border-primary/10 grid place-items-center text-primary shrink-0">
                <Icon size={18} />
              </span>
              <span className="font-medium text-gray-700">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-primary bg-primary/5 px-3 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              The latest and greatest
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-gray-900">
              iPhone lineup.
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all"
          >
            See all iPhones
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredPhones.length > 0 ? (
            featuredPhones.map((p, i) => (
              <ProductCard key={p.productId} product={p} index={i} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400">
              No featured phones available
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 pb-20 sm:pb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-primary bg-primary/5 px-3 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Complete your ecosystem
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-gray-900">
              Significant others.
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all"
          >
            Shop accessories
            <ArrowRight size={14} />
          </Link>
        </div>

        {accessories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {accessories.map((p, i) => (
              <ProductCard key={p.productId} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 bg-gray-50/50 rounded-2xl border border-gray-100/80">
            <div className="text-4xl mb-3">🔌</div>
            <p className="font-medium text-gray-600">
              No accessories available
            </p>
            <p className="text-sm mt-1">Check back soon for new accessories</p>
          </div>
        )}
      </section>

      <VideoMasonryGrid />

      <section className="mx-auto max-w-7xl px-6 sm:px-8 pb-24 sm:pb-28">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={banner2}
            alt="Footer Banner"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12">
            <div className="text-center max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                Get the Best Deals
              </h2>
              <p className="text-white/80 text-base sm:text-lg mb-8 leading-relaxed">
                Shop now and enjoy exclusive offers on premium tech. Flexible
                installment plans available.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white text-gray-900 text-sm font-medium hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  Shop Now
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={buildWhatsAppUrl(
                    "Hello iDeals, I'm interested in your deals!",
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-primary text-white text-sm font-medium hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02] transition-all"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
