# Product Images by Room

Put product photos in the matching folder:

public/images/products/
├── bedroom/        ← Bedroom furniture
├── living-room/    ← Sofas, lounge chairs, coffee tables
├── dining/         ← Dining tables & chairs
├── outdoor/        ← Outdoor furniture
├── office/         ← Office desks & chairs
└── storage/        ← Cabinets, shelves, sideboards

## How to add a new product image

1. Drop the image into the correct folder, e.g.:
   `public/images/products/bedroom/my-bed.jpg`

2. In `src/data/products.js`, add:

```js
{
  id: 9,
  name: "My Bed",
  slug: "my-bed",
  category: "Bedroom",
  price: 75000,
  image: "/images/products/bedroom/my-bed.jpg",
}
```

## Cover images

Each folder has `cover.jpg` used for category circles on the homepage.
Replace that file to change the category picture.
