import { ProductContext, ProductContextType } from "@/context/ProductContext";
import { useContext } from "react";


export const useProduct = (): ProductContextType => {
  return useContext(ProductContext);
};