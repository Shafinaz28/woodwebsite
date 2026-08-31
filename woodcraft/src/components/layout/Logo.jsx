import { Link } from "react-router";

/**
 * Arileon logo from /images/logo.avif
 * invert: true on dark backgrounds (footer, newsletter, loading)
 */
function Logo({
  to = "/",
  className = "",
  onClick,
  size = "md",
  invert = false,
}) {
  const heights = {
    sm: "h-12 w-40",
    md: "h-14 sm:h-16 sm:w-48",
    lg: "h-20 md:h-24 md:w-64",
  };

  const img = (
    <img
      src="/images/logo.avif"
      alt="Arileon Furniture"
      className={`${heights[size] || heights.md} w-auto object-contain object-left ${
        invert ? "brightness-0 invert" : ""
      }`}
    />
  );

  if (!to) {
    return (
      <span className={`inline-flex shrink-0 items-center ${className}`}>
        {img}
      </span>
    );
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="Arileon Furniture home"
    >
      {img}
    </Link>
  );
}

export default Logo;
