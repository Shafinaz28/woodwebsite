import { products as localProducts } from "../data/products";
import { isSupabaseConfigured, supabase } from "./supabase";

const PRODUCT_BUCKET = "products";

export async function adminFetchProducts() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function adminUploadProductImage(file, slug = "product") {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured");
  }
  if (!file) {
    throw new Error("No file selected");
  }

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safeSlug = slugify(slug || "product") || "product";
  const path = `${safeSlug}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(PRODUCT_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || undefined,
    });

  if (uploadError) {
    throw new Error(
      uploadError.message.includes("Bucket not found")
        ? 'Storage bucket "products" not found. Run supabase/migrations/002_product_images.sql in Supabase SQL Editor.'
        : uploadError.message
    );
  }

  const { data } = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(path);
  if (!data?.publicUrl) {
    throw new Error("Could not get public image URL");
  }
  return data.publicUrl;
}

export async function adminUpsertProduct(product) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured");
  }

  const imageValue = String(product.image || "").trim();

  const payload = {
    name: product.name,
    slug: product.slug,
    category: product.category,
    price: Number(product.price) || 0,
    image: imageValue,
    tag: product.tag || null,
    description: product.description || null,
    material: product.material || null,
    finish: product.finish || null,
  };

  if (product.id) {
    const { data, error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", product.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from("products")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function adminDeleteProduct(id) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured");
  }
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

/** Insert local catalog products that are missing from Supabase (by slug). */
export async function adminSyncLocalProducts() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured");
  }

  const existing = await adminFetchProducts();
  const existingSlugs = new Set(
    (existing || []).map((row) => String(row.slug || "").toLowerCase())
  );

  const missing = localProducts.filter(
    (item) => item.slug && !existingSlugs.has(String(item.slug).toLowerCase())
  );

  if (!missing.length) {
    return { inserted: 0, skipped: existing.length, totalLocal: localProducts.length };
  }

  const rows = missing.map((item) => ({
    name: item.name,
    slug: item.slug,
    category: item.category || null,
    price: Number(item.price) || 0,
    image: item.image || null,
    tag: item.tag || null,
    description: item.description || null,
    material: item.material || null,
    finish: item.finish || null,
  }));

  const { data, error } = await supabase.from("products").insert(rows).select();
  if (error) throw error;

  return {
    inserted: data?.length || 0,
    skipped: existing.length,
    totalLocal: localProducts.length,
  };
}

export async function adminFetchOrders() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.warn("Orders fetch:", error.message);
    return [];
  }
  return data || [];
}

export function slugify(text = "") {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
