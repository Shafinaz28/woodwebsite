import { Quote } from "lucide-react";

function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Ananya Rao",
      location: "Bengaluru",
      review:
        "Beautiful craftsmanship and excellent finishing. The furniture feels premium and fits perfectly into our home.",
    },
    {
      id: 2,
      name: "Rahul Mehta",
      location: "Mumbai",
      review:
        "The quality exceeded our expectations. Every detail feels carefully designed and the delivery experience was smooth.",
    },
    {
      id: 3,
      name: "Neha Kapoor",
      location: "Hyderabad",
      review:
        "We were looking for timeless furniture rather than something trendy. The pieces look elegant and feel built to last.",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">

      <div className="max-w-[1500px] mx-auto px-5 md:px-10">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">

          <p className="text-xs uppercase tracking-[0.25em] mb-4">
            Customer Stories
          </p>

          <h2 className="text-3xl md:text-5xl font-light">
            Loved By Our Customers
          </h2>

          <p className="mt-5 text-sm md:text-base text-black/60 leading-7">
            Furniture becomes meaningful when it becomes part of the spaces
            and moments people live in every day.
          </p>

        </div>


        {/* Reviews */}
        <div className="grid md:grid-cols-3 gap-6">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="
                border
                border-black/10
                p-8
                md:p-10
                min-h-[300px]
                flex
                flex-col
                justify-between
                hover:shadow-lg
                transition
                duration-300
              "
            >

              <div>

                <Quote
                  size={28}
                  strokeWidth={1.2}
                  className="mb-7"
                />

                <p className="text-base md:text-lg font-light leading-8">
                  “{review.review}”
                </p>

              </div>

              <div className="mt-10">

                <p className="text-sm font-medium">
                  {review.name}
                </p>

                <p className="text-xs text-black/50 mt-1">
                  {review.location}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;
