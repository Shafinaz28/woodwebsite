import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  Menu,
  X,
  Search,
  Heart,
  UserRound,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

const NAV_LINKS = [
  { label: "Home", to: "/", hasDropdown: false },
  { label: "Shop", to: "/shop", hasDropdown: true },
  { label: "Living Room", to: "/shop?category=Living%20Room", hasDropdown: true },
  { label: "Bedroom", to: "/shop?category=Bedroom", hasDropdown: true },
  { label: "Dining Room", to: "/shop?category=Dining", hasDropdown: true },
  { label: "Office", to: "/shop?category=Office", hasDropdown: true },
  { label: "Outdoor", to: "/shop?category=Outdoor", hasDropdown: true },
  { label: "About Us", to: "/about", hasDropdown: false },
  { label: "Contact Us", to: "/contact", hasDropdown: false },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { cartCount } = useCart();

  function handleSearch(e) {
    e.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : "/shop");
    setMenuOpen(false);
  }

  return (
    <header className="bg-white text-dark-brown sticky top-0 z-50 border-b border-dark-brown/10">
      {/* Top: logo / search / utilities */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10">
        <div className="min-h-[72px] md:h-[92px] py-2 md:py-0 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/images/logo.png"
              alt="Arileon"
              className="h-11 sm:h-14 md:h-[72px] w-auto object-contain"
            />
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-[580px] mx-4 items-stretch h-11 rounded-full border border-dark-brown/20 bg-white overflow-hidden"
          >
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for furniture..."
              className="flex-1 px-5 outline-none text-sm text-brown placeholder:text-wood/55 bg-transparent"
            />
            <div className="hidden lg:flex items-center gap-1.5 px-4 border-l border-cream text-xs text-brown/70 shrink-0">
              All Categories
              <ChevronDown size={14} strokeWidth={1.5} />
            </div>
            <button
              type="submit"
              aria-label="Search"
              className="w-12 bg-dark-brown text-background flex items-center justify-center hover:bg-brown transition"
            >
              <Search size={18} strokeWidth={1.6} />
            </button>
          </form>

          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <button
              className="lg:hidden text-dark-brown"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <button
              className="hidden sm:flex flex-col items-center gap-1 text-dark-brown hover:text-wood transition"
              aria-label="Wishlist"
            >
              <Heart size={20} strokeWidth={1.5} />
              <span className="hidden lg:block text-[11px]">Wishlist</span>
            </button>

            <button
              className="hidden sm:flex flex-col items-center gap-1 text-dark-brown hover:text-wood transition"
              aria-label="Account"
            >
              <UserRound size={20} strokeWidth={1.5} />
              <span className="hidden lg:block text-[11px]">Account</span>
            </button>

            <Link
              to="/cart"
              className="flex items-center gap-2 text-dark-brown hover:text-wood transition"
              aria-label={`Cart (${cartCount})`}
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              <span className="hidden lg:block text-[13px] font-medium">
                Cart ({cartCount})
              </span>
              <span className="lg:hidden text-[12px] font-medium">
                ({cartCount})
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <form
          onSubmit={handleSearch}
          className="md:hidden mb-4 mt-2 flex items-stretch h-11 rounded-full border border-dark-brown/20 bg-white overflow-hidden shadow-sm"
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for furniture..."
            className="flex-1 px-5 outline-none text-sm text-brown bg-transparent"
          />
          <button
            type="submit"
            aria-label="Search"
            className="w-12 bg-dark-brown text-background flex items-center justify-center"
          >
            <Search size={16} />
          </button>
        </form>
      </div>

      {/* Dark brown category nav */}
      <nav className="bg-dark-brown text-background">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10">
          <ul className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 h-12 text-[11px] uppercase tracking-[0.14em]">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1 px-3 xl:px-3.5 h-8 transition ${
                      isActive && !link.to.includes("?")
                        ? "bg-brown text-background"
                        : "text-background/95 hover:bg-brown/70"
                    }`
                  }
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown size={12} strokeWidth={2} className="opacity-80" />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {menuOpen && (
            <ul className="lg:hidden flex flex-col gap-1 py-4 text-sm uppercase tracking-[0.12em]">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2.5 hover:bg-brown transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
