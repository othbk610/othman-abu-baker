import React from 'react';
import { StarIcon } from './IconComponents';

interface UserRatingProps {
  rating: number;
  reviewsCount: number;
}

const UserRating: React.FC<UserRatingProps> = ({ rating, reviewsCount }) => {
  return (
    <div className="flex items-center gap-1" aria-label={`التقييم: ${rating} من 5 نجوم`}>
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <StarIcon
            key={index}
            className={`h-4 w-4 ${index < Math.round(rating) ? 'text-amber-400' : 'text-slate-300'}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">({reviewsCount} مراجعة)</span>
    </div>
  );
};

export default UserRating;
