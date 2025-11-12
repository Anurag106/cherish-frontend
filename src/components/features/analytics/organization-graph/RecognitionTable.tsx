/**
 * Recognition Table Component
 * Displays recognition data in table format
 */

import React from 'react';
import { TeamMember } from '@/types/api/analytics';
import { Avatar } from '@/components/ui/Avatar';

interface RecognitionTableProps {
  title: string;
  data: TeamMember[];
}

export const RecognitionTable: React.FC<RecognitionTableProps> = ({ title, data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-500 text-center py-4">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Name</th>
              <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Given</th>
              <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Received</th>
              <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((member) => (
              <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.initials}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{member.name}</span>
                  </div>
                </td>
                <td className="text-center py-3 px-2">
                  <span className="text-sm text-gray-700">{member.given}</span>
                </td>
                <td className="text-center py-3 px-2">
                  <span className="text-sm text-gray-700">{member.received}</span>
                </td>
                <td className="text-center py-3 px-2">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white text-sm font-semibold">
                    {member.total}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

