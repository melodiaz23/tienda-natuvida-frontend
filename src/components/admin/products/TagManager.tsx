import { useState } from 'react';

interface TagManagerProps {
  tags: string[];
  onTagsChange: (newTags: string[]) => void;
  error?: string;
}

export default function TagManager({ tags, onTagsChange, error }: TagManagerProps) {
  const [tagInput, setTagInput] = useState('');

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim().toLowerCase();
    if (newTag && !tags.includes(newTag)) {
      onTagsChange([...tags, newTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="mb-6">
      <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
        Etiquetas
      </label>
      <div className="flex">
        <input
          type="text"
          id="tags"
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={handleTagKeyPress}
          placeholder="Añadir etiqueta y presionar Enter"
          className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-green-dark focus:border-green-dark"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="px-4 py-2 bg-nv-green-light text-white rounded-r-md hover:bg-green-dark"
        >
          Añadir
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div key={tag} className="bg-green-dark text-whiteygreen px-2 py-1 rounded-md flex items-center">
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 text-whiteygreen font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-sm text-gray-500 mt-1">
        Incluye &quot;destacados&quot; si quieres que el producto aparezca en la página principal.
      </p>
    </div>
  );
}