export const MATERIALS = ["Solid wood", "Teak", "Sheesham"];

export const TAGS = ["", "New", "Bestseller"];

/** Extra types under a main category — must match shop filters. */
export const SUBCATEGORIES_BY_CATEGORY = {
  "Living Room": ["Centre and Side Tables"],
};

export function getSubcategories(category) {
  return SUBCATEGORIES_BY_CATEGORY[category] || [];
}
