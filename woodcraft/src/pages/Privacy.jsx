import { Link } from "react-router";
import LegalPage, { LegalSection } from "./LegalPage";

function Privacy() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="31 August 2026">
      <p>
        This Privacy Policy explains how Arileon Furniture (“Arileon”, “we”,
        “us”) collects, uses, and protects your information when you use
        our website or place an order. We respect your privacy and handle
        data in line with applicable Indian law, including the Information
        Technology Act, 2000 and the Digital Personal Data Protection Act,
        2023, as they apply.
      </p>

      <LegalSection title="1. Who we are">
        <p>
          Arileon Furniture, Wood Masters, 1st Cross, Nelagadarana Halli,
          Nagasandra Post, Bengaluru 560073. Email:{" "}
          <a href="mailto:arileoninfo@gmail.com">arileoninfo@gmail.com</a>.
          Phone: +91 99865 87575.
        </p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p>We may collect:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Account and order details</strong> — name, email,
            phone, shipping address, pincode, and order history.
          </li>
          <li>
            <strong>Payment information</strong> — processed by Razorpay.
            We receive payment status and references, not your full card
            number.
          </li>
          <li>
            <strong>Messages</strong> — enquiries via contact form,
            WhatsApp, email, or phone.
          </li>
          <li>
            <strong>Technical data</strong> — browser type, device, and
            approximate location as provided by your browser or hosting
            provider (for example Vercel).
          </li>
        </ul>
        <p>
          We do not knowingly collect data from children under 18 for
          purchases.
        </p>
      </LegalSection>

      <LegalSection title="3. How we use your information">
        <p>We use personal data to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Process, fulfil, and deliver orders</li>
          <li>Confirm payments and prevent fraud</li>
          <li>Reply to questions and after-sales support</li>
          <li>Improve the website and product listings</li>
          <li>Send order updates; marketing only if you opt in</li>
          <li>Meet legal, tax, and accounting requirements</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Sharing your information">
        <p>We share data only as needed with:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Payment partners (Razorpay)</li>
          <li>Hosting and database providers (for example Vercel, Supabase)</li>
          <li>Courier or logistics partners for delivery</li>
          <li>Professional advisers or authorities where the law requires</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </LegalSection>

      <LegalSection title="5. Cookies and similar tools">
        <p>
          The site may use cookies or local storage to keep your cart,
          remember a signed-in admin session, and keep the site working.
          You can block cookies in your browser; some features (such as
          checkout) may then not work fully.
        </p>
      </LegalSection>

      <LegalSection title="6. How long we keep data">
        <p>
          Order and invoice records are kept as required for tax and
          consumer law (typically several years). Support messages are kept
          as long as needed to resolve your request. You may ask us to
          delete or correct data where we are not required to retain it.
        </p>
      </LegalSection>

      <LegalSection title="7. Security">
        <p>
          We use HTTPS and reputable service providers. No method of
          transmission over the internet is completely secure. Please keep
          any account passwords confidential.
        </p>
      </LegalSection>

      <LegalSection title="8. Your rights">
        <p>
          Subject to law, you may request access, correction, or deletion
          of your personal data, or withdraw consent for marketing. Contact{" "}
          <a href="mailto:arileoninfo@gmail.com">arileoninfo@gmail.com</a>.
          You may also have the right to complain to the relevant data
          protection authority in India.
        </p>
      </LegalSection>

      <LegalSection title="9. Third-party links">
        <p>
          Our site may link to WhatsApp, Google Maps, or social networks.
          Their privacy practices are their own; please read their policies.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes">
        <p>
          We may update this policy. The “Last updated” date at the top
          will change. Continued use of the site after an update means you
          accept the revised policy.
        </p>
      </LegalSection>

      <LegalSection title="11. Terms of sale">
        <p>
          Purchases are also governed by our{" "}
          <Link to="/terms">Terms &amp; Conditions</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

export default Privacy;
