'use client';

import { useState, useEffect, useRef, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Combobox, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className = '' }: SearchBarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [comboboxValue, setComboboxValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([
    'People',
    'Rewards',
    'Reports',
    'John Doe',
    'Policies',
  ]);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions based on query
  const filterSuggestions = (q: string) => {
    const lower = q.toLowerCase();
    return ['People', 'Rewards', 'Reports', 'Policies', 'John Doe'].filter((s) =>
      s.toLowerCase().includes(lower)
    );
  };

  // Auto-focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = comboboxValue || searchQuery;
    if (!q || q.trim() === '') return;

    // Close search and navigate
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setSearchQuery('');
    setComboboxValue('');
  };

  const handleIconClick = () => {
    if (isOpen && searchQuery.trim()) {
      // If search is open and has query, submit
      handleSearchSubmit();
    } else {
      // Toggle search open/close
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={searchContainerRef} className={`relative ${className}`}>
      {!isOpen ? (
        // Search icon button when closed
        <button
          onClick={handleIconClick}
          className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label="Open search"
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
        </button>
      ) : (
        // Search input when open
        <div className="flex items-center">
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <Combobox
              value={comboboxValue}
              onChange={(val: string | null) => {
                if (val) {
                  setComboboxValue(val);
                  setSearchQuery(val);
                }
              }}
            >
              <div className="relative">
                <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <Combobox.Input
                    ref={inputRef}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setComboboxValue('');
                      setSuggestions(filterSuggestions(e.target.value));
                    }}
                    placeholder="Search..."
                    className="pl-4 pr-10 py-2 w-64 text-sm outline-none rounded-lg bg-transparent"
                    aria-label="Search"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchSubmit(e);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleIconClick}
                    className="absolute right-2 p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                    aria-label="Search"
                  >
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <Transition
                  as={Fragment}
                  show={searchQuery.length > 0 && suggestions.length > 0}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Combobox.Options className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto z-50">
                    {suggestions.length === 0 && searchQuery !== '' ? (
                      <div className="px-4 py-3 text-sm text-gray-500">No results found</div>
                    ) : (
                      suggestions.map((s, idx) => (
                        <Combobox.Option key={idx} value={s} as={Fragment}>
                          {({ active }) => (
                            <li
                              className={`cursor-pointer px-4 py-2.5 text-sm list-none ${
                                active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
                                <span>{s}</span>
                              </div>
                            </li>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </form>
        </div>
      )}
    </div>
  );
}

