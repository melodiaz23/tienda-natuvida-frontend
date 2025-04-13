import { Price } from "@/types/product.types";

export const calculateCartItemPrices = (
  price: Price,
  quantity: number
): { subtotal: number; unitPrice: number } => {
  let subtotal: number;

  if (quantity === 1) {
    subtotal = price.unit;
  } else if (quantity === 2) {
    subtotal = price.twoUnits || price.unit * 2; // Si no hay precio para dos unidades, multiplicamos por 2
  } else if (quantity === 3) {
    subtotal = price.threeUnits || price.unit * 3;

  } else if (quantity > 3) {
    subtotal = calculateComplexPrice(price, quantity);
  } else {
    subtotal = price.unit * quantity;
  }
  const unitPrice = subtotal / quantity;

  return { subtotal, unitPrice };
};

const calculateComplexPrice = (price: Price, quantity: number) => {
  const promotionSet = Math.floor(quantity / 5);
  const remainder = quantity % 5;

  const setPrice = price.unit * 5;

  const subtotal = promotionSet * setPrice;

  // Si no hay unidades restantes, devolver el subtotal de los conjuntos
  if (remainder === 0) {
    return subtotal;
  }

  let remainderSubtotal = 0;

  if (remainder === 1) {
    remainderSubtotal = price.unit;
  } else if (remainder === 2) {
    remainderSubtotal = price.twoUnits || price.unit * 2;
  } else if (remainder === 3) {
    remainderSubtotal = price.threeUnits || price.unit * 3;
  } else if (remainder === 4) {
    remainderSubtotal = ((price.threeUnits && (price.threeUnits / 3) * 4) || price.unit * 4);
  }

  return subtotal + remainderSubtotal;
};