import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  ArrowRight,
  ChevronDown,
  Eye,
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";
import { products } from "../data/products";

const CATEGORY_FILTERS = [
  "Bedroom",
  "Living Room",
  "Dining",
  "Outdoor",
  "Office",
  "Storage",
];

const MATERIAL_FILTERS = [
  "Solid Wood",
  "Engineered Wood",
  "Rattan & Cane",
  "Natural Finish",
];

function FilterSection({ title, open, onToggle, children }) {
  return (
    <div className="border-b border-black/10 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-sm font-medium text-wood-deep"
      >
        {title}
        <ChevronDown
          size={18}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="pb-5 space-y-3">{children}</div>}
    </div>
  );
}

function Shop() {
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("q") || "").trim().toLowerCase();
  const categoryFromUrl = searchParams.get("category") || "";

  const [selectedCategories, setSelectedCategories] = useState(
    categoryFromUrl ? [categoryFromUrl] : []
  );
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [availability, setAvailability] = useState({
    inStock: false,
    onSale: false,
  });
  const [sortBy, setSortBy] = useState("default");
  const [visibleCount, setVisibleCount] = useState(8);
  const [openSections, setOpenSections] = useState({
    categories: true,
    material: false,
    availability: false,
  });

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl]);
    }
  }, [categoryFromUrl]);

  function toggleSection(key) {
    setOpenSections((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function toggleCategory(category) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  }

  function toggleMaterial(material) {
    setSelectedMaterials((current) =>
      current.includes(material)
        ? current.filter((item) => item !== material)
        : [...current, material]
    );
  }

  function clearFilters() {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setAvailability({ inStock: false, onSale: false });
    setSortBy("default");
  }

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (searchQuery) {
      list = list.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery) ||
          product.category.toLowerCase().includes(searchQuery)
      );
    }

    if (selectedCategories.length > 0) {
      list = list.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedMaterials.length > 0) {
      list = list.filter((product) => {
        const material = product.material || "Solid Wood";
        const finish = product.finish || "Natural Finish";
        return selectedMaterials.some(
          (item) =>
            material.toLowerCase().includes(item.toLowerCase()) ||
            finish.toLowerCase().includes(item.toLowerCase())
        );
      });
    }

    if (availability.onSale) {
      list = list.filter((product) => Boolean(product.tag));
    }

    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [
    searchQuery,
    selectedCategories,
    selectedMaterials,
    availability.onSale,
    sortBy,
  ]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const filterPanel = (
    <>
      <div className="flex items-center justify-between mb-2 lg:mb-8">
        <h2 className="text-lg font-medium text-wood-deep">Filter By</h2>
        <button
          onClick={clearFilters}
          className="text-xs uppercase tracking-[0.15em] text-wood-muted hover:text-wood-deep"
        >
          Clear All
        </button>
      </div>

      <FilterSection
        title="Categories"
        open={openSections.categories}
        onToggle={() => toggleSection("categories")}
      >
        {CATEGORY_FILTERS.map((category) => (
          <label
            key={category}
            className="flex items-center gap-3 text-sm text-wood cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => toggleCategory(category)}
              className="accent-[#8b6b45] w-4 h-4"
            />
            {category}
          </label>
        ))}
      </FilterSection>

      <FilterSection
        title="Material"
        open={openSections.material}
        onToggle={() => toggleSection("material")}
      >
        {MATERIAL_FILTERS.map((material) => (
          <label
            key={material}
            className="flex items-center gap-3 text-sm text-wood cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedMaterials.includes(material)}
              onChange={() => toggleMaterial(material)}
              className="accent-[#8b6b45] w-4 h-4"
            />
            {material}
          </label>
        ))}
      </FilterSection>

      <FilterSection
        title="Availability"
        open={openSections.availability}
        onToggle={() => toggleSection("availability")}
      >
        <label className="flex items-center gap-3 text-sm text-wood cursor-pointer">
          <input
            type="checkbox"
            checked={availability.inStock}
            onChange={() =>
              setAvailability((current) => ({
                ...current,
                inStock: !current.inStock,
              }))
            }
            className="accent-[#8b6b45] w-4 h-4"
          />
          In Stock
        </label>
        <label className="flex items-center gap-3 text-sm text-wood cursor-pointer">
          <input
            type="checkbox"
            checked={availability.onSale}
            onChange={() =>
              setAvailability((current) => ({
                ...current,
                onSale: !current.onSale,
              }))
            }
            className="accent-[#8b6b45] w-4 h-4"
          />
          On Sale / Featured
        </label>
      </FilterSection>
    </>
  );

  return (
    <main className="bg-[#f7f5f0]">

      {/* Shop Hero */}
      <section className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[360px] overflow-hidden">
        <img
          src="/images/products/living-room/living.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 min-h-[220px] sm:min-h-[280px] md:min-h-[360px] flex flex-col items-center justify-center px-5 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-light text-white">
            Premium Furniture
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/85">
            <Link to="/" className="hover:underline">Home</Link>
            {" / "}
            Premium Furniture
          </p>
        </div>
      </section>


      {/* Shop Content */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10">

          <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-10">

            {/* Filters — stacked on mobile, sidebar on desktop */}
            <aside className="bg-white px-4 sm:px-6 md:px-8 py-2 lg:py-8 h-fit border border-black/5 order-1">
              {filterPanel}
            </aside>


            {/* Products */}
            <div className="order-2">

              {/* Toolbar */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-5 border-b border-black/10">
                <p className="text-sm text-wood-muted">
                  {searchQuery
                    ? `Showing results for “${searchQuery}” — `
                    : "Showing all "}
                  {filteredProducts.length} results
                </p>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="
                    border
                    border-black/15
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-wood
                    outline-none
                    w-full
                    sm:w-auto
                    sm:min-w-[180px]
                  "
                >
                  <option value="default">Default Sorting</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>


              {/* Product Grid — 2 cols on mobile like Livora */}
              {visibleProducts.length === 0 ? (
                <div className="py-20 sm:py-24 text-center">
                  <h2 className="text-2xl font-light">No products found</h2>
                  <button
                    onClick={clearFilters}
                    className="mt-6 text-xs uppercase tracking-[0.18em] border-b border-black pb-1"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
                  {visibleProducts.map((product) => {
                    const compareAt = Math.round(product.price * 1.18);
                    const discount = Math.round(
                      ((compareAt - product.price) / compareAt) * 100
                    );

                    return (
                      <div key={product.id} className="group">
                        <div className="relative bg-[#efede8] rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/5] flex items-center justify-center">
                          <Link to={`/product/${product.slug}`} className="block w-full h-full p-2 sm:p-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain transition duration-700 group-hover:scale-105"
                            />
                          </Link>

                          {/* Hover / always-visible action icons on mobile */}
                          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
                            <Link
                              to={`/product/${product.slug}`}
                              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center shadow-sm"
                              aria-label="View"
                            >
                              <Eye size={14} />
                            </Link>
                            <button
                              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center shadow-sm"
                              aria-label="Wishlist"
                            >
                              <Heart size={14} />
                            </button>
                            <button
                              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center shadow-sm"
                              aria-label="Add to cart"
                            >
                              <ShoppingBag size={14} />
                            </button>
                          </div>
                        </div>

                        <div className="pt-3 sm:pt-5">
                          <Link to={`/product/${product.slug}`}>
                            <h3 className="text-sm sm:text-base md:text-lg font-medium text-wood-deep leading-snug line-clamp-2">
                              {product.name}
                            </h3>
                          </Link>

                          <div className="mt-1.5 sm:mt-2 flex items-center gap-0.5 text-[#c4a35a]">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star
                                key={index}
                                size={12}
                                className="sm:w-[14px] sm:h-[14px]"
                                fill="currentColor"
                                strokeWidth={0}
                              />
                            ))}
                          </div>

                          <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
                            <span className="font-medium text-wood-deep">
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                            <span className="text-wood-soft line-through">
                              ₹{compareAt.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[#8b6b45]">
                              {discount}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}


              {/* Load More — outlined on mobile like reference */}
              {visibleCount < filteredProducts.length && (
                <div className="text-center mt-10 sm:mt-14">
                  <button
                    onClick={() => setVisibleCount((count) => count + 6)}
                    className="
                      inline-flex
                      items-center
                      gap-3
                      rounded-full
                      border
                      border-[#8b6b45]
                      text-[#8b6b45]
                      bg-transparent
                      px-7
                      sm:px-8
                      py-3.5
                      sm:py-4
                      text-xs
                      uppercase
                      tracking-[0.18em]
                      hover:bg-[#8b6b45]
                      hover:text-white
                      transition
                    "
                  >
                    Load More
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Shop;
