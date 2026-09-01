import { Link, useParams } from "react-router";
import { getPostBySlug } from "../data/posts";

function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-2xl">Article not found</h1>
        <Link to="/blog" className="mt-4 border-b border-[#4a2c18] text-sm">
          Back to blog
        </Link>
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden bg-[#f7f4ef] text-[#2b1d0e]">
      <article className="mx-auto max-w-[760px] px-4 py-8 sm:px-6 sm:py-14">
        <Link
          to="/blog"
          className="text-xs uppercase tracking-[0.16em] text-[#2b1d0e]/50"
        >
          ← All articles
        </Link>
        <p className="mt-6 text-[11px] text-[#2b1d0e]/45">{post.date}</p>
        <h1 className="font-display mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
          {post.title}
        </h1>
        <img
          src={post.image}
          alt=""
          className="mt-8 aspect-[16/9] w-full object-cover"
        />
        <div className="mt-8 space-y-5 text-sm leading-7 text-[#2b1d0e]/80 sm:text-[15px]">
          {post.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </article>
    </main>
  );
}

export default BlogPost;
