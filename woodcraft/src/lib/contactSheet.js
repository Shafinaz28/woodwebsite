const CONTACT_SHEET_URL =
  import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL ||
  "https://script.google.com/macros/s/AKfycbyQSEIRsn_-b0fkdmQsTTLuEBxsbNcV4Ft_2zIE_fX92oKopakdC13ZMGBekzW-TSVXKw/exec";

export async function submitContactToSheet({ name, email, phone, subject, message }) {
  const url = CONTACT_SHEET_URL;
  if (!url) {
    throw new Error(
      "Add VITE_GOOGLE_SHEETS_WEBAPP_URL to .env.local (Google Apps Script web app URL)"
    );
  }

  const payload = JSON.stringify({
    name: String(name || "").trim(),
    email: String(email || "").trim(),
    phone: String(phone || "").trim(),
    subject: String(subject || "").trim(),
    message: String(message || "").trim(),
  });

  const options = {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: payload,
  };

  try {
    const res = await fetch(url, options);
    if (res.type === "opaque" || res.ok) return;
    throw new Error("Could not save your message. Please try again.");
  } catch (err) {
    if (err instanceof TypeError) {
      await fetch(url, { ...options, mode: "no-cors" });
      return;
    }
    throw err;
  }
}
