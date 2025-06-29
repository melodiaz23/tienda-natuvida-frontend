'use client';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/product.types';
import { toast } from 'react-toastify';
import { Button } from "@heroui/button";

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
    <Button
      onClick={handleAddToCart}
      disabled={isLoading}
      size='md'
      className={`${className || " bg-green-dark text-white! font-bold text-l text-center"}`}
    >
      {isLoading ? "Agregando..." : text}
    </Button>
  );
};

export default AddToCartBtn;