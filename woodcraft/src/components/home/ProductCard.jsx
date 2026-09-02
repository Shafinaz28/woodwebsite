import { Link, useNavigate } from "react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { getProductImage } from "../../lib/catalog";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const reviews = product.reviews ?? 128;
  const image = getProductImage(product);

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    navigate("/cart");
  }

  return (
    <div
      data-gsap-item
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-dark-brown/10 bg-cream/70 shadow-[0_1px_3px_rgba(42,24,8,0.06)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f3ebe0]">
        <Link
          to={`/product/${product.slug}`}
          className="block h-full w-full"
        >
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
          />
        </Link>

        {product.tag && (
          <span className="absolute left-2 top-2 bg-[#5c6b3a] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] text-white sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
            {product.tag}
          </span>
        )}

        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-dark-brown shadow-sm sm:right-3 sm:top-3 sm:h-9 sm:w-9"
        >
          <Heart size={14} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-2.5 pt-2 sm:p-4 sm:pt-3">
        <p className="mb-1 truncate text-[9px] uppercase tracking-[0.14em] text-[#6B4423]/80 sm:mb-1.5 sm:text-[10px]">
          {product.subcategory || product.category}
        </p>
        <Link to={`/product/${product.slug}`} className="min-w-0">
          <h3 className="font-display line-clamp-2 min-h-[2.4rem] text-sm font-bold leading-snug text-dark-brown sm:min-h-[2.75rem] sm:text-base md:text-lg">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-center gap-1 sm:mt-2.5 sm:gap-1.5">
          <div className="flex items-center gap-0.5 text-[#c4a35a]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={11} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span className="text-[10px] font-bold text-dark-brown sm:text-[11px]">
            ({reviews})
          </span>
        </div>

        <div className="mt-auto pt-3 sm:pt-4">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex h-10 w-full items-stretch overflow-hidden rounded-md bg-[#c4a574] text-dark-brown transition hover:bg-[#b89560] sm:h-11"
          >
            <span className="inline-flex h-full flex-1 items-center justify-center px-1 text-[10px] font-bold uppercase tracking-[0.1em] sm:text-[11px] sm:tracking-[0.14em]">
              <span className="sm:hidden">Add</span>
              <span className="hidden sm:inline">Add to Cart</span>
            </span>
            <span className="inline-flex h-full w-9 shrink-0 items-center justify-center border-l border-dark-brown/25 sm:w-11">
              <ShoppingCart size={15} strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
