import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Save, ArrowLeft, Upload, Pencil } from "lucide-react";
import { adminFetchProducts } from "../../lib/admin";
import { getCategoryDetails, saveCategoryDetails } from "../../lib/categories";

function AdminCategoryEditor() {
  const { category } = useParams();
  const navigate = useNavigate();
  const decoded = decodeURIComponent(category || "");
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [form, setForm] = useState({
    name: decoded,
    slug: "",
    image: "",
    description: "",
    shortDescription: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const details = getCategoryDetails(decoded);
    setForm({
      name: details.name || decoded,
      slug: details.slug || "",
      image: details.image || "",
      description: details.description || "",
      shortDescription: details.shortDescription || "",
    });
  }, [decoded]);

  useEffect(() => {
    let active = true;

    adminFetchProducts()
      .then((data) => {
        if (!active) return;
        setProducts(data || []);
      })
      .catch(() => {
        if (!active) return;
        setProducts([]);
      })
      .finally(() => {
        if (active) setLoadingProducts(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const categoryProducts = useMemo(() => {
    const target = decoded.trim().toLowerCase();
    return products.filter((product) => {
      const categoryName = String(product.category || "").trim().toLowerCase();
      return categoryName === target;
    });
  }, [decoded, products]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    const name = form.name.trim();
    if (!name) {
      setError("Category name is required.");
      return;
    }

    saveCategoryDetails({
      name,
      slug: form.slug || "",
      image: form.image,
      description: form.description,
      shortDescription: form.shortDescription,
    });

    navigate("/admin/categories");
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateField("image", String(reader.result || ""));
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-5 flex items-center gap-3">
        <Link to="/admin/categories" className="inline-flex items-center gap-2 text-sm font-medium text-[#5c4033] hover:underline">
          <ArrowLeft size={16} />
          Back to Categories
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-[#111827]">Edit Category</h1>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5 rounded-2xl border border-[#eadfd3] bg-white p-5 shadow-sm">
          <label className="block">
            <span className="text-sm font-semibold text-[#374151]">Category name</span>
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm outline-none focus:border-[#5c4033]/40 focus:ring-2 focus:ring-[#5c4033]/10"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[#374151]">Slug</span>
            <input
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm outline-none focus:border-[#5c4033]/40 focus:ring-2 focus:ring-[#5c4033]/10"
            />
          </label>

          <div>
            <span className="text-sm font-semibold text-[#374151]">Category image</span>
            <div className="mt-2 flex items-center gap-4 rounded-2xl border border-dashed border-[#d6c7b4] bg-[#faf8f4] p-4">
              {form.image ? (
                <img src={form.image} alt={form.name} className="h-24 w-24 rounded-xl object-cover" />
              ) : (
                <div className="grid h-24 w-24 place-items-center rounded-xl bg-white text-[#9ca3af]">
                  <Upload size={20} />
                </div>
              )}

              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#5c4033] px-4 py-2 text-sm font-medium text-white hover:bg-[#4a3428]">
                <Upload size={16} />
                Upload image
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-[#374151]">Short description</span>
            <input
              value={form.shortDescription}
              onChange={(e) => updateField("shortDescription", e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm outline-none focus:border-[#5c4033]/40 focus:ring-2 focus:ring-[#5c4033]/10"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[#374151]">Description</span>
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={6}
              className="mt-2 w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm outline-none focus:border-[#5c4033]/40 focus:ring-2 focus:ring-[#5c4033]/10"
            />
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/admin/categories")}
              className="rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl bg-[#5c4033] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#4a3428]"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-[#eadfd3] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#111827]">Products in this category</h2>
            <span className="rounded-full bg-[#f7f4ef] px-2.5 py-1 text-xs font-semibold text-[#5c4033]">
              {categoryProducts.length}
            </span>
          </div>

          {loadingProducts ? (
            <p className="text-sm text-[#6b7280]">Loading products…</p>
          ) : categoryProducts.length === 0 ? (
            <p className="text-sm text-[#6b7280]">No products in this category yet.</p>
          ) : (
            <div className="space-y-3">
              {categoryProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-3 rounded-xl border border-[#eadfd3] bg-[#faf8f4] p-3">
                  <img
                    src={product.image || "/images/logo.avif"}
                    alt={product.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-[#111827]">{product.name}</p>
                    <p className="text-xs text-[#6b7280]">
                      {product.category} • ₹{Number(product.price || 0).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <Link
                    to={`/admin/products/${product.id}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#e5e7eb] bg-white px-2.5 py-2 text-xs font-medium text-[#374151] hover:bg-[#f9fafb]"
                  >
                    <Pencil size={12} />
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminCategoryEditor;
