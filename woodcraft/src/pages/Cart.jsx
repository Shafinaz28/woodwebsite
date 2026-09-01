import { useState } from "react";
import { Link } from "react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartCount,
    cartTotal,
    coupon,
    applyCoupon,
    removeCoupon,
    discount,
    payableTotal,
  } = useCart();
  const [code, setCode] = useState("");
  const [couponError, setCouponError] = useState("");

  function handleApplyCoupon(e) {
    e.preventDefault();
    setCouponError("");
    try {
      applyCoupon(code);
      setCode("");
    } catch (err) {
      setCouponError(
        err.message === "Invalid or inactive coupon code"
          ? "Code not found. Create it in Admin → Coupons, or try WELCOME10."
          : err.message || "Could not apply coupon"
      );
    }
  }

  if (cart.length === 0) {
    return (
      <section className="min-h-[600px] flex flex-col items-center justify-center px-5">

        <h1 className="text-4xl md:text-5xl font-light">
          Your Cart Is Empty
        </h1>

        <p className="mt-4 text-black/50">
          Discover furniture crafted for your space.
        </p>

        <Link
          to="/shop"
          className="
            mt-8
            bg-black
            text-white
            px-8
            py-4
            text-xs
            uppercase
            tracking-[0.18em]
          "
        >
          Continue Shopping
        </Link>

      </section>
    );
  }

  return (
    <main className="bg-background min-h-screen">

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-12 md:py-20">

        {/* Heading */}

        <div className="mb-12">

          <p className="text-xs uppercase tracking-[0.25em] mb-3">
            Shopping Bag
          </p>

          <h1 className="text-4xl md:text-6xl font-light">
            Your Cart
          </h1>

        </div>


        <div className="grid lg:grid-cols-[1fr_400px] gap-12">

          {/* Cart Items */}

          <div>

            {cart.map((item) => (

              <div
                key={item.id}
                className="
                  grid
                  grid-cols-[110px_1fr]
                  md:grid-cols-[160px_1fr]
                  gap-5
                  py-6
                  border-b
                  border-black/10
                "
              >

                {/* Image */}

                <Link to={`/product/${item.slug}`}>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-full
                      aspect-square
                      object-contain
                      bg-[#ebe8e1]
                    "
                  />

                </Link>


                {/* Information */}

                <div className="flex flex-col justify-between">

                  <div>

                    <p className="text-xs uppercase tracking-[0.15em] text-black/40">
                      {item.category}
                    </p>

                    <Link to={`/product/${item.slug}`}>

                      <h2 className="text-lg md:text-xl font-light mt-2">
                        {item.name}
                      </h2>

                    </Link>

                  </div>


                  <div className="flex items-center justify-between mt-6">

                    {/* Quantity */}

                    <div
                      className="
                        flex
                        items-center
                        border
                        border-black/20
                        h-[42px]
                      "
                    >

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity === 1}
                        className="
                          w-10
                          h-full
                          flex
                          items-center
                          justify-center
                          disabled:opacity-30
                        "
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        className="
                          w-10
                          h-full
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Plus size={14} />
                      </button>

                    </div>


                    {/* Remove */}

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-black/50 hover:text-black transition"
                      aria-label={`Remove ${item.name}`}
                    >

                      <Trash2 size={18} />

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* Order Summary */}

          <aside className="bg-cream/40 border border-dark-brown/15 p-7 md:p-9 h-fit">

            <h2 className="text-2xl font-light">
              Order Summary
            </h2>


            <div className="mt-8 space-y-5">

              <div className="flex justify-between text-sm">

                <span className="text-black/50">
                  Items
                </span>

                <span>
                  {cartCount}
                </span>

              </div>


              <div className="flex justify-between text-sm">

                <span className="text-black/50">
                  Shipping
                </span>

                <span>
                  Calculated at checkout
                </span>

              </div>

              <form onSubmit={handleApplyCoupon} className="pt-2">
                <p className="text-xs uppercase tracking-[0.15em] text-black/45 mb-2">
                  Coupon code
                </p>
                <div className="flex gap-2">
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="WELCOME10"
                    className="min-w-0 flex-1 border border-black/20 bg-white px-3 py-2 text-sm outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-[#434f23] px-4 py-2 text-[11px] uppercase tracking-wider text-white"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="mt-2 text-xs text-red-700">{couponError}</p>
                )}
                {coupon && (
                  <div className="mt-2 flex items-center justify-between text-sm text-[#434f23]">
                    <span>
                      {coupon.code} · {coupon.percent}% off
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs uppercase tracking-wider text-black/50"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-black/50">Discount</span>
                  <span>−₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}

              {cartTotal > 0 && (
                <div className="flex justify-between text-sm font-medium">
                  <span>To pay</span>
                  <span>₹{payableTotal.toLocaleString("en-IN")}</span>
                </div>
              )}

            </div>


            <div className="border-t border-black/10 my-7"></div>


            <p className="text-sm text-black/55 leading-6">
              Pricing is confirmed with our team at checkout.
            </p>


            <Link
              to="/checkout"
              className="
                mt-8
                w-full
                inline-flex
                items-center
                justify-center
                bg-black
                text-white
                py-5
                text-xs
                uppercase
                tracking-[0.18em]
                hover:bg-black/80
                transition
              "
            >
              Proceed To Checkout
            </Link>


            <Link
              to="/shop"
              className="
                block
                text-center
                mt-6
                text-xs
                uppercase
                tracking-[0.15em]
                border-b
                border-black
                w-fit
                mx-auto
              "
            >
              Continue Shopping
            </Link>

          </aside>

        </div>

      </div>

    </main>
  );
}

export default Cart;
