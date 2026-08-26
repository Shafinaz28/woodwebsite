import { Link } from "react-router";
import { Mail, MapPin, Phone } from "lucide-react";

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinterestIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.17 2.56 7.74 6.2 9.22-.09-.78-.16-1.98.03-2.83.17-.75 1.11-4.72 1.11-4.72s-.28-.57-.28-1.4c0-1.31.76-2.29 1.71-2.29.8 0 1.19.6 1.19 1.33 0 .81-.52 2.02-.78 3.14-.22.94.47 1.71 1.39 1.71 1.67 0 2.95-1.76 2.95-4.3 0-2.25-1.62-3.82-3.93-3.82-2.68 0-4.25 2.01-4.25 4.08 0 .81.31 1.68.7 2.15a.28.28 0 0 1 .06.27c-.07.3-.24.94-.27 1.07-.04.18-.14.22-.32.13-1.2-.56-1.95-2.31-1.95-3.72 0-3.03 2.2-5.81 6.35-5.81 3.33 0 5.92 2.37 5.92 5.54 0 3.31-2.09 5.97-4.98 5.97-.97 0-1.89-.51-2.2-1.1l-.6 2.28c-.22.84-.81 1.89-1.2 2.53A10 10 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
}

function Footer() {
  function handleSubscribe(e) {
    e.preventDefault();
  }

  return (
    <footer className="bg-[#1a120c] text-[#f5f0e8]">
      <div>
        {/* Newsletter bar */}
        <div
          className="relative border-b border-white/10 overflow-hidden bg-[#1a120c] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/products/image.png')" }}
        >
          <div className="absolute inset-0 bg-black/45 pointer-events-none" />
          <div className="relative max-w-[1500px] mx-auto px-5 md:px-10 py-10 md:py-12">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
              <div className="flex-1 w-full">
                <h2 className="font-display text-xl md:text-2xl font-semibold tracking-[0.12em] uppercase text-white">
                  Stay Updated
                </h2>
                <p className="mt-1 text-sm text-white/65 max-w-md">
                  Subscribe to get updates on new arrivals, exclusive offers and more.
                </p>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="flex w-full lg:max-w-xl items-stretch h-12 overflow-hidden"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-1 px-4 text-sm text-dark-brown outline-none bg-white placeholder:text-dark-brown/45"
                />
                <button
                  type="submit"
                  className="px-6 bg-[#8b4513] text-white text-[11px] uppercase tracking-[0.16em] hover:bg-[#6f3610] transition shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main footer columns */}
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-14 md:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
            <div>
              <Link to="/" className="inline-block">
                <img
                  src="/images/logo.png"
                  alt="Arileon"
                  className="h-14 md:h-16 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <p className="mt-5 text-sm leading-7 text-white/60">
                Crafting authentic wooden furniture that blends beauty, durability
                and functionality to bring nature closer to your home.
              </p>
              <div className="mt-6 flex gap-4 text-white/70">
                <a href="#" aria-label="Facebook" className="hover:text-white transition">
                  <FacebookIcon size={18} />
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-white transition">
                  <InstagramIcon size={18} />
                </a>
                <a href="#" aria-label="Pinterest" className="hover:text-white transition">
                  <PinterestIcon size={18} />
                </a>
                <a href="#" aria-label="YouTube" className="hover:text-white transition">
                  <YoutubeIcon size={18} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold tracking-[0.16em] uppercase mb-5 text-white">
                Quick Links
              </h3>
              <div className="flex flex-col gap-3 text-sm text-white/60">
                <Link to="/" className="hover:text-white transition">Home</Link>
                <Link to="/shop" className="hover:text-white transition">Shop</Link>
                <Link to="/about" className="hover:text-white transition">Our Story</Link>
                <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
                <Link to="/contact" className="hover:text-white transition">Track Order</Link>
                <Link to="/contact" className="hover:text-white transition">Help & Support</Link>
              </div>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold tracking-[0.16em] uppercase mb-5 text-white">
                Categories
              </h3>
              <div className="flex flex-col gap-3 text-sm text-white/60">
                <Link to="/shop?category=Living%20Room" className="hover:text-white transition">Living Room</Link>
                <Link to="/shop?category=Bedroom" className="hover:text-white transition">Bedroom</Link>
                <Link to="/shop?category=Dining" className="hover:text-white transition">Dining Room</Link>
                <Link to="/shop?category=Tables" className="hover:text-white transition">Tables</Link>
                <Link to="/shop" className="hover:text-white transition">All Furniture</Link>
              </div>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold tracking-[0.16em] uppercase mb-5 text-white">
                Customer Service
              </h3>
              <div className="flex flex-col gap-3 text-sm text-white/60">
                <Link to="/contact" className="hover:text-white transition">Shipping & Delivery</Link>
                <Link to="/contact" className="hover:text-white transition">Returns & Refunds</Link>
                <Link to="/contact" className="hover:text-white transition">Terms & Conditions</Link>
                <Link to="/contact" className="hover:text-white transition">Privacy Policy</Link>
                <Link to="/contact" className="hover:text-white transition">FAQ&apos;s</Link>
              </div>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold tracking-[0.16em] uppercase mb-5 text-white">
                Contact Us
              </h3>
              <div className="flex flex-col gap-4 text-sm text-white/60">
                <a href="tel:+919980085805" className="inline-flex items-start gap-2 hover:text-white transition">
                  <Phone size={15} className="mt-0.5 shrink-0" />
                  +91 99800 85805
                </a>
                <a href="mailto:arileoninfo@gmail.com" className="inline-flex items-start gap-2 hover:text-white transition">
                  <Mail size={15} className="mt-0.5 shrink-0" />
                  arileoninfo@gmail.com
                </a>
                <p className="inline-flex items-start gap-2">
                  <MapPin size={15} className="mt-0.5 shrink-0" />
                  <span>
                    Wood Masters, 1st Cross,
                    <br />
                    Nelagadarana Halli, Nagasandra Post,
                    <br />
                    Bengaluru 560073
                  </span>
                </p>
              </div>

              <div className="mt-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-white mb-3">
                  We Accept
                </p>
                <p className="text-xs text-white/50 tracking-wide">
                  Visa · Mastercard · RuPay · UPI
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-6 text-center">
            <p className="text-xs text-white/40">
              © 2026 Arileon Furniture. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
