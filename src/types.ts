import { LucideIcon } from 'lucide-react';

export interface EmailFolder {
  id: number;
  name: string;
  icon: LucideIcon;
  unread: number;
  total: number;
  order: number;
  visible: boolean;
}

export interface Email {
  id: string;
  subject: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  body: string;
  date: Date;
  read: boolean;
  starred: boolean;
  flagged: boolean;
  folderId: number;
  attachments?: string[];
}

export interface EmailAccount {
  id: string;
  type: 'gmail' | 'outlook';
  email: string;
  name: string;
  avatar?: string;
}