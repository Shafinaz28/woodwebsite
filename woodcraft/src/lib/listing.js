export const LISTING_KEY = "arileon_product_listing";

function readMap() {
  try {
    const raw = JSON.parse(localStorage.getItem(LISTING_KEY) || "{}");
    return raw && typeof raw === "object" ? raw : {};
  } catch {
    return {};
  }
}

function writeMap(map) {
  localStorage.setItem(LISTING_KEY, JSON.stringify(map));
}

export function listingKey(product) {
  return String(product?.slug || product?.id || "");
}

export function isProductListed(product) {
  if (!product) return true;
  const map = readMap();
  const key = listingKey(product);
  if (key && Object.prototype.hasOwnProperty.call(map, key)) {
    return map[key] !== false;
  }
  if (product.listed === false || product.status === "unlisted") return false;
  return true;
}

export function setProductListedLocal(product, listed) {
  const key = listingKey(product);
  if (!key) return;
  const map = readMap();
  map[key] = Boolean(listed);
  writeMap(map);
}
