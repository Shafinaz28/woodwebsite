import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { adminFetchProducts, adminSetListed } from "../../lib/admin";
import { getProductImage } from "../../lib/catalog";
import { isProductListed } from "../../lib/listing";
import { AdminHeader, card, td, th } from "./adminUi.jsx";

function AdminStock() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");

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

  const listedCount = useMemo(
    () => products.filter((p) => isProductListed(p)).length,
    [products]
  );

  async function toggleListed(product) {
    const next = !isProductListed(product);
    setBusyId(String(product.id));
    try {
      await adminSetListed(product, next);
      setProducts((list) =>
        list.map((row) =>
          String(row.id) === String(product.id) ? { ...row, listed: next } : row
        )
      );
    } catch (err) {
      alert(err.message || "Could not update listing");
    } finally {
      setBusyId("");
    }
  }

  return (
    <div>
      <AdminHeader
        title="Stock"
        subtitle={
          loading
            ? "Loading…"
            : `${listedCount} listed · ${products.length - listedCount} unlisted · ${products.length} total`
        }
      />
      <p className="mb-4 text-sm text-[#6b7280]">
        Unlist hides a product from the shop. It stays in admin so you can list
        it again. It does not delete the product.
      </p>
      <div className={`${card} overflow-x-auto`}>
        <table className="w-full min-w-[720px]">
          <thead className="bg-[#f7f4ef]">
            <tr>
              <th className={th}>Product</th>
              <th className={th}>Category</th>
              <th className={th}>Status</th>
              <th className={`${th} text-right`}>Listing</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const listed = isProductListed(p);
              return (
                <tr key={p.id} className="border-t border-[#eadfd3]">
                  <td className={td}>
                    <div className="flex items-center gap-3">
                      <img
                        src={getProductImage(p)}
                        alt=""
                        className="h-10 w-10 bg-[#f3ebe0] object-cover"
                      />
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className={td}>{p.category || "—"}</td>
                  <td className={td}>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] ${
                        listed
                          ? "bg-[#dcfce7] text-[#166534]"
                          : "bg-[#f3f4f6] text-[#6b7280]"
                      }`}
                    >
                      {listed ? "Listed" : "Unlisted"}
                    </span>
                  </td>
                  <td className={`${td} text-right`}>
                    <button
                      type="button"
                      disabled={busyId === String(p.id)}
                      onClick={() => toggleListed(p)}
                      className="mr-3 text-xs uppercase tracking-wider text-[#6B4423] disabled:opacity-50"
                    >
                      {busyId === String(p.id)
                        ? "Saving…"
                        : listed
                          ? "Unlist"
                          : "List"}
                    </button>
                    <Link
                      to={`/admin/products/${p.id}`}
                      className="text-xs uppercase tracking-wider text-[#6B4423]"
                    >
                      Edit →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminStock;
