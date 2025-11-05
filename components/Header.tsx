
import React from 'react';
import { BriefcaseIcon, PlusIcon } from './IconComponents';

interface HeaderProps {
  onPostJobClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPostJobClick }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="h-8 w-8 text-teal-500" />
          <span className="text-2xl font-bold text-slate-800">مصلحة</span>
        </div>
        <button 
          onClick={onPostJobClick}
          className="hidden md:flex items-center gap-2 bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors duration-300"
        >
          <PlusIcon className="h-5 w-5" />
          <span>أضف وظيفة</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
