import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatGHS } from "@/lib/format";
import { useState, useMemo } from "react";
import { ChevronRight } from "lucide-react";

interface Product {
  id: string;
  productId: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  badge: string | null;
  inStock: boolean;
  colors: Array<{ name: string; hex: string; image: string }> | string;
  gallery: string[];
  highlights: string[];
  model: string;
}

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const colorsArray = useMemo(() => {
    if (typeof product.colors === "string") {
      try {
        return JSON.parse(product.colors);
      } catch {
        return [];
      }
    }
    return product.colors || [];
  }, [product.colors]);

  const [currentImage, setCurrentImage] = useState(
    colorsArray[0]?.image || product.gallery[0],
  );
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link
        to={`/product/${product.productId}`}
        className="group block rounded-2xl bg-white border border-gray-100/80 overflow-hidden hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
      >
        <div className="relative aspect-square bg-gradient-to-br from-gray-50/50 to-white overflow-hidden">
          <motion.img
            src={currentImage}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain p-6"
            animate={{ scale: isHovered ? 1.04 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Subtle gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {product.badge && (
            <span
              className={`absolute top-4 left-4 text-[10px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-full z-10 backdrop-blur-sm ${
                product.badge === "Installment Available"
                  ? "bg-primary/90 text-white shadow-lg shadow-primary/20"
                  : "bg-gray-900/90 text-white"
              }`}
            >
              {product.badge}
            </span>
          )}

          <span
            className={`absolute top-4 right-4 text-[10px] font-medium px-3 py-1.5 rounded-full z-10 backdrop-blur-sm ${
              product.inStock
                ? "bg-green-500/10 text-green-600 border border-green-500/20"
                : "bg-gray-500/10 text-gray-500 border border-gray-500/20"
            }`}
          >
            {product.inStock ? "● In stock" : "○ Out of stock"}
          </span>
        </div>

        <div className="p-5">
          {/* Color circles */}
          {colorsArray.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              {colorsArray
                .slice(0, 5)
                .map((c: { name: string; hex: string; image: string }) => (
                  <button
                    key={c.name}
                    className="relative group/color"
                    onMouseEnter={() => setCurrentImage(c.image)}
                    onMouseLeave={() =>
                      setCurrentImage(
                        colorsArray[0]?.image || product.gallery[0],
                      )
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImage(c.image);
                    }}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm transition-all group-hover/color:scale-110 block"
                      style={{ background: c.hex }}
                    />
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover/color:opacity-100 transition-opacity text-[8px] text-gray-500 whitespace-nowrap pointer-events-none">
                      {c.name}
                    </span>
                  </button>
                ))}
              {colorsArray.length > 5 && (
                <span className="text-[10px] text-gray-400 ml-1 bg-gray-100 px-2 py-0.5 rounded-full">
                  +{colorsArray.length - 5}
                </span>
              )}
            </div>
          )}

          <h3 className="text-base font-semibold tracking-tight text-gray-900 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
            {product.tagline}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-primary tracking-tight">
              {formatGHS(product.price)}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-gray-400 group-hover:text-primary transition-all group-hover:gap-2">
              Details
              <ChevronRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-gray-100/80 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50" />
      <div className="p-5 space-y-3">
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-3.5 w-3.5 rounded-full bg-gray-200" />
          ))}
        </div>
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-1/2 bg-gray-200 rounded" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
