export function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function openRazorpayCheckout({
  amountInr,
  customer,
  orderId,
  description = "Arileon furniture order",
}) {
  const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
  if (!key) {
    throw new Error(
      "Add VITE_RAZORPAY_KEY_ID to .env.local (Razorpay Dashboard → API Keys)"
    );
  }

  const ok = await loadRazorpay();
  if (!ok || !window.Razorpay) {
    throw new Error("Could not load Razorpay checkout");
  }

  const amountPaise = Math.round(Number(amountInr) * 100);

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key,
      amount: amountPaise,
      currency: "INR",
      name: "Arileon",
      description,
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },
      notes: {
        local_order_id: String(orderId),
      },
      method: {
        card: true,
        upi: true,
        netbanking: true,
        wallet: true,
      },
      theme: {
        color: "#4a2c18",
      },
      handler(response) {
        resolve(response);
      },
      modal: {
        ondismiss() {
          reject(new Error("Payment cancelled"));
        },
      },
    });

    rzp.on("payment.failed", (resp) => {
      reject(new Error(resp?.error?.description || "Payment failed"));
    });

    rzp.open();
  });
}
