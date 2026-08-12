import { Link } from "react-router";
import ProductCard from "./ProductCard";
import { products } from "../../data/products";

function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="bg-white py-20 md:py-28">

      <div className="max-w-[1500px] mx-auto px-5 md:px-10">

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
              Shop By Category
            </p>

            <h2 className="text-3xl md:text-5xl font-light">
              Featured Furniture
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


        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">

          {featured.map((product) => (
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
