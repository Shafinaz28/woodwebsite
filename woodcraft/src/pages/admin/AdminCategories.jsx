import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { adminFetchProducts } from "../../lib/admin";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../lib/categories";
import { AdminHeader, card, td, th } from "./adminUi.jsx";

function AdminCategories() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [editingName, setEditingName] = useState(null);
  const [draftName, setDraftName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    adminFetchProducts()
      .then((data) => {
        if (!active) return;
        setProducts(data || []);
        setCategories(getCategories());
      })
      .catch(() => {
        if (!active) return;
        setProducts([]);
        setCategories(getCategories());
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const rows = useMemo(() => {
    const map = new Map();
    for (const p of products) {
      const name = p.category || "Uncategorised";
      map.set(name, (map.get(name) || 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [products]);

  const handleAddCategory = () => {
    const value = newName.trim();
    if (!value) {
      setError("Category name is required.");
      return;
    }

    const next = addCategory(value);
    setCategories(next);
    setNewName("");
    setError("");
  };

  const handleEditStart = (category) => {
    setEditingName(category);
    setDraftName(category);
    setError("");
  };

  const handleSaveEdit = () => {
    const value = draftName.trim();
    if (!value) {
      setError("Category name cannot be empty.");
      return;
    }

    const next = updateCategory(editingName, value);
    setCategories(next);
    setEditingName(null);
    setDraftName("");
    setError("");
  };

  const handleDeleteCategory = (category) => {
    const next = deleteCategory(category);
    setCategories(next);
    setEditingName(null);
    setDraftName("");
    setError("");
  };

  return (
    <div>
      <AdminHeader
        title="Categories"
        subtitle={loading ? "Loading…" : `${rows.length} categories from your products`}
      />

      <div className={`${card} mb-6 p-4`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Add a category"
            className="w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm outline-none focus:border-[#5c4033]/40 focus:ring-2 focus:ring-[#5c4033]/10"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5c4033] px-4 py-3 text-sm font-medium text-white hover:bg-[#4a3428]"
          >
            <Plus size={16} />
            Add Category
          </button>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        )}
      </div>

      <div className={`${card} overflow-x-auto`}>
        <table className="w-full min-w-[640px]">
          <thead className="bg-[#f7f4ef]">
            <tr>
              <th className={th}>Category</th>
              <th className={th}>Products</th>
              <th className={`${th} text-right`}>Actions</th>
              <th className={`${th} text-right`}>Shop</th>
            </tr>
          </thead>
          <tbody>
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={4} className={`${td} text-[#6b7280]`}>
                  No products in Supabase yet. Add products first.
                </td>
              </tr>
            )}

            {categories.map((name) => {
              const count = rows.find(([rowName]) => rowName === name)?.[1] || 0;
              const isEditing = editingName === name;

              return (
                <tr key={name} className="border-t border-[#eadfd3] align-middle">
                  <td className={`${td} font-medium`}>
                    {isEditing ? (
                      <input
                        value={draftName}
                        onChange={(e) => setDraftName(e.target.value)}
                        className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm outline-none focus:border-[#5c4033]/40 focus:ring-2 focus:ring-[#5c4033]/10"
                      />
                    ) : (
                      name
                    )}
                  </td>
                  <td className={td}>{count}</td>
                  <td className={`${td} text-right`}>
                    {isEditing ? (
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={handleSaveEdit}
                          className="rounded-lg bg-[#5c4033] p-2 text-white hover:bg-[#4a3428]"
                          aria-label="Save category"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingName(null);
                            setDraftName("");
                          }}
                          className="rounded-lg border border-[#e5e7eb] bg-white p-2 text-[#4b5563] hover:bg-[#f9fafb]"
                          aria-label="Cancel edit"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditStart(name)}
                          className="rounded-lg border border-[#e5e7eb] bg-white p-2 text-[#4b5563] hover:bg-[#f9fafb]"
                          aria-label={`Edit ${name}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(name)}
                          className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-100"
                          aria-label={`Delete ${name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className={`${td} text-right`}>
                    <Link
                      to={`/admin/categories/${encodeURIComponent(name)}`}
                      className="text-xs uppercase tracking-wider text-[#6B4423]"
                    >
                      Edit →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCategories;
