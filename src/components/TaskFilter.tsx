import React from 'react';
import { SaveAll as All, Circle, CheckCircle } from 'lucide-react';

interface TaskFilterProps {
  activeFilter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
  activeFilter,
  onFilterChange,
  taskCounts,
}) => {
  const filters = [
    { key: 'all' as const, label: 'All Tasks', icon: All, count: taskCounts.all },
    { key: 'active' as const, label: 'Active', icon: Circle, count: taskCounts.active },
    { key: 'completed' as const, label: 'Completed', icon: CheckCircle, count: taskCounts.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map(({ key, label, icon: Icon, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeFilter === key
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Icon size={18} />
          <span>{label}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            activeFilter === key
              ? 'bg-blue-700 text-blue-100'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {count}
          </span>
        </button>
      ))}
    </div>
  );
};