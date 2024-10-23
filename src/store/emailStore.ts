import { create } from 'zustand';
import { EmailFolder, Email, EmailAccount } from '../types';

interface EmailState {
  selectedProvider: 'gmail' | 'outlook';
  accounts: EmailAccount[];
  folders: EmailFolder[];
  selectedFolder: EmailFolder | null;
  emails: Email[];
  selectedEmail: Email | null;
  sidebarOpen: boolean;
  emailViewOpen: boolean;
  composeOpen: boolean;
  setSelectedProvider: (provider: 'gmail' | 'outlook') => void;
  addAccount: (account: EmailAccount) => void;
  updateFolderOrder: (folders: EmailFolder[]) => void;
  setSelectedFolder: (folder: EmailFolder | null) => void;
  setSelectedEmail: (email: Email | null) => void;
  toggleSidebar: () => void;
  toggleEmailView: () => void;
  toggleCompose: () => void;
  starEmail: (emailId: string) => void;
  deleteEmail: (emailId: string) => void;
  archiveEmail: (emailId: string) => void;
  moveEmailToFolder: (emailId: string, folderId: number) => void;
}

export const useEmailStore = create<EmailState>((set) => ({
  selectedProvider: 'gmail',
  accounts: [],
  folders: [],
  selectedFolder: null,
  emails: [],
  selectedEmail: null,
  sidebarOpen: false,
  emailViewOpen: false,
  composeOpen: false,

  setSelectedProvider: (provider) => set({ selectedProvider: provider }),
  addAccount: (account) => set((state) => ({ accounts: [...state.accounts, account] })),
  updateFolderOrder: (folders) => set({ folders }),
  setSelectedFolder: (folder) => set({ selectedFolder: folder, sidebarOpen: true }),
  setSelectedEmail: (email) => set({ selectedEmail: email, emailViewOpen: !!email }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleEmailView: () => set((state) => ({ emailViewOpen: !state.emailViewOpen })),
  toggleCompose: () => set((state) => ({ composeOpen: !state.composeOpen })),

  starEmail: (emailId) => set((state) => ({
    emails: state.emails.map(email => 
      email.id === emailId ? { ...email, starred: !email.starred } : email
    )
  })),

  deleteEmail: (emailId) => set((state) => ({
    emails: state.emails.filter(email => email.id !== emailId)
  })),

  archiveEmail: (emailId) => set((state) => ({
    emails: state.emails.map(email =>
      email.id === emailId ? { ...email, folderId: 3 } : email
    )
  })),

  moveEmailToFolder: (emailId, folderId) => set((state) => ({
    emails: state.emails.map(email =>
      email.id === emailId ? { ...email, folderId } : email
    )
  })),
}));