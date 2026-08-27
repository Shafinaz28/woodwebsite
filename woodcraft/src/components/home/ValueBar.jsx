import {
  Leaf,
  HandHeart,
  Sprout,
  Truck,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

const values = [
  { icon: Leaf, title: "100% Solid Wood", subtitle: "Premium Quality" },
  { icon: HandHeart, title: "Handcrafted", subtitle: "By Skilled Artisans" },
  { icon: Sprout, title: "Eco Friendly", subtitle: "Sustainable Choice" },
  { icon: Truck, title: "Free Delivery", subtitle: "On selected orders" },
  { icon: RefreshCw, title: "Easy Returns", subtitle: "Hassle Free" },
  { icon: ShieldCheck, title: "Secure Payments", subtitle: "100% Safe" },
];

function cellClass(index) {
  const line = "border-[#eadfd3]";
  const parts = [
    "flex items-center gap-3 px-3 sm:px-4 py-5 lg:py-6",
    index % 2 === 0 ? `border-r ${line}` : "",
    index < 4 ? `border-b ${line}` : "",
    "md:border-r-0 md:border-b-0",
    index % 3 !== 2 ? `md:border-r ${line}` : "",
    index < 3 ? `md:border-b ${line}` : "",
    "lg:border-b-0 lg:border-r-0",
    index !== 5 ? `lg:border-r ${line}` : "",
  ];

  return parts.filter(Boolean).join(" ");
}

function ValueBar() {
  return (
    <section className="bg-[#fbf9f6] border-b border-[#eadfd3]">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {values.map(({ icon: Icon, title, subtitle }, index) => (
            <div key={title} className={cellClass(index)}>
              <Icon
                size={28}
                strokeWidth={1.35}
                className="text-[#2a1b0e] shrink-0"
              />
              <div className="min-w-0">
                <p className="font-display text-[15px] sm:text-base font-bold text-[#2a1b0e] leading-tight">
                  {title}
                </p>
                <p className="mt-0.5 font-display text-xs sm:text-[13px] font-bold text-[#2a1b0e] leading-snug">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValueBar;
