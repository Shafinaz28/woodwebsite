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
    sm: "h-9",
    md: "h-11 sm:h-12",
    lg: "h-14 md:h-16",
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
