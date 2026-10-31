import { getCollection } from 'astro:content';

export const topics = {
  'little-things': 'Little Things',
  'beginner-diaries': 'Beginner Diaries',
  'home-and-elsewhere': 'Home & Elsewhere',
  'notes-to-self': 'Notes to Self',
} as const;

export const getNotes = async () => (await getCollection('notes', ({ data }) => !data.draft))
  .sort((a, b) => a.data.order - b.data.order || (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0) || a.id.localeCompare(b.id));

// Tutorials and talks: the public half of documenting the journey.
export const conversations = [
  { title: 'DataMasters Episode 11: End-to-End Ecommerce Data Engineering', context: 'Data Engineering Pilipinas · Starts at 0:14', href: 'https://www.youtube.com/watch?v=0mLDpzMa45o&t=14s' },
  { title: 'Supervised machine learning and linear regression with R', context: 'Josh Dev PH · Taglish session · Starts at 33:45', href: 'https://www.youtube.com/watch?v=IKqhdCGY40E&t=2025s' },
  { title: 'Building AI agents for e-commerce analytics with LangGraph', context: 'DurianPy · Davao Python User Group', href: 'https://www.youtube.com/watch?v=a-yKmK8RUso' },
  { title: 'Breaking into Data Science with Kuya Dev, Part 2', context: 'Kuya Dev · S05E06 · Starts at 2:11', href: 'https://www.youtube.com/watch?v=9pmzRu7BmNk&t=131s' },
  { title: 'AWS Community Day Philippines', context: '2023 · Speaker listing', href: 'https://community.awsug.ph/2023/manila.html' },
];
