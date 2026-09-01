import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  ShoppingBag,
  Heart,
  Minus,
  Plus,
} from "lucide-react";

import { fetchProductBySlug, getProductImage, subscribeToProductBySlug } from "../lib/catalog";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setQuantity(1);
      const data = await fetchProductBySlug(slug);
      if (!active) return;
      setProduct(data);
      const baseImage = data ? getProductImage(data) : "";
      setSelectedImage(baseImage);
      setLoading(false);
    }

    load();

    const unsubscribe = subscribeToProductBySlug(slug, (data) => {
      if (!active) return;
      setProduct(data);
      if (data) {
        setSelectedImage(getProductImage(data));
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-5">Product Not Found</h1>
        <Link to="/shop" className="border-b border-black">
          Back To Shop
        </Link>
      </div>
    );
  }

  const mainImage = selectedImage || getProductImage(product);
  const fallbackImage = getProductImage(product);
  const baseGallery = Array.isArray(product.images) && product.images.length > 0
    ? product.images.filter(Boolean)
    : [fallbackImage];
  const productImages = baseGallery.length === 1
    ? Array.from({ length: 4 }, () => fallbackImage)
    : baseGallery.filter(Boolean).slice(0, 4);

  return (
    <main className="bg-background">
      <section className="max-w-[1500px] mx-auto px-5 md:px-10 py-10 md:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div className="bg-[#efede8] overflow-hidden max-w-[540px] mx-auto">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-[420px] md:h-[540px] object-contain object-center"
              />
            </div>

            {productImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-[540px] mx-auto">
                {productImages.map((image, index) => (
                  <div key={`${image}-${index}`} className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      className={`block w-full overflow-hidden border bg-[#efede8] transition ${
                        selectedImage === image
                          ? "border-[#35261d]"
                          : "border-[#d7d0c7] opacity-80"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-20 md:h-24 object-contain object-center"
                      />
                    </button>
                    <p className="text-[11px] leading-4 text-[#2b1d0e] text-left font-medium opacity-0">
                      
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:py-8">
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">
              {product.subcategory
                ? `${product.category} · ${product.subcategory}`
                : product.category}
            </p>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-light mt-4 leading-tight">
              {product.name}
            </h1>

            <div className="border-t border-black/10 my-8" />

            <p className="text-sm md:text-base leading-7 text-black/60">
              {product.description}
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-start border-b border-black/10 pb-4">
                <span className="text-black/50 shrink-0">Material</span>
                <span className="sm:text-right sm:max-w-[60%]">{product.material}</span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-start border-b border-black/10 pb-4">
                <span className="text-black/50 shrink-0">Finish</span>
                <span className="sm:text-right sm:max-w-[60%]">{product.finish}</span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-start border-b border-black/10 pb-4">
                <span className="text-black/50 shrink-0">Dimensions</span>
                <span className="sm:text-right sm:max-w-[60%]">{product.dimensions}</span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-start border-b border-black/10 pb-4">
                <span className="text-black/50 shrink-0">Delivery</span>
                <span className="sm:text-right sm:max-w-[60%]">{product.delivery}</span>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.18em] mb-4">
                Quantity
              </p>
              <div className="w-[140px] h-[50px] border border-black/20 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  className="w-12 h-full flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  className="w-12 h-full flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  addToCart(product, quantity);
                  navigate("/cart");
                }}
                className="flex-1 bg-black text-white h-[56px] flex items-center justify-center gap-3 text-xs uppercase tracking-[0.18em]"
              >
                <ShoppingBag size={18} />
                Add To Cart
              </button>
              <button
                type="button"
                className="w-[56px] h-[56px] border border-black/20 flex items-center justify-center"
              >
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
