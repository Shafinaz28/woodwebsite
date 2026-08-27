import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Upload, Image as ImageIcon } from "lucide-react";
import {
  adminFetchProducts,
  adminUploadProductImage,
  adminUpsertProduct,
  slugify,
} from "../../lib/admin";
import Logo from "../../components/layout/Logo";

const CATEGORIES = ["Living Room", "Bedroom", "Dining", "Tables"];

const empty = {
  name: "",
  slug: "",
  category: "Living Room",
  price: "",
  image: "",
  tag: "",
  description: "",
  material: "Solid wood",
  finish: "Natural",
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
        setForm({
          id: found.id,
          name: found.name || "",
          slug: found.slug || "",
          category: found.category || "Living Room",
          price: found.price ?? "",
          image: found.image || found.image_url || "",
          tag: found.tag || "",
          description: found.description || "",
          material: found.material || "Solid wood",
          finish: found.finish || "Natural",
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
      update("image", url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await adminUpsertProduct({
        ...form,
        price: Number(form.price) || 0,
        slug: form.slug || slugify(form.name),
      });
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
      <div className="mt-3 flex items-center gap-3">
        <Logo to={null} size="sm" />
        <h1 className="text-2xl font-bold text-[#111827]">
          {isNew ? "Add product" : "Edit product"}
        </h1>
      </div>

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
            Product image
          </span>

          <div className="mt-2 rounded-2xl border border-dashed border-[#d6c7b4] bg-[#faf8f4] p-4">
            {form.image ? (
              <div className="mb-4 overflow-hidden rounded-xl bg-white">
                <img
                  src={form.image}
                  alt="Preview"
                  className="mx-auto max-h-56 w-full object-contain"
                />
              </div>
            ) : (
              <div className="mb-4 flex h-40 flex-col items-center justify-center gap-2 text-[#9ca3af]">
                <ImageIcon size={28} strokeWidth={1.5} />
                <p className="text-sm">No image yet</p>
              </div>
            )}

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#5c4033] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#4a3428]">
              <Upload size={16} />
              {uploading ? "Uploading…" : "Upload image"}
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

          <label className="mt-4 block">
            <span className="text-xs text-[#6b7280]">
              Or paste image URL / path
            </span>
            <input
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
              placeholder="/images/products/bedroom/bead13.avif"
              className={field}
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-[#374151]">Tag</span>
          <input
            value={form.tag}
            onChange={(e) => update("tag", e.target.value)}
            placeholder="New / Bestseller"
            className={field}
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-[#374151]">
              Material
            </span>
            <input
              value={form.material}
              onChange={(e) => update("material", e.target.value)}
              className={field}
            />
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
