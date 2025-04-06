
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { CartContextType } from "@/types/cart.types";

export const useCart = (): CartContextType => {
  return useContext(CartContext);
};