import { Link } from "react-router";
import { Heart } from "lucide-react";

function ProductCard({ product }) {
  return (
    <div className="group">

      <div className="relative overflow-hidden bg-[#efede8] aspect-[4/5]">

        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="
              w-full
              h-full
              object-cover
              transition
              duration-700
              group-hover:scale-105
            "
          />
        </Link>

        {/* Wishlist */}
        <button
          className="
            absolute
            top-4
            right-4
            w-9
            h-9
            bg-white
            rounded-full
            flex
            items-center
            justify-center
            opacity-0
            group-hover:opacity-100
            transition
          "
        >
          <Heart size={17} strokeWidth={1.5} />
        </button>

        {/* Product Tag */}
        {product.tag && (
          <span
            className="
              absolute
              top-4
              left-4
              bg-white
              px-3
              py-2
              text-[10px]
              uppercase
              tracking-[0.15em]
            "
          >
            {product.tag}
          </span>
        )}

      </div>

      <div className="pt-4">

        <p className="text-[11px] uppercase tracking-[0.15em] text-black/50">
          {product.category}
        </p>

        <h3 className="mt-2 text-base md:text-lg font-light">
          {product.name}
        </h3>

        <p className="mt-2 text-sm">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

      </div>

    </div>
  );
}

export default ProductCard;
