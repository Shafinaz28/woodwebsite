import { useMemo, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Grid2x2, LayoutList, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../components/home/ProductCard";
import { fetchCatalog, subscribeToCatalog } from "../lib/catalog";

const CATEGORIES = ["All", "Living Room", "Bedroom", "Dining", "Tables"];
const MATERIALS = ["Solid wood", "Teak", "Oak", "Sheesham"];
const FINISHES = [
  { id: "Natural", color: "#c4a574" },
  { id: "Walnut", color: "#5c4033" },
  { id: "Espresso", color: "#2d1f16" },
  { id: "Honey", color: "#b89560" },
  { id: "Whitewash", color: "#e8e0d4" },
];
const PAGE_SIZE = 9;

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  const query = (searchParams.get("q") || "").trim().toLowerCase();
  const page = Math.max(1, Number(searchParams.get("page") || 1));

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const [material, setMaterial] = useState("All");
  const [finish, setFinish] = useState("All");
  const [availability, setAvailability] = useState("all");
  const [view, setView] = useState("grid");

  useEffect(() => {
    let active = true;

    fetchCatalog().then((data) => {
      if (!active) return;
      setProducts(data);
      setLoading(false);
    });

    const unsubscribe = subscribeToCatalog((data) => {
      if (!active) return;
      setProducts(data);
      setLoading(false);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let list = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      const matchesMaterial =
        material === "All" ||
        (product.material || "Solid wood")
          .toLowerCase()
          .includes(material.toLowerCase().split(" ")[0]);
      const matchesFinish =
        finish === "All" ||
        (product.finish || "Natural").toLowerCase() === finish.toLowerCase();
      const matchesAvailability =
        availability === "all" ||
        (availability === "new" && product.tag === "New") ||
        (availability === "bestseller" && product.tag === "Bestseller") ||
        availability === "instock";
      return (
        matchesCategory &&
        matchesQuery &&
        matchesMaterial &&
        matchesFinish &&
        matchesAvailability
      );
    });

    if (sortBy === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [
    products,
    selectedCategory,
    query,
    material,
    finish,
    availability,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageProducts = filteredProducts.slice(pageStart, pageStart + PAGE_SIZE);

  function selectCategory(category) {
    const next = new URLSearchParams(searchParams);
    if (category === "All") next.delete("category");
    else next.set("category", category);
    next.delete("page");
    setSearchParams(next);
  }

  function setPage(nextPage) {
    const next = new URLSearchParams(searchParams);
    if (nextPage <= 1) next.delete("page");
    else next.set("page", String(nextPage));
    setSearchParams(next);
    window.scrollTo({ top: 400, behavior: "smooth" });
  }

  function clearFilters() {
    setMaterial("All");
    setFinish("All");
    setAvailability("all");
    setSortBy("featured");
    const next = new URLSearchParams(searchParams);
    next.delete("category");
    next.delete("page");
    setSearchParams(next);
  }

  const showingFrom = filteredProducts.length ? pageStart + 1 : 0;
  const showingTo = Math.min(pageStart + PAGE_SIZE, filteredProducts.length);

  return (
    <main className="bg-[#f7f4ef] text-[#2b1d0e]">
      {/* Hero */}
      <section className="relative min-h-[280px] md:min-h-[340px] overflow-hidden bg-[#1a120c]">
        <img
          src="/images/shop/hero-bg.avif"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1a120c]/40" />
        <div className="relative z-10 max-w-[1500px] mx-auto px-5 md:px-10 min-h-[280px] md:min-h-[340px] flex items-center justify-center">
          <div className="max-w-xl text-center text-white">
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.1]">
              Shop Furniture
            </h1>
            <p className="mt-4 text-sm md:text-[15px] leading-7 text-white/85 mx-auto max-w-md">
              Timeless designs, premium materials, and craftsmanship made for
              the way you live.
            </p>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="py-10 md:py-14">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10">
          <div className="grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-12">
            {/* Filters */}
            <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              <FilterBlock title="Categories">
                <ul className="space-y-2.5">
                  {CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <label className="flex items-center gap-2.5 cursor-pointer text-sm">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => selectCategory(cat)}
                          className="accent-[#4a2c18]"
                        />
                        <span
                          className={
                            selectedCategory === cat
                              ? "font-semibold text-[#2b1d0e]"
                              : "text-[#2b1d0e]/75"
                          }
                        >
                          {cat === "All" ? "All Products" : cat}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </FilterBlock>

              <FilterBlock title="Room Type">
                <ul className="space-y-2.5">
                  {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                    <li key={cat}>
                      <label className="flex items-center gap-2.5 cursor-pointer text-sm text-[#2b1d0e]/75">
                        <input
                          type="checkbox"
                          checked={selectedCategory === cat}
                          onChange={() =>
                            selectCategory(
                              selectedCategory === cat ? "All" : cat
                            )
                          }
                          className="accent-[#4a2c18]"
                        />
                        {cat}
                      </label>
                    </li>
                  ))}
                </ul>
              </FilterBlock>

              <FilterBlock title="Material">
                <ul className="space-y-2.5">
                  <li>
                    <label className="flex items-center gap-2.5 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="material"
                        checked={material === "All"}
                        onChange={() => setMaterial("All")}
                        className="accent-[#4a2c18]"
                      />
                      All
                    </label>
                  </li>
                  {MATERIALS.map((m) => (
                    <li key={m}>
                      <label className="flex items-center gap-2.5 cursor-pointer text-sm text-[#2b1d0e]/75">
                        <input
                          type="radio"
                          name="material"
                          checked={material === m}
                          onChange={() => setMaterial(m)}
                          className="accent-[#4a2c18]"
                        />
                        {m}
                      </label>
                    </li>
                  ))}
                </ul>
              </FilterBlock>

              <FilterBlock title="Availability">
                <ul className="space-y-2.5">
                  {[
                    { id: "all", label: "All items" },
                    { id: "instock", label: "In stock" },
                    { id: "new", label: "New arrivals" },
                    { id: "bestseller", label: "Bestsellers" },
                  ].map((opt) => (
                    <li key={opt.id}>
                      <label className="flex items-center gap-2.5 cursor-pointer text-sm text-[#2b1d0e]/75">
                        <input
                          type="radio"
                          name="availability"
                          checked={availability === opt.id}
                          onChange={() => setAvailability(opt.id)}
                          className="accent-[#4a2c18]"
                        />
                        {opt.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </FilterBlock>

              <FilterBlock title="Color / Finish">
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => setFinish("All")}
                    className={`h-8 px-3 text-[11px] uppercase tracking-wider border ${
                      finish === "All"
                        ? "border-[#4a2c18] bg-[#4a2c18] text-white"
                        : "border-[#4a2c18]/25 text-[#2b1d0e]"
                    }`}
                  >
                    All
                  </button>
                  {FINISHES.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      title={f.id}
                      onClick={() => setFinish(f.id)}
                      className={`h-8 w-8 rounded-full border-2 ${
                        finish === f.id
                          ? "border-[#4a2c18] scale-110"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: f.color }}
                      aria-label={f.id}
                    />
                  ))}
                </div>
              </FilterBlock>

              <button
                type="button"
                onClick={clearFilters}
                className="w-full py-3 text-[11px] uppercase tracking-[0.16em] font-bold border border-[#4a2c18] text-[#4a2c18] hover:bg-[#4a2c18] hover:text-white transition"
              >
                Clear All Filters
              </button>
            </aside>

            {/* Products */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-[#4a2c18]/10">
                <p className="text-sm text-[#2b1d0e]/75">
                  {loading
                    ? "Loading products..."
                    : `Showing ${showingFrom}–${showingTo} of ${filteredProducts.length} products`}
                </p>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1 border border-[#4a2c18]/15 p-0.5">
                    <button
                      type="button"
                      onClick={() => setView("grid")}
                      className={`p-2 ${
                        view === "grid"
                          ? "bg-[#4a2c18] text-white"
                          : "text-[#2b1d0e]/60"
                      }`}
                      aria-label="Grid view"
                    >
                      <Grid2x2 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setView("list")}
                      className={`p-2 ${
                        view === "list"
                          ? "bg-[#4a2c18] text-white"
                          : "text-[#2b1d0e]/60"
                      }`}
                      aria-label="List view"
                    >
                      <LayoutList size={16} />
                    </button>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-[#2b1d0e]/75">
                    <span className="whitespace-nowrap">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent border border-[#4a2c18]/20 px-3 py-2 text-sm text-[#2b1d0e] outline-none"
                    >
                      <option value="featured">Featured</option>
                      <option value="name">Name</option>
                    </select>
                  </label>
                </div>
              </div>

              <div
                className={
                  view === "list"
                    ? "grid grid-cols-1 gap-5"
                    : "grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6"
                }
              >
                {!loading &&
                  pageProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>

              {!loading && filteredProducts.length === 0 && (
                <p className="py-16 text-center text-sm text-[#2b1d0e]/60">
                  No products match these filters.
                </p>
              )}

              {/* Mid CTA */}
              {!loading && filteredProducts.length > 0 && (
                <div
                  className="relative mt-12 md:mt-16 min-h-[220px] md:min-h-[280px] overflow-hidden bg-[#2d1f16] bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/shop/hero-bg.avif')" }}
                >
                  <div className="absolute inset-0 bg-[#1a120c]/45" />
                  <div className="relative z-10 flex min-h-[220px] md:min-h-[280px] items-center justify-center px-8 md:px-12">
                    <div className="max-w-md text-center text-white">
                      <h2 className="font-display text-2xl md:text-3xl font-semibold leading-snug">
                        Crafted to be part of your story.
                      </h2>
                      <Link
                        to="/shop"
                        className="inline-flex mt-6 px-7 py-3 bg-[#434f23] text-white text-[11px] uppercase tracking-[0.16em] font-bold hover:bg-[#363f1c] transition"
                      >
                        Explore Collection
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  className="mt-10 flex items-center justify-center gap-1.5"
                  aria-label="Pagination"
                >
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setPage(currentPage - 1)}
                    className="p-2 text-[#2b1d0e]/50 disabled:opacity-30 hover:text-[#2b1d0e]"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setPage(n)}
                        className={`min-w-9 h-9 px-2 text-sm font-semibold ${
                          n === currentPage
                            ? "bg-[#4a2c18] text-white"
                            : "text-[#2b1d0e]/70 hover:bg-[#4a2c18]/10"
                        }`}
                      >
                        {n}
                      </button>
                    )
                  )}
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => setPage(currentPage + 1)}
                    className="p-2 text-[#2b1d0e]/50 disabled:opacity-30 hover:text-[#2b1d0e]"
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </nav>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FilterBlock({ title, children }) {
  return (
    <div>
      <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#2b1d0e] mb-3 pb-2 border-b border-[#4a2c18]/15">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default Shop;
