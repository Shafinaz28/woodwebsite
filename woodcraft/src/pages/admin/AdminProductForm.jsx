import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import {
  adminFetchProducts,
  adminUploadProductImage,
  adminUpsertProduct,
  slugify,
} from "../../lib/admin";
import { getCategories } from "../../lib/categories";
import { isProductListed, setProductListedLocal } from "../../lib/listing";
import {
  MATERIALS,
  TAGS,
  getSubcategories,
} from "../../lib/productOptions";

const CATEGORIES = getCategories();

const empty = {
  name: "",
  slug: "",
  category: "Living Room",
  subcategory: "",
  price: "",
  images: [],
  tag: "",
  description: "",
  material: "Solid wood",
  finish: "Natural",
  listed: true,
};

function AdminProductForm() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNew) return;
    let active = true;
    (async () => {
      try {
        const list = await adminFetchProducts();
        const found = list.find((p) => String(p.id) === String(id));
        if (!active) return;
        if (!found) {
          setError("Product not found");
          return;
        }

        const imageList = Array.isArray(found.images)
          ? found.images.filter(Boolean).map(String)
          : [];

        const parsedImageField = typeof found.image === "string" && found.image.trim().startsWith("[")
          ? (() => {
              try {
                const parsed = JSON.parse(found.image);
                return Array.isArray(parsed) ? parsed.filter(Boolean).map(String) : [];
              } catch {
                return [];
              }
            })()
          : [];

        setForm({
          id: found.id,
          name: found.name || "",
          slug: found.slug || "",
          category: found.category || "Living Room",
          subcategory: found.subcategory || "",
          price: found.price ?? "",
          images: imageList.length ? imageList : (parsedImageField.length ? parsedImageField : (found.image || found.image_url ? [found.image || found.image_url] : [])),
          tag: found.tag || "",
          description: found.description || "",
          material: found.material || "Solid wood",
          finish: found.finish || "Natural",
          listed: isProductListed(found),
        });
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id, isNew]);

  function update(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "name" && (isNew || !prev.slugLocked)) {
        next.slug = slugify(value);
      }
      if (field === "category") {
        const allowed = getSubcategories(value);
        if (!allowed.includes(prev.subcategory)) next.subcategory = "";
      }
      return next;
    });
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, WEBP, AVIF).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }

    setUploading(true);
    setError("");
    try {
      const url = await adminUploadProductImage(
        file,
        form.slug || form.name || "product"
      );
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, url],
      }));
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index) {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }

  function updateImageUrl(index, value) {
    setForm((prev) => {
      const newImages = [...prev.images];
      newImages[index] = value;
      return { ...prev, images: newImages };
    });
  }

  async function ensureUniqueSlug(nextSlug, currentId = null) {
    const base = String(nextSlug || slugify(form.name) || "product").trim();
    if (!base) return "product";

    const list = await adminFetchProducts();
    let candidate = base;
    let suffix = 2;

    while (
      list.some(
        (item) =>
          String(item.slug || "").toLowerCase() === candidate.toLowerCase() &&
          String(item.id) !== String(currentId)
      )
    ) {
      candidate = `${base}-${suffix}`;
      suffix += 1;
    }

    return candidate;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const resolvedSlug = await ensureUniqueSlug(
        form.slug || slugify(form.name),
        form.id || null
      );

      if (resolvedSlug !== form.slug) {
        setForm((prev) => ({ ...prev, slug: resolvedSlug }));
      }

      await adminUpsertProduct({
        ...form,
        price: Number(form.price) || 0,
        slug: resolvedSlug,
        image: form.images[0] || "",
        listed: form.listed !== false,
      });
      setProductListedLocal({ ...form, slug: resolvedSlug }, form.listed !== false);
      navigate("/admin/products");
    } catch (err) {
      setError(
        err.message ||
          "Save failed. Enable INSERT/UPDATE for authenticated users in Supabase RLS."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-[#6b7280]">Loading product…</p>;
  }

  const field =
    "mt-2 w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm outline-none focus:border-[#5c4033]/40 focus:ring-2 focus:ring-[#5c4033]/10";

  return (
    <div className="max-w-2xl">
      <Link
        to="/admin/products"
        className="text-xs uppercase tracking-wider text-[#5c4033] hover:underline"
      >
        ← Products
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-[#111827]">
        {isNew ? "Add product" : "Edit product"}
      </h1>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-[#374151]">Name</span>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={field}
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-[#374151]">Slug</span>
          <input
            required
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            className={field}
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-[#374151]">
              Category
            </span>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className={field}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-[#374151]">
              Type / subcategory
            </span>
            <select
              value={form.subcategory}
              onChange={(e) => update("subcategory", e.target.value)}
              className={field}
            >
              <option value="">None</option>
              {getSubcategories(form.category).map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
              {form.subcategory &&
                !getSubcategories(form.category).includes(form.subcategory) && (
                  <option value={form.subcategory}>{form.subcategory}</option>
                )}
            </select>
            <p className="mt-1 text-xs text-[#6b7280]">
              Used by shop filters (e.g. Centre and Side Tables).
            </p>
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-[#374151]">
              Price (₹)
            </span>
            <input
              required
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              className={field}
            />
          </label>
        </div>

        {/* Image upload */}
        <div>
          <span className="text-sm font-semibold text-[#374151]">
            Product images
          </span>

          <div className="mt-2 rounded-2xl border border-dashed border-[#d6c7b4] bg-[#faf8f4] p-4">
            {form.images.length > 0 ? (
              <div className="mb-4 space-y-3">
                {form.images.map((img, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-lg bg-white p-3">
                    <img
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div className="flex-1 truncate">
                      <p className="text-xs text-[#6b7280] truncate">{img}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="p-1 text-[#ef4444] hover:bg-red-50 rounded"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-4 flex h-40 flex-col items-center justify-center gap-2 text-[#9ca3af]">
                <ImageIcon size={28} strokeWidth={1.5} />
                <p className="text-sm">No images yet</p>
              </div>
            )}

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#5c4033] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#4a3428]">
              <Upload size={16} />
              {uploading ? "Uploading…" : "Add image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={handleImageUpload}
              />
            </label>
            <p className="mt-2 text-xs text-[#6b7280]">
              JPG, PNG, WEBP or AVIF · max 5 MB
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <label className="block">
              <span className="text-xs text-[#6b7280]">
                Or paste image URLs / paths (one per field)
              </span>
            </label>
            {form.images.map((img, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  value={img}
                  onChange={(e) => updateImageUrl(idx, e.target.value)}
                  className={field}
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="px-3 py-2 text-[#ef4444] hover:bg-red-50 rounded border border-[#e5e7eb]"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, images: [...prev.images, ""] }))}
              className="text-sm text-[#5c4033] hover:underline"
            >
              + Add image URL
            </button>
          </div>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-[#374151]">Tag</span>
          <select
            value={form.tag}
            onChange={(e) => update("tag", e.target.value)}
            className={field}
          >
            {TAGS.map((tag) => (
              <option key={tag || "none"} value={tag}>
                {tag || "None"}
              </option>
            ))}
            {form.tag && !TAGS.includes(form.tag) && (
              <option value={form.tag}>{form.tag}</option>
            )}
          </select>
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-[#374151]">
              Material
            </span>
            <select
              value={form.material}
              onChange={(e) => update("material", e.target.value)}
              className={field}
            >
              {MATERIALS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
              {form.material && !MATERIALS.includes(form.material) && (
                <option value={form.material}>{form.material}</option>
              )}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-[#374151]">Finish</span>
            <input
              value={form.finish}
              onChange={(e) => update("finish", e.target.value)}
              className={field}
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-[#374151]">
            Description
          </span>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className={`${field} resize-y`}
          />
        </label>

        <label className="flex items-center gap-3 text-sm font-semibold text-[#374151]">
          <input
            type="checkbox"
            checked={form.listed !== false}
            onChange={(e) => update("listed", e.target.checked)}
            className="accent-[#5c4033]"
          />
          Listed on shop
        </label>
        <p className="-mt-3 text-xs text-[#6b7280]">
          Uncheck to unlist. The product stays in admin but is hidden from the
          shop.
        </p>

        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-xl bg-[#5c4033] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#4a3428] disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save product"}
        </button>
      </form>
    </div>
  );
}

export default AdminProductForm;
