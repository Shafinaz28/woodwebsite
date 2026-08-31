import { Star } from "lucide-react";
import { AdminHeader, card } from "./adminUi.jsx";

const reviews = [
  {
    name: "Ramesh Kumar",
    text: "Beautiful solid wood furniture. The craftsmanship is outstanding and delivery was smooth. Highly recommend Arileon!",
  },
  {
    name: "Priya Sharma",
    text: "Our dining set looks stunning. Premium finish, timeless design, and excellent customer support throughout.",
  },
  {
    name: "Ankit Mehta",
    text: "Worth every rupee. The bedroom collection transformed our home with warmth and lasting quality.",
  },
];

function AdminReviews() {
  return (
    <div>
      <AdminHeader
        title="Reviews"
        subtitle="Testimonials shown on the homepage. Edit copy in src/components/home/Testimonials.jsx"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <article key={review.name} className={`${card} p-5`}>
            <div className="flex gap-0.5 text-[#c4a47c]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="mt-3 text-sm leading-6 text-[#374151]">{review.text}</p>
            <p className="mt-3 text-sm font-semibold">{review.name}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default AdminReviews;
