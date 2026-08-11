import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Menu,
  X,
  Search,
  Heart,
  UserRound,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { cartCount } = useCart();

  function handleSearch(e) {
    e.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : "/shop");
    setSearchOpen(false);
    setMenuOpen(false);
  }

  return (
    <header className="bg-white border-b border-[#e5ddd2] text-wood sticky top-0 z-50">

      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10">

        <div className="h-[72px] md:h-[96px] flex items-center justify-between gap-3">

          {/* Logo — left on all screens */}
          <Link
            to="/"
            className="flex items-center shrink-0"
          >
            <img
              src="/images/logo.png"
              alt="Arileon"
              className="h-11 sm:h-14 md:h-20 w-auto object-contain"
            />
          </Link>


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm flex-1 justify-center">
            <Link to="/shop">New Arrivals</Link>
            <Link to="/shop">Living</Link>
            <Link to="/shop">Dining</Link>
            <Link to="/shop">Bedroom</Link>
            <Link to="/shop">Outdoor</Link>
            <Link to="/about">Our Story</Link>
          </nav>


          {/* Right side icons + menu */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">

            {/* Desktop search */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center border border-[#d9d0c4] rounded-full px-4 h-11 w-[200px] lg:w-[240px] bg-[#faf8f4]"
            >
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search furniture..."
                className="flex-1 bg-transparent outline-none text-sm text-wood placeholder:text-wood-soft"
              />
              <button type="submit" aria-label="Search" className="text-wood">
                <Search size={18} strokeWidth={1.5} />
              </button>
            </form>

            {/* Mobile/tablet icon row */}
            <button
              className="md:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <button aria-label="Wishlist">
              <Heart size={20} strokeWidth={1.5} />
            </button>

            <button className="hidden xs:block sm:block" aria-label="Account">
              <UserRound size={20} strokeWidth={1.5} />
            </button>

            <Link to="/cart" className="relative" aria-label="Cart">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="
                absolute
                -top-2
                -right-2
                bg-[#8b6b45]
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

            {/* Mobile hamburger — far right, wood button like Livora */}
            <button
              className="lg:hidden w-10 h-10 rounded-md bg-[#8b6b45] text-white flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>

        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <form
            onSubmit={handleSearch}
            className="md:hidden pb-4 flex items-center border border-[#d9d0c4] rounded-full px-4 h-11 bg-[#faf8f4]"
          >
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search furniture..."
              className="flex-1 bg-transparent outline-none text-sm"
              autoFocus
            />
            <button type="submit" aria-label="Search">
              <Search size={18} strokeWidth={1.5} />
            </button>
          </form>
        )}


        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-6">
            <nav className="flex flex-col gap-5 text-sm">
              <Link to="/shop" onClick={() => setMenuOpen(false)}>New Arrivals</Link>
              <Link to="/shop" onClick={() => setMenuOpen(false)}>Living</Link>
              <Link to="/shop" onClick={() => setMenuOpen(false)}>Dining</Link>
              <Link to="/shop" onClick={() => setMenuOpen(false)}>Bedroom</Link>
              <Link to="/shop" onClick={() => setMenuOpen(false)}>Outdoor</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>Our Story</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </nav>
          </div>
        )}

      </div>

    </header>
  );
}

export default Navbar;
