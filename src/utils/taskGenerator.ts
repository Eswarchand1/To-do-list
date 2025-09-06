import { TaskCategory, TaskPriority } from '../types/Task';

interface TaskSuggestion {
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
}

const taskSuggestions: TaskSuggestion[] = [
  // Work tasks
  { title: 'Review quarterly reports', description: 'Analyze performance metrics and prepare feedback', category: 'work', priority: 'high' },
  { title: 'Schedule team meeting', description: 'Organize weekly sync with project stakeholders', category: 'work', priority: 'medium' },
  { title: 'Update project documentation', description: 'Ensure all technical specs are current', category: 'work', priority: 'medium' },
  { title: 'Respond to client emails', description: 'Clear inbox and address urgent inquiries', category: 'work', priority: 'high' },
  { title: 'Prepare presentation slides', description: 'Create visual materials for upcoming pitch', category: 'work', priority: 'high' },
  
  // Health tasks
  { title: 'Morning workout routine', description: '30-minute cardio or strength training session', category: 'health', priority: 'medium' },
  { title: 'Schedule annual checkup', description: 'Book appointment with primary care physician', category: 'health', priority: 'medium' },
  { title: 'Prepare healthy meal prep', description: 'Cook nutritious meals for the week ahead', category: 'health', priority: 'low' },
  { title: 'Take vitamins', description: 'Daily supplement routine for optimal health', category: 'health', priority: 'low' },
  { title: 'Drink 8 glasses of water', description: 'Stay hydrated throughout the day', category: 'health', priority: 'low' },
  
  // Personal tasks
  { title: 'Call family members', description: 'Catch up with parents and siblings', category: 'personal', priority: 'medium' },
  { title: 'Organize living space', description: 'Declutter and clean main living areas', category: 'personal', priority: 'low' },
  { title: 'Plan weekend activities', description: 'Research and schedule fun recreational activities', category: 'personal', priority: 'low' },
  { title: 'Update budget spreadsheet', description: 'Review expenses and adjust financial planning', category: 'personal', priority: 'medium' },
  { title: 'Back up important files', description: 'Ensure digital documents are safely stored', category: 'personal', priority: 'medium' },
  
  // Learning tasks
  { title: 'Complete online course module', description: 'Progress through educational curriculum', category: 'learning', priority: 'medium' },
  { title: 'Read industry articles', description: 'Stay updated on latest trends and developments', category: 'learning', priority: 'low' },
  { title: 'Practice new skill', description: 'Dedicate time to developing expertise', category: 'learning', priority: 'medium' },
  { title: 'Take online certification exam', description: 'Test knowledge and earn professional credentials', category: 'learning', priority: 'high' },
  { title: 'Watch educational videos', description: 'Learn from experts through video content', category: 'learning', priority: 'low' },
  
  // Shopping tasks
  { title: 'Grocery shopping', description: 'Buy fresh produce and weekly essentials', category: 'shopping', priority: 'medium' },
  { title: 'Research new laptop', description: 'Compare specifications and prices for upgrade', category: 'shopping', priority: 'low' },
  { title: 'Buy birthday gift', description: 'Find thoughtful present for upcoming celebration', category: 'shopping', priority: 'medium' },
  { title: 'Order household supplies', description: 'Restock cleaning and maintenance items', category: 'shopping', priority: 'low' },
  { title: 'Compare insurance rates', description: 'Shop for better coverage and pricing', category: 'shopping', priority: 'medium' }
];

export const generateSmartTasks = (category?: TaskCategory, count: number = 3): TaskSuggestion[] => {
  let filteredSuggestions = taskSuggestions;
  
  if (category) {
    filteredSuggestions = taskSuggestions.filter(task => task.category === category);
  }
  
  // Shuffle and return random suggestions
  const shuffled = [...filteredSuggestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const getCategoryEmoji = (category: TaskCategory): string => {
  const categoryEmojis = {
    work: '💼',
    personal: '🏠',
    health: '💪',
    learning: '📚',
    shopping: '🛒',
    other: '📋'
  };
  return categoryEmojis[category];
};

export const getPriorityColor = (priority: TaskPriority): string => {
  const priorityColors = {
    low: 'text-green-600 bg-green-50',
    medium: 'text-yellow-600 bg-yellow-50',
    high: 'text-red-600 bg-red-50'
  };
  return priorityColors[priority];
};