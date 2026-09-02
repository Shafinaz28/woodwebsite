export const DEFAULT_CATEGORIES = [
  "Living Room",
  "Bedroom",
  "Dining",
  "Tables",
  "Office",
  "Outdoor",
  "Storage",
];

const STORAGE_KEY = "arileon_categories";
const DETAILS_KEY = "arileon_category_details";

const CATEGORY_IMAGES = {
  "Living Room": "/images/categories/living.avif",
  Bedroom: "/images/categories/bedroom.avif",
  Dining: "/images/categories/dining.avif",
  Tables: "/images/categories/tables.avif",
  Office: "/images/products/office/office.avif",
  Outdoor: "/images/categories/outdoor.avif",
  Storage: "/images/categories/storage.avif",
};

function normalizeCategoryName(value = "") {
  return String(value)
    .trim()
    .replace(/\s+/g, " ")
    .replace(/^\s+|\s+$/g, "");
}

function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function dedupeCategories(items = []) {
  const seen = new Set();
  const result = [];

  for (const item of items) {
    const name = normalizeCategoryName(item);
    if (!name || seen.has(name.toLowerCase())) continue;
    seen.add(name.toLowerCase());
    result.push(name);
  }

  return result;
}

function readDetailStore() {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(DETAILS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeDetailStore(data) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(DETAILS_KEY, JSON.stringify(data));
  }
}

function fallbackDetails(name) {
  return {
    name,
    slug: slugify(name),
    image: CATEGORY_IMAGES[name] || "/images/categories/living.avif",
    description: `Curated ${name.toLowerCase()} designs crafted for everyday living.`,
    shortDescription: "Explore our collection.",
  };
}

export function getCategoryDetails(name) {
  const categoryName = normalizeCategoryName(name);
  const details = readDetailStore();
  const entry = details[categoryName.toLowerCase()];
  if (entry) {
    return {
      ...fallbackDetails(categoryName),
      ...entry,
      name: categoryName,
      slug: entry.slug || slugify(categoryName),
    };
  }
  return fallbackDetails(categoryName);
}

export function getCategories() {
  if (typeof window === "undefined") return [...DEFAULT_CATEGORIES];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const fallback = [...DEFAULT_CATEGORIES];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
      return fallback;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const fallback = [...DEFAULT_CATEGORIES];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
      return fallback;
    }

    const cleaned = dedupeCategories(parsed);
    if (cleaned.length !== parsed.length) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch {
    return [...DEFAULT_CATEGORIES];
  }
}

export function saveCategories(list = []) {
  const cleaned = dedupeCategories(list);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  }
  return cleaned;
}

export function saveCategoryDetails(details = {}) {
  const clean = normalizeCategoryName(details.name || "");
  if (!clean) return getCategories();

  const store = readDetailStore();
  const next = {
    ...store,
    [clean.toLowerCase()]: {
      ...getCategoryDetails(clean),
      ...details,
      name: clean,
      slug: details.slug || slugify(clean),
      image: details.image || getCategoryDetails(clean).image,
      description: details.description || getCategoryDetails(clean).description,
      shortDescription:
        details.shortDescription || getCategoryDetails(clean).shortDescription,
    },
  };

  writeDetailStore(next);
  return getCategories();
}

export function addCategory(name) {
  const nextName = normalizeCategoryName(name);
  if (!nextName) return getCategories();

  const next = [...getCategories(), nextName];
  const saved = saveCategories(next);
  saveCategoryDetails({ name: nextName });
  return saved;
}

export function updateCategory(oldName, newName) {
  const target = normalizeCategoryName(oldName);
  const updated = normalizeCategoryName(newName);
  if (!target || !updated || target.toLowerCase() === updated.toLowerCase()) {
    return getCategories();
  }

  const store = readDetailStore();
  const details = store[target.toLowerCase()];
  if (details) {
    delete store[target.toLowerCase()];
    store[updated.toLowerCase()] = { ...details, name: updated, slug: slugify(updated) };
    writeDetailStore(store);
  }

  const next = getCategories().map((category) =>
    category.toLowerCase() === target.toLowerCase() ? updated : category
  );

  return saveCategories(next);
}

export function deleteCategory(name) {
  const target = normalizeCategoryName(name);
  if (!target) return getCategories();

  const store = readDetailStore();
  delete store[target.toLowerCase()];
  writeDetailStore(store);

  const next = getCategories().filter(
    (category) => category.toLowerCase() !== target.toLowerCase()
  );

  return saveCategories(next);
}
