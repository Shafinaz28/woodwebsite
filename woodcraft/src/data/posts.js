import living6 from "../assets/hero/living6.avif";
import bead7 from "../assets/hero/bead7.avif";
import dining7 from "../assets/hero/dining7.avif";
import outdoor from "../assets/hero/outdoor.avif";

export const posts = [
  {
    slug: "choose-right-wood-furniture",
    title: "How to Choose the Right Wood Furniture",
    date: "May 15, 2024",
    image: living6,
    excerpt:
      "Grain, density, and how you live in the room all matter more than a trend.",
    body: [
      "The right wooden piece should feel settled in your home from the first week — not like a showroom sample that never quite belongs.",
      "Start with how the room is used. A dining table that sees homework and long meals needs a denser timber and a finish that wipes clean. A living-room bench can be softer in look if it is not carrying daily weight.",
      "Look at the grain, the joinery, and the finish in person when you can. Solid wood ages; veneer and mixed materials behave differently. Ask what the piece is made of, not only how it is styled.",
      "At Arileon we work with seasoned hardwoods and hand-fitted joints so the furniture can stay with the house as the rooms change.",
    ],
  },
  {
    slug: "bedroom-styling-natural-wood",
    title: "Bedroom Styling Tips with Natural Wood",
    date: "June 02, 2024",
    image: bead7,
    excerpt:
      "Keep the palette quiet so timber, linen, and light can do the work.",
    body: [
      "A bedroom reads calmer when wood is allowed to be the warmest surface in the room.",
      "Pair a solid bed or side table with plain linen and one lamp with a soft shade. Too many competing grains or glossy finishes make the space feel busy.",
      "Leave a little floor visible around the bed. Storage that hides clutter — a chest, a bench — keeps the timber looking considered rather than crowded.",
      "If you are choosing a new bed or wardrobe, measure walkways first. Comfort in a bedroom is as much about how you move as how the piece photographs.",
    ],
  },
  {
    slug: "solid-wood-dining-tables",
    title: "Why Solid Wood Dining Tables Last Longer",
    date: "July 18, 2024",
    image: dining7,
    excerpt:
      "A well-made table can take years of meals, work, and gathering without looking tired.",
    body: [
      "A dining table is used harder than almost any other piece in the house. Solid hardwood, properly dried and joined, can take that daily wear.",
      "Boards that are allowed to move with the seasons, and a finish that can be refreshed, keep the top honest. Hollow or thin tops dent and loosen sooner.",
      "Choose a size that fits how you actually sit — not only the room’s width on a plan. Chairs need space to pull out; people need space to pass behind.",
      "We build tables for Indian homes: steady under a full meal, simple to live with, and meant to stay in the family.",
    ],
  },
  {
    slug: "calm-outdoor-living-spaces",
    title: "Creating Calm Outdoor Living Spaces",
    date: "August 05, 2024",
    image: outdoor,
    excerpt:
      "Shade, honest materials, and a few well-chosen pieces beat a crowded patio.",
    body: [
      "Outdoor rooms work when they feel like an extension of the house, not a second showroom.",
      "Use timber that can live with sun and rain, and keep the set small: a table, seating, perhaps a bench. Plants and shade do more than extra furniture.",
      "Place pieces where you already pause — a morning chai corner, an evening conversation spot — rather than filling every edge of the terrace.",
      "Arileon’s outdoor pieces are made to sit outside without fuss, so the garden stays the point of the room.",
    ],
  },
];

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) || null;
}
