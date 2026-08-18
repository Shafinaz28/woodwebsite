import { Link } from "react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

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

                    <p className="mt-2 text-sm">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

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
                  Subtotal
                </span>

                <span>
                  ₹{cartTotal.toLocaleString("en-IN")}
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

            </div>


            <div className="border-t border-black/10 my-7"></div>


            <div className="flex justify-between items-center">

              <span className="text-lg">
                Total
              </span>

              <span className="text-xl">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>

            </div>


            <button
              className="
                mt-8
                w-full
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
            </button>


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
