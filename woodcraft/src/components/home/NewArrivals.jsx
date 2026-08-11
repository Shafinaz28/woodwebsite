import { Link } from "react-router";
import ProductCard from "./ProductCard";

function NewArrivals() {
  const products = [
    {
      id: 5,
      name: "Aira Lounge Chair",
      category: "Lounge Chair",
      price: 42500,
      image: "/images/products/lounge-chair.jpg",
      tag: "New",
    },
    {
      id: 6,
      name: "Elara Coffee Table",
      category: "Coffee Table",
      price: 36500,
      image: "/images/products/coffee-table.jpg",
      tag: "New",
    },
    {
      id: 7,
      name: "Noah Wooden Bench",
      category: "Bench",
      price: 48500,
      image: "/images/products/bench.jpg",
      tag: "New",
    },
    {
      id: 8,
      name: "Luna Accent Table",
      category: "Side Table",
      price: 28500,
      image: "/images/products/side-table.jpg",
      tag: "New",
    },
  ];

  return (
    <section className="bg-[#f7f5f0] py-20 md:py-28">

      <div className="max-w-[1500px] mx-auto px-5 md:px-10">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">

          <p className="text-xs uppercase tracking-[0.25em] mb-4">
            Just Arrived
          </p>

          <h2 className="text-3xl md:text-5xl font-light">
            New Arrivals
          </h2>

          <p className="mt-5 text-sm md:text-base text-black/60 leading-7">
            Discover our latest furniture pieces created for modern,
            thoughtful and beautiful spaces.
          </p>

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


        {/* Button */}
        <div className="text-center mt-12">

          <Link
            to="/shop"
            className="
              inline-block
              border
              border-black
              px-8
              py-4
              text-xs
              uppercase
              tracking-[0.18em]
              hover:bg-black
              hover:text-white
              transition
              duration-300
            "
          >
            View All New Arrivals
          </Link>

        </div>

      </div>

    </section>
  );
}

export default NewArrivals;
