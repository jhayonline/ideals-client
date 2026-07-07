import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MessageCircle, ChevronLeft } from "lucide-react";
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="text-3xl font-semibold">Product not found</h1>

        <Link to="/products" className="mt-4 inline-block text-primary">
          ← Back to shop
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
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-10 sm:py-16">
      <Link
        to="/products"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-8"
      >
        <ChevronLeft size={16} /> Back
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-gray-50 to-white overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedColor?.image}
                src={selectedColor?.image}
                alt={`${product.name} ${selectedColor?.name}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 h-full w-full object-contain p-8"
              />
            </AnimatePresence>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.colors.map((c: ColorVariant) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all bg-gray-50 ${
                  selectedColor?.name === c.name
                    ? "border-primary"
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
          <p className="text-xs uppercase tracking-wider text-primary font-medium">
            {product.category}
          </p>

          <h1 className="mt-2 text-4xl sm:text-5xl font-semibold">
            {product.name}
          </h1>

          <p className="mt-3 text-lg text-gray-600">{product.tagline}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-semibold">
              {formatGHS(product.price)}
            </span>

            {product.badge && (
              <span
                className={`text-[10px] uppercase font-medium tracking-wider px-2.5 py-1 rounded-full ${
                  product.badge === "Installment Available"
                    ? "bg-primary-soft text-primary"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Color picker */}
          <div className="mt-8">
            <div className="mb-3 text-sm font-medium">
              Color —{" "}
              <span className="text-gray-500">{selectedColor?.name}</span>
            </div>

            <div className="flex gap-3">
              {product.colors.map((c: ColorVariant) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  aria-label={c.name}
                  className={`h-9 w-9 rounded-full border-2 transition-all ${
                    selectedColor?.name === c.name
                      ? "border-primary scale-110"
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
              <li key={h} className="flex items-start gap-2 text-sm">
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
              className={`inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-sm font-medium transition ${
                product.inStock
                  ? "bg-primary text-white hover:opacity-90"
                  : "bg-gray-100 text-gray-400 pointer-events-none"
              }`}
            >
              <MessageCircle size={16} />
              {product.inStock ? "Buy on WhatsApp" : "Out of stock"}
            </a>

            <a
              href={buildWhatsAppUrl(
                `Hello iDeals, I have a question about ${product.name}.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center h-12 px-7 rounded-full border border-gray-200 text-sm font-medium hover:border-primary hover:text-primary transition"
            >
              Ask a question
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
