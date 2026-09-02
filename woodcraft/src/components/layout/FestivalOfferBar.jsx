import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getLiveCoupons } from "../../lib/coupons";

function FestivalOfferBar() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    function refresh() {
      setCoupons(getLiveCoupons());
    }
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("arileon-coupons", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("arileon-coupons", refresh);
    };
  }, []);

  if (!coupons.length) return null;

  const offer = coupons[0];
  const extra = coupons.length > 1 ? ` +${coupons.length - 1} more` : "";

  return (
    <div className="bg-[#434f23] text-white">
      <div className="mx-auto flex max-w-[1500px] items-center justify-center gap-2 px-4 py-2 text-center text-[11px] sm:px-5 sm:text-xs md:px-10">
        <p className="min-w-0">
          {offer.label ? `${offer.label}: ` : "Festival offer: "}
          use code{" "}
          <span className="font-bold tracking-[0.12em]">{offer.code}</span>
          {" "}
          for {offer.percent}% off
          {extra}
        </p>
        <Link
          to="/cart"
          className="shrink-0 underline underline-offset-2 decoration-white/50 hover:decoration-white"
        >
          Apply in cart
        </Link>
      </div>
    </div>
  );
}

export default FestivalOfferBar;
