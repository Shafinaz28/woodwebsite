import { useState } from "react";
import ProductCard from "../components/home/ProductCard";
import { products } from "../data/products";

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Chairs",
    "Sofas",
    "Tables",
    "Benches",
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <main className="bg-[#f7f5f0]">

      {/* Page Header */}
      <section className="border-b border-black/10">

        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-16 md:py-24">

          <p className="text-xs uppercase tracking-[0.25em] mb-4">
            Our Collection
          </p>

          <h1 className="text-4xl md:text-6xl font-light">
            Shop Furniture
          </h1>

          <p className="mt-5 max-w-xl text-sm md:text-base text-black/60 leading-7">
            Explore thoughtfully designed furniture crafted for
            contemporary homes and timeless spaces.
          </p>

        </div>

      </section>


      {/* Products */}
      <section className="py-12 md:py-20">

        <div className="max-w-[1500px] mx-auto px-5 md:px-10">


          {/* Filters */}
          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              justify-between
              gap-6
              mb-10
              pb-6
              border-b
              border-black/10
            "
          >

            <div className="flex gap-3 overflow-x-auto">

              {categories.map((category) => (

                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    whitespace-nowrap
                    px-5
                    py-3
                    text-xs
                    uppercase
                    tracking-[0.15em]
                    border
                    transition
                    ${
                      selectedCategory === category
                        ? "bg-black text-white border-black"
                        : "border-black/20 hover:border-black"
                    }
                  `}
                >
                  {category}
                </button>

              ))}

            </div>


            {/* Product Count */}
            <p className="text-sm text-black/50 whitespace-nowrap">
              {filteredProducts.length} Products
            </p>

          </div>


          {/* Product Grid */}
          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-x-5
              gap-y-12
              md:gap-x-7
            "
          >

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
