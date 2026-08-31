export function AdminHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-[#111827]">{title}</h1>
      {subtitle ? (
        <p className="mt-1 text-sm text-[#6b7280]">{subtitle}</p>
      ) : null}
    </div>
  );
}

export const card = "bg-white border border-[#eadfd3]";
export const th =
  "px-4 py-3 text-left text-[11px] uppercase tracking-wider text-[#6B4423]";
export const td = "px-4 py-3 text-sm";
