import React, { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Task, TaskCategory, TaskPriority } from '../types/Task';
import { generateSmartTasks, getCategoryEmoji } from '../utils/taskGenerator';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('other');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      priority,
      completed: false,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setCategory('other');
    setPriority('medium');
    setIsOpen(false);
  };

  const handleSuggestionClick = (suggestion: any) => {
    setTitle(suggestion.title);
    setDescription(suggestion.description);
    setCategory(suggestion.category);
    setPriority(suggestion.priority);
    setShowSuggestions(false);
  };

  const suggestions = generateSmartTasks(undefined, 6);

  if (!isOpen) {
    return (
      <div className="mb-8">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
        >
          <Plus size={24} />
          Add New Task
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Description (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="work">{getCategoryEmoji('work')} Work</option>
              <option value="personal">{getCategoryEmoji('personal')} Personal</option>
              <option value="health">{getCategoryEmoji('health')} Health</option>
              <option value="learning">{getCategoryEmoji('learning')} Learning</option>
              <option value="shopping">{getCategoryEmoji('shopping')} Shopping</option>
              <option value="other">{getCategoryEmoji('other')} Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            Add Task
          </button>
          
          <button
            type="button"
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            AI Suggestions
          </button>
          
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>

      {showSuggestions && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="text-purple-600" size={20} />
            Smart Task Suggestions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-left p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span>{getCategoryEmoji(suggestion.category)}</span>
                  <span className="font-medium text-gray-800">{suggestion.title}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{suggestion.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};