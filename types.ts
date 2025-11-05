export type JobCategory = 'childcare' | 'elderlycare' | 'handyman' | 'cleaning' | 'transport' | 'other';

export interface User {
  id: number;
  name: string;
  rating: number; // Rating out of 5
  reviewsCount: number;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  category: JobCategory;
  date: string;
  time: string;
  pay: number;
  currency: string;
  postedBy: User;
}
