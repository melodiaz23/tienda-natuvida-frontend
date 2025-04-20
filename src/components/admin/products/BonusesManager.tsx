import React, { useState } from 'react';

interface BonusesManagerProps {
  bonuses: string[];
  onBonusesChange: (newBonuses: string[]) => void;
  error?: string;
}

export default function BonusesManager({ bonuses, onBonusesChange, error }: BonusesManagerProps) {
  const [newBonus, setNewBonus] = useState('');

  const handleAddBonus = () => {
    if (newBonus.trim()) {
      onBonusesChange([...bonuses, newBonus.trim()]);
      setNewBonus('');
    }
  };

  const handleRemoveBonus = (index: number) => {
    const updatedBonuses = [...bonuses];
    updatedBonuses.splice(index, 1);
    onBonusesChange(updatedBonuses);
  };

  return (
    <div className="mb-6">
      <h3 className="block text-sm font-medium text-gray-700 mb-1">Beneficios por la compra</h3>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={newBonus}
          onChange={(e) => setNewBonus(e.target.value)}
          placeholder="Ej: Obsequio sorpresa, Plan nutricional gratuito"
          className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddBonus();
            }
          }}
        />
        <button
          type="button"
          onClick={handleAddBonus}
          className="px-4 py-2 bg-nv-green-light text-white rounded-md hover:bg-green-dark"
        >
          Añadir
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {bonuses.length > 0 && (
        <div className="space-y-2 mt-3">
          <p className="text-sm font-medium text-gray-700">Bonificaciones añadidas:</p>
          <ul className="bg-gray-50 p-3 rounded border border-gray-200">
            {bonuses.map((bonus, index) => (
              <li key={index} className="flex justify-between items-center py-1">
                <span>✓ {bonus}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveBonus(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}