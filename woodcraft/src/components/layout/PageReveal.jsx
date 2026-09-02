import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function PageReveal({ children }) {
  const { pathname } = useLocation();
  const chromeDone = useRef(false);
  const footerDone = useRef(false);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const site = document.querySelector("[data-site-gsap]");
    const root = document.querySelector("[data-page-reveal]");
    if (!root) return undefined;

    if (!chromeDone.current && site) {
      const bar = site.querySelector("[data-gsap-bar]");
      const nav = site.querySelector("[data-gsap-nav]");
      if (bar) {
        gsap.fromTo(
          bar,
          { y: -28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
        );
      }
      if (nav) {
        gsap.fromTo(
          nav,
          { y: -16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            delay: 0.08,
            ease: "power3.out",
            clearProps: "transform",
          }
        );
      }
      chromeDone.current = true;
    }

    if (!footerDone.current && site) {
      const footer = site.querySelector("[data-gsap-footer]");
      if (footer) {
        gsap.fromTo(
          footer,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 94%",
              toggleActions: "play none none none",
            },
          }
        );
      }
      footerDone.current = true;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root,
        { opacity: 0.15 },
        { opacity: 1, duration: 0.45, ease: "power2.out" }
      );

      const blocks = gsap.utils.toArray(
        root.querySelectorAll("section, article, [data-gsap-block]")
      );

      if (blocks.length === 0) {
        gsap.fromTo(
          root.children,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
      }

      blocks.forEach((el, i) => {
        const isFirst = i === 0;
        gsap.fromTo(
          el,
          { opacity: 0, y: isFirst ? 22 : 40 },
          {
            opacity: 1,
            y: 0,
            duration: isFirst ? 0.85 : 0.7,
            delay: isFirst ? 0.04 : 0,
            ease: "power3.out",
            scrollTrigger: isFirst
              ? undefined
              : {
                  trigger: el,
                  start: "top 88%",
                  toggleActions: "play none none none",
                },
          }
        );
      });

      ScrollTrigger.batch("[data-gsap-item]", {
        interval: 0.1,
        batchMax: 8,
        start: "top 92%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.07,
              ease: "power2.out",
              overwrite: "auto",
            }
          );
        },
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 280);
    const t2 = window.setTimeout(refresh, 900);

    const observer = new MutationObserver(() => {
      ScrollTrigger.refresh();
    });
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
      observer.disconnect();
      ctx.revert();
    };
  }, [pathname]);

  return (
    <div data-page-reveal className="min-w-0 overflow-visible">
      {children}
    </div>
  );
}

export default PageReveal;
