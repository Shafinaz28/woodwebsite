# Admin + payments setup

## 1. Supabase admin user
1. Supabase Dashboard → **Authentication** → Add user (email + password).
2. In `.env.local` add:
   ```
   VITE_ADMIN_EMAIL=your-admin@email.com
   ```
3. Run SQL from `supabase/migrations/001_orders.sql` in the SQL Editor.
4. Open `/admin/login` and sign in.

## 2. Product image uploads
1. Run SQL from `supabase/migrations/002_product_images.sql` in the SQL Editor  
   (creates a public Storage bucket named `products`).
2. Admin → **Products** → **Add / Edit product**.
3. Click **Upload image**, pick a file, then **Save product**.

## 3. Razorpay
1. Create account at [razorpay.com](https://razorpay.com).
2. Dashboard → **API Keys** → generate Test key.
3. Add to `.env.local`:
   ```
   VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
   ```
4. Cart → Checkout → **Pay with Razorpay**.

## 4. Routes
- `/admin` — dashboard
- `/admin/products` — product CRUD
- `/admin/orders` — orders
- `/checkout` — shipping + Razorpay
- `/order-success` — confirmation

Restart `npm run dev` after changing `.env.local`.
