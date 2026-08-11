import { Link } from "react-router";
import ProductCard from "./ProductCard";

function FeaturedProducts() {

  const products = [
    {
      id: 1,
      name: "Aria Lounge Chair",
      category: "Lounge Chair",
      price: 48500,
      image: "/images/products/chair-1.jpg",
      tag: "New",
    },

    {
      id: 2,
      name: "Mira Wooden Sofa",
      category: "Sofa",
      price: 125000,
      image: "/images/products/sofa-1.jpg",
      tag: "Bestseller",
    },

    {
      id: 3,
      name: "Aster Dining Table",
      category: "Dining Table",
      price: 89500,
      image: "/images/products/table-1.jpg",
    },

    {
      id: 4,
      name: "Niva Accent Chair",
      category: "Accent Chair",
      price: 38000,
      image: "/images/products/chair-2.jpg",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">

      <div className="max-w-[1500px] mx-auto px-5 md:px-10">

        {/* Heading */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-end
            justify-between
            gap-6
            mb-12
          "
        >

          <div>

            <p className="text-xs uppercase tracking-[0.25em] mb-4">
              Our Collection
            </p>

            <h2 className="text-3xl md:text-5xl font-light">
              Most Loved Pieces
            </h2>

            <p className="mt-4 max-w-xl text-sm md:text-base text-black/60 leading-7">
              Explore furniture designed with thoughtful details,
              natural materials and timeless craftsmanship.
            </p>

          </div>

          <Link
            to="/shop"
            className="
              text-xs
              uppercase
              tracking-[0.18em]
              border-b
              border-black
              pb-1
              w-fit
            "
          >
            View All Products
          </Link>

        </div>


        {/* Products */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedProducts;
