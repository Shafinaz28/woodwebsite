import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  Menu,
  X,
  Search,
  UserRound,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { fetchCatalog, subscribeToCatalog } from "../../lib/catalog";

const NAV_LINKS_BEFORE = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Our Story", to: "/about" },
];

const NAV_LINKS_AFTER = [{ label: "Contact", to: "/contact" }];

const PRODUCT_FOLDERS = [
  { key: "bedroom", label: "Bedroom", category: "Bedroom" },
  { key: "dining", label: "Dining", category: "Dining" },
  { key: "living-room", label: "Living Room", category: "Living Room" },
  { key: "tables", label: "Tables", category: "Tables" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [listOpen, setListOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const searchRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    let active = true;
    fetchCatalog().then((data) => {
      if (active) setProducts(Array.isArray(data) ? data : []);
    });
    const unsubscribe = subscribeToCatalog((data) => {
      if (active) setProducts(Array.isArray(data) ? data : []);
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setListOpen(false);
      }
      if (productsRef.current && !productsRef.current.contains(e.target)) {
        setProductsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
        setMobileProductsOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const productList = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((product) => {
      const name = String(product?.name || "").toLowerCase();
      const category = String(product?.category || "").toLowerCase();
      return name.includes(q) || category.includes(q);
    });
  }, [products, query]);

  function handleSearch(e) {
    e.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : "/shop");
    setListOpen(false);
    setProductsOpen(false);
    setMenuOpen(false);
  }

  function closeMobile() {
    setMenuOpen(false);
    setMobileProductsOpen(false);
  }

  function ProductsTree({ onPick }) {
    return (
      <div className="py-1 text-[15px] sm:text-[16px] text-[#6B4423]">
        {PRODUCT_FOLDERS.map((folder) => (
          <Link
            key={folder.key}
            to={`/shop?category=${encodeURIComponent(folder.category)}`}
            onClick={onPick}
            className="block px-4 py-2.5 sm:py-2 hover:bg-[#6B4423]/8 active:bg-[#6B4423]/10"
          >
            {folder.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <header className="bg-white text-dark-brown sticky top-0 z-50 border-b border-[#eadfd3]">
      <div className="max-w-[1500px] mx-auto px-3 sm:px-6 lg:px-10">
        <div className="h-[64px] sm:h-[76px] lg:h-[96px] grid grid-cols-[auto_1fr] lg:grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
          <Link
            to="/"
            onClick={closeMobile}
            className="flex items-center shrink-0 justify-self-start"
          >
            <img
              src="/images/logo.png"
              alt="Arileon"
              className="h-11 sm:h-14 lg:h-[72px] w-auto max-w-[110px] sm:max-w-[140px] lg:max-w-[180px] object-contain object-left"
            />
          </Link>

          <nav className="hidden lg:flex items-center justify-center justify-self-center">
            <ul className="flex items-center justify-center gap-1 xl:gap-2 text-[14px] xl:text-[15px] text-[#3a4550]">
              {NAV_LINKS_BEFORE.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1 px-2.5 xl:px-3 py-2 transition hover:text-dark-brown ${
                        isActive
                          ? "text-dark-brown font-semibold"
                          : "font-medium"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}

              <li className="relative" ref={productsRef}>
                <button
                  type="button"
                  onClick={() => setProductsOpen((open) => !open)}
                  className={`inline-flex items-center gap-1 px-2.5 xl:px-3 py-2 transition hover:text-dark-brown ${
                    productsOpen
                      ? "text-dark-brown font-semibold"
                      : "font-medium"
                  }`}
                >
                  Products
                  <ChevronDown
                    size={12}
                    strokeWidth={2}
                    className={`opacity-70 transition ${productsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {productsOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[240px] rounded-md border border-[#6B4423]/20 bg-white shadow-lg z-50">
                    <ProductsTree onPick={() => setProductsOpen(false)} />
                  </div>
                )}
              </li>

              {NAV_LINKS_AFTER.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1 px-2.5 xl:px-3 py-2 transition hover:text-dark-brown ${
                        isActive
                          ? "text-dark-brown font-semibold"
                          : "font-medium"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-2.5 sm:gap-4 shrink-0 justify-self-end lg:col-start-3">
            <div ref={searchRef} className="relative hidden md:block">
              <form
                onSubmit={handleSearch}
                className="flex items-center h-9 w-[200px] lg:w-[240px] xl:w-[280px] rounded-md border border-[#cfc5b8] bg-white overflow-hidden"
              >
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setListOpen(true);
                  }}
                  onFocus={() => setListOpen(true)}
                  placeholder="Search products..."
                  className="flex-1 min-w-0 h-full px-3 outline-none text-xs text-dark-brown placeholder:text-[#3a4550]/50 bg-transparent"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="h-full px-2.5 text-dark-brown hover:opacity-70 border-l border-[#cfc5b8]"
                >
                  <Search size={15} strokeWidth={1.6} />
                </button>
              </form>

              {listOpen && (
                <div className="absolute right-0 top-full mt-1 w-[min(320px,calc(100vw-2rem))] max-h-[380px] overflow-y-auto rounded-md border border-[#cfc5b8] bg-white shadow-lg z-50">
                  <div className="px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-[#3a4550]/70 border-b border-[#eadfd3]">
                    {query.trim()
                      ? `${productList.length} results`
                      : `All products (${products.length})`}
                  </div>
                  {productList.length === 0 ? (
                    <p className="px-3 py-4 text-xs text-[#3a4550]/70">
                      No products found
                    </p>
                  ) : (
                    productList.map((product) => (
                      <Link
                        key={product.id ?? product.slug ?? product.name}
                        to={`/product/${product.slug}`}
                        onClick={() => {
                          setListOpen(false);
                          setQuery("");
                        }}
                        className="flex items-start justify-between gap-3 px-3 py-2.5 text-xs border-b border-[#eadfd3]/70 last:border-b-0 hover:bg-[#faf8f4]"
                      >
                        <span className="text-dark-brown leading-snug">
                          {product.name}
                        </span>
                        <span className="shrink-0 text-[#3a4550]/70">
                          ₹{Number(product.price || 0).toLocaleString("en-IN")}
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              aria-label="Account"
              className="hidden sm:inline-flex p-1.5 text-dark-brown hover:opacity-70 transition"
            >
              <UserRound size={20} strokeWidth={1.5} />
            </button>

            <Link
              to="/cart"
              aria-label={`Cart (${cartCount})`}
              onClick={closeMobile}
              className="relative p-1.5 text-dark-brown hover:opacity-70 transition"
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              <span className="absolute top-0 right-0 min-w-[16px] h-4 px-1 rounded-full bg-[#d4a574] text-white text-[10px] leading-4 text-center font-semibold">
                {cartCount}
              </span>
            </Link>

            <button
              type="button"
              className="lg:hidden p-1.5 text-dark-brown"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="lg:hidden border-t border-[#eadfd3] py-2 max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain">
            <ul className="flex flex-col text-[15px] text-[#3a4550]">
              {NAV_LINKS_BEFORE.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    onClick={closeMobile}
                    className="block px-1 py-3.5 border-b border-[#eadfd3]/80 hover:text-dark-brown transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li>
                <button
                  type="button"
                  onClick={() => setMobileProductsOpen((open) => !open)}
                  className="w-full flex items-center justify-between px-1 py-3.5 border-b border-[#eadfd3]/80 hover:text-dark-brown transition text-left"
                >
                  <span>Products</span>
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className={`opacity-70 transition ${mobileProductsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {mobileProductsOpen && (
                  <div className="mb-2 mt-1 rounded-md border border-[#6B4423]/20 bg-[#faf8f4] overflow-hidden">
                    <ProductsTree onPick={closeMobile} />
                  </div>
                )}
              </li>

              {NAV_LINKS_AFTER.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    onClick={closeMobile}
                    className="block px-1 py-3.5 border-b border-[#eadfd3]/80 hover:text-dark-brown transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
