
import React from 'react';
import { SearchIcon, LocationMarkerIcon } from './IconComponents';

interface SearchBarProps {
  onSearchChange: (term: string) => void;
  onLocationChange: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange, onLocationChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input 
          type="text"
          placeholder="ابحث عن خدمة (مثلاً 'رعاية أطفال')"
          className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <LocationMarkerIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input 
          type="text"
          placeholder="الموقع (مثلاً 'الناصرة')"
          className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
