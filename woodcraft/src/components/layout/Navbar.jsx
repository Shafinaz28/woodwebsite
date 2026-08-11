import { useState } from "react";
import { Link } from "react-router";
import {
  Menu,
  X,
  Search,
  UserRound,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartCount } = useCart();

  return (
    <header className="bg-white border-b border-[#e5ddd2] text-wood">

      <div className="max-w-[1500px] mx-auto px-5 md:px-10">

        <div className="h-[96px] flex items-center justify-between">

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>


          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
          >
            <img
              src="/images/logo.png"
              alt="Arileon"
              className="h-14 md:h-20 w-auto object-contain"
            />
          </Link>


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm">

            <Link to="/shop">
              New Arrivals
            </Link>

            <Link to="/shop">
              Living
            </Link>

            <Link to="/shop">
              Dining
            </Link>

            <Link to="/shop">
              Bedroom
            </Link>

            <Link to="/shop">
              Outdoor
            </Link>

            <Link to="/about">
              Our Story
            </Link>

          </nav>


          {/* Right Icons */}
          <div className="flex items-center gap-5">

            <button>
              <Search size={20} strokeWidth={1.5} />
            </button>

            <button className="hidden sm:block">
              <UserRound size={20} strokeWidth={1.5} />
            </button>

            <Link
              to="/cart"
              className="relative"
            >

              <ShoppingBag
                size={20}
                strokeWidth={1.5}
              />

              <span className="
                absolute
                -top-2
                -right-2
                bg-black
                text-white
                text-[9px]
                w-4
                h-4
                rounded-full
                flex
                items-center
                justify-center
              ">
                {cartCount}
              </span>

            </Link>

          </div>

        </div>


        {/* Mobile Menu */}

        {menuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-6">

            <nav className="flex flex-col gap-5 text-sm">

              <Link to="/shop" onClick={() => setMenuOpen(false)}>
                New Arrivals
              </Link>

              <Link to="/shop" onClick={() => setMenuOpen(false)}>
                Living
              </Link>

              <Link to="/shop" onClick={() => setMenuOpen(false)}>
                Dining
              </Link>

              <Link to="/shop" onClick={() => setMenuOpen(false)}>
                Bedroom
              </Link>

              <Link to="/shop" onClick={() => setMenuOpen(false)}>
                Outdoor
              </Link>

              <Link to="/about" onClick={() => setMenuOpen(false)}>
                Our Story
              </Link>

            </nav>

          </div>
        )}

      </div>

    </header>
  );
}

export default Navbar;
