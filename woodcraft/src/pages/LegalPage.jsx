import { Link } from "react-router";

function LegalPage({ eyebrow, title, updated, children }) {
  return (
    <main className="bg-[#f5f3f0] text-[#2b1d0e]">
      <section className="bg-[#2d1f16] text-white">
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-10 md:py-16">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">
            {eyebrow}
          </p>
          <h1 className="font-display mt-3 text-3xl font-semibold md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-white/65">Last updated: {updated}</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 py-12 md:px-10 md:py-16">
        <div className="legal-copy space-y-8 text-[15px] leading-7 text-[#2b1d0e]/80">
          {children}
        </div>
        <p className="mt-12 border-t border-dark-brown/15 pt-6 text-sm text-[#2b1d0e]/55">
          Questions?{" "}
          <Link to="/contact" className="font-medium text-dark-brown underline-offset-2 hover:underline">
            Contact us
          </Link>{" "}
          or email{" "}
          <a
            href="mailto:arileoninfo@gmail.com"
            className="font-medium text-dark-brown underline-offset-2 hover:underline"
          >
            arileoninfo@gmail.com
          </a>
          .
        </p>
      </article>
    </main>
  );
}

export function LegalSection({ title, children }) {
  return (
    <section>
      <h2 className="font-display mb-3 text-xl font-semibold text-dark-brown">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default LegalPage;
