import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  loadCoupons,
  saveCoupons,
  normalizeCode,
  isCouponLive,
} from "../../lib/coupons";
import { AdminHeader, card, td, th } from "./adminUi.jsx";

const emptyForm = {
  code: "",
  label: "",
  percent: "10",
  min_subtotal: "",
  starts_on: "",
  ends_on: "",
  active: true,
};

function statusLabel(coupon) {
  if (!coupon.active) return "Off";
  if (!isCouponLive(coupon)) return "Scheduled / expired";
  return "Live";
}

function AdminCoupons() {
  const [list, setList] = useState(() => loadCoupons());
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  function persist(next) {
    setList(saveCoupons(next));
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleAdd(e) {
    e.preventDefault();
    setError("");
    const code = normalizeCode(form.code);
    const percent = Number(form.percent);
    if (!code) {
      setError("Enter a coupon code.");
      return;
    }
    if (!percent || percent <= 0 || percent > 90) {
      setError("Percent should be between 1 and 90.");
      return;
    }
    if (list.some((item) => normalizeCode(item.code) === code)) {
      setError("That code already exists.");
      return;
    }
    if (form.starts_on && form.ends_on && form.ends_on < form.starts_on) {
      setError("End date must be on or after the start date.");
      return;
    }

    persist([
      {
        id: `c-${Date.now()}`,
        code,
        label: String(form.label || "").trim(),
        percent,
        min_subtotal: Number(form.min_subtotal) || 0,
        starts_on: form.starts_on || "",
        ends_on: form.ends_on || "",
        active: Boolean(form.active),
      },
      ...list,
    ]);
    setForm(emptyForm);
  }

  function toggleActive(id) {
    persist(
      list.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  }

  function remove(id) {
    if (!window.confirm("Delete this coupon?")) return;
    persist(list.filter((item) => item.id !== id));
  }

  const field =
    "mt-1.5 w-full border border-[#eadfd3] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6B4423]/50";

  return (
    <div>
      <AdminHeader
        title="Coupons"
        subtitle="Create festival codes (Diwali, Holi, New Year). While a coupon is live, customers see the code on the green bar at the top of the site and can tap it in the cart."
      />

      <form
        onSubmit={handleAdd}
        className={`${card} mb-6 grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4`}
      >
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-[#6B4423]">
            Code
          </span>
          <input
            value={form.code}
            onChange={(e) => update("code", e.target.value.toUpperCase())}
            className={field}
            placeholder="DIWALI20"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-[#6B4423]">
            Festival / label
          </span>
          <input
            value={form.label}
            onChange={(e) => update("label", e.target.value)}
            className={field}
            placeholder="Diwali 2026"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-[#6B4423]">
            Discount %
          </span>
          <input
            type="number"
            min="1"
            max="90"
            value={form.percent}
            onChange={(e) => update("percent", e.target.value)}
            className={field}
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-[#6B4423]">
            Min. order ₹ (optional)
          </span>
          <input
            type="number"
            min="0"
            value={form.min_subtotal}
            onChange={(e) => update("min_subtotal", e.target.value)}
            className={field}
            placeholder="0"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-[#6B4423]">
            Starts on
          </span>
          <input
            type="date"
            value={form.starts_on}
            onChange={(e) => update("starts_on", e.target.value)}
            className={field}
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-[#6B4423]">
            Ends on
          </span>
          <input
            type="date"
            value={form.ends_on}
            onChange={(e) => update("ends_on", e.target.value)}
            className={field}
          />
        </label>
        <label className="flex items-center gap-2 sm:pt-7">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => update("active", e.target.checked)}
          />
          <span className="text-sm">Active</span>
        </label>
        <div className="flex items-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#4a2c18] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white"
          >
            <Plus size={14} /> Add coupon
          </button>
        </div>
        {error ? (
          <p className="text-sm text-red-700 sm:col-span-2 lg:col-span-4">
            {error}
          </p>
        ) : null}
      </form>

      <div className={`${card} overflow-x-auto`}>
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-[#eadfd3] bg-[#faf8f4]">
              <th className={th}>Code</th>
              <th className={th}>Festival</th>
              <th className={th}>Off</th>
              <th className={th}>Dates</th>
              <th className={th}>Status</th>
              <th className={th}></th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td className={`${td} text-[#6b7280]`} colSpan={6}>
                  No coupons yet. Add one above for the next festival.
                </td>
              </tr>
            ) : (
              list.map((coupon) => (
                <tr key={coupon.id} className="border-b border-[#eadfd3]/80">
                  <td className={`${td} font-semibold`}>{coupon.code}</td>
                  <td className={td}>{coupon.label || "—"}</td>
                  <td className={td}>
                    {coupon.percent}%
                    {coupon.min_subtotal
                      ? ` · min ₹${Number(coupon.min_subtotal).toLocaleString("en-IN")}`
                      : ""}
                  </td>
                  <td className={td}>
                    {coupon.starts_on || coupon.ends_on
                      ? `${coupon.starts_on || "…"} → ${coupon.ends_on || "…"}`
                      : "Always (while on)"}
                  </td>
                  <td className={td}>{statusLabel(coupon)}</td>
                  <td className={`${td} text-right whitespace-nowrap`}>
                    <button
                      type="button"
                      onClick={() => toggleActive(coupon.id)}
                      className="mr-3 text-xs uppercase tracking-wider text-[#6B4423]"
                    >
                      {coupon.active ? "Turn off" : "Turn on"}
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(coupon.id)}
                      className="inline-flex text-[#9ca3af] hover:text-red-700"
                      aria-label={`Delete ${coupon.code}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCoupons;
