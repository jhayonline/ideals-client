import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Plus, Trash2, Pencil, LogOut, Tag } from "lucide-react";
import { formatGHS } from "@/lib/format";
import { api, type Product } from "@/lib/api";
import { getProductImage } from "@/lib/imageHelper";

interface EditingProduct extends Product {
  discount?: number;
  discountExpiry?: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState<EditingProduct[]>([]);
  const [editing, setEditing] = useState<EditingProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchProducts();
  }, [token, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await api.getProducts();
      if (response.success) {
        setItems(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (
    productId: string,
    patch: Partial<EditingProduct>,
  ) => {
    try {
      const response = await api.updateProduct(productId, patch, token!);
      if (response.success) {
        setItems((arr) =>
          arr.map((p) => (p.productId === productId ? { ...p, ...patch } : p)),
        );
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      setError("Failed to update product");
    }
  };

  const remove = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await api.deleteProduct(productId, token!);
      if (response.success) {
        setItems((arr) => arr.filter((p) => p.productId !== productId));
        if (editing?.productId === productId) setEditing(null);
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      setError("Failed to delete product");
    }
  };

  const addNew = () => {
    const newProduct: Partial<EditingProduct> = {
      productId: `product-${Date.now()}`,
      name: "New product",
      tagline: "Add a tagline",
      category: "iPhone",
      price: 1000,
      badge: "Installment Available",
      inStock: true,
      colors: [],
      gallery: [],
      highlights: [],
      model: "new",
    };
    setEditing(newProduct as EditingProduct);
  };

  const saveNewProduct = async () => {
    if (!editing) return;

    try {
      const response = await api.createProduct(editing, token!);
      if (response.success) {
        setItems([response.data, ...items]);
        setEditing(null);
      }
    } catch (error) {
      console.error("Failed to create product:", error);
      setError("Failed to create product");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin");
  };

  const getDisplayImage = (product: EditingProduct) => {
    try {
      // Try to get image from colors array first
      if (product.colors) {
        let colorsArray = product.colors;
        if (typeof product.colors === "string") {
          colorsArray = JSON.parse(product.colors);
        }
        if (
          Array.isArray(colorsArray) &&
          colorsArray.length > 0 &&
          colorsArray[0].image
        ) {
          return colorsArray[0].image;
        }
      }
      // Fallback to gallery
      if (product.gallery && product.gallery.length > 0 && product.gallery[0]) {
        return product.gallery[0];
      }
      // Ultimate fallback using helper
      return getProductImage(product);
    } catch {
      return getProductImage(product);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <aside className="hidden lg:flex w-64 flex-col border-r border-gray-100 bg-white">
        <div className="p-6 border-b border-gray-100">
          <span className="text-xl font-semibold tracking-tight text-primary">
            iDeals
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-1 text-sm">
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary-soft text-primary font-medium">
            <Package size={16} /> Products
          </a>
        </nav>
        <button
          onClick={handleLogout}
          className="m-4 flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900"
        >
          <LogOut size={14} /> Sign out
        </button>
      </aside>

      <main className="flex-1 bg-gray-50">
        <header className="border-b border-gray-100 bg-white px-6 sm:px-10 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {items.length} items in catalog
            </p>
          </div>
          <button
            onClick={addNew}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-primary text-white text-sm font-medium hover:opacity-90"
          >
            <Plus size={16} /> Add product
          </button>
        </header>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="p-6 sm:p-10 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="text-left px-4 py-3">Product</th>
                    <th className="text-left px-4 py-3">Price</th>
                    <th className="text-left px-4 py-3">Stock</th>
                    <th className="text-left px-4 py-3">Type</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => (
                    <tr
                      key={p.productId}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 flex items-center gap-3">
                        <img
                          src={getDisplayImage(p)}
                          alt={p.name}
                          className="h-10 w-10 rounded-lg object-contain bg-gray-50 p-1"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/src/assets/15/15-blue.jpg";
                          }}
                        />
                        <div>
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-gray-500">
                            {p.category}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={p.price}
                          onChange={(e) =>
                            updateItem(p.productId, {
                              price: Number(e.target.value),
                            })
                          }
                          className="w-24 h-8 px-2 rounded-md border border-gray-200 bg-white"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() =>
                            updateItem(p.productId, { inStock: !p.inStock })
                          }
                          className={`relative h-6 w-11 rounded-full transition ${
                            p.inStock ? "bg-primary" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                              p.inStock ? "left-5" : "left-0.5"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={p.badge ?? ""}
                          onChange={(e) =>
                            updateItem(p.productId, {
                              badge: (e.target.value || undefined) as any,
                            })
                          }
                          className="h-8 px-2 rounded-md border border-gray-200 bg-white text-xs"
                        >
                          <option value="Installment Available">
                            Installment
                          </option>
                          <option value="Cash Only">Cash only</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex gap-1">
                          <button
                            onClick={() => setEditing(p)}
                            className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-100"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => remove(p.productId)}
                            className="h-8 w-8 grid place-items-center rounded-md hover:bg-red-50 text-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded-2xl border border-gray-100 bg-white p-6 h-fit sticky top-6">
            {!editing ? (
              <div className="text-center py-10 text-sm text-gray-500">
                Select a product to edit.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Edit product</h3>
                  <div className="flex gap-2">
                    {!items.find((p) => p.productId === editing.productId) && (
                      <button
                        onClick={saveNewProduct}
                        className="text-xs bg-primary text-white px-3 py-1 rounded-full"
                      >
                        Save
                      </button>
                    )}
                    <button
                      onClick={() => setEditing(null)}
                      className="text-xs text-gray-500"
                    >
                      Close
                    </button>
                  </div>
                </div>
                <Field label="Name">
                  <input
                    value={editing.name}
                    onChange={(e) => {
                      const v = e.target.value;
                      setEditing({ ...editing, name: v });
                      if (
                        items.find((p) => p.productId === editing.productId)
                      ) {
                        updateItem(editing.productId, { name: v });
                      }
                    }}
                    className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-white"
                  />
                </Field>
                <Field label="Tagline">
                  <input
                    value={editing.tagline}
                    onChange={(e) => {
                      const v = e.target.value;
                      setEditing({ ...editing, tagline: v });
                      if (
                        items.find((p) => p.productId === editing.productId)
                      ) {
                        updateItem(editing.productId, { tagline: v });
                      }
                    }}
                    className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-white"
                  />
                </Field>
                <Field label="Price (GHS)">
                  <input
                    type="number"
                    value={editing.price}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setEditing({ ...editing, price: v });
                      if (
                        items.find((p) => p.productId === editing.productId)
                      ) {
                        updateItem(editing.productId, { price: v });
                      }
                    }}
                    className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-white"
                  />
                </Field>
                <Field label="Discount %">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={editing.discount ?? 0}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setEditing({ ...editing, discount: v });
                        if (
                          items.find((p) => p.productId === editing.productId)
                        ) {
                          updateItem(editing.productId, { discount: v });
                        }
                      }}
                      className="w-24 h-9 px-3 rounded-lg border border-gray-200 bg-white"
                    />
                    <input
                      type="date"
                      value={editing.discountExpiry ?? ""}
                      onChange={(e) => {
                        const v = e.target.value;
                        setEditing({ ...editing, discountExpiry: v });
                        if (
                          items.find((p) => p.productId === editing.productId)
                        ) {
                          updateItem(editing.productId, { discountExpiry: v });
                        }
                      }}
                      className="flex-1 h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm"
                    />
                  </div>
                </Field>
                {editing.discount ? (
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <Tag size={12} />
                    New price:{" "}
                    {formatGHS(
                      editing.price * (1 - (editing.discount ?? 0) / 100),
                    )}
                    {editing.discountExpiry &&
                      ` · until ${editing.discountExpiry}`}
                  </div>
                ) : null}
                <Field label="Status">
                  <button
                    onClick={() => {
                      const v = !editing.inStock;
                      setEditing({ ...editing, inStock: v });
                      if (
                        items.find((p) => p.productId === editing.productId)
                      ) {
                        updateItem(editing.productId, { inStock: v });
                      }
                    }}
                    className={`h-9 px-4 rounded-lg text-sm font-medium ${
                      editing.inStock
                        ? "bg-primary-soft text-primary"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {editing.inStock ? "In stock" : "Out of stock"}
                  </button>
                </Field>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs text-gray-500">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
