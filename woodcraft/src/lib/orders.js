import { isSupabaseConfigured, supabase } from "./supabase";

export async function createOrder(order) {
  const payload = {
    customer_name: order.customer_name,
    customer_email: order.customer_email,
    customer_phone: order.customer_phone,
    address: order.address,
    city: order.city,
    pincode: order.pincode,
    items: order.items,
    subtotal: order.subtotal,
    total: order.total,
    status: order.status || "pending",
    payment_id: order.payment_id || null,
    payment_method: order.payment_method || "razorpay",
  };

  if (!isSupabaseConfigured) {
    const localId = `local-${Date.now()}`;
    const saved = { id: localId, ...payload, created_at: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("arileon_orders") || "[]");
    existing.unshift(saved);
    localStorage.setItem("arileon_orders", JSON.stringify(existing));
    return saved;
  }

  const { data, error } = await supabase
    .from("orders")
    .insert(payload)
    .select()
    .single();

  if (error) {
    // Fallback so checkout still works before SQL migration is applied
    console.warn("Order insert failed, using local fallback:", error.message);
    const localId = `local-${Date.now()}`;
    const saved = { id: localId, ...payload, created_at: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("arileon_orders") || "[]");
    existing.unshift(saved);
    localStorage.setItem("arileon_orders", JSON.stringify(existing));
    return saved;
  }

  return data;
}

export async function markOrderPaid(orderId, paymentId) {
  if (!isSupabaseConfigured || String(orderId).startsWith("local-")) {
    const existing = JSON.parse(localStorage.getItem("arileon_orders") || "[]");
    const next = existing.map((o) =>
      o.id === orderId
        ? { ...o, status: "paid", payment_id: paymentId }
        : o
    );
    localStorage.setItem("arileon_orders", JSON.stringify(next));
    return next.find((o) => o.id === orderId);
  }

  const { data, error } = await supabase
    .from("orders")
    .update({ status: "paid", payment_id: paymentId })
    .eq("id", orderId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
