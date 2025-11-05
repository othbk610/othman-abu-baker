
import React from 'react';
import { SelectorIcon } from './IconComponents';

interface SortBarProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const SortBar: React.FC<SortBarProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="mb-4 flex items-center justify-start md:justify-end">
      <label htmlFor="sort-jobs" className="text-sm font-medium text-slate-700 ml-3">
        ترتيب حسب:
      </label>
      <div className="relative">
        <select
          id="sort-jobs"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-label="Sort jobs"
        >
          <option value="newest">الأحدث أولاً</option>
          <option value="pay-high">الأعلى أجراً</option>
          <option value="pay-low">الأقل أجراً</option>
          <option value="location">الموقع (أ-ي)</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
           <SelectorIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default SortBar;
