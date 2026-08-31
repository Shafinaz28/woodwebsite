import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AdminHeader, card, td, th } from "./adminUi.jsx";

const KEY = "arileon_coupons";

function loadCoupons() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function AdminCoupons() {
  const [list, setList] = useState([]);
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("10");

  useEffect(() => {
    setList(loadCoupons());
  }, []);

  function save(next) {
    setList(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function add(e) {
    e.preventDefault();
    const value = code.trim().toUpperCase();
    if (!value) return;
    if (list.some((c) => c.code === value)) {
      alert("That code already exists");
      return;
    }
    save([
      { id: Date.now(), code: value, percent: Number(percent) || 0, active: true },
      ...list,
    ]);
    setCode("");
  }

  return (
    <div>
      <AdminHeader
        title="Coupons"
        subtitle="Discount codes stored on this browser until you connect a coupons table"
      />

      <form onSubmit={add} className={`${card} mb-6 flex flex-wrap items-end gap-3 p-4`}>
        <label className="text-sm">
          <span className="mb-1 block text-xs text-[#6b7280]">Code</span>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="WELCOME10"
            className="rounded-lg border border-[#eadfd3] px-3 py-2"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-xs text-[#6b7280]">% off</span>
          <input
            type="number"
            min="1"
            max="90"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            className="w-24 rounded-lg border border-[#eadfd3] px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-[#434f23] px-4 py-2 text-[11px] uppercase tracking-wider text-white"
        >
          <Plus size={14} /> Add coupon
        </button>
      </form>

      <div className={`${card} overflow-x-auto`}>
        <table className="w-full min-w-[480px]">
          <thead className="bg-[#f7f4ef]">
            <tr>
              <th className={th}>Code</th>
              <th className={th}>Discount</th>
              <th className={th}>Status</th>
              <th className={th} />
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr>
                <td colSpan={4} className={`${td} text-[#6b7280]`}>
                  No coupons yet. Add one above.
                </td>
              </tr>
            )}
            {list.map((c) => (
              <tr key={c.id} className="border-t border-[#eadfd3]">
                <td className={`${td} font-medium`}>{c.code}</td>
                <td className={td}>{c.percent}%</td>
                <td className={td}>{c.active ? "Active" : "Off"}</td>
                <td className={`${td} text-right`}>
                  <button
                    type="button"
                    onClick={() => save(list.filter((x) => x.id !== c.id))}
                    className="p-2 text-red-700 hover:bg-red-50"
                    aria-label="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCoupons;
