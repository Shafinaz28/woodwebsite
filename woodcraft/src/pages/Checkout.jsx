import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { createOrder, markOrderPaid } from "../lib/orders";
import { openRazorpayCheckout } from "../lib/razorpay";
import { validateCoupon } from "../lib/coupons";

function Checkout() {
  const {
    cart,
    cartTotal,
    discount,
    payableTotal,
    appliedCoupon,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Bengaluru",
    pincode: "",
  });

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handlePay(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const items = cart.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    if (appliedCoupon) {
      const check = validateCoupon(appliedCoupon.code, cartTotal);
      if (!check.ok) {
        setError(check.error || "This coupon is no longer valid.");
        setSubmitting(false);
        return;
      }
    }

    try {
      const order = await createOrder({
        customer_name: form.name.trim(),
        customer_email: form.email.trim(),
        customer_phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        pincode: form.pincode.trim(),
        items,
        subtotal: cartTotal,
        total: payableTotal,
        status: "pending",
        payment_method: "razorpay",
      });

      const payment = await openRazorpayCheckout({
        amountInr: payableTotal,
        orderId: order.id,
        customer: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        },
      });

      await markOrderPaid(order.id, payment.razorpay_payment_id);
      clearCart();
      navigate(`/order-success?id=${encodeURIComponent(order.id)}&payment=${encodeURIComponent(payment.razorpay_payment_id)}`);
    } catch (err) {
      setError(err.message || "Checkout failed");
    } finally {
      setSubmitting(false);
    }
  }

  const field =
    "mt-2 w-full border border-[#eadfd3] bg-white px-4 py-3 text-sm outline-none focus:border-[#6B4423]/50";

  return (
    <main className="bg-[#f7f4ef] min-h-screen text-[#2b1d0e]">
      <section data-gsap-block className="max-w-[1100px] mx-auto px-5 md:px-10 py-12 md:py-16">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#6B4423]">
          Checkout
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold mt-2">
          Shipping & payment
        </h1>

        <div className="mt-10 grid lg:grid-cols-[1fr_340px] gap-10">
          <form onSubmit={handlePay} className="bg-white border border-[#eadfd3] p-6 md:p-8 space-y-5">
            {error && (
              <p className="text-sm text-red-700 bg-red-50 p-3">{error}</p>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="text-[11px] uppercase tracking-wider text-[#6B4423]">
                  Full name
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={field}
                />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-wider text-[#6B4423]">
                  Phone
                </span>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={field}
                />
              </label>
            </div>

            <label className="block">
              <span className="text-[11px] uppercase tracking-wider text-[#6B4423]">
                Email
              </span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={field}
              />
            </label>

            <label className="block">
              <span className="text-[11px] uppercase tracking-wider text-[#6B4423]">
                Address
              </span>
              <textarea
                required
                rows={3}
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className={`${field} resize-y`}
              />
            </label>

            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="text-[11px] uppercase tracking-wider text-[#6B4423]">
                  City
                </span>
                <input
                  required
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className={field}
                />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-wider text-[#6B4423]">
                  Pincode
                </span>
                <input
                  required
                  value={form.pincode}
                  onChange={(e) => update("pincode", e.target.value)}
                  className={field}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-[#434f23] text-white text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-[#363f1c] disabled:opacity-50"
            >
              {submitting ? "Processing…" : "Pay"}
            </button>
          </form>

          <aside className="bg-white border border-[#eadfd3] p-6 h-fit">
            <h2 className="font-display text-2xl font-semibold">Order summary</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between gap-3">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-[#eadfd3] mt-5 pt-5 text-sm space-y-2">
              <div className="flex justify-between text-[#3a2a1c]/70">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#434f23]">
                  <span>Coupon {appliedCoupon?.code}</span>
                  <span>−₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between font-medium text-[#2b1d0e]">
                <span>To pay</span>
                <span>₹{payableTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <Link
              to="/cart"
              className="mt-5 block text-center text-xs uppercase tracking-wider text-[#6B4423]"
            >
              Back to cart
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Checkout;
