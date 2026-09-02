import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

function InspirationRow() {
  const rooms = [
    {
      title: "Warm Living Room Furniture Styles",
      image: "/images/products/living-room/living12.avif",
    },
    {
      title: "Modern Dining Room Furniture Styles",
      image: "/images/products/dining/dining1.avif",
    },
    {
      title: "Calm Bedroom Furniture Styles",
      image: "/images/products/bedroom/bead13.avif",
    },
    {
      title: "Coffee Table & Side Table Styles",
      image: "/images/products/tables/table1.avif",
    },
  ];

  return (
    <section className="bg-white py-14 md:py-24">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10">

        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-wood-soft mb-3">
            Inspiration
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-wood-deep">
            Room Inspiration
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
              <div className="relative aspect-[5/4] sm:aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f5f1ea] flex items-center justify-center p-3 sm:p-4">
                <img
                  src={room.image}
                  alt={room.title}
                  className="max-h-full max-w-full h-auto w-auto object-contain transition duration-700 group-hover:scale-105"
                />
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
