import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

function InstagramIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="bg-[#25241f] text-white">

      <div className="max-w-[1500px] mx-auto px-6 md:px-10 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Section */}
          <div className="lg:col-span-2">

            <Link to="/" className="inline-block">
              <img
                src="/images/logo.png"
                alt="Arileon"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
              Thoughtfully designed furniture crafted for modern homes,
              timeless interiors and comfortable living.
            </p>

            <div className="mt-8 max-w-md">

              <p className="text-xs uppercase tracking-[0.2em] mb-4">
                Join Our Newsletter
              </p>

              <div className="flex border-b border-white/30">

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    flex-1
                    bg-transparent
                    outline-none
                    py-3
                    text-sm
                    placeholder:text-white/40
                  "
                />

                <button>
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>


          {/* Shop */}
          <div>

            <h3 className="text-xs uppercase tracking-[0.2em] mb-5">
              Shop
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/60">

              <Link to="#">Sofas</Link>

              <Link to="#">Chairs</Link>

              <Link to="#">Tables</Link>

              <Link to="#">Beds</Link>

              <Link to="#">Outdoor</Link>

            </div>

          </div>


          {/* Company */}
          <div>

            <h3 className="text-xs uppercase tracking-[0.2em] mb-5">
              Company
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/60">

              <Link to="/about">Our Story</Link>

              <Link to="/about">Craftsmanship</Link>

              <Link to="/shop">Shop</Link>

              <Link to="/contact">Contact</Link>

            </div>

          </div>


          {/* Support */}
          <div>

            <h3 className="text-xs uppercase tracking-[0.2em] mb-5">
              Support
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/60">

              <Link to="#">Shipping</Link>

              <Link to="#">Returns</Link>

              <Link to="#">Warranty</Link>

              <Link to="#">FAQ</Link>

            </div>

          </div>

        </div>


        {/* Bottom Footer */}

        <div className="
          border-t
          border-white/10
          mt-14
          pt-6
          flex
          flex-col
          md:flex-row
          gap-4
          justify-between
          items-center
        ">

          <p className="text-xs text-white/40">
            © 2026 Arileon. All Rights Reserved.
          </p>


          <div className="flex gap-5">

            <InstagramIcon size={18} />

            <FacebookIcon size={18} />

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;