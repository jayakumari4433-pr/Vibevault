import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}
