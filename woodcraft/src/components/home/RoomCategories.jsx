import { Link } from "react-router";

import living6 from "../../assets/hero/living6.png";
import bead7 from "../../assets/hero/bead7.png";
import dining7 from "../../assets/hero/dining7.png";
import office1 from "../../assets/hero/office1.png";
import outdoor from "../../assets/hero/outdoor.png";

const rooms = [
  {
    title: "Living Room",
    image: living6,
    link: "/shop?category=Living%20Room",
  },
  {
    title: "Bedroom",
    image: bead7,
    link: "/shop?category=Bedroom",
  },
  {
    title: "Dining Room",
    image: dining7,
    link: "/shop?category=Dining",
  },
  {
    title: "Office",
    image: office1,
    link: "/shop?category=Office",
  },
  {
    title: "Outdoor",
    image: outdoor,
    link: "/shop?category=Outdoor",
  },
];

function RoomCategories() {
  return (
    <section className="bg-background py-8 md:py-10">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10">
        {/* Header: centered title with lines + view all button */}
        <div className="relative flex items-center justify-center mb-6 md:mb-7">
          <div className="flex items-center gap-4 md:gap-6 w-full max-w-xl mx-auto">
            <span className="flex-1 h-px bg-dark-brown/25" />
            <h2 className="font-display text-xl sm:text-3xl md:text-[2rem] font-bold tracking-[0.06em] sm:tracking-[0.08em] text-dark-brown uppercase text-center">
              Shop By Room
            </h2>
            <span className="flex-1 h-px bg-dark-brown/25" />
          </div>

          <Link
            to="/shop"
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-dark-brown border border-dark-brown/25 hover:border-dark-brown/50 hover:bg-dark-brown/[0.03] transition"
          >
            View All Rooms
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="sm:hidden text-center mb-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs text-dark-brown border border-dark-brown/25"
          >
            View All Rooms →
          </Link>
        </div>

        {/* Room cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {rooms.map((room, index) => (
            <Link
              key={room.title}
              to={room.link}
              className={`group block bg-cream/60 border border-dark-brown/15 overflow-hidden rounded-t-md ${
                index === rooms.length - 1 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-cream/40">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="px-3 py-4 text-center bg-cream/60">
                <h3 className="font-display text-sm font-bold tracking-[0.12em] uppercase text-dark-brown">
                  {room.title}
                </h3>
                <span className="inline-block mt-1.5 text-xs font-bold text-dark-brown group-hover:opacity-80 transition">
                  Explore Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RoomCategories;
