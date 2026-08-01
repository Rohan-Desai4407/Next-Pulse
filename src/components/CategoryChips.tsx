import { useState } from 'react';
import { useData } from '@/context/DataContext';

export default function CategoryChips({ onFilter }: { onFilter?: (cat: string) => void }) {
  const { categories } = useData();
  const [active, setActive] = useState('All');

  const handleClick = (cat: string) => {
    setActive(cat);
    onFilter?.(cat);
  };

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-4 py-2 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${
            active === cat
              ? 'gradient-primary text-white'
              : 'glass text-soft hover:text-white hover:bg-white/5'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
