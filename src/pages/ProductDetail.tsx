import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  MessageCircle,
  ChevronLeft,
  ShieldCheck,
  Truck,
  Star,
  Sparkles,
} from "lucide-react";
import { formatGHS, buildWhatsAppUrl } from "@/lib/format";
import InstallmentCalculator, {
  type InstallmentSelection,
} from "@/components/InstallmentCalculator";
import { api, type Product } from "@/lib/api";

type ColorVariant = { name: string; hex: string; image: string };

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [installment, setInstallment] = useState<InstallmentSelection | null>(
    null,
  );

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    api
      .getProductById(id)
      .then((res) => {
        if (res.success) {
          setProduct(res.data);
          setSelectedColor(res.data.colors?.[0] ?? null);
        }
      })
      .catch((err) => console.error("Failed to fetch product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <div className="text-6xl mb-4">📱</div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Product not found
        </h1>
        <p className="text-gray-400 mt-2">
          The product you're looking for doesn't exist.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
        >
          <ChevronLeft size={16} /> Back to shop
        </Link>
      </div>
    );
  }

  const waMessage = `Hello iDeals 👋\nI'd like to buy:\n*${product.name}* — ${
    selectedColor?.name
  }\nPrice: ${formatGHS(product.price)}${
    installment
      ? `\nInstallment: ${installment.deposit}% deposit (${formatGHS(
          installment.depositAmount,
        )}) + ${installment.installments} × ${formatGHS(
          installment.perPayment,
        )} ${installment.plan}`
      : ""
  }`;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto max-w-7xl px-6 sm:px-8 py-10 sm:py-16"
    >
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-8"
      >
        <ChevronLeft size={16} /> Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-gray-50/80 to-white overflow-hidden border border-gray-100/80">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedColor?.image}
                src={selectedColor?.image}
                alt={`${product.name} ${selectedColor?.name}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-contain p-8"
              />
            </AnimatePresence>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.colors.map((c: ColorVariant) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all bg-gray-50 ${
                  selectedColor?.name === c.name
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-transparent hover:border-gray-200"
                }`}
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-full w-full object-contain p-2"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] uppercase tracking-wider text-primary font-medium bg-primary/5 px-3 py-1.5 rounded-full">
              {product.category}
            </span>
            {product.badge && (
              <span
                className={`text-[10px] uppercase font-medium tracking-wider px-3 py-1.5 rounded-full ${
                  product.badge === "Installment Available"
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {product.badge}
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>

          <p className="mt-3 text-lg text-gray-400 leading-relaxed">
            {product.tagline}
          </p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary tracking-tight">
              {formatGHS(product.price)}
            </span>
          </div>

          {/* Trust signals */}
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-primary" />
              <span>2-week warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={14} className="text-primary" />
              <span>Free delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={14} className="text-primary" />
              <span>4.9 ★ (128 reviews)</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2.5">
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full animate-pulse ${
                product.inStock ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm font-medium text-gray-700">
              {product.inStock ? "In stock" : "Out of stock"}
            </span>
            {product.inStock && (
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                Ready for pickup today
              </span>
            )}
          </div>

          {/* Color picker */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Color</span>
              <span className="text-sm text-gray-400">
                {selectedColor?.name}
              </span>
            </div>

            <div className="flex gap-3">
              {product.colors.map((c: ColorVariant) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  aria-label={c.name}
                  className={`h-10 w-10 rounded-full border-2 transition-all ${
                    selectedColor?.name === c.name
                      ? "border-primary scale-110 shadow-lg shadow-primary/20"
                      : "border-gray-200 hover:scale-105"
                  }`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Highlights */}
          <ul className="mt-8 grid grid-cols-2 gap-3">
            {product.highlights.map((h: string) => (
              <li
                key={h}
                className="flex items-start gap-2.5 text-sm text-gray-600"
              >
                <Check size={16} className="text-primary mt-0.5 shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* Installment */}
          {product.badge === "Installment Available" && (
            <div className="mt-8">
              <InstallmentCalculator
                price={product.price}
                onChange={setInstallment}
              />
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl(waMessage)}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full text-sm font-medium transition-all ${
                product.inStock
                  ? "bg-primary text-white hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02]"
                  : "bg-gray-100 text-gray-400 pointer-events-none"
              }`}
            >
              <MessageCircle size={18} />
              {product.inStock ? "Buy on WhatsApp" : "Out of stock"}
            </a>

            <a
              href={buildWhatsAppUrl(
                `Hello iDeals, I have a question about ${product.name}.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-gray-200 text-sm font-medium hover:border-primary hover:text-primary hover:shadow-lg transition-all"
            >
              <Sparkles size={16} />
              Ask a question
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
