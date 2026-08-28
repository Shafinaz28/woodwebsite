import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Pencil, Trash2, Plus } from "lucide-react";
import { adminDeleteProduct, adminFetchProducts } from "../../lib/admin";
import { getProductImage } from "../../lib/catalog";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await adminFetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete “${name}”?`)) return;
    try {
      await adminDeleteProduct(id);
      setProducts((list) => list.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message || "Delete failed — check Supabase RLS policies");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Products</h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            {loading ? "Loading…" : `${products.length} products in Supabase`}
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#434f23] text-white text-[11px] uppercase tracking-wider"
        >
          <Plus size={14} /> Add product
        </Link>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-700 bg-red-50 p-3">
          {error}. Make sure the `products` table exists and RLS allows admin
          writes.
        </p>
      )}

      <div className="mt-6 overflow-x-auto bg-white border border-[#eadfd3]">
        <table className="w-full text-sm text-left min-w-[720px]">
          <thead className="bg-[#f7f4ef] text-[11px] uppercase tracking-wider text-[#6B4423]">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Tag</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-[#2b1d0e]/50">
                  No products in Supabase yet. Add one or sync from your local
                  catalog.
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product.id} className="border-t border-[#eadfd3]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={getProductImage(product)}
                      alt=""
                      className="h-12 w-12 object-cover bg-[#f3ebe0]"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-[#2b1d0e]/50">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">
                  ₹{Number(product.price || 0).toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3">{product.tag || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/admin/products/${product.id}`}
                      className="p-2 border border-[#eadfd3] hover:bg-[#f7f4ef]"
                      aria-label="Edit"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(product.id, product.name)}
                      className="p-2 border border-[#eadfd3] hover:bg-red-50 text-red-700"
                      aria-label="Delete"
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
  );
}

export default AdminProducts;
