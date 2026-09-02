import { Link } from "react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";

function VisaMark() {
  return (
    <span className="flex h-8 w-[52px] items-center justify-center rounded-[4px] bg-[#1A1F71]">
      <span className="text-[11px] font-bold italic tracking-[0.12em] text-white">VISA</span>
    </span>
  );
}

function MastercardMark() {
  return (
    <span className="flex h-8 w-[52px] items-center justify-center rounded-[4px] bg-[#111111]">
      <svg viewBox="0 0 36 22" className="h-5 w-8" aria-hidden>
        <circle cx="13" cy="11" r="8" fill="#EB001B" />
        <circle cx="23" cy="11" r="8" fill="#F79E1B" />
      </svg>
    </span>
  );
}

function MaestroMark() {
  return (
    <span className="flex h-8 w-[52px] items-center justify-center rounded-[4px] border border-[#d8d4cc] bg-white">
      <svg viewBox="0 0 36 22" className="h-5 w-8" aria-hidden>
        <circle cx="13" cy="11" r="8" fill="#EB001B" />
        <circle cx="23" cy="11" r="8" fill="#00A2E5" />
      </svg>
    </span>
  );
}

function PaypalMark() {
  return (
    <span className="flex h-8 w-[52px] items-center justify-center rounded-[4px] border border-[#d8d4cc] bg-white">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          fill="#003087"
          d="M7.2 20.4H4.7c-.3 0-.5-.3-.4-.6L7.6 3.7c.1-.4.4-.7.8-.7h6.2c3.2 0 5.1 1.6 4.8 4.5-.3 3.3-2.7 5.1-5.9 5.1H10l-.8 4.8c0 .3-.3.5-.6.5H7.2z"
        />
        <path
          fill="#009CDE"
          d="M9.1 21.6H6.6c-.3 0-.5-.3-.4-.6l.7-4.3h3.1c.3 0 .6.2.6.5l-.7 3.9c0 .3-.3.5-.8.5z"
        />
      </svg>
    </span>
  );
}

function GooglePayMark() {
  return (
    <span className="flex h-8 w-[52px] items-center justify-center gap-0.5 rounded-[4px] border border-[#d8d4cc] bg-white px-1">
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
        <path fill="#4285F4" d="M21.6 12.23c0-.74-.07-1.45-.19-2.13H12v4.03h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.99-4.31 2.99-7.42z" />
        <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.04.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.06v2.58A10 10 0 0 0 12 22z" />
        <path fill="#FBBC05" d="M6.39 13.9A6 6 0 0 1 6.07 12c0-.66.11-1.3.32-1.9V7.52H3.06A10 10 0 0 0 2 12c0 1.61.39 3.14 1.06 4.48l3.33-2.58z" />
        <path fill="#EA4335" d="M12 5.96c1.47 0 2.79.5 3.82 1.5l2.86-2.86C16.95 2.97 14.7 2 12 2A10 10 0 0 0 3.06 7.52l3.33 2.58C7.18 7.73 9.39 5.96 12 5.96z" />
      </svg>
      <span className="text-[11px] font-medium text-[#3c4043]">Pay</span>
    </span>
  );
}

const PAYMENT_METHODS = [
  { name: "Visa", mark: VisaMark },
  { name: "Mastercard", mark: MastercardMark },
  { name: "Maestro", mark: MaestroMark },
  { name: "PayPal", mark: PaypalMark },
  { name: "Google Pay", mark: GooglePayMark },
];

function Footer() {
  return (
    <footer data-gsap-footer className="bg-[#1a120c] text-[#f5f0e8]">
      <div>
        {/* Main footer columns */}
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-10 md:py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
            <div>
              <Logo to="/" size="md" invert />
              <p className="mt-5 text-sm leading-7 text-white/60">
                Crafting authentic wooden furniture that blends beauty, durability
                and functionality to bring nature closer to your home.
              </p>
              <div className="mt-6">
                <SocialIcons
                  iconClassName="text-white/70 hover:text-white"
                  size={18}
                />
              </div>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold tracking-[0.16em] uppercase mb-5 text-white">
                Quick Links
              </h3>
              <div className="flex flex-col gap-3 text-sm text-white/60">
                <Link to="/" className="hover:text-white transition">Home</Link>
                <Link to="/shop" className="hover:text-white transition">Products</Link>
                <Link to="/about" className="hover:text-white transition">Our Story</Link>
                <Link to="/blog" className="hover:text-white transition">Blog</Link>
                <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
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
                <Link to="/returns" className="hover:text-white transition">Return Policy</Link>
                <Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link>
                <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                <Link to="/contact" className="hover:text-white transition">FAQ&apos;s</Link>
              </div>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold tracking-[0.16em] uppercase mb-5 text-white">
                Contact Us
              </h3>
              <div className="flex flex-col gap-4 text-sm text-white/60">
                <a href="tel:+919986587575" className="inline-flex items-start gap-2 hover:text-white transition">
                  <Phone size={15} className="mt-0.5 shrink-0" />
                  +91 99865 87575
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
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="flex flex-col items-center gap-3 px-5 py-4 pb-36 md:pb-8">
            <p className="text-center text-sm text-white/50">
              © Arileon 2026 All Rights Reserved.
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-2.5">
              {PAYMENT_METHODS.map(({ name, mark: Mark }) => (
                <li key={name}>
                  <Link to="/checkout" title={`Pay with ${name}`} className="block">
                    <Mark />
                    <span className="sr-only">{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
