import { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/home/ProductCard";
import { fetchCatalog, subscribeToCatalog } from "../lib/catalog";
import { getCategories } from "../lib/categories";
import { MATERIALS } from "../lib/productOptions";

const CATEGORIES = ["All", ...getCategories()];
const PAGE_SIZE = 12;

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  const query = (searchParams.get("q") || "").trim().toLowerCase();
  const page = Math.max(1, Number(searchParams.get("page") || 1));

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const [material, setMaterial] = useState("All");
  const [availability, setAvailability] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

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
        String(product.category || "")
          .toLowerCase()
          .includes(query);
      const matchesMaterial =
        material === "All" ||
        (product.material || "Solid wood")
          .toLowerCase()
          .includes(material.toLowerCase().split(" ")[0]);
      const matchesAvailability =
        availability === "all" ||
        (availability === "new" && product.tag === "New") ||
        (availability === "bestseller" && product.tag === "Bestseller") ||
        availability === "instock";
      return (
        matchesCategory &&
        matchesQuery &&
        matchesMaterial &&
        matchesAvailability
      );
    });

    if (sortBy === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, selectedCategory, query, material, availability, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageProducts = filteredProducts.slice(pageStart, pageStart + PAGE_SIZE);

  function selectCategory(category) {
    const next = new URLSearchParams(searchParams);
    if (category === "All") next.delete("category");
    else next.set("category", category);
    next.delete("subcategory");
    next.delete("page");
    setSearchParams(next);
  }

  function setPage(nextPage) {
    const next = new URLSearchParams(searchParams);
    if (nextPage <= 1) next.delete("page");
    else next.set("page", String(nextPage));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function clearFilters() {
    setMaterial("All");
    setAvailability("all");
    setSortBy("featured");
    const next = new URLSearchParams(searchParams);
    next.delete("category");
    next.delete("subcategory");
    next.delete("page");
    setSearchParams(next);
  }

  const showingFrom = filteredProducts.length ? pageStart + 1 : 0;
  const showingTo = Math.min(pageStart + PAGE_SIZE, filteredProducts.length);
  const heading =
    selectedCategory === "All" ? "All Furniture" : selectedCategory;

  const pageItems = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const nums = new Set([
      1,
      totalPages,
      currentPage,
      currentPage - 1,
      currentPage + 1,
    ]);
    return [...nums]
      .filter((n) => n >= 1 && n <= totalPages)
      .sort((a, b) => a - b);
  }, [totalPages, currentPage]);

  function FiltersPanel({ formId }) {
    return (
    <>
      <FilterBlock title="Categories">
        <ul className="space-y-2.5">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                <input
                  type="radio"
                  name={`${formId}-category`}
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

      <FilterBlock title="Material">
        <ul className="space-y-2.5">
          <li>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="radio"
                name={`${formId}-material`}
                checked={material === "All"}
                onChange={() => setMaterial("All")}
                className="accent-[#4a2c18]"
              />
              All
            </label>
          </li>
          {MATERIALS.map((m) => (
            <li key={m}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#2b1d0e]/75">
                <input
                  type="radio"
                  name={`${formId}-material`}
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
            { id: "new", label: "New arrivals" },
            { id: "bestseller", label: "Bestsellers" },
          ].map((opt) => (
            <li key={opt.id}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#2b1d0e]/75">
                <input
                  type="radio"
                  name={`${formId}-availability`}
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

      <button
        type="button"
        onClick={clearFilters}
        className="w-full border border-[#4a2c18] py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4a2c18] transition hover:bg-[#4a2c18] hover:text-white"
      >
        Clear All Filters
      </button>
    </>
    );
  }

  return (
    <main className="overflow-x-hidden bg-[#f7f4ef] text-[#2b1d0e]">
      <section className="relative min-h-[180px] overflow-hidden bg-[#1a120c] sm:min-h-[240px] md:min-h-[300px]">
        <img
          src="/images/shop/hero-bg.avif"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1a120c]/40" />
        <div className="relative z-10 mx-auto flex min-h-[180px] max-w-[1500px] items-center justify-center px-4 sm:min-h-[240px] sm:px-5 md:min-h-[300px] md:px-10">
          <div className="max-w-xl px-1 text-center text-white">
            <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/70 sm:mb-3 sm:text-[11px]">
              Catalog
            </p>
            <h1 className="font-display text-3xl font-semibold leading-[1.15] sm:text-4xl md:text-5xl">
              {heading}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/85 sm:mt-4 sm:leading-7 md:text-[15px]">
              Solid wood furniture for living, dining, bedroom, and more.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-10 md:py-14">
        <div className="mx-auto max-w-[1500px] px-3 sm:px-5 md:px-10">
          <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-12">
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setFiltersOpen((open) => !open)}
                className="flex h-12 w-full items-center justify-center gap-2 border border-[#4a2c18] bg-white text-[11px] font-bold uppercase tracking-[0.16em] text-[#4a2c18]"
              >
                <SlidersHorizontal size={16} />
                {filtersOpen ? "Hide filters" : "Filters"}
              </button>
              {filtersOpen ? (
                <div className="mt-3 space-y-8 border border-[#4a2c18]/10 bg-white p-4">
                  <FiltersPanel formId="mobile" />
                </div>
              ) : null}
            </div>

            <aside className="hidden space-y-8 lg:sticky lg:top-28 lg:block lg:self-start">
              <FiltersPanel formId="desktop" />
            </aside>

            <div className="min-w-0">
              <div className="mb-4 flex flex-col gap-3 border-b border-[#4a2c18]/10 pb-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-[#2b1d0e]/75 sm:text-sm">
                  {loading
                    ? "Loading products..."
                    : `Showing ${showingFrom}–${showingTo} of ${filteredProducts.length} products`}
                </p>
                <label className="flex min-w-0 items-center gap-2 text-sm text-[#2b1d0e]/75">
                  <span className="shrink-0">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="min-w-0 flex-1 border border-[#4a2c18]/20 bg-white px-3 py-2 text-sm text-[#2b1d0e] outline-none sm:flex-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="name">Name</option>
                  </select>
                </label>
              </div>

              {loading && (
                <div className="grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-3 md:gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[3/4] animate-pulse rounded-xl bg-[#eadfd3]/70"
                    />
                  ))}
                </div>
              )}

              {!loading && (
                <div className="grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-3 md:gap-6">
                  {pageProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {!loading && filteredProducts.length === 0 && (
                <p className="py-16 text-center text-sm text-[#2b1d0e]/60">
                  No products match these filters.
                </p>
              )}

              {totalPages > 1 && (
                <nav
                  className="mt-8 flex flex-wrap items-center justify-center gap-1 sm:mt-10"
                  aria-label="Pagination"
                >
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setPage(currentPage - 1)}
                    className="p-2 text-[#2b1d0e]/50 hover:text-[#2b1d0e] disabled:opacity-30"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  {pageItems.map((n, i) => (
                    <span key={n} className="contents">
                      {i > 0 && pageItems[i - 1] !== n - 1 ? (
                        <span className="px-1 text-[#2b1d0e]/40">…</span>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => setPage(n)}
                        className={`h-9 min-w-9 px-2 text-sm font-semibold ${
                          n === currentPage
                            ? "bg-[#4a2c18] text-white"
                            : "text-[#2b1d0e]/70 hover:bg-[#4a2c18]/10"
                        }`}
                      >
                        {n}
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => setPage(currentPage + 1)}
                    className="p-2 text-[#2b1d0e]/50 hover:text-[#2b1d0e] disabled:opacity-30"
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
      <h3 className="mb-3 border-b border-[#4a2c18]/15 pb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2b1d0e]">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default Shop;
