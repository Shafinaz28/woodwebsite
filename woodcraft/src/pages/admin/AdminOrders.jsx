import { useEffect, useState } from "react";
import { adminFetchOrders } from "../../lib/admin";
import { Edit, X } from "lucide-react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      const remote = await adminFetchOrders();
      const local = JSON.parse(localStorage.getItem("arileon_orders") || "[]");
      if (!active) return;
      const merged = [...remote];
      for (const item of local) {
        if (!merged.some((o) => String(o.id) === String(item.id))) {
          merged.push(item);
        }
      }
      merged.sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
      );
      setOrders(merged);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  function handleEditClick(order) {
    setEditingId(order.id);
    setEditStatus(order.status || "pending");
  }

  function handleSaveStatus() {
    setOrders(
      orders.map((order) =>
        order.id === editingId ? { ...order, status: editStatus } : order
      )
    );
    // Save to localStorage
    const local = JSON.parse(localStorage.getItem("arileon_orders") || "[]");
    const updated = local.map((o) =>
      String(o.id) === String(editingId) ? { ...o, status: editStatus } : o
    );
    localStorage.setItem("arileon_orders", JSON.stringify(updated));
    setEditingId(null);
  }

  function handleCancel() {
    setEditingId(null);
    setEditStatus("");
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Orders</h1>
        <p className="mt-1 text-sm text-[#6b7280]">
          {loading ? "Loading…" : `${orders.length} orders`}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {!loading && orders.length === 0 && (
          <p className="text-sm text-[#2b1d0e]/55 bg-white border border-[#eadfd3] p-6">
            No orders yet. Complete a checkout with Razorpay to see them here.
            Run the SQL in <code>supabase/migrations/001_orders.sql</code> so
            orders save to Supabase.
          </p>
        )}

        {orders.map((order) => (
          <article
            key={order.id}
            className="bg-white border border-[#eadfd3] p-5 md:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl font-semibold">
                  {order.customer_name}
                </p>
                <p className="text-sm text-[#2b1d0e]/65 mt-1">
                  {order.customer_email} · {order.customer_phone}
                </p>
                <p className="text-sm text-[#2b1d0e]/65 mt-1">
                  {order.address}, {order.city} {order.pincode}
                </p>
              </div>
              <div className="text-right">
                {editingId === order.id ? (
                  <div className="flex flex-col gap-2">
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="border border-[#cfc5b8] px-2.5 py-1.5 text-sm rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="paid">Paid</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={handleSaveStatus}
                        className="px-3 py-1 bg-[#434f23] text-white text-xs font-semibold rounded hover:bg-[#363f1c] transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-3 py-1 bg-[#eadfd3] text-[#2b1d0e] text-xs font-semibold rounded hover:bg-[#d9c9bd] transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span
                      className={`inline-block px-2.5 py-1 text-[10px] uppercase tracking-wider ${
                        order.status === "paid"
                          ? "bg-[#434f23] text-white"
                          : "bg-[#eadfd3] text-[#2b1d0e]"
                      }`}
                    >
                      {order.status || "pending"}
                    </span>
                    <button
                      onClick={() => handleEditClick(order)}
                      className="ml-2 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#2b1d0e] border border-[#cfc5b8] rounded hover:bg-[#f9f6f1] transition"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <p className="mt-2 font-semibold">
                      ₹{Number(order.total || 0).toLocaleString("en-IN")}
                    </p>
                  </>
                )}
              </div>
            </div>

            <ul className="mt-4 text-sm space-y-1 border-t border-[#eadfd3] pt-4">
              {(order.items || []).map((item, idx) => (
                <li key={`${order.id}-${idx}`} className="flex justify-between gap-4">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>
                    ₹
                    {(
                      Number(item.price || 0) * Number(item.quantity || 0)
                    ).toLocaleString("en-IN")}
                  </span>
                </li>
              ))}
            </ul>

            {order.payment_id && (
              <p className="mt-3 text-xs text-[#2b1d0e]/50">
                Payment ID: {order.payment_id}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
