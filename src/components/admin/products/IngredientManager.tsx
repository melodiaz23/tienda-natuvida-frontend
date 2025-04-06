// src/components/admin/products/IngredientManager.tsx
import { useState } from 'react';

interface IngredientManagerProps {
  ingredients: string[];
  onIngredientsChange: (newIngredients: string[]) => void;
  error?: string;
}

export default function IngredientManager({
  ingredients,
  onIngredientsChange,
  error
}: IngredientManagerProps) {
  const [ingredientInput, setIngredientInput] = useState('');

  const handleAddIngredient = () => {
    const newIngredient = ingredientInput.trim();
    if (newIngredient && !ingredients.includes(newIngredient)) {
      onIngredientsChange([...ingredients, newIngredient]);
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    onIngredientsChange(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const handleIngredientKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
        Ingredientes
      </label>
      <div className="flex">
        <input
          type="text"
          id="ingredient-input"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          onKeyDown={handleIngredientKeyPress}
          placeholder="Añadir ingrediente y presionar Enter"
          className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-green-dark focus:border-green-dark"
        />
        <button
          type="button"
          onClick={handleAddIngredient}
          className="px-4 py-2 bg-green-dark text-white rounded-r-md"
        >
          Añadir
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="bg-green-light/30 px-2 py-1 rounded-md flex items-center">
            <span>{ingredient}</span>
            <button
              type="button"
              onClick={() => handleRemoveIngredient(ingredient)}
              className="ml-2 text-red-500 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}