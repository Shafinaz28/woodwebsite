import { useEffect, useState } from "react";
import { Link } from "react-router";
import { adminFetchProducts } from "../../lib/admin";
import { getProductImage } from "../../lib/catalog";
import { AdminHeader, card, td, th } from "./adminUi.jsx";

function AdminStock() {
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

  return (
    <div>
      <AdminHeader
        title="Stock"
        subtitle={
          loading
            ? "Loading…"
            : `${products.length} products. Quantity is not stored in Supabase yet — edit a product to manage listing.`
        }
      />
      <div className={`${card} overflow-x-auto`}>
        <table className="w-full min-w-[640px]">
          <thead className="bg-[#f7f4ef]">
            <tr>
              <th className={th}>Product</th>
              <th className={th}>Category</th>
              <th className={th}>Status</th>
              <th className={th} />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-[#eadfd3]">
                <td className={td}>
                  <div className="flex items-center gap-3">
                    <img
                      src={getProductImage(p)}
                      alt=""
                      className="h-10 w-10 object-cover bg-[#f3ebe0]"
                    />
                    <span className="font-medium">{p.name}</span>
                  </div>
                </td>
                <td className={td}>{p.category || "—"}</td>
                <td className={td}>
                  <span className="rounded-full bg-[#dcfce7] px-2 py-0.5 text-[11px] text-[#166534]">
                    Listed
                  </span>
                </td>
                <td className={`${td} text-right`}>
                  <Link
                    to={`/admin/products/${p.id}`}
                    className="text-xs uppercase tracking-wider text-[#6B4423]"
                  >
                    Edit →
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

export default AdminStock;
