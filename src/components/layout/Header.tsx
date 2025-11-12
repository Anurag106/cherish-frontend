'use client';

import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Tab, Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { sessionUtils } from '@/utils/api/session';
import { navigationManager, PageType } from '@/utils/navigation';
import { useUser } from '@/contexts/UserContext';
import SearchBar from './SearchBar';
import { ANALYTICS_MENU_ITEMS } from '@/constants/analytics';

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
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-900">
              PLAYLIST
            </div>
          </div>

          {/* Tabs navigation (hidden on small screens) */}
          <div className="hidden lg:flex items-center">
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
                          <Menu.Items className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <div className="py-1">
                              {ANALYTICS_MENU_ITEMS.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <Menu.Item key={item.key}>
                                    {({ active }) => (
                                      <button
                                        onClick={() => {
                                          router.push(item.path);
                                          navigationManager.setCurrentPage('analytics');
                                        }}
                                        className={`${
                                          active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'
                                        } flex items-center w-full text-left px-4 py-2 text-sm transition-colors`}
                                      >
                                        <Icon className={`w-4 h-4 mr-3 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                                        <span>{item.label}</span>
                                      </button>
                                    )}
                                  </Menu.Item>
                                );
                              })}
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
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <BellIcon className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>

            {/* User menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-gray-900 font-medium text-sm">{getUserInitials()}</span>
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
                      {getUserInitials()} {userProfile?.firstName} {userProfile?.lastName}
                    </p>
                    <button className="text-sm text-blue-600 hover:text-blue-700 mt-1">
                      View profile
                    </button>
                  </div>

                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active ? 'bg-gray-50' : ''} block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          Announcements
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active ? 'bg-gray-50' : ''} block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          Bookmarks
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active ? 'bg-gray-50' : ''} block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          Profile settings
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
                            Log out
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
