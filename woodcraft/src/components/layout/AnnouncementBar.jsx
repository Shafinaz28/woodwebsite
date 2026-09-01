import { Phone, Truck, Trees, Hammer, Sparkles } from "lucide-react";
import SocialIcons from "./SocialIcons";

function AnnouncementBar() {
  return (
    <div data-gsap-bar className="bg-dark-brown text-background">
      <div className="mx-auto flex h-10 max-w-[1500px] items-center justify-between gap-4 px-4 text-[10px] sm:px-5 sm:text-[11px] md:px-10">
        <a
          href="#shipping"
          className="hidden shrink-0 items-center gap-2 transition hover:text-cream lg:inline-flex"
        >
          <Truck size={13} strokeWidth={1.7} />
          <span>Free Delivery Across Bengaluru</span>
        </a>

        <div className="hidden flex-1 items-center justify-center gap-4 text-background/90 md:flex lg:gap-6">
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

        <p className="flex-1 text-center tracking-wide md:hidden">
          Free Delivery · Authentic Wood
        </p>

        <div className="flex shrink-0 items-center gap-4">
          <SocialIcons
            className="hidden sm:flex"
            iconClassName="text-background hover:text-cream"
            size={15}
          />
          <a
            href="tel:+919980085805"
            className="inline-flex items-center gap-2 transition hover:text-cream"
          >
            <Phone size={12} strokeWidth={1.75} />
            <span className="hidden sm:inline">Call Us: +91 99800 85805</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementBar;
