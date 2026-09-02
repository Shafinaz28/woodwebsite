import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  fetchContactMessages,
  deleteContactMessage,
} from "../../lib/contactMessages";
import { AdminHeader, card, td, th } from "./adminUi.jsx";

function formatWhen(value) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return String(value);
  }
}

function AdminEnquiries() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    const data = await fetchContactMessages();
    setRows(data);
  }

  useEffect(() => {
    let active = true;
    load()
      .catch((err) => {
        if (active) setError(err.message || "Could not load enquiries");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await deleteContactMessage(id);
      await load();
    } catch (err) {
      setError(err.message || "Could not delete");
    }
  }

  return (
    <div>
      <AdminHeader
        title="Enquiries"
        subtitle={
          loading
            ? "Loading…"
            : `${rows.length} contact form ${rows.length === 1 ? "message" : "messages"}`
        }
      />
      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      <div className={`${card} overflow-x-auto`}>
        <table className="w-full min-w-[860px]">
          <thead className="bg-[#f7f4ef]">
            <tr>
              <th className={th}>When</th>
              <th className={th}>Name</th>
              <th className={th}>Email</th>
              <th className={th}>Phone</th>
              <th className={th}>Subject</th>
              <th className={th}>Message</th>
              <th className={th}></th>
            </tr>
          </thead>
          <tbody>
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={7} className={`${td} text-[#6b7280]`}>
                  No enquiries yet. They appear when someone submits the
                  contact form.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[#eadfd3] align-top">
                <td className={`${td} whitespace-nowrap text-[#6b7280]`}>
                  {formatWhen(row.created_at)}
                </td>
                <td className={`${td} font-medium`}>{row.name || "—"}</td>
                <td className={td}>{row.email || "—"}</td>
                <td className={td}>{row.phone || "—"}</td>
                <td className={td}>{row.subject || "—"}</td>
                <td className={`${td} max-w-sm whitespace-pre-wrap`}>
                  {row.message || "—"}
                </td>
                <td className={td}>
                  <button
                    type="button"
                    onClick={() => handleDelete(row.id)}
                    className="inline-flex items-center gap-1 text-xs text-red-700 hover:underline"
                  >
                    <Trash2 size={14} /> Delete
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

export default AdminEnquiries;
