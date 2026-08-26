import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  User,
  Tag,
  MessageSquare,
  Send,
  CheckCircle2,
} from "lucide-react";

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
    {
      icon: Clock,
      label: "Hours",
      value: "Mon – Sat · 10:00 – 18:00 IST\nSunday closed",
    },
  ];

  const fieldClass =
    "w-full rounded-lg border border-[#eadfd3] bg-[#faf8f4] pl-11 pr-3.5 py-3 text-sm text-[#2b1d0e] outline-none focus:border-[#6B4423]/45 focus:bg-white transition";

  return (
    <div className="bg-[#f7f3ec]">
      {/* Hero — centered, full-bleed image */}
      <section className="relative h-[70svh] sm:h-[75svh] md:h-[80svh] min-h-[420px] w-full overflow-hidden bg-[#1a1510]">
        <img
          src="/images/products/living-room/living12.png"
          alt="Arileon showroom living space"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] items-center justify-center px-5 md:px-10 text-center">
          <div className="max-w-2xl text-white animate-[hero-rise_0.8s_ease-out] flex flex-col items-center">
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-white/80">
              Contact
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-semibold leading-[1.08] text-white">
              Let&apos;s talk about your space.
            </h1>
            <p className="mt-4 max-w-md mx-auto text-sm leading-7 text-white/85 md:text-base">
              Product questions, custom sizes, or showroom visits — we reply
              within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1500px] mx-auto px-5 md:px-10 py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-center lg:text-left mb-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#6B4423]/70 mb-2">
                Reach us
              </p>
              <h2 className="font-display text-2xl md:text-3xl text-[#2b1d0e]">
                Visit, call, or write.
              </h2>
            </div>

            {details.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex gap-4 rounded-xl border border-[#eadfd3] bg-white px-5 py-4"
              >
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4efe6] text-[#6B4423]">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#6B4423]/65 mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm md:text-[15px] text-[#2b1d0e] hover:text-[#6B4423] transition break-words"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm md:text-[15px] text-[#2b1d0e] leading-6 whitespace-pre-line">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            {sent ? (
              <div className="min-h-[420px] flex flex-col items-center justify-center text-center rounded-2xl border border-[#eadfd3] bg-white px-8 py-12 md:px-12">
                <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#f4efe6] text-[#454B1B]">
                  <CheckCircle2 size={28} strokeWidth={1.5} />
                </span>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#6B4423]/70 mb-4">
                  Message sent
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-[#2b1d0e]">
                  Thank you — we&apos;ll be in touch soon.
                </h2>
                <p className="mt-4 text-sm text-[#3a2a1c]/70 leading-7 max-w-md">
                  Your note is with our team. For urgent enquiries, email{" "}
                  <a
                    href="mailto:arileoninfo@gmail.com"
                    className="text-[#6B4423] underline underline-offset-2"
                  >
                    arileoninfo@gmail.com
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 text-[11px] uppercase tracking-[0.2em] text-[#2b1d0e] border-b border-[#2b1d0e] pb-1 hover:opacity-70 transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-[#eadfd3] bg-white px-6 py-8 sm:px-8 md:px-10 md:py-10"
              >
                <div className="text-center mb-8">
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f4efe6] text-[#6B4423]">
                    <Send size={20} strokeWidth={1.5} />
                  </span>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#6B4423]/70 mb-2">
                    Send a message
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl text-[#2b1d0e]">
                    Tell us what you need.
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#6B4423]/70">
                      Name
                    </span>
                    <div className="relative mt-2">
                      <User
                        size={16}
                        strokeWidth={1.6}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B4423]/55"
                      />
                      <input
                        required
                        name="name"
                        type="text"
                        autoComplete="name"
                        className={fieldClass}
                        placeholder="Your name"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#6B4423]/70">
                      Email
                    </span>
                    <div className="relative mt-2">
                      <Mail
                        size={16}
                        strokeWidth={1.6}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B4423]/55"
                      />
                      <input
                        required
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={fieldClass}
                        placeholder="you@email.com"
                      />
                    </div>
                  </label>
                </div>

                <label className="block mt-5 md:mt-6">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#6B4423]/70">
                    Subject
                  </span>
                  <div className="relative mt-2">
                    <Tag
                      size={16}
                      strokeWidth={1.6}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B4423]/55"
                    />
                    <input
                      required
                      name="subject"
                      type="text"
                      className={fieldClass}
                      placeholder="Order, product, or general enquiry"
                    />
                  </div>
                </label>

                <label className="block mt-5 md:mt-6">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#6B4423]/70">
                    Message
                  </span>
                  <div className="relative mt-2">
                    <MessageSquare
                      size={16}
                      strokeWidth={1.6}
                      className="pointer-events-none absolute left-3.5 top-3.5 text-[#6B4423]/55"
                    />
                    <textarea
                      required
                      name="message"
                      rows={5}
                      className={`${fieldClass} resize-y min-h-[140px] pt-3`}
                      placeholder="How can we help?"
                    />
                  </div>
                </label>

                <div className="mt-8 flex justify-center">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-[4px] px-8 py-3.5 text-white text-[11px] uppercase tracking-[0.2em] font-semibold hover:opacity-90 transition"
                    style={{ backgroundColor: "#454B1B" }}
                  >
                    <Send size={14} strokeWidth={2} />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="max-w-[1500px] mx-auto px-5 md:px-10 pb-12 md:pb-16 lg:pb-20">
        <div className="mb-6 text-center md:text-left">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#6B4423]/70 mb-2">
            Find us
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-[#2b1d0e]">
            Wood Masters, Bengaluru
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#eadfd3] bg-white shadow-[0_1px_0_rgba(43,29,14,0.04)]">
          <iframe
            title="Arileon — Wood Masters, Nelagadarana Halli, Bengaluru"
            src="https://www.google.com/maps?q=Wood+Masters,+1st+Cross,+Nelagadarana+Halli,+Nagasandra+Post,+Bengaluru+560073&output=embed"
            className="block h-[280px] sm:h-[360px] md:h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}

export default Contact;
