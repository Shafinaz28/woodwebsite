import { useEffect, useState } from "react";
import ProductCard from "../components/home/ProductCard";
import { supabase } from "../lib/supabase";

function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    "All",
    "Chairs",
    "Sofas",
    "Tables",
    "Benches",
  ];

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    }

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <p>Loading products...</p>
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

  return (
    <main className="bg-background">

m      <section className="border-b border-black/10">

        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-16 md:py-24">

          <p className="text-xs uppercase tracking-[0.25em] mb-4">
            Our Collection
          </p>

          <h1 className="text-4xl md:text-6xl font-light">
            Shop Furniture
          </h1>

        </div>

      </section>

      <section className="py-12 md:py-20">

        <div className="max-w-[1500px] mx-auto px-5 md:px-10">

          <div className="flex gap-3 mb-10 overflow-x-auto">

            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`
                  px-5
                  py-3
                  text-xs
                  uppercase
                  border
                  whitespace-nowrap
                  ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "border-black/20"
                  }
                `}
              >
                {category}
              </button>
            ))}

          </div>

          <p className="mb-8 text-sm text-black/50">
            {filteredProducts.length} Products
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}

export default Shop;
