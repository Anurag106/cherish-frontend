'use client';

import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Tab, Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { sessionUtils } from '@/utils/session';
import { navigationManager, PageType } from '@/utils/navigation';
import { useUser } from '@/contexts/UserContext';
import SearchBar from '@/components/SearchBar';

const PAGES: { key: PageType; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'rewards', label: 'Rewards' },
  { key: 'analytics', label: 'Analytics' },
];

export default function Header() {
  const router = useRouter();
  const { userProfile, clearUserProfile } = useUser();

  const [selectedTabIndex, setSelectedTabIndex] = useState(
    PAGES.findIndex((p) => p.key === 'home') ?? 0
  );

  useEffect(() => {
    const unsubscribe = navigationManager.subscribe((state) => {
      const idx = PAGES.findIndex((p) => p.key === state.currentPage);
      if (idx >= 0) setSelectedTabIndex(idx);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    sessionUtils.clearSession();
    clearUserProfile();
    // Clear all auth cookies
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'auth_expires=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'auth_username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
  };

  const handleNavigation = (page: PageType) => {
    navigationManager.setCurrentPage(page);
    router.push(`/${page}`);
  };

  const getUserInitials = () => {
    if (userProfile?.firstName && userProfile?.lastName) {
      return `${userProfile.firstName[0]}${userProfile.lastName[0]}`.toUpperCase();
    }
    return userProfile?.firstName?.[0]?.toUpperCase() || 'U';
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + company */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31 0-6-2.69-6-6V8.5l6-3 6 3V14c0 3.31-2.69 6-6 6z" />
                </svg>
              </div>
            </div>
            <div>
              <div className="text-gray-900 font-semibold text-base">
                {userProfile?.companyName || 'ABC Organization'}
              </div>
              <div className="text-gray-500 text-xs">Recognition Platform</div>
            </div>
          </div>

          {/* Tabs navigation (hidden on small screens) */}
          <div className="hidden md:flex items-center">
            <Tab.Group
              selectedIndex={selectedTabIndex}
              onChange={(index) => {
                setSelectedTabIndex(index);
                handleNavigation(PAGES[index].key);
              }}
            >
              <Tab.List className="flex items-center space-x-1">
                {PAGES.map((p) =>
                  p.key !== 'analytics' ? (
                    <Tab
                      key={p.key}
                      as="button"
                      className={({ selected }) =>
                        `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          selected
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`
                      }
                    >
                      {p.label}
                    </Tab>
                  ) : (
                    <div key={p.key} className="relative">
                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-1 ${
                              selectedTabIndex === PAGES.findIndex((pp) => pp.key === 'analytics')
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            <span>{p.label}</span>
                            <ChevronDownIcon className="w-4 h-4" />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute left-0 mt-2 w-44 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => handleNavigation('analytics')}
                                    className={`${
                                      active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                                    } block w-full text-left px-4 py-2 text-sm`}
                                  >
                                    Overview
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      router.push('/analytics/reports');
                                      navigationManager.setCurrentPage('analytics');
                                    }}
                                    className={`${
                                      active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                                    } block w-full text-left px-4 py-2 text-sm`}
                                  >
                                    Reports
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => router.push('/analytics/insights')}
                                    className={`${
                                      active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                                    } block w-full text-left px-4 py-2 text-sm`}
                                  >
                                    Insights
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  )
                )}
              </Tab.List>
            </Tab.Group>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <SearchBar />

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <BellIcon className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>

            {/* User menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{getUserInitials()}</span>
                </div>
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {userProfile?.firstName} {userProfile?.lastName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{userProfile?.email}</p>
                    {userProfile?.jobTitle && (
                      <p className="text-xs text-gray-400 mt-1">
                        {userProfile.jobTitle} • {userProfile.department}
                      </p>
                    )}
                  </div>

                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active ? 'bg-gray-50' : ''} block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          Profile Settings
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active ? 'bg-gray-50' : ''} block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          Account Settings
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active ? 'bg-gray-50' : ''} block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          Help & Support
                        </button>
                      )}
                    </Menu.Item>

                    <div className="border-t border-gray-100 mt-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${active ? 'bg-red-50' : ''} block w-full text-left px-4 py-2 text-sm text-red-600`}
                          >
                            Sign Out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}
