import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  ShoppingBag,
  IndianRupee,
  Users,
  Package,
  Plus,
  Tags,
  TicketPercent,
  Image,
  Eye,
  CalendarDays,
  ArrowUpRight,
  Sofa,
  BedDouble,
  UtensilsCrossed,
  Lamp,
} from "lucide-react";
import { adminFetchOrders, adminFetchProducts } from "../../lib/admin";
import { getProductImage } from "../../lib/catalog";
import { products as localProducts } from "../../data/products";
import Logo from "../../components/layout/Logo";

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

function formatDate(value) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

function shortId(id) {
  const raw = String(id || "");
  if (raw.length <= 8) return `#${raw.toUpperCase()}`;
  return `#AR${raw.slice(0, 4).toUpperCase()}`;
}

function mergeOrders(remote = []) {
  const local = JSON.parse(localStorage.getItem("arileon_orders") || "[]");
  const merged = [...remote];
  for (const item of local) {
    if (!merged.some((o) => String(o.id) === String(item.id))) {
      merged.push(item);
    }
  }
  merged.sort(
    (a, b) =>
      new Date(b.created_at || 0).getTime() -
      new Date(a.created_at || 0).getTime()
  );
  return merged;
}

function statusStyle(status) {
  const s = String(status || "pending").toLowerCase();
  if (s === "paid" || s === "completed") {
    return "bg-[#dcfce7] text-[#166534]";
  }
  if (s === "processing" || s === "shipped") {
    return "bg-[#dbeafe] text-[#1d4ed8]";
  }
  if (s === "cancelled" || s === "failed") {
    return "bg-[#fee2e2] text-[#b91c1c]";
  }
  return "bg-[#ffedd5] text-[#c2410c]";
}

