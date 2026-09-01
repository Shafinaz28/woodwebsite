import { Link, useSearchParams } from "react-router";
import { CheckCircle2 } from "lucide-react";

function OrderSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get("id");
  const paymentId = params.get("payment");

  return (
    <main className="min-h-[70vh] grid place-items-center bg-[#f7f4ef] px-5 text-[#2b1d0e]">
      <section data-gsap-block className="max-w-lg text-center">
        <CheckCircle2 size={48} className="mx-auto text-[#434f23]" />
        <h1 className="font-display text-4xl font-semibold mt-5">
          Payment successful
        </h1>
        <p className="mt-3 text-sm text-[#2b1d0e]/70 leading-7">
          Thank you for your order. We&apos;ll confirm details by email / phone
          shortly.
        </p>
        {orderId && (
          <p className="mt-4 text-xs text-[#2b1d0e]/50">Order: {orderId}</p>
        )}
        {paymentId && (
          <p className="text-xs text-[#2b1d0e]/50">Payment: {paymentId}</p>
        )}
        <Link
          to="/shop"
          className="inline-flex mt-8 px-8 py-3.5 bg-[#4a2c18] text-white text-[11px] uppercase tracking-wider"
        >
          Continue shopping
        </Link>
      </section>
    </main>
  );
}

export default OrderSuccess;
