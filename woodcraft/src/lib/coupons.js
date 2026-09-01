export const COUPONS_KEY = "arileon_coupons";

const DEFAULT_COUPONS = [
  { id: "default-welcome10", code: "WELCOME10", percent: 10, active: true },
];

function normalize(list) {
  if (!Array.isArray(list)) return [];
  return list
    .map((item) => ({
      id: item.id || Date.now(),
      code: String(item.code || "")
        .trim()
        .toUpperCase(),
      percent: Number(item.percent) || 0,
      active: item.active !== false,
    }))
    .filter((item) => item.code && item.percent > 0);
}

export function loadCoupons() {
  try {
    const list = normalize(JSON.parse(localStorage.getItem(COUPONS_KEY) || "[]"));
    const hasWelcome = list.some((item) => item.code === "WELCOME10");
    if (!list.length || !hasWelcome) {
      const merged = hasWelcome ? list : [...DEFAULT_COUPONS, ...list];
      return saveCoupons(merged);
    }
    return list;
  } catch {
    saveCoupons(DEFAULT_COUPONS);
    return [...DEFAULT_COUPONS];
  }
}

export function saveCoupons(list) {
  const next = normalize(list);
  localStorage.setItem(COUPONS_KEY, JSON.stringify(next));
  return next;
}

export function findCoupon(code) {
  const needle = String(code || "").trim().toUpperCase();
  if (!needle) return null;
  return loadCoupons().find((item) => item.active && item.code === needle) || null;
}

export function discountFromCoupon(subtotal, coupon) {
  const percent = Number(coupon?.percent) || 0;
  if (!percent) return 0;
  return Math.round((Number(subtotal) || 0) * (percent / 100));
}
