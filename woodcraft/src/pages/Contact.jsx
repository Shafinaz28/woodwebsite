import { useState } from "react";
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
    href: "https://wa.me/919980085805",
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

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  const fieldClass =
    "w-full border border-[#eadfd3] bg-[#faf8f4] py-3 pl-11 pr-4 text-sm text-[#2b1d0e] outline-none focus:border-[#6B4423]/45 focus:bg-white transition";

  const iconClass =
    "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B4423]/70";

    return (
    <div className="bg-[#F8F4F0] text-[#2b1d0e]">
      {/* Hero */}
      <section className="bg-[#2d1f16]">
        <div className="max-w-[1280px] mx-auto px-8 sm:px-12 py-16 md:py-20 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold leading-[1.1] text-white">
          Contact Us
        </h1>
          <p className="mt-3 text-lg text-[#d4b896] font-display italic">
            We&apos;d love to hear from you.
          </p>
          <p className="mt-5 text-sm md:text-[15px] leading-7 text-white/80 max-w-md mx-auto">
            Have a question about our furniture or need help choosing the
            perfect piece? Our team is here to help.
          </p>
          <a
            href="#message"
            className="inline-flex mt-8 px-8 py-3.5 bg-[#434f23] text-white text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-[#363f1c] transition"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Quick contact */}
      <section className="border-y border-[#eadfd3] bg-[#f3efe8]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-12 md:py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {quickContacts.map(({ icon: Icon, title, lines, href }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="flex flex-col items-center text-center group"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center text-[#6B4423]">
                  <Icon size={26} strokeWidth={1.4} />
                </span>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                {lines.map((line) => (
                  <p
                    key={line}
                    className="mt-1.5 text-sm text-[#3a2a1c]/75 leading-6 group-hover:text-[#6B4423] transition break-words max-w-[220px]"
                  >
                    {line}
                  </p>
                ))}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Studio left + form right */}
      <section id="message" className="bg-white border-t border-[#eadfd3]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-14 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left — Visit Our Studio */}
            <div className="text-left">
              <h2 className="font-display text-3xl md:text-[2.1rem] font-semibold">
                Visit Our Studio
              </h2>
              <p className="mt-4 text-sm md:text-[15px] text-[#3a2a1c]/80 leading-7 max-w-md">
                Come see the grain up close, sit with the pieces, and find what
                belongs in your home at our Bengaluru workshop space.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-3 items-start">
                  <MapPin
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[#6B4423]"
                  />
                  <p className="text-sm leading-6">{ADDRESS}</p>
                </div>
                <div className="flex gap-3 items-start">
                  <Phone
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[#6B4423]"
                  />
                  <a
                    href="tel:+919980085805"
                    className="text-sm hover:text-[#6B4423] transition"
                  >
                    {PHONE}
                  </a>
                </div>
                <div className="flex gap-3 items-start">
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
                className="inline-flex mt-9 px-8 py-3.5 bg-[#4a2c18] text-white text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-[#3a2212] transition"
              >
                Get Directions
              </a>
            </div>

            {/* Right — Form */}
            <div>
              {sent ? (
                <div className="text-left py-4">
                  <span className="mb-5 inline-flex h-14 w-14 items-center justify-center text-[#434f23]">
                    <CheckCircle2 size={32} strokeWidth={1.5} />
                  </span>
                  <h2 className="font-display text-3xl font-semibold">
                    Thank you — we&apos;ll be in touch soon.
                  </h2>
                  <p className="mt-4 text-sm text-[#3a2a1c]/75 leading-7 max-w-md">
                    Your note is with our team. For urgent enquiries, email{" "}
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-[#6B4423] underline underline-offset-2"
                    >
                      {EMAIL}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-8 text-[11px] uppercase tracking-[0.2em] font-bold border-b border-[#2b1d0e] pb-1"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-3xl md:text-[2.1rem] font-semibold">
                    Send Us a Message
                  </h2>
                  <p className="mt-3 text-sm text-[#3a2a1c]/75 leading-7">
                    Fill in the form and we&apos;ll get back to you as soon as
                    we can.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <label className="block">
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
                      <label className="block">
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

                    <div className="grid sm:grid-cols-2 gap-5">
                      <label className="block">
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
                            className={fieldClass}
                            placeholder="+91"
                          />
                        </div>
                      </label>
                      <label className="block">
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

                    <label className="block">
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
                          className={`${fieldClass} resize-y min-h-[140px]`}
                          placeholder="How can we help?"
                        />
                      </div>
                    </label>

                    <button
                      type="submit"
                      className="inline-flex px-8 py-3.5 bg-[#4a2c18] text-white text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-[#3a2212] transition"
                    >
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map — full width */}
      <section className="bg-[#f7f4ef] border-t border-[#eadfd3]">
        <div className="w-full overflow-hidden bg-white min-h-[360px] md:min-h-[480px]">
          <iframe
            title="Arileon — Wood Masters, Bengaluru"
            src={MAPS_EMBED}
            className="block h-[360px] md:h-[480px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      {/* Values */}
      <section className="bg-white border-t border-[#eadfd3]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-14 md:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center flex flex-col items-center">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center text-[#6B4423]">
                  <Icon size={24} strokeWidth={1.4} />
                </span>
                <h3 className="font-display text-base md:text-lg font-semibold">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-[#3a2a1c]/70 max-w-[200px]">
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
