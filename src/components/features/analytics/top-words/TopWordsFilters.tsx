/**
 * Top Words Filters Component
 * Filter dropdowns and active filter chips
 */

import React, { useState } from 'react';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface FilterOption {
  value: string;
  label: string;
}

interface TopWordsFiltersProps {
  appliedFilters: string[];
  onRemoveFilter: (filter: string) => void;
  onAddFilter: (filterType: string, filterValue: string) => void;
}

export const TopWordsFilters: React.FC<TopWordsFiltersProps> = ({
  appliedFilters,
  onRemoveFilter,
  onAddFilter,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filterOptions: Record<string, FilterOption[]> = {
    overall: [
      { value: 'all', label: 'All' },
      { value: 'overall', label: 'Overall' },
      { value: 'department', label: 'By Department' },
      { value: 'location', label: 'By Location' },
    ],
    location: [
      { value: 'all', label: 'All Locations' },
      { value: 'san-luis-obispo', label: 'San Luis Obispo' },
      { value: 'new-york', label: 'New York' },
      { value: 'london', label: 'London' },
      { value: 'tokyo', label: 'Tokyo' },
    ],
    currencyCode: [
      { value: 'all', label: 'All Currencies' },
      { value: 'USD', label: 'USD' },
      { value: 'GBP', label: 'GBP' },
      { value: 'EUR', label: 'EUR' },
      { value: 'JPY', label: 'JPY' },
    ],
    group: [
      { value: 'all', label: 'All Groups' },
      { value: 'engineering', label: 'Engineering' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'sales', label: 'Sales' },
      { value: 'product', label: 'Product' },
      { value: 'design', label: 'Design' },
    ],
    role: [
      { value: 'all', label: 'All Roles' },
      { value: 'manager', label: 'Manager' },
      { value: 'individual-contributor', label: 'Individual Contributor' },
      { value: 'executive', label: 'Executive' },
    ],
    managersTeam: [
      { value: 'all', label: 'All Teams' },
      { value: 'team-1', label: "Alex's Team" },
      { value: 'team-2', label: "Sarah's Team" },
      { value: 'team-3', label: "Michael's Team" },
    ],
    tier: [
      { value: 'all', label: 'All Tiers' },
      { value: 'tier-1', label: 'Tier 1' },
      { value: 'tier-2', label: 'Tier 2' },
      { value: 'tier-3', label: 'Tier 3' },
    ],
    title: [
      { value: 'all', label: 'All Titles' },
      { value: 'senior', label: 'Senior' },
      { value: 'mid-level', label: 'Mid-Level' },
      { value: 'junior', label: 'Junior' },
    ],
  };

  const filterConfigs = [
    { key: 'overall', label: 'Overall', showBadge: false },
    { key: 'location', label: 'Location', showBadge: false },
    { key: 'currencyCode', label: 'Currency Code', showBadge: false },
    { key: 'group', label: 'Group', showBadge: false },
    { key: 'role', label: 'Role', showBadge: false },
    { key: 'managersTeam', label: "Manager's Team", showBadge: false },
    { key: 'tier', label: 'Tier', showBadge: false },
    { key: 'title', label: 'Title', showBadge: false },
  ];

  const handleFilterSelect = (filterType: string, option: FilterOption) => {
    if (option.value !== 'all') {
      onAddFilter(filterType, option.label);
    }
    setOpenDropdown(null);
  };

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      {/* Filter Dropdowns */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {filterConfigs.map((filter) => {
          const activeCount = appliedFilters.filter(f => 
            filterOptions[filter.key]?.some(opt => opt.label === f)
          ).length;

          return (
            <div key={filter.key} className="relative">
              <button
                onClick={() => toggleDropdown(filter.key)}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium"
              >
                <span>{filter.label}</span>
                {activeCount > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-white text-cyan-600 rounded-full">
                    {activeCount}
                  </span>
                )}
                <ChevronDownIcon className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {openDropdown === filter.key && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
                  {filterOptions[filter.key]?.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFilterSelect(filter.key, option)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Filters */}
      {appliedFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {appliedFilters.map((filter, index) => (
            <div
              key={`${filter}-${index}`}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm"
            >
              <span>{filter}</span>
              <button
                onClick={() => onRemoveFilter(filter)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
