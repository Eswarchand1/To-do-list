export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: TaskPriority;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export type TaskCategory = 'work' | 'personal' | 'health' | 'learning' | 'shopping' | 'other';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface TaskStats {
  total: number;
  completed: number;
  active: number;
  completionRate: number;
}