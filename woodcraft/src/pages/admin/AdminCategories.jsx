import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { adminFetchProducts } from "../../lib/admin";
import { AdminHeader, card, td, th } from "./adminUi.jsx";

function AdminCategories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    adminFetchProducts()
      .then((data) => {
        if (active) setProducts(data || []);
      })
      .catch(() => {
        if (active) setProducts([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const rows = useMemo(() => {
    const map = new Map();
    for (const p of products) {
      const name = p.category || "Uncategorised";
      map.set(name, (map.get(name) || 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [products]);

  return (
    <div>
      <AdminHeader
        title="Categories"
        subtitle={loading ? "Loading…" : `${rows.length} categories from your products`}
      />
      <div className={`${card} overflow-x-auto`}>
        <table className="w-full min-w-[480px]">
          <thead className="bg-[#f7f4ef]">
            <tr>
              <th className={th}>Category</th>
              <th className={th}>Products</th>
              <th className={`${th} text-right`}>Shop</th>
            </tr>
          </thead>
          <tbody>
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={3} className={`${td} text-[#6b7280]`}>
                  No products in Supabase yet. Add products first.
                </td>
              </tr>
            )}
            {rows.map(([name, count]) => (
              <tr key={name} className="border-t border-[#eadfd3]">
                <td className={`${td} font-medium`}>{name}</td>
                <td className={td}>{count}</td>
                <td className={`${td} text-right`}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(name)}`}
                    className="text-xs uppercase tracking-wider text-[#6B4423]"
                  >
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCategories;
