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
