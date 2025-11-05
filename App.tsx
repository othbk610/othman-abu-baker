import React, { useState, useEffect, useCallback } from 'react';
import { Job } from './types';
import { MOCK_JOBS, CURRENT_USER } from './constants';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import JobList from './components/JobList';
import JobModal from './components/JobModal';
import PostJobModal from './components/PostJobModal';
import { PlusIcon } from './components/IconComponents';
import SortBar from './components/SortBar';

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState<string>('newest');

  const filterAndSortJobs = useCallback(() => {
    let tempJobs = jobs;

    if (searchTerm) {
      tempJobs = tempJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      tempJobs = tempJobs.filter(job => 
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    
    // Create a mutable copy for sorting
    const sortedJobs = [...tempJobs];

    // Sorting logic
    switch (sortBy) {
        case 'pay-high':
            sortedJobs.sort((a, b) => b.pay - a.pay);
            break;
        case 'pay-low':
            sortedJobs.sort((a, b) => a.pay - b.pay);
            break;
        case 'location':
            sortedJobs.sort((a, b) => a.location.localeCompare(b.location, 'ar'));
            break;
        case 'newest':
        default:
            sortedJobs.sort((a, b) => b.id - a.id);
            break;
    }

    setFilteredJobs(sortedJobs);
  }, [jobs, searchTerm, locationFilter, sortBy]);

  useEffect(() => {
    filterAndSortJobs();
  }, [filterAndSortJobs]);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseDetails = () => {
    setSelectedJob(null);
  };

  const handleAddJob = (newJobData: Omit<Job, 'id' | 'postedBy'>) => {
    const newJob: Job = {
      ...newJobData,
      id: Date.now(),
      postedBy: CURRENT_USER,
    };
    setJobs(prevJobs => [newJob, ...prevJobs]);
    setIsPostModalOpen(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <Header onPostJobClick={() => setIsPostModalOpen(true)} />
      
      <main className="container mx-auto p-4 md:p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-600">ابحث عن فرصة عملك اليومية</h1>
          <p className="text-slate-600 mt-2 text-lg">منصتك للتواصل مع مقدمي الخدمات والزبائن في منطقتك.</p>
        </div>
        
        <SearchBar 
          onSearchChange={setSearchTerm}
          onLocationChange={setLocationFilter}
        />
        
        <SortBar sortBy={sortBy} onSortChange={setSortBy} />

        <JobList jobs={filteredJobs} onViewDetails={handleViewDetails} />
      </main>

      {selectedJob && (
        <JobModal job={selectedJob} onClose={handleCloseDetails} />
      )}
      
      {isPostModalOpen && (
        <PostJobModal 
          onClose={() => setIsPostModalOpen(false)} 
          onAddJob={handleAddJob}
        />
      )}
      
      <div className="fixed bottom-6 left-6 md:hidden">
        <button 
          onClick={() => setIsPostModalOpen(true)}
          className="bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform duration-200 hover:scale-110"
          aria-label="أضف وظيفة جديدة"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default App;
