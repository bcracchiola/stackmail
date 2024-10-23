import React, { useState } from 'react';
import { Settings, Plus, Check } from 'lucide-react';
import { useEmailStore } from '../store/emailStore';

const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { 
    selectedProvider,
    setSelectedProvider,
    folders,
    updateFolderOrder 
  } = useEmailStore();

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle OAuth2 authentication
    // For demo purposes, we'll just close the dialog
    setShowAddAccount(false);
    setEmail('');
    setPassword('');
  };

  const toggleFolderVisibility = (folderId: number) => {
    const updatedFolders = folders.map(folder =>
      folder.id === folderId ? { ...folder, visible: !folder.visible } : folder
    );
    updateFolderOrder(updatedFolders);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
      >
        <Settings className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Email Provider</h3>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value as 'gmail' | 'outlook')}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#ff6b35] focus:outline-none"
              >
                <option value="gmail">Gmail</option>
                <option value="outlook">Outlook</option>
              </select>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Connected Accounts</h3>
              <button
                onClick={() => setShowAddAccount(true)}
                className="flex items-center space-x-2 text-[#ff6b35] hover:text-[#ff8255]"
              >
                <Plus className="h-4 w-4" />
                <span>Add Account</span>
              </button>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Visible Folders</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {folders.map((folder) => (
                  <label
                    key={folder.id}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={folder.visible}
                      onChange={() => toggleFolderVisibility(folder.id)}
                      className="rounded border-gray-300 text-[#ff6b35] focus:ring-[#ff6b35]"
                    />
                    <span className="text-sm text-gray-600">{folder.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-medium mb-4">Add Email Account</h2>
            <form onSubmit={handleAddAccount}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAccount(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff8255]"
                  >
                    Add Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;