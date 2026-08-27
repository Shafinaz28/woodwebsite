import { Link } from "react-router";

import living6 from "../../assets/hero/living6.avif";
import bead7 from "../../assets/hero/bead7.avif";
import dining7 from "../../assets/hero/dining7.avif";
import outdoor from "../../assets/hero/outdoor.avif";

const posts = [
  {
    title: "How to Choose the Right Wood Furniture",
    date: "May 15, 2024",
    image: living6,
  },
  {
    title: "Bedroom Styling Tips with Natural Wood",
    date: "June 02, 2024",
    image: bead7,
  },
  {
    title: "Why Solid Wood Dining Tables Last Longer",
    date: "July 18, 2024",
    image: dining7,
  },
  {
    title: "Creating Calm Outdoor Living Spaces",
    date: "August 05, 2024",
    image: outdoor,
  },
];

function BlogSection() {
  return (
    <section className="bg-background py-8 md:py-10">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10">
        <div className="relative flex items-center justify-center mb-6 md:mb-7">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[0.08em] text-dark-brown uppercase text-center">
            Latest From Our Blog
          </h2>
          <Link
            to="/about"
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs text-dark-brown border border-dark-brown/25 rounded-md hover:border-dark-brown/50 transition"
          >
            View All Articles
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="sm:hidden text-center mb-6">
          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs text-dark-brown border border-dark-brown/25 rounded-md"
          >
            View All Articles →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group rounded-lg overflow-hidden bg-[#f3ebe0]/60 border border-dark-brown/10"
            >
              <div className="aspect-[16/11] overflow-hidden">
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="px-4 py-4">
                <p className="text-[11px] text-dark-brown/45">{post.date}</p>
                <h3 className="font-display mt-2 text-base font-semibold text-dark-brown leading-snug line-clamp-2 min-h-[2.75rem]">
                  {post.title}
                </h3>
                <Link
                  to="/about"
                  className="inline-block mt-3 text-sm font-medium text-dark-brown group-hover:opacity-70 transition"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
