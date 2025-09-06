import React from 'react';
import { CheckCircle, Circle, Target, TrendingUp } from 'lucide-react';
import { TaskStats } from '../types/Task';

interface TaskStatsProps {
  stats: TaskStats;
}

export const TaskStatsComponent: React.FC<TaskStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Target className="text-blue-600" size={24} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Tasks</p>
            <p className="text-3xl font-bold text-orange-600">{stats.active}</p>
          </div>
          <div className="p-3 bg-orange-100 rounded-full">
            <Circle className="text-orange-600" size={24} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Completed</p>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <CheckCircle className="text-green-600" size={24} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Completion Rate</p>
            <p className="text-3xl font-bold text-purple-600">{stats.completionRate}%</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <TrendingUp className="text-purple-600" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};