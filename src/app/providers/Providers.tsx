
import { AuthProvider } from "@/context/AuthContext";
import ToastProvider from "./toast.provider";
import CartProvider from "@/context/CartContext";
import { ReactNode } from "react";


export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider >
          {children}
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}