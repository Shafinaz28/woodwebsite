import { Link } from "react-router";
import { Star } from "lucide-react";
import { products } from "../../data/products";

function NewArrivals() {
  const items = products.filter((product) => product.tag === "New").slice(0, 4);

  const list =
    items.length >= 4
      ? items
      : products.slice(0, 4);

  return (
    <section className="bg-[#faf8f4] py-14 md:py-24">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10">

        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-wood-soft mb-3">
            New Arrivals
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-wood-deep">
            Discover Our Newest Arrivals
          </h2>
          <p className="mt-4 text-sm md:text-base text-wood-muted leading-7">
            Fresh pieces in natural wood and soft textures for modern homes.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-7">
          {list.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="group"
            >
              <div className="bg-[#efede8] rounded-2xl overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="pt-4">
                <h3 className="text-sm sm:text-base font-medium text-wood-deep line-clamp-2">
                  {product.name}
                </h3>

                <div className="mt-2 flex items-center gap-0.5 text-[#c4a35a]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={12}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                <p className="mt-2 text-sm font-medium text-wood-deep">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="text-sm text-wood-deep border-b border-wood-deep pb-1"
          >
            Best and awesome furniture products. View All Products
          </Link>
        </div>

      </div>
    </section>
  );
}

export default NewArrivals;
