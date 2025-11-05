import { Job, JobCategory, User } from './types';

export const JOB_CATEGORIES: { id: JobCategory; name: string }[] = [
  { id: 'childcare', name: 'رعاية أطفال' },
  { id: 'elderlycare', name: 'رعاية كبار السن' },
  { id: 'handyman', name: 'تصليحات وصيانة' },
  { id: 'cleaning', name: 'تنظيف' },
  { id: 'transport', name: 'توصيل ونقليات' },
  { id: 'other', name: 'خدمات أخرى' },
];

export const MOCK_USERS: User[] = [
    { id: 101, name: 'فاطمة أحمد', rating: 4.8, reviewsCount: 15 },
    { id: 102, name: 'علي محمد', rating: 4.5, reviewsCount: 8 },
    { id: 103, name: 'سارة حسين', rating: 5.0, reviewsCount: 22 },
    { id: 104, name: 'خالد يوسف', rating: 4.2, reviewsCount: 5 },
];

export const CURRENT_USER: User = {
    id: 201, name: 'أنت (مستخدم حالي)', rating: 4.9, reviewsCount: 3
};

export const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: 'مطلوب جليسة أطفال بشكل فوري',
    description: 'نبحث عن جليسة أطفال للعناية بطفلين (أعمار 3 و 5 سنوات) لهذه الليلة. تتطلب المهمة اللعب معهم وتحضير وجبة عشاء خفيفة ووضعهم في السرير.',
    location: 'الناصرة',
    category: 'childcare',
    date: 'اليوم',
    time: '19:00 - 23:00',
    pay: 50,
    currency: 'شيكل/ساعة',
    postedBy: MOCK_USERS[0]
  },
  {
    id: 2,
    title: 'مساعدة لمرافقة مسنّة للمستشفى',
    description: 'مطلوب شخص لمرافقة سيدة مسنة لموعد في المستشفى. يشمل المساعدة في التنقل والانتظار معها. لا يتطلب خبرة طبية.',
    location: 'حيفا',
    category: 'elderlycare',
    date: '25 يوليو 2024',
    time: '09:00 - 12:00',
    pay: 150,
    currency: 'شيكل للمهمة',
    postedBy: MOCK_USERS[1]
  },
  {
    id: 3,
    title: 'تركيب رفوف وخزانة صغيرة',
    description: 'أحتاج إلى عامل صيانة لتركيب بعض الرفوف على الحائط وتجميع خزانة صغيرة من ايكيا. الأدوات متوفرة.',
    location: 'عكا',
    category: 'handyman',
    date: 'نهاية الأسبوع',
    time: 'مرن',
    pay: 200,
    currency: 'شيكل للمهمة',
    postedBy: MOCK_USERS[2]
  },
  {
    id: 4,
    title: 'تنظيف شقة بعد الترميم',
    description: 'مطلوب عامل/ة تنظيف للمساعدة في تنظيف شامل لشقة من غرفتين بعد انتهاء أعمال الترميم. التركيز على إزالة الغبار والأوساخ.',
    location: 'شفاعمرو',
    category: 'cleaning',
    date: 'غداً',
    time: 'صباحاً',
    pay: 45,
    currency: 'شيكل/ساعة',
    postedBy: MOCK_USERS[3]
  },
  {
    id: 5,
    title: 'توصيل طرد من أم الفحم إلى الطيبة',
    description: 'مطلوب سائق لتوصيل طرد صغير (صندوق أحذية) من أم الفحم إلى عنوان في الطيبة. التسليم فوري.',
    location: 'أم الفحم',
    category: 'transport',
    date: 'اليوم',
    time: 'خلال ساعتين',
    pay: 80,
    currency: 'شيكل للمهمة',
    postedBy: MOCK_USERS[0]
  },
];
