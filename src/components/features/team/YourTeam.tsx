'use client';

import React, { useEffect, useState } from 'react';
import { SparklesIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Avatar } from '../../ui/Avatar';
import { teamApi, TeamResponse } from '@/services/api/team/teamApi';
import { sessionUtils } from '@/utils/api/session';
import { useUser } from '@/contexts/UserContext';

interface TeamMember {
  id: string;
  name: string;
  lastRecognition?: string; // "Never" or date like "180 days ago"
  initials: string;
  color: string;
}

interface RecognitionProgress {
  current: number;
  target: number;
  daysRemaining: number;
}

interface YourTeamProps {
  className?: string;
}

// Color palette for team member avatars
const avatarColors = [
  'bg-green-500',
  'bg-purple-500', 
  'bg-blue-500',
  'bg-lime-500',
  'bg-teal-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-orange-500'
];

// Generate random last recognition data for now
const generateRandomLastRecognition = (): string => {
  const options = ['Never', '7 days ago', '14 days ago', '30 days ago', '60 days ago', '90 days ago', '180 days ago', '335 days ago'];
  return options[Math.floor(Math.random() * options.length)];
};

// Get initials from full name
const getInitials = (fullName: string): string => {
  if (!fullName) return '??';
  const words = fullName.split(' ').filter(Boolean);
  if (words.length === 0) return '??';
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

export default function YourTeam({ className = '' }: YourTeamProps) {
  const { userProfile } = useUser();
  const [teamData, setTeamData] = useState<TeamResponse | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [progress, setProgress] = useState<RecognitionProgress>({
    current: 0,
    target: 5,
    daysRemaining: 29
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeamData = async () => {
      // Ensure we're on the client side
      if (typeof window === 'undefined') {
        return;
      }

      console.log('👤 User profile:', userProfile);
      console.log('🆔 Team ID from profile:', userProfile?.teamId);
      
      if (!userProfile?.teamId) {
        console.log('❌ No teamId found in user profile');
        setIsLoading(false);
        return;
      }

      try {
        console.log('🔍 Loading team data for teamId:', userProfile.teamId);
        
        const token = sessionUtils.getToken();
        if (!token) {
          console.error('❌ No authentication token available');
          setError('No authentication token available');
          setIsLoading(false);
          return;
        }

        console.log('🔑 Token available, making API call...');
        const teamResponse = await teamApi.getTeam(token, userProfile.teamId);
        console.log('✅ Team data loaded:', teamResponse);
        setTeamData(teamResponse);

        // Validate team response structure
        if (!teamResponse || typeof teamResponse !== 'object') {
          throw new Error('Invalid team response: response is not an object');
        }

        if (!teamResponse.employees || !Array.isArray(teamResponse.employees)) {
          throw new Error('Invalid team response: employees is not an array');
        }

        // Transform employees to team members
        const transformedMembers: TeamMember[] = teamResponse.employees.map((employee, index) => {
          if (!employee || typeof employee !== 'object' || !employee.id || !employee.fullName) {
            console.warn('⚠️ Invalid employee data:', employee);
            return null;
          }
          
          return {
            id: employee.id,
            name: employee.fullName,
            lastRecognition: generateRandomLastRecognition(),
            initials: getInitials(employee.fullName),
            color: avatarColors[index % avatarColors.length]
          };
        }).filter(Boolean) as TeamMember[];

        setTeamMembers(transformedMembers);
        
        // Update progress based on team size
        const teamSize = Math.max(transformedMembers.length, 1); // Ensure minimum of 1
        setProgress({
          current: Math.floor(Math.random() * Math.min(teamSize, 5)),
          target: Math.min(teamSize, 5),
          daysRemaining: Math.floor(Math.random() * 30) + 1
        });

      } catch (err: any) {
        console.error('❌ Error loading team data:', err);
        console.error('❌ Error details:', {
          message: err.message,
          status: err.status,
          response: err.response
        });
        
        let errorMessage = 'Failed to load team data';
        if (err.message) {
          errorMessage = `Failed to load team data: ${err.message}`;
        } else if (err.status) {
          errorMessage = `Failed to load team data (Status: ${err.status})`;
        }
        
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeamData();
  }, [userProfile?.teamId]);

  const progressPercentage = progress.target > 0 ? (progress.current / progress.target) * 100 : 0;

  // Show loading state
  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            <div className="h-5 w-24 bg-gray-200 rounded"></div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-2 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
        <div className="text-center text-gray-500">
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Show empty state if no team data
  if (!teamData || teamMembers.length === 0) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
        <div className="text-center text-gray-500">
          <p className="text-sm">No team data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`modern-card p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Your team</h2>
      </div>

      {/* Recognition Progress Card */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-6 border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">👤</span>
          </div>
          <span className="text-sm font-semibold text-gray-800">You recognized {progress.current}/{progress.target}</span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2.5 mb-2">
          <div
            className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex items-center text-xs text-gray-600">
          <span>{progress.daysRemaining} days remaining</span>
        </div>
      </div>

      {/* Haven't Recognized Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Haven't recognized</h3>
        <div className="space-y-3">
          {teamMembers && teamMembers.length > 0 ? teamMembers.slice(0, 5).map((member, index) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer interactive group"
            >
              <div className="flex items-center gap-3">
                <Avatar initials={member.initials} size="md" className={member.color} />
                <div>
                  <p className="font-medium text-gray-900 text-sm">{member.initials} {member.name}</p>
                  <p className="text-xs text-gray-500">13 days ago</p>
                </div>
              </div>
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <span className="text-blue-600 text-xs">👏</span>
              </div>
            </div>
          )) : (
            <div className="text-center text-gray-500 py-4">
              <p className="text-sm">No team members found</p>
            </div>
          )}
        </div>
        
        {teamMembers && teamMembers.length > 5 && (
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium mt-3 transition-colors">
            Show more
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
