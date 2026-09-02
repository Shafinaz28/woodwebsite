import { useAuth } from "../../context/AuthContext";
import { isSupabaseConfigured } from "../../lib/supabase";
import { AdminHeader, card } from "./adminUi.jsx";

const field =
  "mt-1 w-full rounded-lg border border-[#eadfd3] bg-[#f9fafb] px-3 py-2 text-sm text-[#6b7280]";

function AdminSettings() {
  const { user } = useAuth();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "—";

  return (
    <div>
      <AdminHeader
        title="Settings"
        subtitle="Store details used on the site. Change contact copy in Footer and Contact pages."
      />
      <div className={`${card} max-w-xl space-y-4 p-5`}>
        <label className="block text-sm">
          Store name
          <input readOnly value="Arileon Furniture" className={field} />
        </label>
        <label className="block text-sm">
          Signed-in admin
          <input readOnly value={user?.email || "—"} className={field} />
        </label>
        <label className="block text-sm">
          VITE_ADMIN_EMAIL
          <input readOnly value={adminEmail} className={field} />
        </label>
        <label className="block text-sm">
          Phone
          <input readOnly value="+91 99865 87575" className={field} />
        </label>
        <label className="block text-sm">
          Email
          <input readOnly value="arileoninfo@gmail.com" className={field} />
        </label>
        <label className="block text-sm">
          Address
          <textarea
            readOnly
            rows={3}
            value="Wood Masters, 1st Cross, Nelagadarana Halli, Nagasandra Post, Bengaluru 560073"
            className={field}
          />
        </label>
        <p className="text-xs text-[#6b7280]">
          Supabase: {isSupabaseConfigured ? "connected" : "not configured"}
        </p>
      </div>
    </div>
  );
}

export default AdminSettings;
