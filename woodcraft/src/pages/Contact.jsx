import { useState } from "react";
import { submitContactMessage } from "../lib/contactMessages";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Headphones,
  UserRound,
  Zap,
  CheckCircle2,
  Tag,
  MessageSquare,
} from "lucide-react";

const ADDRESS =
  "Wood Masters, 1st Cross, Nelagadarana Halli, Nagasandra Post, Bengaluru 560073";
const PHONE = "+91 99865 87575";
const EMAIL = "arileoninfo@gmail.com";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=16&output=embed`;

const quickContacts = [
  {
    icon: Phone,
    title: "Call Us",
    lines: [PHONE, "Mon – Sat · 10:00 – 18:00 IST"],
    href: "tel:+919986587575",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [EMAIL, "We reply within one business day"],
    href: `mailto:${EMAIL}`,
  },
  {
    icon: MapPin,
    title: "Visit Our Studio",
    lines: [ADDRESS],
    href: MAPS_URL,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: [PHONE, "Chat with us on WhatsApp"],
    href:
      "https://wa.me/919986587575?text=" +
      encodeURIComponent(
        "Hi Arileon, I would like to know more about your furniture."
      ),
  },
];

const values = [
  {
    icon: MessageCircle,
    title: "Easy Communication",
    text: "Reach us by call, email, or WhatsApp — whichever suits you.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    text: "Guidance on wood, size, and finish from people who know the pieces.",
  },
  {
    icon: UserRound,
    title: "Personalized Assistance",
    text: "Help choosing furniture that fits your room and daily life.",
  },
  {
    icon: Zap,
    title: "Quick Response",
    text: "We aim to reply within one business day on every enquiry.",
  },
];

function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mapActive, setMapActive] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await submitContactMessage({
        name: data.get("name"),
        email: data.get("email"),
        phone: data.get("phone"),
        subject: data.get("subject"),
        message: data.get("message"),
      });
      form.reset();
      setSent(true);
    } catch (err) {
      setError(err.message || "Could not send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClass =
    "w-full min-h-[48px] rounded-md border border-[#eadfd3] bg-[#faf8f4] py-3 pl-11 pr-4 text-base text-[#2b1d0e] outline-none transition focus:border-[#6B4423]/50 focus:bg-white sm:text-sm";

  const iconClass =
    "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B4423]/70";

  return (
    <div className="bg-[#f5f3f0] text-[#2b1d0e]">
      <section className="relative min-h-[320px] overflow-hidden bg-[#2d1f16] md:min-h-[400px]">
        <img
          src="/images/about/hero-dining.avif"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#2d1f16]/70" />
        <div className="relative z-10 flex min-h-[320px] items-center justify-center px-5 py-14 md:min-h-[400px]">
          <div className="max-w-xl text-center text-white">
            <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-white/80">
              Contact
            </p>
            <h1 className="font-display text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-[2.75rem]">
              We&apos;d love to hear from you.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/90">
              Questions about a piece, wood, size, or a visit to our Bengaluru
              studio — send a message and we will get back to you.
            </p>
            <a
              href="#message"
              className="mt-7 inline-flex px-8 py-3.5 bg-[#434f23] text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#363f1c]"
            >
              Send a Message
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-[#eadfd3] bg-[#f3efe8]">
        <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8 md:py-12 lg:px-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {quickContacts.map(({ icon: Icon, title, lines, href }) => (
              <a
                key={title}
                href={href}
                data-gsap-item
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex flex-col items-center px-2 text-center"
              >
                <span className="mb-3 inline-flex h-12 w-12 items-center justify-center text-[#6B4423]">
                  <Icon size={26} strokeWidth={1.4} />
                </span>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                {lines.map((line) => (
                  <p
                    key={line}
                    className="mt-1.5 max-w-[280px] break-words text-sm leading-6 text-[#3a2a1c]/75 transition group-hover:text-[#6B4423]"
                  >
                    {line}
                  </p>
                ))}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="message"
        className="scroll-mt-24 border-t border-[#eadfd3] bg-white"
      >
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8 md:py-16 lg:px-12 lg:py-20">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0 order-2 lg:order-1">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Visit Our Studio
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#3a2a1c]/80">
                Come see the grain up close, sit with the pieces, and find what
                belongs in your home at our Bengaluru workshop.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[#6B4423]"
                  />
                  <p className="min-w-0 break-words text-sm leading-6">
                    {ADDRESS}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[#6B4423]"
                  />
                  <a
                    href="tel:+919986587575"
                    className="text-sm transition hover:text-[#6B4423]"
                  >
                    {PHONE}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Mail
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[#6B4423]"
                  />
                  <a
                    href={`mailto:${EMAIL}`}
                    className="break-all text-sm transition hover:text-[#6B4423]"
                  >
                    {EMAIL}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[#6B4423]"
                  />
                  <p className="text-sm leading-6">
                    Mon – Sat · 10:00 – 18:00 IST
                    <br />
                    Sunday closed
                  </p>
                </div>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center bg-[#4a2c18] px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#3a2212] sm:w-auto"
              >
                Get Directions
              </a>
            </div>

            <div className="min-w-0 order-1 lg:order-2 rounded-xl border border-[#eadfd3] bg-[#faf8f4] p-5 sm:p-8">
              {sent ? (
                <div>
                  <span className="mb-5 inline-flex text-[#434f23]">
                    <CheckCircle2 size={32} strokeWidth={1.5} />
                  </span>
                  <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                    Thank you — we&apos;ll be in touch soon.
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-7 text-[#3a2a1c]/75">
                    We received your message and will reply within one business
                    day. For something urgent, call{" "}
                    <a href="tel:+919986587575" className="text-[#6B4423]">
                      {PHONE}
                    </a>{" "}
                    or email{" "}
                    <a
                      href={`mailto:${EMAIL}`}
                      className="break-all text-[#6B4423] underline underline-offset-2"
                    >
                      {EMAIL}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-8 border-b border-[#2b1d0e] pb-1 text-[11px] font-bold uppercase tracking-[0.2em]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                    Send Us a Message
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#3a2a1c]/75">
                    Fill in the form and we&apos;ll get back to you as soon as
                    we can.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5 sm:mt-8"
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <label className="block min-w-0">
                        <span className="text-[11px] uppercase tracking-[0.16em] text-[#6B4423]/80">
                          Your Name
                        </span>
                        <div className="relative mt-2">
                          <UserRound
                            size={16}
                            strokeWidth={1.6}
                            className={iconClass}
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
                      <label className="block min-w-0">
                        <span className="text-[11px] uppercase tracking-[0.16em] text-[#6B4423]/80">
                          Your Email
                        </span>
                        <div className="relative mt-2">
                          <Mail
                            size={16}
                            strokeWidth={1.6}
                            className={iconClass}
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

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <label className="block min-w-0">
                        <span className="text-[11px] uppercase tracking-[0.16em] text-[#6B4423]/80">
                          Phone Number
                        </span>
                        <div className="relative mt-2">
                          <Phone
                            size={16}
                            strokeWidth={1.6}
                            className={iconClass}
                          />
                          <input
                            required
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            inputMode="tel"
                            className={fieldClass}
                            placeholder="+91"
                          />
                        </div>
                      </label>
                      <label className="block min-w-0">
                        <span className="text-[11px] uppercase tracking-[0.16em] text-[#6B4423]/80">
                          Subject
                        </span>
                        <div className="relative mt-2">
                          <Tag
                            size={16}
                            strokeWidth={1.6}
                            className={iconClass}
                          />
                          <input
                            required
                            name="subject"
                            type="text"
                            className={fieldClass}
                            placeholder="Order, product, or enquiry"
                          />
                        </div>
                      </label>
                    </div>

                    <label className="block min-w-0">
                      <span className="text-[11px] uppercase tracking-[0.16em] text-[#6B4423]/80">
                        Your Message
                      </span>
                      <div className="relative mt-2">
                        <MessageSquare
                          size={16}
                          strokeWidth={1.6}
                          className="pointer-events-none absolute left-3.5 top-3.5 text-[#6B4423]/70"
                        />
                        <textarea
                          required
                          name="message"
                          rows={5}
                          className={`${fieldClass} min-h-[140px] resize-y pt-3`}
                          placeholder="How can we help?"
                        />
                      </div>
                    </label>

                    {error ? (
                      <p className="text-sm text-red-700">{error}</p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center bg-[#4a2c18] px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#3a2212] disabled:opacity-60 sm:w-auto"
                    >
                      {submitting ? "Sending…" : "Send Message"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#eadfd3] bg-[#f7f4ef]">
        <div
          className="relative h-[280px] w-full sm:h-[400px] md:h-[480px]"
          onClick={() => setMapActive(true)}
        >
          <iframe
            title="Arileon studio — Bengaluru"
            src={MAPS_EMBED}
            className={`block h-full w-full border-0 ${
              mapActive ? "pointer-events-auto" : "pointer-events-none"
            }`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          {!mapActive ? (
            <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/90 px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#2b1d0e] shadow-sm">
              Click map to move it
            </p>
          ) : null}
        </div>
      </section>

      <section className="border-t border-[#eadfd3] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8 md:py-16 lg:px-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                data-gsap-item
                className="flex flex-col items-center px-2 text-center"
              >
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center text-[#6B4423]">
                  <Icon size={24} strokeWidth={1.4} />
                </span>
                <h3 className="font-display text-base font-semibold md:text-lg">
                  {title}
                </h3>
                <p className="mt-2 max-w-[260px] text-xs leading-5 text-[#3a2a1c]/70">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
