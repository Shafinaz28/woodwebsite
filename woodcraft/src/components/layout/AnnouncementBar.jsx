import { Phone, Truck, Trees, Hammer, Sparkles } from "lucide-react";

function AnnouncementBar() {
  return (
    <div className="bg-dark-brown text-background">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10 h-10 flex items-center justify-between gap-4 text-[10px] sm:text-[11px]">
        <a
          href="#shipping"
          className="hidden lg:inline-flex items-center gap-2 shrink-0 hover:text-cream transition"
        >
          <Truck size={13} strokeWidth={1.7} />
          <span>Free Delivery on orders above ₹10,000</span>
        </a>

        <div className="hidden md:flex items-center gap-4 lg:gap-6 flex-1 justify-center text-background/90">
          <span className="inline-flex items-center gap-1.5">
            <Trees size={12} strokeWidth={1.7} />
            Authentic Wood
          </span>
          <span className="text-cream/40">|</span>
          <span className="inline-flex items-center gap-1.5">
            <Hammer size={12} strokeWidth={1.7} />
            Handcrafted Quality
          </span>
          <span className="text-cream/40">|</span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles size={12} strokeWidth={1.7} />
            Timeless Design
          </span>
        </div>

        <p className="md:hidden flex-1 text-center tracking-wide">
          Free Delivery · Authentic Wood
        </p>

        <a
          href="tel:+919980085805"
          className="hidden sm:inline-flex items-center gap-2 shrink-0 hover:text-cream transition"
        >
          <Phone size={12} strokeWidth={1.75} />
          <span>Call Us: +91 99800 85805</span>
        </a>
      </div>
    </div>
  );
}

export default AnnouncementBar;
