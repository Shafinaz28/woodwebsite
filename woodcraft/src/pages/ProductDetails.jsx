import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  ShoppingBag,
  Heart,
  Minus,
  Plus,
} from "lucide-react";

import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { slug } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        setProduct(data);

        if (data) {
          setSelectedImage(data.image);
        }
      }

      setLoading(false);
    }

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <p className="text-red-500">
          Error: {error}
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-5">
          Product Not Found
        </h1>

        <Link
          to="/shop"
          className="border-b border-black"
        >
          Back To Shop
        </Link>
      </div>
    );
  }

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <main className="bg-background">

      <section className="max-w-[1500px] mx-auto px-5 md:px-10 py-10 md:py-16">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Images */}
          <div>

            <div className="bg-[#efede8] overflow-hidden">

              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full aspect-[4/5] object-cover"
              />

            </div>

            {productImages.length > 1 && (

              <div className="grid grid-cols-4 gap-3 mt-4">

                {productImages.map((image, index) => (

                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`
                      overflow-hidden
                      border
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
                      className="w-full aspect-square object-cover"
                    />

                  </button>

                ))}

              </div>

            )}

          </div>


          {/* Information */}
          <div className="lg:py-8">

            <p className="text-xs uppercase tracking-[0.2em] text-black/50">
              {product.category}
            </p>

            <h1 className="text-4xl md:text-5xl font-light mt-4">
              {product.name}
            </h1>

            <p className="text-xl mt-5">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>

            <div className="border-t border-black/10 my-8" />

            <p className="text-sm md:text-base leading-7 text-black/60">
              {product.description}
            </p>


            {/* Details */}
            <div className="mt-8 space-y-4 text-sm">

              <div className="flex justify-between border-b border-black/10 pb-4">
                <span className="text-black/50">
                  Material
                </span>

                <span>
                  {product.material}
                </span>
              </div>

              <div className="flex justify-between border-b border-black/10 pb-4">
                <span className="text-black/50">
                  Finish
                </span>

                <span>
                  {product.finish}
                </span>
              </div>

              <div className="flex justify-between border-b border-black/10 pb-4">
                <span className="text-black/50">
                  Dimensions
                </span>

                <span>
                  {product.dimensions}
                </span>
              </div>

              <div className="flex justify-between border-b border-black/10 pb-4">
                <span className="text-black/50">
                  Delivery
                </span>

                <span>
                  {product.delivery}
                </span>
              </div>

            </div>


            {/* Quantity */}
            <div className="mt-10">

              <p className="text-xs uppercase tracking-[0.18em] mb-4">
                Quantity
              </p>

              <div className="w-[140px] h-[50px] border border-black/20 flex items-center justify-between">

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

                <span>
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
            <div className="mt-8 flex gap-3">

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
                "
              >
                <ShoppingBag size={18} />

                Add To Cart
              </button>

              <button className="w-[56px] h-[56px] border border-black/20 flex items-center justify-center">
                <Heart size={19} />
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default ProductDetails;