function statusLabel(status) {
  const s = String(status || "pending").toLowerCase();
  if (s === "paid") return "Completed";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ---------- Charts (SVG, no deps) ---------- */

function SalesAreaChart({ points }) {
  const w = 560;
  const h = 220;
  const padX = 28;
  const padY = 24;
  const values = points.map((p) => p.value);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = Math.max(max - min, 1);

  const coords = points.map((p, i) => {
    const x = padX + (i / Math.max(points.length - 1, 1)) * (w - padX * 2);
    const y = padY + (1 - (p.value - min) / span) * (h - padY * 2);
    return { x, y, ...p };
  });

  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
  const area = `${line} L ${coords.at(-1).x} ${h - padY} L ${coords[0].x} ${h - padY} Z`;
  const peak = coords.reduce((a, b) => (a.value >= b.value ? a : b));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[220px]">
      {[0, 1, 2, 3].map((i) => {
        const y = padY + ((h - padY * 2) * i) / 3;
        return (
          <line
            key={i}
            x1={padX}
            x2={w - padX}
            y1={y}
            y2={y}
            stroke="#eef0f3"
            strokeWidth="1"
          />
        );
      })}
      <path d={area} fill="url(#salesFill)" />
      <path d={line} fill="none" stroke="#5c4033" strokeWidth="2.5" strokeLinejoin="round" />
      {coords.map((c) => (
        <circle key={c.label} cx={c.x} cy={c.y} r="3.5" fill="#5c4033" />
      ))}
      <g>
        <rect
          x={peak.x - 34}
          y={peak.y - 34}
          width="68"
          height="24"
          rx="6"
          fill="#5c4033"
        />
        <text
          x={peak.x}
          y={peak.y - 18}
          textAnchor="middle"
          fill="white"
          fontSize="11"
          fontWeight="700"
        >
          {formatINR(peak.value)}
        </text>
      </g>
      {coords.map((c) => (
        <text
          key={`l-${c.label}`}
          x={c.x}
          y={h - 6}
          textAnchor="middle"
          fill="#9ca3af"
          fontSize="11"
        >
          {c.label}
        </text>
      ))}
      <defs>
        <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5c4033" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#5c4033" stopOpacity="0.02" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function DonutChart({ slices, total }) {
  const size = 160;
  const stroke = 22;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="relative mx-auto size-40">
      <svg viewBox={`0 0 ${size} ${size}`} className="size-full -rotate-90">
        {slices.map((slice) => {
          const len = total ? (slice.value / total) * c : 0;
          const el = (
            <circle
              key={slice.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={slice.color}
              strokeWidth={stroke}
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="text-2xl font-bold text-[#1f2937]">{total}</p>
          <p className="text-[11px] text-[#9ca3af]">Total</p>
        </div>
      </div>
    </div>
  );
}

function GrowthMiniChart() {
  const pts = [18, 22, 20, 28, 34, 31, 42, 48, 45, 58, 62, 70];
  const w = 280;
  const h = 90;
  const max = Math.max(...pts);
  const coords = pts.map((v, i) => {
    const x = (i / (pts.length - 1)) * w;
    const y = h - (v / max) * (h - 8) - 4;
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  });
  const line = coords.join(" ");
  const area = `${line} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[90px]">
      <path d={area} fill="url(#growFill)" />
      <path d={line} fill="none" stroke="#22c55e" strokeWidth="2.2" />
      <defs>
        <linearGradient id="growFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------- Page ---------- */

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [productList, orderList] = await Promise.all([
          adminFetchProducts(),
          adminFetchOrders(),
        ]);
        if (!active) return;
        setProducts(productList?.length ? productList : localProducts);
        setOrders(mergeOrders(orderList || []));
      } catch {
        if (active) {
          setProducts(localProducts);
          setOrders(mergeOrders([]));
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const analytics = useMemo(() => {
    const catalog = products.length ? products : localProducts;
    const hasLiveOrders = orders.length > 0;

    const completed = orders.filter((o) =>
      ["paid", "completed"].includes(String(o.status || "").toLowerCase())
    );
    const pending = orders.filter((o) =>
      ["pending", ""].includes(String(o.status || "pending").toLowerCase())
    );
    const processing = orders.filter((o) =>
      ["processing", "shipped"].includes(String(o.status || "").toLowerCase())
    );
    const cancelled = orders.filter((o) =>
      ["cancelled", "failed"].includes(String(o.status || "").toLowerCase())
    );

    const revenue = completed.reduce((s, o) => s + Number(o.total || 0), 0);
    const customers = new Set(
      orders.map((o) => o.customer_email || o.customer_name).filter(Boolean)
    ).size;

    // Sales points: last 7 days from orders, or demo curve
    const dayLabels = [];
    const dayValues = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dayLabels.push(
        d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
      );
      const dayTotal = orders
        .filter((o) => {
          const od = new Date(o.created_at || 0);
          return (
            od.getFullYear() === d.getFullYear() &&
            od.getMonth() === d.getMonth() &&
            od.getDate() === d.getDate()
          );
        })
        .reduce((s, o) => s + Number(o.total || 0), 0);
      dayValues.push(dayTotal);
    }

    const demoSales = [42000, 51000, 46800, 68540, 59200, 64000, 71000];
    const salesPoints = dayLabels.map((label, i) => ({
      label,
      value: hasLiveOrders ? dayValues[i] : demoSales[i],
    }));

    const statusSlices = hasLiveOrders
      ? [
          { label: "Completed", value: completed.length || 0, color: "#22c55e" },
          { label: "Processing", value: processing.length || 0, color: "#3b82f6" },
          { label: "Pending", value: pending.length || 0, color: "#f97316" },
          { label: "Cancelled", value: cancelled.length || 0, color: "#ef4444" },
        ]
      : [
          { label: "Completed", value: 72, color: "#22c55e" },
          { label: "Processing", value: 45, color: "#3b82f6" },
          { label: "Pending", value: 24, color: "#f97316" },
          { label: "Cancelled", value: 15, color: "#ef4444" },
        ];

    const statusTotal = statusSlices.reduce((s, x) => s + x.value, 0);

    // Top products from order line items, else top priced catalog
    const salesMap = new Map();
    for (const order of orders) {
      for (const item of order.items || []) {
        const key = item.name || item.slug || "Item";
        const prev = salesMap.get(key) || { name: key, sales: 0, image: item.image };
        prev.sales += Number(item.price || 0) * Number(item.quantity || 1);
        salesMap.set(key, prev);
      }
    }
    let topProducts = [...salesMap.values()]
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 4);

    if (!topProducts.length) {
      topProducts = [...catalog]
        .sort((a, b) => Number(b.price || 0) - Number(a.price || 0))
        .slice(0, 4)
        .map((p, i) => ({
          name: p.name,
          sales: Number(p.price || 0) * (12 - i * 2),
          image: getProductImage(p),
        }));
    } else {
      topProducts = topProducts.map((p) => {
        const match = catalog.find(
          (c) => c.name === p.name || c.slug === p.name
        );
        return {
          ...p,
          image: p.image || (match ? getProductImage(match) : ""),
        };
      });
    }

    const categoryCounts = {};
    for (const p of catalog) {
      const cat = p.category || "Other";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }
    const topCategories = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    const lowStock = [...catalog].slice(0, 3).map((p, i) => ({
      ...p,
      stock: [8, 5, 3][i] || 4,
      sku: `SKU-${String(p.id || p.slug || i)
        .toString()
        .slice(0, 6)
        .toUpperCase()}`,
    }));

    const rangeStart = new Date();
    rangeStart.setDate(rangeStart.getDate() - 6);
    const rangeLabel = `${rangeStart.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    })} – ${new Date().toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;

    return {
      hasLiveOrders,
      catalogCount: catalog.length,
      orderCount: hasLiveOrders ? orders.length : 156,
      revenue: hasLiveOrders ? revenue : 324750,
      customers: hasLiveOrders ? customers || orders.length : 892,
      salesPoints,
      statusSlices,
      statusTotal,
      topProducts,
      topCategories,
      lowStock,
      recent: hasLiveOrders
        ? orders.slice(0, 5)
        : [
            {
              id: "WC1256",
              customer_name: "Rahul Sharma",
              created_at: new Date().toISOString(),
              total: 45990,
              status: "completed",
            },
            {
              id: "WC1255",
              customer_name: "Priya Patel",
              created_at: new Date(Date.now() - 86400000).toISOString(),
              total: 28990,
              status: "processing",
            },
            {
              id: "WC1254",
              customer_name: "Amit Kumar",
              created_at: new Date(Date.now() - 172800000).toISOString(),
              total: 67990,
              status: "pending",
            },
            {
              id: "WC1253",
              customer_name: "Sneha Reddy",
              created_at: new Date(Date.now() - 259200000).toISOString(),
              total: 18990,
              status: "completed",
            },
            {
              id: "WC1252",
              customer_name: "Vikram Singh",
              created_at: new Date(Date.now() - 345600000).toISOString(),
              total: 52990,
              status: "cancelled",
            },
          ],
      rangeLabel,
    };
  }, [products, orders]);

  const categoryIcons = {
    "Living Room": Sofa,
    Bedroom: BedDouble,
    Dining: UtensilsCrossed,
    Tables: Lamp,
  };

  const cards = [
    {
      label: "Total Orders",
      value: loading ? "…" : analytics.orderCount,
      delta: "+18.5% from last week",
      icon: ShoppingBag,
      iconBg: "bg-[#fff7ed] text-[#ea580c]",
    },
    {
      label: "Total Revenue",
      value: loading ? "…" : formatINR(analytics.revenue),
      delta: "+24.3% from last week",
      icon: IndianRupee,
      iconBg: "bg-[#ecfdf5] text-[#059669]",
    },
    {
      label: "Total Customers",
      value: loading ? "…" : analytics.customers,
      delta: "+12.7% from last week",
      icon: Users,
      iconBg: "bg-[#eff6ff] text-[#2563eb]",
    },
    {
      label: "Products",
      value: loading ? "…" : analytics.catalogCount,
      delta: "+5 new this week",
      icon: Package,
      iconBg: "bg-[#faf5ff] text-[#7c3aed]",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Title + date */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-center gap-3">
          <Logo to={null} size="sm" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#111827]">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-[#6b7280]">
              Overview of your furniture store performance
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-3.5 py-2 text-sm text-[#4b5563] shadow-sm">
          <CalendarDays size={15} className="text-[#9ca3af]" />
          {analytics.rangeLabel}
        </div>
      </div>

      {/* Stat cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-2xl border border-[#eef0f3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#6b7280]">{card.label}</p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-[#111827]">
                    {card.value}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#16a34a]">
                    <ArrowUpRight size={13} />
                    {card.delta}
                  </p>
                </div>
                <span
                  className={`grid size-11 place-items-center rounded-xl ${card.iconBg}`}
                >
                  <Icon size={20} strokeWidth={1.75} />
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Charts row */}
      <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-[#eef0f3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-[#111827]">
              Sales Overview
            </h2>
            <select className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 py-1.5 text-xs text-[#4b5563] outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="mt-3">
            <SalesAreaChart points={analytics.salesPoints} />
          </div>
        </div>

        <div className="rounded-2xl border border-[#eef0f3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <h2 className="text-base font-semibold text-[#111827]">
            Orders by Status
          </h2>
          <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-center">
            <DonutChart
              slices={analytics.statusSlices}
              total={analytics.statusTotal}
            />
            <ul className="w-full space-y-2.5">
              {analytics.statusSlices.map((s) => {
                const pct = analytics.statusTotal
                  ? Math.round((s.value / analytics.statusTotal) * 100)
                  : 0;
                return (
                  <li
                    key={s.label}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="inline-flex items-center gap-2 text-[#4b5563]">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ background: s.color }}
                      />
                      {s.label}
                    </span>
                    <span className="font-semibold text-[#111827]">
                      {s.value}{" "}
                      <span className="font-normal text-[#9ca3af]">
                        ({pct}%)
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom grid */}
      <section className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        <div className="space-y-4">
          {/* Recent orders table */}
          <div className="overflow-hidden rounded-2xl border border-[#eef0f3] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="flex items-center justify-between gap-3 border-b border-[#f0f1f3] px-5 py-4">
              <h2 className="text-base font-semibold text-[#111827]">
                Recent Orders
              </h2>
              <Link
                to="/admin/orders"
                className="rounded-lg border border-[#e5e7eb] px-3 py-1.5 text-xs font-medium text-[#4b5563] hover:bg-[#f9fafb]"
              >
                View All Orders
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-[#fafafa] text-[11px] uppercase tracking-wider text-[#9ca3af]">
                  <tr>
                    <th className="px-5 py-3 font-medium">Order ID</th>
                    <th className="px-5 py-3 font-medium">Customer</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Amount</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f1f3]">
                  {analytics.recent.map((order) => (
                    <tr key={order.id} className="hover:bg-[#fafafa]/80">
                      <td className="px-5 py-3.5 font-medium text-[#5c4033]">
                        {shortId(order.id)}
                      </td>
                      <td className="px-5 py-3.5 text-[#374151]">
                        {order.customer_name || "Customer"}
                      </td>
                      <td className="px-5 py-3.5 text-[#6b7280]">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-5 py-3.5 font-medium">
                        {formatINR(order.total)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle(
                            order.status
                          )}`}
                        >
                          {statusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <Link
                          to="/admin/orders"
                          className="inline-flex rounded-lg p-1.5 text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#5c4033]"
                        >
                          <Eye size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Top selling */}
            <div className="rounded-2xl border border-[#eef0f3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-[#111827]">
                  Top Selling Products
                </h2>
                <Link
                  to="/admin/products"
                  className="text-xs font-medium text-[#5c4033] hover:underline"
                >
                  View All
                </Link>
              </div>
              <ul className="mt-4 space-y-3">
                {analytics.topProducts.map((p, i) => (
                  <li key={p.name} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#9ca3af] w-4">
                      {i + 1}
                    </span>
                    <img
                      src={
                        p.image ||
                        "/images/products/bedroom/bead10.avif"
                      }
                      alt=""
                      className="size-10 rounded-lg object-cover bg-[#f3f4f6]"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#111827]">
                        {p.name}
                      </p>
                      <p className="text-xs text-[#16a34a] font-semibold">
                        {formatINR(p.sales)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer growth */}
            <div className="rounded-2xl border border-[#eef0f3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <h2 className="text-base font-semibold text-[#111827]">
                Customer Growth
              </h2>
              <div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <p className="text-2xl font-bold text-[#111827]">
                    {analytics.customers}{" "}
                    <span className="text-sm font-medium text-[#6b7280]">
                      total
                    </span>
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#16a34a]">
                    +12.7%
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <GrowthMiniChart />
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#eef0f3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <h2 className="text-base font-semibold text-[#111827]">
              Quick Actions
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                to="/admin/products/new"
                className="flex flex-col items-center gap-2 rounded-xl border border-[#eef0f3] bg-[#fafafa] px-3 py-4 text-center text-xs font-medium text-[#374151] hover:border-[#d6c3b0] hover:bg-white"
              >
                <Plus size={18} className="text-[#5c4033]" />
                Add Product
              </Link>
              <Link
                to="/admin/products"
                className="flex flex-col items-center gap-2 rounded-xl border border-[#eef0f3] bg-[#fafafa] px-3 py-4 text-center text-xs font-medium text-[#374151] hover:border-[#d6c3b0] hover:bg-white"
              >
                <Tags size={18} className="text-[#5c4033]" />
                Add Category
              </Link>
              <Link
                to="/admin/orders"
                className="flex flex-col items-center gap-2 rounded-xl border border-[#eef0f3] bg-[#fafafa] px-3 py-4 text-center text-xs font-medium text-[#374151] hover:border-[#d6c3b0] hover:bg-white"
              >
                <ShoppingBag size={18} className="text-[#5c4033]" />
                View Orders
              </Link>
              <button
                type="button"
                className="flex flex-col items-center gap-2 rounded-xl border border-[#eef0f3] bg-[#fafafa] px-3 py-4 text-center text-xs font-medium text-[#374151] hover:border-[#d6c3b0] hover:bg-white"
              >
                <TicketPercent size={18} className="text-[#5c4033]" />
                Add Coupon
              </button>
            </div>
            <button
              type="button"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#5c4033] px-3 py-3 text-xs font-semibold text-white hover:bg-[#4a3428]"
            >
              <Image size={16} />
              Manage Banners
            </button>
          </div>

          <div className="rounded-2xl border border-[#eef0f3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#111827]">
                Low Stock Products
              </h2>
              <Link
                to="/admin/products"
                className="text-xs font-medium text-[#5c4033] hover:underline"
              >
                View All
              </Link>
            </div>
            <ul className="mt-4 space-y-3">
              {analytics.lowStock.map((p) => (
                <li key={p.sku} className="flex items-center gap-3">
                  <img
                    src={getProductImage(p)}
                    alt=""
                    className="size-10 rounded-lg object-cover bg-[#f3f4f6]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#111827]">
                      {p.name}
                    </p>
                    <p className="text-[11px] text-[#9ca3af]">{p.sku}</p>
                  </div>
                  <span className="text-sm font-bold text-[#ef4444]">
                    {String(p.stock).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#eef0f3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <h2 className="text-base font-semibold text-[#111827]">
              Top Categories
            </h2>
            <ul className="mt-4 space-y-3">
              {analytics.topCategories.map(([name, count]) => {
                const Icon = categoryIcons[name] || Package;
                return (
                  <li
                    key={name}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="inline-flex items-center gap-3 text-sm text-[#374151]">
                      <span className="grid size-9 place-items-center rounded-xl bg-[#f5f0ea] text-[#5c4033]">
                        <Icon size={16} />
                      </span>
                      {name}
                    </span>
                    <span className="text-sm font-semibold text-[#111827]">
                      {count}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {!analytics.hasLiveOrders && !loading && (
        <p className="text-center text-[11px] text-[#9ca3af]">
          Showing sample analytics until real orders arrive from checkout.
        </p>
      )}
    </div>
  );
}

export default AdminDashboard;
