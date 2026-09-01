import { Facebook, Instagram, Youtube } from "lucide-react";

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    Icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    Icon: Facebook,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    Icon: Youtube,
  },
];

function SocialIcons({ className = "", iconClassName = "", size = 16 }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {SOCIAL_LINKS.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          title={name}
          className={`inline-flex items-center justify-center transition hover:opacity-70 ${iconClassName}`}
        >
          <Icon size={size} strokeWidth={1.6} />
        </a>
      ))}
    </div>
  );
}

export default SocialIcons;
