import { useState } from 'react';

interface BenefitManagerProps {
  benefits: string[];
  onBenefitsChange: (newBenefits: string[]) => void;
  error?: string;
}

export default function BenefitManager({
  benefits,
  onBenefitsChange,
  error
}: BenefitManagerProps) {
  const [benefitInput, setBenefitInput] = useState('');

  const handleAddBenefit = () => {
    const newBenefit = benefitInput.trim();
    if (newBenefit && !benefits.includes(newBenefit)) {
      onBenefitsChange([...benefits, newBenefit]);
      setBenefitInput('');
    }
  };

  const handleRemoveBenefit = (benefitToRemove: string) => {
    onBenefitsChange(benefits.filter(benefit => benefit !== benefitToRemove));
  };

  const handleBenefitKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddBenefit();
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">
        Beneficios
      </label>
      <div className="flex">
        <input
          type="text"
          id="benefit-input"
          value={benefitInput}
          onChange={(e) => setBenefitInput(e.target.value)}
          onKeyDown={handleBenefitKeyPress}
          placeholder="Añadir beneficio y presionar Enter"
          className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-green-dark focus:border-green-dark"
        />
        <button
          type="button"
          onClick={handleAddBenefit}
          className="px-4 py-2 bg-green-dark text-white rounded-r-md"
        >
          Añadir
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-green-light/30 px-2 py-1 rounded-md flex items-center">
            <span>{benefit}</span>
            <button
              type="button"
              onClick={() => handleRemoveBenefit(benefit)}
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