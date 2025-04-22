'use client'
import { useState, useEffect } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/hooks/useCart';
import { toast } from 'react-toastify';

interface EditQuantityButtonProps {
  itemId: string;
  initialQuantity: number;
  maxQuantity?: number;
  setNewQuantity?: (quantity: number) => void;
  className?: string;
}

export default function EditQuantityButton({ itemId, initialQuantity, maxQuantity = 5, className = '', setNewQuantity }: EditQuantityButtonProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { updateQuantity } = useCart();

  useEffect(() => {
    setQuantity(initialQuantity);
    if (setNewQuantity) {
      setNewQuantity(initialQuantity);
    }
  }, [initialQuantity, setNewQuantity]);

  const handleDecrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity < 0) {
      return;
    }
    setQuantity(newQuantity);
    updateQuantity(itemId, newQuantity);

    if (setNewQuantity) {
      setNewQuantity(newQuantity);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateQuantity(itemId, newQuantity);

      if (setNewQuantity) {
        setNewQuantity(newQuantity);
      }
    } else {
      // Mostrar mensaje de límite alcanzado
      toast.info(`Máximo ${maxQuantity} unidades por producto`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className={`flex items-center border border-gray-300 rounded-md ${className}`}>
      <button
        onClick={handleDecrement}

        className="p-1 text-green-dark hover:bg-gray-100 "
        aria-label="Decrease quantity"
      >
        <MinusIcon className="h-4 w-4" />
      </button>

      <span className="w-8 text-center text-sm">{quantity}</span>

      <button
        onClick={handleIncrement}
        disabled={quantity >= maxQuantity}
        className="p-1 text-green-dark hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-white"
        aria-label="Increase quantity"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}