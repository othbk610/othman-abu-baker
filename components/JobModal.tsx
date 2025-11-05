import React from 'react';
import { Job } from '../types';
import { JOB_CATEGORIES } from '../constants';
import { LocationMarkerIcon, ClockIcon, CashIcon, XIcon, BriefcaseIcon, UserCircleIcon } from './IconComponents';
import UserRating from './UserRating';

interface JobModalProps {
  job: Job;
  onClose: () => void;
}

const JobModal: React.FC<JobModalProps> = ({ job, onClose }) => {
  const categoryName = JOB_CATEGORIES.find(c => c.id === job.category)?.name || 'غير مصنف';

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-slate-800">{job.title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          
          <p className="text-slate-600 mb-6">{job.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 border-t border-b border-slate-200 py-4 mb-6">
            <div className="flex items-center gap-3 col-span-1 sm:col-span-2">
              <UserCircleIcon className="h-8 w-8 text-teal-500" />
              <div>
                <p className="text-sm text-slate-500">صاحب العمل</p>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-lg">{job.postedBy.name}</p>
                  <UserRating rating={job.postedBy.rating} reviewsCount={job.postedBy.reviewsCount} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BriefcaseIcon className="h-6 w-6 text-teal-500" />
              <div>
                <p className="text-sm text-slate-500">الفئة</p>
                <p className="font-semibold">{categoryName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LocationMarkerIcon className="h-6 w-6 text-teal-500" />
              <div>
                <p className="text-sm text-slate-500">الموقع</p>
                <p className="font-semibold">{job.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ClockIcon className="h-6 w-6 text-teal-500" />
              <div>
                <p className="text-sm text-slate-500">الوقت والتاريخ</p>
                <p className="font-semibold">{job.date}, {job.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CashIcon className="h-6 w-6 text-teal-500" />
              <div>
                <p className="text-sm text-slate-500">الدفع</p>
                <p className="font-semibold">{job.pay} {job.currency}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors"
            >
              إغلاق
            </button>
            <button
              className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors"
            >
              تقديم طلب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
