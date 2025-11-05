import React, { useState } from 'react';
import { Job, JobCategory, User } from '../types';
import { JOB_CATEGORIES } from '../constants';
import { XIcon } from './IconComponents';
import { generateJobPost } from '../services/geminiService';
import Spinner from './Spinner';

interface PostJobModalProps {
  onClose: () => void;
  onAddJob: (job: Omit<Job, 'id' | 'postedBy'>) => void;
}

const PostJobModal: React.FC<PostJobModalProps> = ({ onClose, onAddJob }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<JobCategory>('other');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [pay, setPay] = useState('');
  const [currency, setCurrency] = useState('شيكل/ساعة');
  
  const [rawPrompt, setRawPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!rawPrompt.trim()) {
      setError('الرجاء إدخال وصف أولي للوظيفة.');
      return;
    }
    setIsGenerating(true);
    setError('');
    try {
      const result = await generateJobPost(rawPrompt);
      setTitle(result.title);
      setDescription(result.description);
      const foundCategory = JOB_CATEGORIES.find(c => c.id === result.category);
      if (foundCategory) {
        setCategory(foundCategory.id);
      }
    } catch (e: any) {
      setError(e.message || 'حدث خطأ غير متوقع.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location || !date || !time || !pay) {
        setError("يرجى ملء جميع الحقول المطلوبة.");
        return;
    }
    onAddJob({
      title,
      description,
      category,
      location,
      date,
      time,
      pay: Number(pay),
      currency
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-2xl font-bold text-slate-800">أضف وظيفة جديدة</h2>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg space-y-2">
            <label htmlFor="ai-prompt" className="block text-sm font-bold text-teal-800">
              هل تحتاج للمساعدة؟ صِف ما تحتاجه وسنقوم بكتابة الإعلان لك.
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="ai-prompt"
                type="text"
                value={rawPrompt}
                onChange={(e) => setRawPrompt(e.target.value)}
                placeholder="مثلاً: بدي حدا يضل مع الولاد اليوم المسا بالناصرة"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 flex-grow"
              />
              <button 
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex justify-center items-center bg-teal-500 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-600 transition-colors disabled:bg-teal-300"
              >
                {isGenerating ? <Spinner /> : 'توليد بالذكاء الاصطناعي ✨'}
              </button>
            </div>
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">عنوان الوظيفة</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">الوصف</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">الفئة</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value as JobCategory)} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-md">
                {JOB_CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">الموقع</label>
              <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">التاريخ</label>
              <input type="text" id="date" value={date} onChange={(e) => setDate(e.target.value)} required placeholder="مثلاً: اليوم، غداً، 25/7" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
            </div>
             <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">الوقت</label>
              <input type="text" id="time" value={time} onChange={(e) => setTime(e.target.value)} required placeholder="مثلاً: 18:00 - 22:00" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
            </div>
          </div>
          
           <div>
              <label className="block text-sm font-medium text-gray-700">الدفع</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                 <input type="number" value={pay} onChange={(e) => setPay(e.target.value)} required className="block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" placeholder="50"/>
                 <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500">
                    <option>شيكل/ساعة</option>
                    <option>شيكل للمهمة</option>
                 </select>
              </div>
            </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <button type="button" onClick={onClose} className="bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors">
              إلغاء
            </button>
            <button type="submit" className="bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600 transition-colors">
              نشر الوظيفة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobModal;
