import { motion } from 'framer-motion';
import { categories } from '@/lib/wordBank';
import { Check } from 'lucide-react';

interface CategorySelectorProps {
  selected: string[];
  onSelect: (categoryIds: string[]) => void;
}

export default function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  const allCategoryIds = categories.map(c => c.id);
  const allSelected = selected.length === allCategoryIds.length;

  const handleToggleAll = () => {
    if (allSelected) {
      // Si están todos seleccionados, deseleccionar todos excepto el primero
      onSelect([allCategoryIds[0]]);
    } else {
      // Seleccionar todos
      onSelect(allCategoryIds);
    }
  };

  const handleToggleCategory = (categoryId: string) => {
    if (selected.includes(categoryId)) {
      // Deseleccionar (pero mínimo debe haber 1)
      if (selected.length > 1) {
        onSelect(selected.filter(id => id !== categoryId));
      }
    } else {
      // Seleccionar
      onSelect([...selected, categoryId]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-200">Selecciona categorías</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleAll}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            allSelected
              ? 'bg-purple-500 text-white'
              : 'bg-slate-700/50 text-slate-300 border border-slate-600'
          }`}
        >
          {allSelected ? '✓ Todas' : 'Seleccionar Todas'}
        </motion.button>
      </div>

      <p className="text-sm text-slate-400">
        {selected.length} {selected.length === 1 ? 'categoría seleccionada' : 'categorías seleccionadas'}
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => {
          const isSelected = selected.includes(category.id);
          
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleToggleCategory(category.id)}
              className={`glass-card p-4 text-center transition-all duration-300 relative ${
                isSelected
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-slate-700/50 hover:border-purple-500/30'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 bg-purple-500 rounded-full p-1">
                  <Check size={14} className="text-white" />
                </div>
              )}
              <div className="text-3xl mb-1">{category.name.split(' ')[0]}</div>
              <div className="text-sm font-medium">{category.name.split(' ').slice(1).join(' ')}</div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}