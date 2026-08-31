import { useEffect, useState } from "react";
import { Link } from "react-router";
import { adminFetchProducts } from "../../lib/admin";
import { getProductImage } from "../../lib/catalog";
import { AdminHeader } from "./adminUi.jsx";

function AdminMedia() {
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
        title="Media"
        subtitle={
          loading
            ? "Loading…"
            : `${products.length} product images. Upload more from Products → Edit.`
        }
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/admin/products/${p.id}`}
            className="overflow-hidden border border-[#eadfd3] bg-white"
          >
            <div className="aspect-square bg-[#f3ebe0]">
              <img
                src={getProductImage(p)}
                alt={p.name}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="truncate px-2 py-2 text-xs text-[#6b7280]">{p.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminMedia;
