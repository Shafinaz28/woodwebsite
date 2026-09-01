import { Link } from "react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

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
  return (
    <footer className="bg-[#1a120c] text-[#f5f0e8]">
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
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="flex flex-col items-center gap-3 px-5 py-4 pb-20 md:pb-6">
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
