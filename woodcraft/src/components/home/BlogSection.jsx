import { Link } from "react-router";
import { posts } from "../../data/posts";

function BlogSection() {
  return (
    <section className="bg-background py-8 md:py-10">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10">
        <div className="relative flex items-center justify-center mb-6 md:mb-7">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[0.08em] text-dark-brown uppercase text-center">
            Latest From Our Blog
          </h2>
          <Link
            to="/blog"
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs text-dark-brown border border-dark-brown/25 rounded-md hover:border-dark-brown/50 transition"
          >
            View All Articles
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="sm:hidden text-center mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs text-dark-brown border border-dark-brown/25 rounded-md"
          >
            View All Articles →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-lg overflow-hidden bg-[#f3ebe0]/60 border border-dark-brown/10"
            >
              <Link to={`/blog/${post.slug}`}>
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
                  <span className="inline-block mt-3 text-sm font-medium text-dark-brown group-hover:opacity-70 transition">
                    Read More →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
