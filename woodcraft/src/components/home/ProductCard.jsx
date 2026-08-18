import { Link } from "react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const compareAt = Math.round(product.price * 1.18);
  const reviews = product.reviews ?? 128;

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }

  return (
    <div className="group flex flex-col h-full bg-cream/70 border border-dark-brown/10 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(42,24,8,0.06)]">
      <div className="relative overflow-hidden bg-[#f3ebe0] aspect-[4/3]">
        <Link
          to={`/product/${product.slug}`}
          className="block w-full h-full"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>

        {product.tag && (
          <span className="absolute top-3 left-3 bg-[#5c6b3a] text-white px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] font-medium">
            {product.tag}
          </span>
        )}

        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-dark-brown hover:text-wood transition shadow-sm"
        >
          <Heart size={16} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-col flex-1 p-4 pt-3">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-display text-base md:text-lg font-bold text-dark-brown line-clamp-2 min-h-[2.75rem] leading-snug">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-dark-brown">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span className="text-sm font-bold text-dark-brown/40 line-through">
            ₹{compareAt.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-[#c4a35a]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={13} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span className="text-[11px] font-bold text-dark-brown">({reviews})</span>
        </div>

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={handleAdd}
            className="w-full h-11 inline-flex items-stretch rounded-md overflow-hidden bg-[#c4a574] text-dark-brown hover:bg-[#b89560] transition"
          >
            <span className="flex-1 h-full inline-flex items-center justify-center text-[11px] uppercase tracking-[0.14em] font-bold">
              Add to Cart
            </span>
            <span className="w-11 h-full shrink-0 inline-flex items-center justify-center border-l border-dark-brown/25">
              <ShoppingCart size={16} strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
