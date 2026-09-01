import { Link } from "react-router";
import { posts } from "../data/posts";

function Blog() {
  return (
    <main className="overflow-x-hidden bg-[#f7f4ef] text-[#2b1d0e]">
      <section className="bg-[#2d1f16] px-4 py-12 text-center sm:px-8 sm:py-16">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">
          Journal
        </p>
        <h1 className="font-display mt-3 text-3xl font-semibold text-white sm:text-5xl">
          Blog
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/80">
          Notes on wood, rooms, and furniture made to last.
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 py-10 sm:px-8 sm:py-14">
        <div className="grid gap-8 sm:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-lg border border-[#eadfd3] bg-white"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-[11px] text-[#2b1d0e]/45">{post.date}</p>
                  <h2 className="font-display mt-2 text-xl font-semibold leading-snug">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#2b1d0e]/70">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-block text-sm text-[#6B4423]">
                    Read more →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Blog;
