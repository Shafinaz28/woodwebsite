import { useState } from "react";
import { submitContactToSheet } from "../lib/contactSheet";
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
const PHONE = "+91 99800 85805";
const EMAIL = "arileoninfo@gmail.com";
const MAPS_URL =
  "https://www.google.com/maps?q=Wood+Masters,+1st+Cross,+Nelagadarana+Halli,+Nagasandra+Post,+Bengaluru+560073";
const MAPS_EMBED = `${MAPS_URL}&output=embed`;

const quickContacts = [
  {
    icon: Phone,
    title: "Call Us",
    lines: [PHONE, "Mon – Sat · 10:00 – 18:00 IST"],
    href: "tel:+919980085805",
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
      "https://wa.me/919980085805?text=" +
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

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await submitContactToSheet({
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
    "w-full min-h-[44px] border border-[#eadfd3] bg-[#faf8f4] py-3 pl-11 pr-4 text-base sm:text-sm text-[#2b1d0e] outline-none focus:border-[#6B4423]/45 focus:bg-white transition";

  const iconClass =
    "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B4423]/70";

  return (
    <div className="overflow-x-hidden bg-[#F8F4F0] text-[#2b1d0e]">
      <section className="bg-[#2d1f16]">
        <div className="mx-auto max-w-[1280px] px-4 py-10 text-center sm:px-8 sm:py-16 md:px-12 md:py-20">
          <h1 className="font-display text-[2.15rem] font-semibold leading-[1.15] text-white sm:text-5xl lg:text-[3.25rem]">
            Contact Us
          </h1>
          <p className="mt-3 font-display text-base italic text-[#d4b896] sm:text-lg">
            We&apos;d love to hear from you.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/80 sm:mt-5 sm:text-[15px] sm:leading-7">
            Have a question about our furniture or need help choosing the
            perfect piece? Our team is here to help.
          </p>
          <a
            href="#message"
            className="mt-7 inline-flex w-full max-w-xs items-center justify-center bg-[#434f23] px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#363f1c] sm:mt-8 sm:w-auto"
          >
            Get in Touch
          </a>
        </div>
      </section>

      <section className="border-y border-[#eadfd3] bg-[#f3efe8]">
        <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8 sm:py-12 md:py-14 lg:px-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {quickContacts.map(({ icon: Icon, title, lines, href }) => (
              <a
                key={title}
                href={href}
                data-gsap-item
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex flex-col items-center px-2 text-center"
              >
                <span className="mb-3 inline-flex h-12 w-12 items-center justify-center text-[#6B4423] sm:mb-4">
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
        className="scroll-mt-20 border-t border-[#eadfd3] bg-white sm:scroll-mt-24"
      >
        <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8 sm:py-14 md:py-20 lg:px-12">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0 text-left">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl md:text-[2.1rem]">
                Visit Our Studio
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#3a2a1c]/80 sm:text-[15px] sm:leading-7">
                Come see the grain up close, sit with the pieces, and find what
                belongs in your home at our Bengaluru workshop space.
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
                    href="tel:+919980085805"
                    className="text-sm transition hover:text-[#6B4423]"
                  >
                    {PHONE}
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
                className="mt-8 inline-flex w-full items-center justify-center bg-[#4a2c18] px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#3a2212] sm:mt-9 sm:w-auto"
              >
                Get Directions
              </a>
            </div>

            <div className="min-w-0">
              {sent ? (
                <div className="py-2 text-left sm:py-4">
                  <span className="mb-5 inline-flex h-14 w-14 items-center justify-center text-[#434f23]">
                    <CheckCircle2 size={32} strokeWidth={1.5} />
                  </span>
                  <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                    Thank you — we&apos;ll be in touch soon.
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-7 text-[#3a2a1c]/75">
                    Your note is with our team. For urgent enquiries, email{" "}
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
                  <h2 className="font-display text-2xl font-semibold sm:text-3xl md:text-[2.1rem]">
                    Send Us a Message
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#3a2a1c]/75 sm:leading-7">
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
                          className={`${fieldClass} min-h-[140px] resize-y`}
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

      <section className="overflow-hidden border-t border-[#eadfd3] bg-[#f7f4ef]">
        <div className="w-full overflow-hidden bg-white">
          <iframe
            title="Arileon — Wood Masters, Bengaluru"
            src={MAPS_EMBED}
            className="block h-[240px] w-full border-0 sm:h-[360px] md:h-[480px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <section className="border-t border-[#eadfd3] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8 sm:py-14 md:py-16 lg:px-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-6">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                data-gsap-item
                className="flex flex-col items-center px-2 text-center"
              >
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center text-[#6B4423] sm:mb-4">
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
