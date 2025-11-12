/**
 * Department Participation Table Component
 * Shows participation breakdown by department
 */

import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { ParticipationByDepartment } from '@/types/api/analytics';
import { downloadCSV, getExportTimestamp } from '@/utils/export/exportData';

interface DepartmentParticipationTableProps {
  data: ParticipationByDepartment[];
}

export const DepartmentParticipationTable: React.FC<DepartmentParticipationTableProps> = ({ data }) => {
  const handleExport = () => {
    const exportData = data.map(dept => ({
      Department: dept.department,
      'Total Users': dept.totalUsers,
      'Active Users': dept.activeUsers,
      'Inactive Users': dept.inactiveUsers,
      'Participation Rate': `${dept.participationRate.toFixed(1)}%`,
      'Avg Recognitions per User': dept.avgRecognitionsPerUser,
    }));
    downloadCSV(exportData, `department_participation_${getExportTimestamp()}`);
  };

  // Sort by participation rate descending
  const sortedData = [...data].sort((a, b) => b.participationRate - a.participationRate);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Department Participation</h3>
          <p className="text-sm text-gray-500 mt-1">Participation rates and engagement by department</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <span>Export</span>
          <ArrowDownTrayIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Department</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Total Users</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Active</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Inactive</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Participation Rate</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Avg Recognitions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((dept, index) => (
              <tr key={dept.department} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-900">{dept.department}</span>
                  </div>
                </td>
                <td className="text-center py-4 px-4 text-sm text-gray-700">{dept.totalUsers}</td>
                <td className="text-center py-4 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {dept.activeUsers}
                  </span>
                </td>
                <td className="text-center py-4 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {dept.inactiveUsers}
                  </span>
                </td>
                <td className="text-center py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${dept.participationRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {dept.participationRate.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="text-center py-4 px-4 text-sm font-medium text-gray-900">
                  {dept.avgRecognitionsPerUser.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

