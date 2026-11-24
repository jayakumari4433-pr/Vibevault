# Product images

Drop your real product photos here, then point a product at one.

## How to use your own photos

1. Add an image file to this folder, e.g. `public/images/ring.jpg`
   (square, ~1000×1000px, JPG or WebP works best).
2. In `lib/products.ts`, set the product's `image` field:

   ```ts
   {
     id: "ring",
     type: "ring",
     name: "Ring Mystery Box",
     price: 149,
     image: "/images/ring.jpg",   // ← add this line
     ...
   }
   ```

That's it. The storefront automatically shows the photo instead of the built-in
illustration, everywhere that product appears (cards, box page, cart).

Leave `image` unset and the on-brand SVG illustration is used — so the site
always looks finished, with or without photos.

Tip: keep a consistent look (same background / lighting) across photos so the
grid feels like one brand.

## Current images & license

The photos shipped here (`ring.jpg`, `pendant.jpg`, `jewellery.jpg`,
`jewellery-extra.jpg`, `customize.jpg`) are free stock photos from
**Pexels** (https://www.pexels.com). The Pexels license allows free use —
including commercial — with no attribution required.

They're representative placeholders so the store looks finished. For a real
selling site, **replace them with photos of your actual products** — real
inventory shots convert far better and accurately show what buyers receive.
Keep the same filenames and the site picks them up automatically.
