import { Link } from "react-router";
import LegalPage, { LegalSection } from "./LegalPage";

function Returns() {
  return (
    <LegalPage
      eyebrow="Customer care"
      title="Return Policy"
      updated="31 August 2026"
    >
      <p>
        We want your Arileon furniture to arrive in good condition and to
        last. This Return Policy explains how refunds, replacements, and
        exchanges work. It should be read with our{" "}
        <Link to="/terms">Terms &amp; Conditions</Link>.
      </p>

      <LegalSection title="1. Inspect on delivery">
        <p>
          Please check the item when it arrives. Look for transit damage,
          missing parts, and obvious defects. If something is wrong, take
          clear photos of the packaging and the furniture, and contact us
          within <strong>48 hours</strong> of delivery.
        </p>
        <p>
          Email{" "}
          <a href="mailto:arileoninfo@gmail.com">arileoninfo@gmail.com</a>,
          call or WhatsApp +91 99800 85805, or use our{" "}
          <Link to="/contact">contact form</Link>. Include your order
          name, phone, and photos.
        </p>
      </LegalSection>

      <LegalSection title="2. Damaged or defective items">
        <p>
          If the product is damaged in transit or has a manufacturing
          defect, we will arrange repair, replacement, or a refund after we
          review your photos and order details. Do not assemble or use a
          clearly damaged piece until we confirm next steps.
        </p>
      </LegalSection>

      <LegalSection title="3. Change of mind">
        <p>
          Furniture is bulky and often made or finished to order. Change-of-
          mind returns are not guaranteed. If we accept a return of an
          unused, undamaged stock item, you may be asked to pay pickup and
          restocking costs. Custom sizes, special finishes, and
          made-to-order pieces generally cannot be returned unless they are
          defective or required by law.
        </p>
      </LegalSection>

      <LegalSection title="4. What cannot be returned">
        <ul className="list-disc space-y-1 pl-5">
          <li>Items used, assembled, or altered after delivery (except to inspect a defect)</li>
          <li>Normal wood variation in grain, shade, or figure</li>
          <li>Minor scratches or wear from unpacking or daily use</li>
          <li>Outdoor use of indoor furniture, water damage, or misuse</li>
          <li>Products returned without our prior approval</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. How to request a return">
        <p>Write to us with:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Order details (name, phone, product)</li>
          <li>Reason for return</li>
          <li>Photos or a short video of the issue</li>
        </ul>
        <p>
          Wait for our confirmation before sending anything back. We will
          tell you whether we will collect the item or ask you to keep it
          for inspection.
        </p>
      </LegalSection>

      <LegalSection title="6. Refunds">
        <p>
          Approved refunds are processed to the original payment method
          (for example Razorpay — card, UPI, or net banking) after we
          receive and inspect the item, or after we confirm a defect. Bank
          or gateway timelines can take a few working days after we
          initiate the refund.
        </p>
      </LegalSection>

      <LegalSection title="7. Cancellations">
        <p>
          You may cancel before the order is dispatched. Once the piece is
          in transit or custom work has started, cancellation may not be
          possible. Contact us as soon as you need to change an order.
        </p>
      </LegalSection>

      <LegalSection title="8. Your consumer rights">
        <p>
          Nothing in this policy limits rights you have under applicable
          Indian consumer law. If you have questions, we are happy to help
          at{" "}
          <a href="mailto:arileoninfo@gmail.com">arileoninfo@gmail.com</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

export default Returns;
