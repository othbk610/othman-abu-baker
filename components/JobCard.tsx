import React, { useState } from 'react';
import { Job } from '../types';
import { JOB_CATEGORIES } from '../constants';
import { LocationMarkerIcon, ClockIcon, CashIcon, BookmarkIcon } from './IconComponents';
import UserRating from './UserRating';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  const categoryName = JOB_CATEGORIES.find(c => c.id === job.category)?.name || 'غير مصنف';
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    // In a real app, you would dispatch an action to save/unsave the job
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would open an application form or trigger an API call
    alert(`لقد قدمت على وظيفة: ${job.title}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden cursor-pointer"
      onClick={() => onViewDetails(job)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onViewDetails(job); }}
      aria-label={`عرض تفاصيل وظيفة ${job.title}`}
    >
      <div className="p-5 flex-grow flex flex-col">
        <div>
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-slate-800 mb-2">{job.title}</h3>
                <span className="bg-teal-100 text-teal-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full whitespace-nowrap">{categoryName}</span>
            </div>
            <p className="text-slate-600 text-sm mb-4 line-clamp-2">{job.description}</p>
            
            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <LocationMarkerIcon className="h-4 w-4 text-gray-400" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-gray-400" />
                <span>{job.date}, {job.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <CashIcon className="h-4 w-4 text-gray-400" />
                <span className="font-semibold text-teal-600">{job.pay} {job.currency}</span>
              </div>
            </div>
        </div>

        <div className="border-t mt-auto pt-3 text-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-500">صاحب العمل:</p>
                    <p className="font-semibold text-slate-700">{job.postedBy.name}</p>
                </div>
                <UserRating rating={job.postedBy.rating} reviewsCount={job.postedBy.reviewsCount} />
            </div>
        </div>
      </div>

      <div className="bg-slate-50 p-3 border-t border-slate-200">
        <div className="flex items-center justify-between gap-3">
           <button
            onClick={handleApplyClick}
            className="flex-1 bg-teal-500 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 text-sm"
          >
            تقديم طلب الآن
          </button>
          <button
            onClick={handleSaveClick}
            className={`p-2 border rounded-md transition-colors ${
              isSaved 
                ? 'bg-teal-100 border-teal-300 text-teal-600' 
                : 'border-slate-300 text-slate-500 hover:bg-slate-100'
            }`}
            aria-label={isSaved ? "إلغاء حفظ الوظيفة" : "حفظ الوظيفة"}
          >
            <BookmarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
