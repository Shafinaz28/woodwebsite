import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/layout/Logo";

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.1 5.5l.1-.1 6.2 5.2C39.2 36.3 44 32 44 24c0-1.3-.1-2.5-.4-3.5z"
      />
    </svg>
  );
}

function AdminLogin() {
  const {
    user,
    isAdmin,
    loading,
    signIn,
    signInWithGoogle,
    isSupabaseConfigured,
  } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

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

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(
        err.message ||
          "Google sign-in is not enabled. Turn it on in Supabase → Authentication → Providers."
      );
      setGoogleLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#2f2a26] grid place-items-center px-5 py-12">
      <div className="w-full max-w-[440px]">
        {/* Brand */}
        <div className="flex justify-center">
          <Logo to={null} size="lg" />
        </div>

        <div className="mt-9 text-center">
          <h1 className="font-display text-[2.35rem] leading-none text-[#2f2a26]">
            Welcome Back.
          </h1>
          <p className="mt-3 text-[15px] text-[#8b8178]">
            Sign in to access your admin dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-9">
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

        <div className="mt-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#ddd5cb]" />
          <span className="text-xs text-[#9a9289]">or</span>
          <span className="h-px flex-1 bg-[#ddd5cb]" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoading || !isSupabaseConfigured}
          className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl border border-[#ddd5cb] bg-white py-3.5 text-sm font-medium text-[#3f3a36] transition hover:bg-[#faf8f4] disabled:opacity-50"
        >
          <GoogleMark />
          {googleLoading ? "Redirecting…" : "Sign in with Google"}
        </button>

        <div className="mt-10 flex items-center justify-center gap-2 text-[12px] text-[#9a9289]">
          <span className="grid size-5 place-items-center rounded-full border border-[#ddd5cb] text-[#8a7460]">
            <Shield size={11} strokeWidth={2} />
          </span>
          Secure access protected by 256-bit SSL encryption
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
