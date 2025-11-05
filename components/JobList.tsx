
import React from 'react';
import { Job } from '../types';
import JobCard from './JobCard';

interface JobListProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onViewDetails }) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-slate-500 text-lg">لا توجد وظائف تطابق بحثك حاليًا.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default JobList;
