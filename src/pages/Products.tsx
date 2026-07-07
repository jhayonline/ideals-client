import { useState } from "react";
import { products, type Product } from "@/data/products";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import { Search, Filter, Grid, List } from "lucide-react";

const categories: Array<Product["category"] | "All"> = [
  "All",
  "iPhone",
  "Accessory",
  "Watch",
];

export default function Products() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const items = products.filter((p) => {
    const matchesCategory = cat === "All" || p.category === cat;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category: (typeof categories)[number]) => {
    setLoading(true);
    setCat(category);
    setTimeout(() => setLoading(false), 300);
  };

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-24">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900">
          Shop.
        </h1>
        <p className="mt-3 text-gray-400 leading-relaxed">
          Premium devices. Flexible payment. Backed by the iDeals warranty.
        </p>
      </div>

      {/* Search and filters */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-4 rounded-full border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => handleCategoryChange(c)}
            className={`shrink-0 h-10 px-5 rounded-full text-sm font-medium transition-all ${
              cat === c
                ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20"
                : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mt-6 text-sm text-gray-400">
        Showing {items.length} {items.length === 1 ? "product" : "products"}
      </div>

      {/* Product grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
      </div>

      {!loading && items.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900">
            No products found
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </section>
  );
}
