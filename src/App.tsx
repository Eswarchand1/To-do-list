import React, { useState, useEffect, useMemo } from 'react';
import { CheckSquare, Sparkles } from 'lucide-react';
import { Task, TaskStats } from './types/Task';
import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem';
import { TaskStatsComponent } from './components/TaskStats';
import { TaskFilter } from './components/TaskFilter';
import { loadTasksFromStorage, saveTasksToStorage } from './utils/localStorage';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = loadTasksFromStorage();
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // Calculate task statistics
  const stats: TaskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, active, completionRate };
  }, [tasks]);

  // Filter tasks based on active filter
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // Sort tasks: active tasks first, then by priority (high -> low), then by creation date
  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      // Completed tasks go to the bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Sort by priority
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Sort by creation date (newest first)
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }, [filteredTasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : undefined,
            }
          : task
      )
    );
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <CheckSquare className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TaskMaster Pro
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Intelligent task management with AI-powered suggestions to boost your productivity
          </p>
        </div>

        {/* Task Statistics */}
        <TaskStatsComponent stats={stats} />

        {/* Task Form */}
        <TaskForm onAddTask={addTask} />

        {/* Task Filter */}
        <TaskFilter
          activeFilter={filter}
          onFilterChange={setFilter}
          taskCounts={taskCounts}
        />

        {/* Task List */}
        <div className="space-y-4">
          {sortedTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 max-w-md mx-auto">
                <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-fit mx-auto mb-4">
                  <Sparkles className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {filter === 'all' && 'No tasks yet!'}
                  {filter === 'active' && 'No active tasks!'}
                  {filter === 'completed' && 'No completed tasks yet!'}
                </h3>
                <p className="text-gray-600">
                  {filter === 'all' && 'Create your first task to get started with TaskMaster Pro.'}
                  {filter === 'active' && 'All your tasks are completed! Great job! 🎉'}
                  {filter === 'completed' && 'Complete some tasks to see them here.'}
                </p>
              </div>
            </div>
          ) : (
            sortedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={toggleTaskComplete}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            Built with ❤️ using React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;