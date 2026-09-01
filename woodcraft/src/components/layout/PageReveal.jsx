import { useLayoutEffect } from "react";
import { useLocation } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function PageReveal({ children }) {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const root = document.querySelector("[data-page-reveal]");
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root,
        { opacity: 0.2 },
        { opacity: 1, duration: 0.45, ease: "power2.out" }
      );

      const blocks = gsap.utils.toArray(
        root.querySelectorAll("section, article")
      );

      blocks.forEach((el, i) => {
        const isHero = i === 0 && pathname === "/";
        gsap.fromTo(
          el,
          { opacity: 0, y: isHero ? 24 : 40 },
          {
            opacity: 1,
            y: 0,
            duration: isHero ? 0.9 : 0.7,
            delay: isHero ? 0.05 : 0,
            ease: "power3.out",
            scrollTrigger: isHero
              ? undefined
              : {
                  trigger: el,
                  start: "top 88%",
                  toggleActions: "play none none none",
                },
          }
        );
      });
    }, root);

    const float = document.querySelector("[data-float-actions]");
    const floatTween = float
      ? gsap.fromTo(
          float,
          { opacity: 0, scale: 0.85, y: 16 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            delay: 0.35,
            ease: "back.out(1.4)",
          }
        )
      : null;

    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 250);

    return () => {
      window.clearTimeout(t);
      floatTween?.kill();
      ctx.revert();
    };
  }, [pathname]);

  return (
    <div data-page-reveal className="min-w-0">
      {children}
    </div>
  );
}

export default PageReveal;
