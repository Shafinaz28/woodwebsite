import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  const details = [
    {
      icon: MapPin,
      label: "Visit",
      value:
        "Wood Masters, 1st Cross, Nelagadarana Halli, Nagasandra Post, Bengaluru 560073",
    },
    {
      icon: Mail,
      label: "Email",
      value: "arileoninfo@gmail.com",
      href: "mailto:arileoninfo@gmail.com",
    },
    {
      icon: Phone,
      label: "Call",
      value: "+91 99800 85805",
      href: "tel:+919980085805",
    },
  ];

  return (
    <div className="bg-background">

      {/* Hero with background image */}
      <section className="relative h-[52svh] sm:h-[60svh] md:h-[70svh] min-h-[320px] sm:min-h-[420px] md:min-h-[520px] w-full overflow-hidden bg-[#1a1510]">
        <img
          src="/images/products/living-room/living2.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/25" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1500px] items-end px-5 pb-10 sm:pb-14 md:px-10 md:pb-20">
          <div className="max-w-xl text-white animate-[hero-rise_1s_ease-out]">
            <p className="mb-3 sm:mb-4 text-[11px] uppercase tracking-[0.28em] text-white/75">
              Contact
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] text-white">
              We&apos;d love to hear from you.
            </h1>
            <p className="mt-4 sm:mt-5 max-w-md text-sm leading-7 text-white/80 md:text-base">
              Questions about a piece, an order, or finding the right fit for
              your space — send a note and we&apos;ll get back within one
              business day.
            </p>
          </div>
        </div>
      </section>

      {/* Details + form */}
      <section className="max-w-[1500px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left — details */}
          <div className="lg:col-span-4 space-y-10">
            {details.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-4">
                <div className="mt-0.5 text-wood-soft">
                  <Icon size={18} strokeWidth={1.4} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-wood-soft mb-1.5">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm md:text-base text-wood-deep hover:opacity-70 transition"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm md:text-base text-wood-deep leading-6">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-2 border-t border-wood-deep/10">
              <p className="text-[11px] uppercase tracking-[0.2em] text-wood-soft mb-2 mt-8">
                Hours
              </p>
              <p className="text-sm text-wood-deep leading-7">
                Mon – Sat · 10:00 – 18:00 IST
                <br />
                <span className="text-wood-muted">Sunday closed</span>
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-8">
            {sent ? (
              <div className="min-h-[320px] flex flex-col justify-center border border-dark-brown/15 bg-cream/35 px-8 py-12 md:px-12">
                <p className="text-[11px] uppercase tracking-[0.28em] text-wood-soft mb-4">
                  Message sent
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-wood-deep">
                  Thank you — we&apos;ll be in touch soon.
                </h2>
                <p className="mt-4 text-sm text-wood-muted leading-7 max-w-md">
                  Your note is with our team. If your enquiry is urgent, email
                  arileoninfo@gmail.com directly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 self-start text-[11px] uppercase tracking-[0.2em] text-wood-deep border-b border-wood-deep pb-1 hover:opacity-70 transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border border-dark-brown/15 bg-cream/35 px-6 py-8 sm:px-8 md:px-10 md:py-10"
              >
                <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-wood-soft">
                      Name
                    </span>
                    <input
                      required
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="mt-2 w-full bg-transparent border-b border-wood-deep/20 py-2.5 text-sm text-wood-deep outline-none focus:border-wood-deep transition"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-wood-soft">
                      Email
                    </span>
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="mt-2 w-full bg-transparent border-b border-wood-deep/20 py-2.5 text-sm text-wood-deep outline-none focus:border-wood-deep transition"
                      placeholder="you@email.com"
                    />
                  </label>
                </div>

                <label className="block mt-5 md:mt-6">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-wood-soft">
                    Subject
                  </span>
                  <input
                    required
                    name="subject"
                    type="text"
                    className="mt-2 w-full bg-transparent border-b border-wood-deep/20 py-2.5 text-sm text-wood-deep outline-none focus:border-wood-deep transition"
                    placeholder="Order, product, or general enquiry"
                  />
                </label>

                <label className="block mt-5 md:mt-6">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-wood-soft">
                    Message
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    className="mt-2 w-full bg-transparent border-b border-wood-deep/20 py-2.5 text-sm text-wood-deep outline-none focus:border-wood-deep transition resize-y min-h-[120px]"
                    placeholder="How can we help?"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-8 inline-flex items-center justify-center px-8 py-3.5 bg-wood-deep text-white text-[11px] uppercase tracking-[0.2em] hover:bg-wood transition"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}

export default Contact;
