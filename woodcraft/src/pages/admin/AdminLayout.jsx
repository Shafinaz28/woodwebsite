import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, Link, NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Tags,
  Users,
  Ticket,
  Star,
  Boxes,
  Image as ImageIcon,
  FileText,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  UserRound,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/layout/Logo";

const navItems = [
  { to: "/admin", end: true, label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/orders", end: false, label: "Orders", icon: ShoppingBag },
  { to: "/admin/products", end: false, label: "Products", icon: Package },
  { to: null, label: "Categories", icon: Tags },
  { to: null, label: "Customers", icon: Users },
  { to: null, label: "Coupons", icon: Ticket },
  { to: null, label: "Reviews", icon: Star },
  { to: null, label: "Stock", icon: Boxes },
  { to: null, label: "Media", icon: ImageIcon },
  { to: null, label: "Pages", icon: FileText },
  { to: null, label: "Settings", icon: Settings },
];

function AdminLayout() {
  const { user, loading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    if (!profileOpen) return;
    function onDocClick(e) {
      if (!profileRef.current?.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [profileOpen]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#f4f5f7]">
        <div className="text-center">
          <Logo to={null} size="lg" />
          <p className="mt-4 text-sm text-[#6b7280]">Loading admin…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#f4f5f7] px-5 text-center">
        <div>
          <Logo to={null} size="lg" className="mx-auto justify-center" />
          <h1 className="mt-6 font-display text-3xl font-semibold">
            Access denied
          </h1>
          <p className="mt-3 text-sm text-[#6b7280]">
            Signed in as {user.email}, but this account is not an admin.
          </p>
          <button
            type="button"
            onClick={async () => {
              await signOut();
              navigate("/admin/login");
            }}
            className="mt-6 rounded-xl px-6 py-3 bg-[#5c4033] text-white text-sm"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login");
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-medium transition ${
      isActive
        ? "bg-[#6b4a36] text-white shadow-sm"
        : "text-white/70 hover:bg-white/8 hover:text-white"
    }`;

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 px-4 pt-6 pb-5 flex justify-center">
        <Logo to="/admin" size="md" invert />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map(({ to, end, label, icon: Icon }) =>
          to ? (
            <NavLink
              key={label}
              to={to}
              end={end}
              className={linkClass}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={17} strokeWidth={1.75} />
              {label}
            </NavLink>
          ) : (
            <span
              key={label}
              className="flex cursor-default items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] text-white/35"
              title="Coming soon"
            >
              <Icon size={17} strokeWidth={1.75} />
              {label}
            </span>
          )
        )}
      </nav>

      <div className="mx-3 mb-5 rounded-2xl bg-[#3d2a20] p-4 flex flex-col items-center text-center">
        <Logo to={null} size="sm" invert />
        <p className="mt-3 text-[13px] font-semibold text-white leading-snug">
          Premium Furniture.
          <br />
          Timeless Designs.
        </p>
        <p className="mt-3 text-[10px] text-white/40">© 2026 Arileon</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-[#1f2937] md:flex">
      <aside className="hidden md:flex md:w-[248px] md:shrink-0 md:flex-col bg-[#4a3428]">
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative z-10 flex h-full w-[270px] flex-col bg-[#4a3428]">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 z-10 text-white/70"
            >
              <X size={20} />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-[#e8eaed] bg-white/95 backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="rounded-lg p-2 text-[#4a3428] hover:bg-[#f4f5f7] md:hidden"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
              <Logo to="/admin" size="sm" className="md:hidden" />
              <div className="hidden sm:flex items-center gap-3 min-w-0">
                <Logo to="/admin" size="sm" className="hidden md:inline-flex" />
                <p className="truncate text-[15px] font-semibold text-[#1f2937]">
                  Welcome back, Admin! 👋
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <label className="relative hidden md:block">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-56 rounded-full border border-[#e5e7eb] bg-[#f9fafb] py-2 pl-9 pr-4 text-sm outline-none focus:border-[#c4a47c] focus:bg-white"
                />
              </label>

              <button
                type="button"
                className="relative rounded-full p-2 text-[#6b7280] hover:bg-[#f4f5f7]"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#ef4444]" />
              </button>

              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-[#f4f5f7]"
                  aria-expanded={profileOpen}
                  aria-haspopup="menu"
                >
                  <span className="grid size-8 place-items-center rounded-full bg-[#5c4033] text-white">
                    <UserRound size={16} strokeWidth={1.75} />
                  </span>
                  <span className="hidden text-sm font-medium sm:inline">
                    Admin
                  </span>
                  <ChevronDown size={14} className="text-[#9ca3af]" />
                </button>

                {profileOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-[#e5e7eb] bg-white p-2 shadow-lg"
                  >
                    <div className="px-3 py-2 border-b border-[#f0f1f3] mb-1">
                      <Logo to={null} size="sm" />
                    </div>
                    <p className="truncate px-3 py-2 text-xs text-[#6b7280]">
                      {user.email}
                    </p>
                    <Link
                      to="/"
                      className="block rounded-lg px-3 py-2 text-sm hover:bg-[#f4f5f7]"
                      onClick={() => setProfileOpen(false)}
                    >
                      View site
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#b91c1c] hover:bg-red-50"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-5 md:px-6 md:py-6 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
