import { Price } from '@/types/product.types';
import React from 'react';

interface PriceManagerProps {
  prices: Price;
  onPriceChange: (field: keyof Price, value: number) => void;
  errors?: {
    unit?: { message?: string };
    twoUnits?: { message?: string };
    threeUnits?: { message?: string };
  };
}

export default function PriceManager({ prices, onPriceChange, errors }: PriceManagerProps) {
  const handlePriceChange = (field: keyof Price) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onPriceChange(field, value);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-700">Precios</h3>
      <div className="mb-4">
        <label htmlFor="price-unit" className="block text-sm font-medium text-gray-700 mb-1">
          Precio Unitario
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">$</span>
          </div>
          <input
            type="number"
            id="price-unit"
            value={prices.unit || ''}
            onChange={handlePriceChange('unit')}
            step="0.01"
            className="w-full pl-7 p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
          />
        </div>
        {errors?.unit && <p className="text-red-500 text-sm">{errors.unit.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="price-twoUnits" className="block text-sm font-medium text-gray-700 mb-1">
          Precio 2 Unidades
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">$</span>
          </div>
          <input
            type="number"
            id="price-twoUnits"
            value={prices.twoUnits || ''}
            onChange={handlePriceChange('twoUnits')}
            step="0.01"
            className="w-full pl-7 p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
          />
        </div>
        {errors?.twoUnits && <p className="text-red-500 text-sm">{errors.twoUnits.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="price-threeUnits" className="block text-sm font-medium text-gray-700 mb-1">
          Precio 3 Unidades
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">$</span>
          </div>
          <input
            type="number"
            id="price-threeUnits"
            value={prices.threeUnits || ''}
            onChange={handlePriceChange('threeUnits')}
            step="0.01"
            className="w-full pl-7 p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
          />
        </div>
        {errors?.threeUnits && <p className="text-red-500 text-sm">{errors.threeUnits.message}</p>}
      </div>
    </div>
  );
}