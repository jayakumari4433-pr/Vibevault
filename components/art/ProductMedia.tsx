import type { BoxType } from "@/lib/types";
import { ProductArt } from "./ProductArt";

/**
 * Product imagery. Shows a real photo when `image` is set (drop files in
 * /public/images and set product.image to e.g. "/images/ring.jpg"), otherwise
 * renders the on-brand SVG illustration. Swap at will — no code changes needed.
 */
export function ProductMedia({
  type,
  image,
  alt,
  className = "",
}: {
  type: BoxType;
  image?: string;
  alt?: string;
  className?: string;
}) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={image} alt={alt ?? ""} className={`h-full w-full object-cover ${className}`} />
    );
  }
  return <ProductArt type={type} className={`h-full w-full ${className}`} />;
}
