import { useState } from "react";
import { useParams, Link } from "react-router";
import { products } from "../data/products";
import {
  ShoppingBag,
  Heart,
  Minus,
  Plus,
} from "lucide-react";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { slug } = useParams();

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (item) => item.slug === slug
  );

  const productImages = product?.images || [product?.image];

  const [selectedImage, setSelectedImage] = useState(
    productImages[0]
  );

  if (!product) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-4">
          Product Not Found
        </h1>

        <Link
          to="/shop"
          className="border-b border-black"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-[#f7f5f0]">

      <section className="max-w-[1500px] mx-auto px-5 md:px-10 py-10 md:py-16">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Product Image Gallery */}
          <div>

            {/* Main Image */}
            <div className="bg-[#efede8] overflow-hidden">

              <img
                src={selectedImage}
                alt={product.name}
                className="
                  w-full
                  aspect-[4/5]
                  object-cover
                  transition
                  duration-300
                "
              />

            </div>


            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3 mt-4">

              {productImages.map((image, index) => (

                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`
                    overflow-hidden
                    border
                    transition
                    ${
                      selectedImage === image
                        ? "border-black"
                        : "border-transparent"
                    }
                  `}
                >

                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="
                      w-full
                      aspect-square
                      object-cover
                    "
                  />

                </button>

              ))}

            </div>

          </div>


          {/* Product Information */}
          <div className="lg:py-8">

            <p className="text-xs uppercase tracking-[0.2em] text-black/50">
              {product.category}
            </p>

            <h1 className="text-4xl md:text-5xl font-light mt-4">
              {product.name}
            </h1>

            <p className="text-xl mt-5">
              ₹{product.price.toLocaleString("en-IN")}
            </p>


            {/* Divider */}
            <div className="border-t border-black/10 my-8"></div>


            {/* Description */}
            <p className="text-sm md:text-base leading-7 text-black/60 max-w-xl">
              {product.description ||
                "Thoughtfully designed furniture crafted with premium materials and timeless details."}
            </p>


            {/* Product Details */}
            <div className="mt-8 space-y-4 text-sm">

              <div className="flex justify-between border-b border-black/10 pb-4">
                <span className="text-black/50">
                  Material
                </span>

                <span>
                  {product.material || "Solid Wood"}
                </span>
              </div>


              <div className="flex justify-between border-b border-black/10 pb-4">
                <span className="text-black/50">
                  Finish
                </span>

                <span>
                  {product.finish || "Natural Finish"}
                </span>
              </div>


              <div className="flex justify-between border-b border-black/10 pb-4">
                <span className="text-black/50">
                  Dimensions
                </span>

                <span className="text-right">
                  {product.dimensions || "Custom dimensions"}
                </span>
              </div>


              <div className="flex justify-between border-b border-black/10 pb-4">
                <span className="text-black/50">
                  Delivery
                </span>

                <span>
                  {product.delivery || "3–5 Weeks"}
                </span>
              </div>

            </div>


            {/* Quantity */}
            <div className="mt-10">

              <p className="text-xs uppercase tracking-[0.18em] mb-4">
                Quantity
              </p>

              <div
                className="
                  w-[140px]
                  h-[50px]
                  border
                  border-black/20
                  flex
                  items-center
                  justify-between
                "
              >

                <button
                  onClick={() =>
                    setQuantity((current) =>
                      Math.max(1, current - 1)
                    )
                  }
                  className="w-12 h-full flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>

                <span className="text-sm">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((current) => current + 1)
                  }
                  className="w-12 h-full flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>

              </div>

            </div>


            {/* Buttons */}
            <div className="mt-10 flex gap-3">

              <button
                onClick={() => addToCart(product, quantity)}
                className="
                  flex-1
                  bg-black
                  text-white
                  h-[56px]
                  flex
                  items-center
                  justify-center
                  gap-3
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  hover:bg-black/80
                  transition
                "
              >
                <ShoppingBag size={18} />

                Add To Cart
              </button>


              <button
                className="
                  w-[56px]
                  h-[56px]
                  border
                  border-black/20
                  flex
                  items-center
                  justify-center
                  hover:bg-black
                  hover:text-white
                  transition
                "
              >
                <Heart size={19} />
              </button>

            </div>


            {/* Back Link */}
            <Link
              to="/shop"
              className="
                inline-block
                mt-8
                text-xs
                uppercase
                tracking-[0.15em]
                border-b
                border-black
              "
            >
              Back To Collection
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default ProductDetails;
