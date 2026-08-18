import { useRef } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { products } from "../../data/products";

function FeaturedProducts() {
  const featured = products.slice(0, 8);
  const scrollerRef = useRef(null);

  function scrollByCard(direction) {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section className="bg-background py-8 md:py-10">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10">
        <div className="relative flex items-center justify-center mb-6 md:mb-7">
          <div className="flex items-center gap-4 md:gap-6 w-full max-w-2xl mx-auto">
            <span className="flex-1 h-px bg-dark-brown/25" />
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-dark-brown uppercase text-center whitespace-nowrap">
              Featured Products
            </h2>
            <span className="flex-1 h-px bg-dark-brown/25" />
          </div>
          <Link
            to="/shop"
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:inline-flex text-xs sm:text-sm text-dark-brown/80 hover:text-dark-brown transition"
          >
            View All Products →
          </Link>
        </div>

        <div className="sm:hidden text-center mb-6">
          <Link to="/shop" className="text-xs text-dark-brown/80">
            View All Products →
          </Link>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous products"
            className="hidden md:flex absolute -left-2 lg:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-dark-brown text-white items-center justify-center hover:bg-brown transition shadow-md"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next products"
            className="hidden md:flex absolute -right-2 lg:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-dark-brown text-white items-center justify-center hover:bg-brown transition shadow-md"
          >
            <ChevronRight size={20} />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 -mx-1 px-1"
          >
            {featured.map((product) => (
              <div
                key={product.id}
                className="snap-start shrink-0 w-[70%] sm:w-[45%] lg:w-[calc(25%-15px)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
