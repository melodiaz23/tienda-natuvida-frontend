'use client';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/product.types';
import { toast } from 'react-toastify';


interface AddToCartBtnProps {
  product: Product;
  prodQuantity?: number;
  text?: string;
  className?: string;
}

const AddToCartBtn = ({
  product,
  prodQuantity = 1,
  text = "Agregar al carrito",
  className = ""
}: AddToCartBtnProps) => {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addToCart(product, prodQuantity);
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      toast.error("Error al agregar producto al carrito");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={`${className || "w-full bg-gray-950 text-white font-bold text-l p-2 rounded text-center"}`}
    >
      {isLoading ? "Agregando..." : text}
    </button>
  );
};

export default AddToCartBtn;