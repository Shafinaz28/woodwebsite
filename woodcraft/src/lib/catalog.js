import { products as localProducts } from "../data/products";
import { isProductListed } from "./listing";
import { isSupabaseConfigured, supabase } from "./supabase";

const localBySlug = new Map(localProducts.map((item) => [item.slug, item]));
const localByName = new Map(
  localProducts.map((item) => [item.name.toLowerCase(), item])
);

function toAvifIfLocal(src) {
  if (!src || typeof src !== "string") return src;
  // Never rewrite remote CDN/Storage URLs (real uploads stay .jpg/.png)
  if (/^https?:\/\//i.test(src)) return src;
  return src.replace(/\.(png|jpe?g)(\?.*)?$/i, ".avif$2");
}

function isRemoteImage(src) {
  return /^https?:\/\//i.test(String(src || "").trim());
}

const knownLocalImages = new Set(
  localProducts.flatMap((item) => {
    const src = String(item.image || "").trim();
    if (!src || isRemoteImage(src)) return [];
    const withSlash = src.startsWith("/") ? src : `/${src.replace(/^\.?\//, "")}`;
    return [withSlash, toAvifIfLocal(withSlash)];
  })
);

function isUsableProductImage(src) {
  const value = String(src || "").trim();
  if (!value) return false;
  if (isRemoteImage(value)) return true;
  const withSlash = value.startsWith("/")
    ? value
    : `/${value.replace(/^\.?\//, "")}`;
  return (
    knownLocalImages.has(withSlash) ||
    knownLocalImages.has(toAvifIfLocal(withSlash))
  );
}

function parseProductImages(product = {}) {
  const direct = Array.isArray(product?.images)
    ? product.images.filter(Boolean).map(String)
    : [];

  if (direct.length) return direct;

  const raw = product?.image || product?.image_url || "";
  if (typeof raw !== "string" || !raw.trim()) return [];

  const trimmed = raw.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean).map(String);
      }
    } catch {
      return [];
    }
  }

  return [trimmed];
}

export function getProductImage(product) {
  const images = parseProductImages(product);
  const raw = images[0] || product?.image || product?.image_url || "";

  if (typeof raw === "string" && raw.trim()) {
    let src = raw.trim();
    if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
      return toAvifIfLocal(src);
    }
    src = `/${src.replace(/^\.?\//, "")}`;
    return toAvifIfLocal(src);
  }

  const local =
    localBySlug.get(product?.slug) ||
    localByName.get(product?.name?.toLowerCase?.() || "");

  return toAvifIfLocal(
    local?.image || "/images/products/bedroom/bead10.avif"
  );
}

export function normalizeProduct(row = {}) {
  const local =
    localBySlug.get(row.slug) ||
    localByName.get(row.name?.toLowerCase?.() || "") ||
    {};

  let imageSource = row.image || row.image_url || local.image || "";
  if (
    imageSource &&
    !isRemoteImage(imageSource) &&
    !isUsableProductImage(imageSource) &&
    local.image
  ) {
    imageSource = local.image;
  }

  const images = parseProductImages({ ...local, ...row, image: imageSource });

  return {
    id: row.id ?? local.id,
    name: row.name || local.name,
    slug: row.slug || local.slug,
    category: row.category || local.category,
    price: Number(row.price ?? local.price ?? 0),
    image: getProductImage({
      ...local,
      ...row,
      image: imageSource,
    }),
    images,
    tag: row.tag || local.tag,
    subcategory: row.subcategory || local.subcategory || null,
    description:
      row.description ||
      local.description ||
      "Solid wood furniture crafted for daily use, with honest grain and lasting joinery.",
    material: row.material || local.material || "Solid wood",
    finish: row.finish || local.finish || "Natural",
    dimensions: row.dimensions || local.dimensions || "As shown",
    delivery: row.delivery || local.delivery || "7–14 days",
    listed: isProductListed({ ...local, ...row }),
  };
}

export async function fetchCatalog() {
  const local = localProducts.map((item) => normalizeProduct(item));

  if (!isSupabaseConfigured) {
    console.warn("Supabase not configured — using local products");
    return local.filter((item) => item.listed !== false);
  }

  try {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Supabase products error:", error);
      return local.filter((item) => item.listed !== false);
    }
    if (!data?.length) {
      console.warn("Supabase products empty — using local products");
      return local.filter((item) => item.listed !== false);
    }

    // Start with local catalog, overlay matches, put new Supabase products first
    const bySlug = new Map(local.map((item) => [item.slug, item]));
    const newlyAdded = [];
    for (const row of data) {
      const normalized = normalizeProduct(row);
      if (!normalized.slug) continue;
      if (bySlug.has(normalized.slug)) {
        bySlug.set(normalized.slug, normalized);
      } else {
        newlyAdded.push(normalized);
      }
    }
    return [...newlyAdded, ...Array.from(bySlug.values())].filter(
      (item) => item.listed !== false && isUsableProductImage(item.image)
    );
  } catch (err) {
    console.error("Supabase fetch failed:", err);
    return local.filter((item) => item.listed !== false);
  }
}

export async function fetchProductBySlug(slug) {
  if (!isSupabaseConfigured || !slug) {
    const local = localProducts.find((item) => item.slug === slug);
    return local ? normalizeProduct(local) : null;
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("Supabase product error:", error);
      const local = localProducts.find((item) => item.slug === slug);
      return local ? normalizeProduct(local) : null;
    }

    if (data) {
      const product = normalizeProduct(data);
      if (product.listed === false || !isUsableProductImage(product.image)) {
        const local = localProducts.find((item) => item.slug === slug);
        return local ? normalizeProduct(local) : null;
      }
      return product;
    }

    const local = localProducts.find((item) => item.slug === slug);
    return local ? normalizeProduct(local) : null;
  } catch (err) {
    console.error("Supabase product fetch failed:", err);
    const local = localProducts.find((item) => item.slug === slug);
    return local ? normalizeProduct(local) : null;
  }
}

/** Live updates when products table changes in Supabase */
export function subscribeToCatalog(onChange) {
  if (!isSupabaseConfigured) {
    return () => {};
  }

  const channelName = `products-catalog-${Math.random().toString(36).slice(2)}`;
  const channel = supabase
    .channel(channelName)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "products" },
      async () => {
        const products = await fetchCatalog();
        onChange(products);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export function subscribeToProductBySlug(slug, onChange) {
  if (!isSupabaseConfigured || !slug) {
    return () => {};
  }

  const channel = supabase
    .channel(`product-${slug}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "products" },
      async (payload) => {
        const row = payload.new || payload.old;
        if (row?.slug && row.slug !== slug) return;
        const product = await fetchProductBySlug(slug);
        onChange(product);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export { localProducts };
