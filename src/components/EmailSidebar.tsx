import React from 'react';
import { Star, Trash2, Archive, X } from 'lucide-react';
import { useEmailStore } from '../store/emailStore';
import { useDraggable } from '@dnd-kit/core';

const EmailSidebar = () => {
  const { 
    selectedFolder,
    emails,
    sidebarOpen,
    toggleSidebar,
    setSelectedEmail,
    starEmail,
    deleteEmail,
    archiveEmail 
  } = useEmailStore();

  if (!sidebarOpen || !selectedFolder) return null;

  const folderEmails = emails.filter(email => email.folderId === selectedFolder.id);

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">{selectedFolder.name}</h2>
        <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="overflow-y-auto h-[calc(100vh-64px)]">
        {folderEmails.map((email) => (
          <div
            key={email.id}
            className="p-4 border-b hover:bg-gray-50 cursor-pointer"
            onClick={() => setSelectedEmail(email)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{email.from}</p>
                <p className="text-sm text-gray-600 truncate">{email.subject}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    starEmail(email.id);
                  }}
                  className={`p-1 rounded-full ${
                    email.starred ? 'text-yellow-500' : 'text-gray-400'
                  } hover:bg-gray-100`}
                >
                  <Star className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    archiveEmail(email.id);
                  }}
                  className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
                >
                  <Archive className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEmail(email.id);
                  }}
                  className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailSidebar;