
import { useContext } from "react";
import { CartContext, CartContextType } from "@/context/CartContext";


export const useCart = (): CartContextType => {
  return useContext(CartContext);
};