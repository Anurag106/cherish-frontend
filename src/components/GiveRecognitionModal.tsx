'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { 
  XMarkIcon, 
  HeartIcon,
  TrophyIcon,
  SpeakerWaveIcon,
  GlobeAltIcon,
  UserGroupIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import RecognitionInput from '@/components/RecognitionInput';
import { useUser } from '@/contexts/UserContext';
import { apiService } from '@/services/api';
import { sessionUtils } from '@/utils/session';

interface GiveRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  hashtags?: string[];
}

export default function GiveRecognitionModal({ 
  isOpen, 
  onClose,
  hashtags = [],
}: GiveRecognitionModalProps) {
  const { userProfile } = useUser();
  const [selectedVisibility, setSelectedVisibility] = useState<number>(0); // 0=public, 1=team, 2=private
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availablePoints = userProfile?.availablePoints || 0;

  const handleRecognitionSubmit = async (payload: { context: string; visibility: number }) => {
    setIsSubmitting(true);
    
    try {
      // Get authentication token
      const loginData = sessionUtils.getLoginData();
      if (!loginData?.token) {
        throw new Error('Authentication required');
      }

      // Prepare post data for backend (context and visibility)
      const postData = {
        context: payload.context,
        visibility: payload.visibility,
      };

      console.log('Submitting post:', postData);

      // Submit to backend API
      const result = await apiService.submitRecognition(loginData.token, postData);

      // Success - show message and close modal
      alert('Recognition submitted successfully! 🎉');
      onClose();
    } catch (error: any) {
      console.error('Error submitting recognition:', error);
      
      // Show user-friendly error message
      const errorMessage = error.message || 'Failed to submit recognition. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center">
                      <HeartIcon className="w-6 h-6 text-white" />
                    </div>
                    <Dialog.Title className="text-xl font-semibold text-gray-900">
                      Give Recognition
                    </Dialog.Title>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">$</span>
                      </div>
                      <span className="text-gray-900 font-semibold">{availablePoints}</span>
                    </div>
                    <button
                      onClick={onClose}
                      className="rounded-xl p-2 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <XMarkIcon className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <Tab.Group>
                  <Tab.List className="flex border-b border-gray-100 px-6">
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative cursor-pointer ${
                            selected
                              ? 'text-cyan-600'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <HeartIcon className="w-4 h-4" />
                          <span>Recognize Now</span>
                          {selected && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600" />
                          )}
                        </button>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative cursor-pointer ${
                            selected
                              ? 'text-cyan-600'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <TrophyIcon className="w-4 h-4" />
                          <span>Awards</span>
                          {selected && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600" />
                          )}
                        </button>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative cursor-pointer ${
                            selected
                              ? 'text-cyan-600'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <SpeakerWaveIcon className="w-4 h-4" />
                          <span>Announcements</span>
                          {selected && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600" />
                          )}
                        </button>
                      )}
                    </Tab>
                  </Tab.List>

                  <Tab.Panels>
                    <Tab.Panel>
                      {/* Recognize Now Content */}
                      <div className="p-6">
                        {/* Recognition Input Component */}
                        <RecognitionInput
                          onSubmit={(payload) => handleRecognitionSubmit({ ...payload, visibility: selectedVisibility })}
                          placeholder="@recipient Great work on the project! +10 #teamwork"
                          allowedPointValues={[5, 10, 20, 50]}
                          maxPoints={availablePoints}
                          hashtags={hashtags}
                          privacyLevel={selectedVisibility}
                          className="mb-4"
                        />

                        {/* Who can see this */}
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-3 text-center px-4 py-2">Who can see this?</p>
                          <div className="grid grid-cols-3 gap-3">
                            <button
                              onClick={() => setSelectedVisibility(0)}
                              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                selectedVisibility === 0
                                  ? 'border-cyan-500 bg-cyan-50'
                                  : 'border-gray-200 hover:border-cyan-300 hover:bg-cyan-50'
                              }`}
                            >
                              <GlobeAltIcon className={`w-6 h-6  ${selectedVisibility === 0 ? 'text-cyan-600' : 'text-gray-400'}`} />
                              <span className={`text-sm font-medium ${selectedVisibility === 0 ? 'text-cyan-600' : 'text-gray-600'}`}>
                                Public
                              </span>
                            </button>
                            <button
                              onClick={() => setSelectedVisibility(1)}
                              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                selectedVisibility === 1
                                  ? 'border-cyan-500 bg-cyan-50'
                                  : 'border-gray-200 hover:border-cyan-300 hover:bg-cyan-50'
                              }`}
                            >
                              <UserGroupIcon className={`w-6 h-6 ${selectedVisibility === 1 ? 'text-cyan-600' : 'text-gray-400'}`} />
                              <span className={`text-sm font-medium ${selectedVisibility === 1 ? 'text-cyan-600' : 'text-gray-600'}`}>
                                Team
                              </span>
                            </button>
                            <button
                              onClick={() => setSelectedVisibility(2)}
                              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                selectedVisibility === 2
                                  ? 'border-cyan-500 bg-cyan-50'
                                  : 'border-gray-200 hover:border-cyan-300 hover:bg-cyan-50'
                              }`}
                            >
                              <LockClosedIcon className={`w-6 h-6 ${selectedVisibility === 2 ? 'text-cyan-600' : 'text-gray-400'}`} />
                              <span className={`text-sm font-medium ${selectedVisibility === 2 ? 'text-cyan-600' : 'text-gray-600'}`}>
                                Private
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>

                    <Tab.Panel>
                      <div className="p-6 text-center text-gray-500">
                        Awards content coming soon...
                      </div>
                    </Tab.Panel>

                    <Tab.Panel>
                      <div className="p-6 text-center text-gray-500">
                        Announcements content coming soon...
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
