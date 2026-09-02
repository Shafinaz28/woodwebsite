export const COUPONS_KEY = "arileon_coupons";

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function normalizeCode(code) {
  return String(code || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");
}

export function loadCoupons() {
  try {
    const raw = localStorage.getItem(COUPONS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveCoupons(list) {
  const next = Array.isArray(list) ? list : [];
  localStorage.setItem(COUPONS_KEY, JSON.stringify(next));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("arileon-coupons"));
  }
  return next;
}

export function getLiveCoupons() {
  return loadCoupons().filter((item) => isCouponLive(item));
}

export function isCouponLive(coupon, when = todayISO()) {
  if (!coupon?.active) return false;
  if (coupon.starts_on && when < coupon.starts_on) return false;
  if (coupon.ends_on && when > coupon.ends_on) return false;
  return true;
}

export function findCoupon(code) {
  const needle = normalizeCode(code);
  if (!needle) return null;
  return (
    loadCoupons().find(
      (item) => normalizeCode(item.code) === needle && isCouponLive(item)
    ) || null
  );
}

export function discountFromCoupon(subtotal, coupon) {
  const percent = Number(coupon?.percent) || 0;
  const min = Number(coupon?.min_subtotal) || 0;
  const amount = Number(subtotal) || 0;
  if (!coupon || percent <= 0 || amount < min) return 0;
  return Math.round((amount * percent) / 100);
}

export function validateCoupon(code, subtotal) {
  const needle = normalizeCode(code);
  const amount = Number(subtotal) || 0;
  const stored = loadCoupons().find(
    (item) => normalizeCode(item.code) === needle
  );

  if (!stored) {
    return { ok: false, error: "This coupon code is not valid." };
  }
  if (!stored.active) {
    return { ok: false, error: "This coupon is turned off." };
  }
  if (!isCouponLive(stored)) {
    return {
      ok: false,
      error: "This coupon is not valid on today's date.",
    };
  }

  const min = Number(stored.min_subtotal) || 0;
  if (amount < min) {
    return {
      ok: false,
      error: `Add items worth ₹${min.toLocaleString("en-IN")} or more to use this coupon.`,
    };
  }

  return {
    ok: true,
    coupon: stored,
    discount: discountFromCoupon(amount, stored),
  };
}
