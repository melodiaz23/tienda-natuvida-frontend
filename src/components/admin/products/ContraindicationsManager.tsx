import React, { useState } from 'react';

interface ContraindicationsManagerProps {
  contraindications: string[];
  onContraindicationsChange: (newContraindications: string[]) => void;
  error?: string;
}

export default function ContraindicationsManager({
  contraindications,
  onContraindicationsChange,
  error
}: ContraindicationsManagerProps) {
  const [newContraindication, setNewContraindication] = useState('');

  const handleAddContraindication = () => {
    if (newContraindication.trim()) {
      onContraindicationsChange([...contraindications, newContraindication.trim()]);
      setNewContraindication('');
    }
  };

  const handleRemoveContraindication = (index: number) => {
    const updatedContraindications = [...contraindications];
    updatedContraindications.splice(index, 1);
    onContraindicationsChange(updatedContraindications);
  };

  return (
    <div className="mb-6">
      <h3 className="block text-sm font-medium text-gray-700 mb-1">Contraindicaciones</h3>

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={newContraindication}
          onChange={(e) => setNewContraindication(e.target.value)}
          placeholder="Ej: Embarazo, Lactancia"
          className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddContraindication();
            }
          }}
        />
        <button
          type="button"
          onClick={handleAddContraindication}
          className="px-4 py-2 bg-nv-green-light text-white rounded-md hover:bg-green-dark"
        >
          Añadir
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {contraindications.length > 0 && (
        <div className="space-y-2 mt-3">
          <p className="text-sm font-medium text-gray-700">Contraindicaciones añadidas:</p>
          <ul className="bg-gray-50 p-3 rounded border border-gray-200">
            {contraindications.map((contraindication, index) => (
              <li key={index} className="flex justify-between items-center py-1">
                <span>⚠️ {contraindication}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveContraindication(index)}
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