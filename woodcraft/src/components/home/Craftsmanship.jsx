import { Link } from "react-router";

function Craftsmanship() {
  return (
    <section className="bg-[#ebe7df]">

      <div className="grid lg:grid-cols-2">

        {/* Image */}
        <div className="min-h-[450px] lg:min-h-[700px] overflow-hidden">
          <img
            src="/images/story/craftsmanship.jpg"
            alt="Furniture craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div
          className="
            flex
            items-center
            px-6
            md:px-12
            lg:px-20
            py-16
            lg:py-20
          "
        >
          <div className="max-w-xl">

            <p className="text-xs uppercase tracking-[0.25em] mb-5">
              Our Craft
            </p>

            <h2
              className="
                text-3xl
                md:text-5xl
                lg:text-6xl
                font-light
                leading-[1.08]
              "
            >
              Made with intention.
              <br />
              Built to last.
            </h2>

            <p className="mt-7 text-sm md:text-base text-black/60 leading-7">
              Every piece begins with thoughtful design and carefully
              selected materials. Our furniture brings together skilled
              craftsmanship, natural textures and timeless forms for
              spaces that feel truly personal.
            </p>

            <Link
              to="/about"
              className="
                inline-block
                mt-8
                text-xs
                uppercase
                tracking-[0.18em]
                border-b
                border-black
                pb-1
              "
            >
              Discover Our Story
            </Link>

          </div>
        </div>

      </div>

    </section>
  );
}

export default Craftsmanship;
