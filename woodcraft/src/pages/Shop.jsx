import { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ProductCard from "../components/home/ProductCard";
import { fetchCatalog, subscribeToCatalog } from "../lib/catalog";

const categories = [
  "All",
  "Living Room",
  "Bedroom",
  "Dining",
  "Tables",
];

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  const query = (searchParams.get("q") || "").trim().toLowerCase();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchCatalog().then((data) => {
      if (!active) return;
      setProducts(data);
      setLoading(false);
    });

    const unsubscribe = subscribeToCatalog((data) => {
      if (!active) return;
      setProducts(data);
      setLoading(false);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, query, products]);

  function selectCategory(category) {
    const next = new URLSearchParams(searchParams);
    if (category === "All") {
      next.delete("category");
    } else {
      next.set("category", category);
    }
    setSearchParams(next);
  }

  return (
    <main className="bg-background">
      <section className="border-b border-dark-brown/10">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-12 md:py-16">
          <p className="text-xs uppercase tracking-[0.25em] mb-4 text-dark-brown">
            Our Collection
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-dark-brown">
            Shop Furniture
          </h1>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10">
          <div className="flex gap-3 mb-8 overflow-x-auto scrollbar-none -mx-5 px-5 md:mx-0 md:px-0">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => selectCategory(category)}
                className={`px-4 sm:px-5 py-2.5 sm:py-3 text-[11px] sm:text-xs uppercase border whitespace-nowrap font-bold shrink-0 ${
                  selectedCategory === category
                    ? "bg-dark-brown text-white border-dark-brown"
                    : "border-dark-brown/25 text-dark-brown"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="mb-6 sm:mb-8 text-sm font-bold text-dark-brown">
            {loading
              ? "Loading products..."
              : `${filteredProducts.length} ${
                  filteredProducts.length === 1 ? "Product" : "Products"
                }`}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {!loading &&
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Shop;
