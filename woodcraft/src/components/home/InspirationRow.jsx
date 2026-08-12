import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

function InspirationRow() {
  const rooms = [
    {
      title: "Explore Workspace Product Styles",
      image: "/images/products/office/office1.png",
    },
    {
      title: "Modern Dining Room Furniture Styles",
      image: "/images/products/dining/dining1.png",
    },
    {
      title: "Calm Bedroom Furniture Styles",
      image: "/images/products/bedroom/bead2.png",
    },
    {
      title: "Warm Living Room Furniture Styles",
      image: "/images/products/living-room/living1.png",
    },
  ];

  return (
    <section className="bg-white py-14 md:py-24">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10">

        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-wood-soft mb-3">
            Trending Space
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-wood-deep">
            Trending Space Inspiration
          </h2>
        </div>

        {/* Mobile: vertical stacked rounded cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {rooms.map((room) => (
            <Link
              key={room.title}
              to="/shop"
              className="group block"
            >
              <div className="relative aspect-[5/4] sm:aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-3xl">
                <img
                  src={room.image}
                  alt={room.title}
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition" />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <h3 className="text-base sm:text-lg font-medium text-wood-deep">
                  {room.title}
                </h3>
                <ArrowRight size={18} className="shrink-0 text-wood" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default InspirationRow;
