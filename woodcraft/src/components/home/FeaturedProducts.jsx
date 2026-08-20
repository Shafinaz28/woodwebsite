import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { fetchCatalog, subscribeToCatalog } from "../../lib/catalog";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const scrollerRef = useRef(null);

  useEffect(() => {
    let active = true;

    fetchCatalog().then((data) => {
      if (active) setProducts(data);
    });

    const unsubscribe = subscribeToCatalog((data) => {
      if (active) setProducts(data);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const featured = useMemo(() => {
    const tagged = products.filter(
      (product) => product.tag === "Bestseller" || product.tag === "New"
    );
    const list = tagged.length >= 8 ? tagged : products;
    return list.slice(0, 8);
  }, [products]);

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
            <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-dark-brown uppercase text-center">
              Featured Products
            </h2>
            <span className="flex-1 h-px bg-dark-brown/25" />
          </div>
          <Link
            to="/shop"
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-dark-brown border border-dark-brown hover:bg-dark-brown/[0.03] transition"
          >
            View All Products
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="sm:hidden text-center mb-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-dark-brown border border-dark-brown"
          >
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
