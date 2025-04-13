'use client';
import { RiCloseFill } from "react-icons/ri";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/types/cart.types";

export function DeleteItemButton({
  item
}: {
  item: CartItem;
}) {

  const { removeFromCart } = useCart();

  const handleDelete = () => {
    removeFromCart(item.id);
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      aria-label="Eliminar item del carrito"
      className="flex size-4 items-center justify-center rounded-full bg-green-dark"
    >
      <RiCloseFill className="mx-[1px] h-4 w-4 text-whiteygreen" />
    </button>
  );
}
