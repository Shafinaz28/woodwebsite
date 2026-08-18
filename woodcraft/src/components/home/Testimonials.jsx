import { Star } from "lucide-react";

const reviews = [
  {
    name: "Ramesh Kumar",
    text: "Beautiful solid wood furniture. The craftsmanship is outstanding and delivery was smooth. Highly recommend Arileon!",
    initial: "RK",
  },
  {
    name: "Priya Sharma",
    text: "Our dining set looks stunning. Premium finish, timeless design, and excellent customer support throughout.",
    initial: "PS",
  },
  {
    name: "Ankit Mehta",
    text: "Worth every rupee. The bedroom collection transformed our home with warmth and lasting quality.",
    initial: "AM",
  },
];

function Testimonials() {
  return (
    <section className="bg-background py-8 md:py-10">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10">
        <div className="flex items-center gap-4 md:gap-6 max-w-3xl mx-auto mb-6 md:mb-7">
          <span className="flex-1 h-px bg-dark-brown/25" />
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[0.08em] text-dark-brown uppercase whitespace-nowrap text-center">
            What Our Customers Say
          </h2>
          <span className="flex-1 h-px bg-dark-brown/25" />
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="relative rounded-lg border border-dark-brown/15 bg-cream/50 px-5 py-6"
            >
              <span
                aria-hidden
                className="font-display text-3xl leading-none text-dark-brown"
              >
                &ldquo;
              </span>

              <div className="mt-2 flex gap-4 items-start">
                <div
                  className="w-14 h-14 shrink-0 rounded-full bg-[#d4c4b0] text-dark-brown flex items-center justify-center text-sm font-semibold tracking-wide"
                  aria-hidden
                >
                  {review.initial}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-6 text-dark-brown/80">
                    {review.text}
                  </p>
                  <p className="mt-3 text-sm font-medium text-dark-brown">
                    — {review.name}
                  </p>
                </div>
              </div>

              <div
                className="mt-4 flex items-center justify-end gap-0.5 text-[#e08a3c]"
                aria-label="5 star rating"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
