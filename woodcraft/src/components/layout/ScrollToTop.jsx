import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    document.body.style.removeProperty("overflow");
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search]);

  return null;
}

export default ScrollToTop;
