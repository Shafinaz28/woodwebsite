import { products as localProducts } from "../data/products";
import { isSupabaseConfigured, supabase } from "./supabase";

const localBySlug = new Map(localProducts.map((item) => [item.slug, item]));
const localByName = new Map(
  localProducts.map((item) => [item.name.toLowerCase(), item])
);

export function getProductImage(product) {
  const raw =
    product?.image ||
    product?.image_url ||
    (Array.isArray(product?.images) ? product.images[0] : "") ||
    "";

  if (typeof raw === "string" && raw.trim()) {
    if (raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("/")) {
      return raw;
    }
    return `/${raw.replace(/^\.?\//, "")}`;
  }

  const local =
    localBySlug.get(product?.slug) ||
    localByName.get(product?.name?.toLowerCase?.() || "");

  return local?.image || "/images/products/bedroom/bead10.jpg";
}

export function normalizeProduct(row = {}) {
  const local =
    localBySlug.get(row.slug) ||
    localByName.get(row.name?.toLowerCase?.() || "") ||
    {};

  return {
    id: row.id ?? local.id,
    name: row.name || local.name,
    slug: row.slug || local.slug,
    category: row.category || local.category,
    price: Number(row.price ?? local.price ?? 0),
    image: getProductImage({
      ...row,
      ...local,
      // Prefer local catalog images so edited files always show on the site
      image: local.image || row.image || row.image_url,
    }),
    tag: row.tag || local.tag,
    description:
      row.description ||
      local.description ||
      "Solid wood furniture crafted for daily use, with honest grain and lasting joinery.",
    material: row.material || local.material || "Solid wood",
    finish: row.finish || local.finish || "Natural",
    dimensions: row.dimensions || local.dimensions || "As shown",
    delivery: row.delivery || local.delivery || "7–14 days",
  };
}

export async function fetchCatalog() {
  const local = localProducts.map(normalizeProduct);

  if (!isSupabaseConfigured) {
    console.warn("Supabase not configured — using local products");
    return local;
  }

  try {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Supabase products error:", error);
      return local;
    }
    if (!data?.length) {
      console.warn("Supabase products empty — using local products");
      return local;
    }

    // Keep website catalog = local products only; overlay matching Supabase rows
    const bySlug = new Map(local.map((item) => [item.slug, item]));
    for (const row of data) {
      const normalized = normalizeProduct(row);
      if (normalized.slug && bySlug.has(normalized.slug)) {
        bySlug.set(normalized.slug, normalized);
      }
    }
    return Array.from(bySlug.values());
  } catch (err) {
    console.error("Supabase fetch failed:", err);
    return local;
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
      return normalizeProduct(data);
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
