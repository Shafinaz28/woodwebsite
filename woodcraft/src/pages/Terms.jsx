import { Link } from "react-router";
import LegalPage, { LegalSection } from "./LegalPage";

function Terms() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      updated="31 August 2026"
    >
      <p>
        These Terms & Conditions (“Terms”) govern your use of the Arileon
        Furniture website and any orders you place with us. By browsing the
        site or completing a purchase, you agree to these Terms. If you do
        not agree, please do not use the site.
      </p>

      <LegalSection title="1. Who we are">
        <p>
          Arileon Furniture (“Arileon”, “we”, “us”) sells wooden furniture
          from Wood Masters, 1st Cross, Nelagadarana Halli, Nagasandra Post,
          Bengaluru 560073, India. You can reach us at{" "}
          <a href="mailto:arileoninfo@gmail.com">arileoninfo@gmail.com</a> or
          +91 99800 85805.
        </p>
      </LegalSection>

      <LegalSection title="2. Using this website">
        <p>
          You must be at least 18 years old (or have a parent/guardian’s
          consent) to place an order. You agree to provide accurate details
          and not to misuse the site, attempt unauthorised access, or copy
          our product images and listings without permission.
        </p>
      </LegalSection>

      <LegalSection title="3. Products and descriptions">
        <p>
          We describe furniture as honestly as we can. Solid wood varies in
          grain, colour, and figure; photos are a guide, not an exact match.
          Dimensions, finishes, and materials on product pages are
          approximate. We may correct errors, update prices, or withdraw a
          product if it is unavailable.
        </p>
      </LegalSection>

      <LegalSection title="4. Orders and pricing">
        <p>
          An order is an offer to buy. We accept it when payment is confirmed
          and we send an order confirmation. Prices are shown in Indian
          Rupees (INR) unless stated otherwise. Taxes, shipping, and any
          assembly charges (if applicable) will be indicated at checkout or
          confirmed with you before dispatch.
        </p>
      </LegalSection>

      <LegalSection title="5. Payment">
        <p>
          Payments are processed through Razorpay or other methods we enable
          (cards, UPI, net banking). We do not store full card details on our
          servers. If a payment fails or is reversed, we may pause or cancel
          the order.
        </p>
      </LegalSection>

      <LegalSection title="6. Shipping and delivery">
        <p>
          Delivery timelines on the site (for example 7–14 days) are
          estimates. Large furniture may need scheduled delivery. Risk in
          the goods passes to you on delivery to the address you provide.
          Please inspect items on arrival and report transit damage within
          48 hours with photos.
        </p>
      </LegalSection>

      <LegalSection title="7. Returns, exchanges and cancellations">
        <p>
          Made-to-order or custom-finish pieces may not be returnable except
          where required by law or if the item is defective. See our full{" "}
          <Link to="/returns">Return Policy</Link> for how to report damage,
          request a refund, or cancel. For stock items, contact us before
          returning. Change-of-mind returns, if accepted, may incur pickup
          and restocking costs.
        </p>
      </LegalSection>

      <LegalSection title="8. Warranty">
        <p>
          We stand behind workmanship on our furniture for normal household
          use. Warranty does not cover misuse, outdoor use unless specified,
          water damage, scratches from daily use, or modifications by third
          parties. Statutory consumer rights under Indian law still apply.
        </p>
      </LegalSection>

      <LegalSection title="9. Intellectual property">
        <p>
          The Arileon name, logo, product photos, and site content belong to
          us or our licensors. You may not copy or reuse them for commercial
          purposes without written consent.
        </p>
      </LegalSection>

      <LegalSection title="10. Limitation of liability">
        <p>
          To the extent permitted by law, we are not liable for indirect or
          consequential loss (such as lost profits). Our total liability for
          a product is limited to the amount you paid for that product. This
          does not exclude liability that cannot be limited under applicable
          law.
        </p>
      </LegalSection>

      <LegalSection title="11. Privacy">
        <p>
          How we collect and use personal data is explained in our{" "}
          <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection title="12. Changes and governing law">
        <p>
          We may update these Terms from time to time. The version on this
          page applies to new orders. These Terms are governed by the laws
          of India. Courts in Bengaluru, Karnataka shall have jurisdiction,
          without affecting any mandatory consumer-forum rights you have.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

export default Terms;
