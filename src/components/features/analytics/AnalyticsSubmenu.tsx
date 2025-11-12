/**
 * Analytics Submenu Component
 * Displays navigation menu for analytics sections
 */

'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ANALYTICS_MENU_ITEMS, AnalyticsMenuItemKey } from '@/constants/analytics';

interface AnalyticsSubmenuProps {
  className?: string;
}

export const AnalyticsSubmenu: React.FC<AnalyticsSubmenuProps> = ({ className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  const isActive = (key: AnalyticsMenuItemKey) => {
    return pathname === `/analytics/${key}`;
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-2 ${className}`}>
      <div className="space-y-1">
        {ANALYTICS_MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.key);

          return (
            <button
              key={item.key}
              onClick={() => handleMenuClick(item.path)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                ${active
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${active ? 'text-blue-600' : 'text-gray-900'}`}>
                  {item.label}
                </p>
                {active && (
                  <p className="text-xs text-blue-500 mt-0.5 truncate">
                    {item.description}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

