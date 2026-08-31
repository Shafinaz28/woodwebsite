import { useEffect, useMemo, useState } from "react";
import { adminFetchOrders } from "../../lib/admin";
import { AdminHeader, card, td, th } from "./adminUi.jsx";

function mergeOrders(remote = []) {
  const local = JSON.parse(localStorage.getItem("arileon_orders") || "[]");
  const merged = [...remote];
  for (const item of local) {
    if (!merged.some((o) => String(o.id) === String(item.id))) merged.push(item);
  }
  return merged;
}

function AdminCustomers() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    adminFetchOrders()
      .then((remote) => {
        if (active) setOrders(mergeOrders(remote));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const customers = useMemo(() => {
    const map = new Map();
    for (const o of orders) {
      const key = (o.customer_email || o.customer_phone || o.id || "").toLowerCase();
      if (!key) continue;
      const prev = map.get(key) || {
        name: o.customer_name,
        email: o.customer_email,
        phone: o.customer_phone,
        orders: 0,
        spent: 0,
      };
      prev.orders += 1;
      prev.spent += Number(o.total || 0);
      if (!prev.name) prev.name = o.customer_name;
      map.set(key, prev);
    }
    return [...map.values()].sort((a, b) => b.spent - a.spent);
  }, [orders]);

  return (
    <div>
      <AdminHeader
        title="Customers"
        subtitle={loading ? "Loading…" : `${customers.length} customers from orders`}
      />
      <div className={`${card} overflow-x-auto`}>
        <table className="w-full min-w-[640px]">
          <thead className="bg-[#f7f4ef]">
            <tr>
              <th className={th}>Name</th>
              <th className={th}>Email</th>
              <th className={th}>Phone</th>
              <th className={th}>Orders</th>
              <th className={th}>Spent</th>
            </tr>
          </thead>
          <tbody>
            {!loading && customers.length === 0 && (
              <tr>
                <td colSpan={5} className={`${td} text-[#6b7280]`}>
                  No customers yet. They appear after checkout.
                </td>
              </tr>
            )}
            {customers.map((c) => (
              <tr key={c.email || c.phone} className="border-t border-[#eadfd3]">
                <td className={`${td} font-medium`}>{c.name || "—"}</td>
                <td className={td}>{c.email || "—"}</td>
                <td className={td}>{c.phone || "—"}</td>
                <td className={td}>{c.orders}</td>
                <td className={td}>₹{c.spent.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCustomers;
