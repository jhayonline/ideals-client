import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, BadgeCheck, MessageCircle } from "lucide-react";
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
        if (response.success) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Get one representative phone per generation: 17 Pro Max, 16, 13, 11
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

    // Fallback: fill any remaining slots with other iPhones if a generation
    // wasn't found in the catalog
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

  const accessories = products.filter((p) => p.category !== "iPhone");
  const featuredPhones = getFeaturedPhones(products);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden gradient-hero">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 sm:pt-24 pb-12 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-primary bg-primary-soft px-3 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              New · iPhone 18 Series coming soon
            </span>
            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-balance">
              Premium tech.
              <br />
              <span className="text-primary">Smart prices.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-lg">
              Shop the latest iPhones, MacBooks and accessories. <br /> Flexible
              installments, instant delivery across Accra.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-gray-900 text-white text-sm font-medium hover:opacity-90 transition"
              >
                View products
              </Link>
              <Link
                to="/product/iphone-17-pro"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-primary text-white text-sm font-medium hover:opacity-90 transition"
              >
                Check installment
              </Link>
              <a
                href={buildWhatsAppUrl(
                  "Hello iDeals, I'd like to chat about a product.",
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-gray-200 bg-white text-sm font-medium hover:border-primary hover:text-primary transition"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <img
              src={carousel1}
              alt="Featured iPhones"
              className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(35,34,224,0.15)]"
            />
          </motion.div>
        </div>
      </section>

      <VideoShowcase />

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
        <div className="rounded-3xl overflow-hidden">
          <img
            src={banner1}
            alt="Promotional Banner"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      <section className="border-y border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { Icon: ShieldCheck, label: "2-Week Warranty" },
            { Icon: Truck, label: "Nation Wide Delivery" },
            { Icon: BadgeCheck, label: "Trusted Seller · 5★" },
            { Icon: MessageCircle, label: "Chat on WhatsApp" },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-sm">
              <span className="h-9 w-9 rounded-full border border-gray-100 grid place-items-center text-primary">
                <Icon size={16} />
              </span>
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products - iPhones from different generations */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">
              The latest and greatest
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-tight">
              iPhone lineup.
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:inline text-sm text-primary hover:underline"
          >
            See all iPhones →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredPhones.map((p, i) => (
            <ProductCard key={p.productId} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Significant others - Accessories */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Complete your ecosystem
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-tight">
              Significant others.
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:inline text-sm text-primary hover:underline"
          >
            Shop accessories →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {accessories.map((p, i) => (
            <ProductCard key={p.productId} product={p} index={i} />
          ))}
        </div>
      </section>

      <VideoMasonryGrid />

      <section className="relative mx-auto max-w-7xl px-5 sm:px-8 pb-24">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src={banner2}
            alt="Footer Banner"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12">
            <div className="text-center max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4">
                Get the Best Deals
              </h2>
              <p className="text-white/90 text-base sm:text-lg mb-6">
                Shop now and enjoy exclusive offers on premium tech. Flexible
                installment plans available.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-white text-gray-900 text-sm font-medium hover:opacity-90 transition"
                >
                  Shop Now
                </Link>
                <a
                  href={buildWhatsAppUrl(
                    "Hello iDeals, I'm interested in your deals!",
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-primary text-white text-sm font-medium hover:opacity-90 transition"
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
