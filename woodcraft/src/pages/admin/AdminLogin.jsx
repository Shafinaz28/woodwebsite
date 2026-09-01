import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/layout/Logo";

function AdminLogin() {
  const {
    user,
    isAdmin,
    loading,
    signIn,
    isSupabaseConfigured,
  } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#f7f3ec] px-4 py-10 text-[#2f2a26]">
      <div className="mx-auto w-full max-w-[420px]">
        <div className="mb-8 flex justify-center">
          <Logo to="/" size="lg" align="center" className="justify-center" />
        </div>

        <div className="rounded-2xl border border-[#eadfd3] bg-white px-6 py-8 shadow-[0_12px_40px_rgba(47,42,38,0.06)] sm:px-8">
          <div className="text-center">
            <h1 className="font-display text-[2.15rem] leading-none text-[#2f2a26]">
              Welcome Back.
            </h1>
            <p className="mt-3 text-[15px] text-[#8b8178]">
              Sign in to access your admin dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
          {!isSupabaseConfigured && (
            <p className="mb-5 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">
              Supabase is not configured on this host. In Vercel → Project →
              Settings → Environment Variables, add{" "}
              <code className="text-xs">VITE_SUPABASE_URL</code>,{" "}
              <code className="text-xs">VITE_SUPABASE_PUBLISHABLE_KEY</code>{" "}
              (or <code className="text-xs">VITE_SUPABASE_ANON_KEY</code>), and{" "}
              <code className="text-xs">VITE_ADMIN_EMAIL</code>, then{" "}
              <strong>Redeploy</strong>. Locally, put the same keys in{" "}
              <code className="text-xs">.env.local</code>.
            </p>
          )}

          {error && (
            <p className="mb-5 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">
              {error}
            </p>
          )}

          <label className="block">
            <span className="text-sm font-semibold text-[#3f3a36]">
              Email Address
            </span>
            <div className="relative mt-2">
              <Mail
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a39a90]"
              />
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="admin@arileon.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#ddd5cb] bg-white py-3.5 pl-11 pr-3 text-sm text-[#2f2a26] outline-none placeholder:text-[#b0a79e] focus:border-[#5c4033]/45 focus:ring-2 focus:ring-[#5c4033]/10"
              />
            </div>
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-[#3f3a36]">Password</span>
            <div className="relative mt-2">
              <Lock
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a39a90]"
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#ddd5cb] bg-white py-3.5 pl-11 pr-11 text-sm text-[#2f2a26] outline-none placeholder:text-[#b0a79e] focus:border-[#5c4033]/45 focus:ring-2 focus:ring-[#5c4033]/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a39a90] hover:text-[#5c4033]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          <div className="mt-4 flex items-center justify-between gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-[#3f3a36]">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="size-4 rounded border-[#cfc6bb] accent-[#5c4033]"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() =>
                setError(
                  "Reset your password in Supabase → Authentication → Users."
                )
              }
              className="text-sm font-medium text-[#5c4033] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting || !isSupabaseConfigured}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#5c4033] py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#4a3428] disabled:opacity-50"
          >
            {submitting ? "Signing in…" : "Sign In"}
            {!submitting && <ArrowRight size={16} strokeWidth={2.25} />}
          </button>
        </form>
        </div>

        <Link
          to="/"
          className="mt-6 block text-center text-xs text-[#8b8178] hover:text-[#5c4033]"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  );
}

export default AdminLogin;
