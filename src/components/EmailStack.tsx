import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Star } from 'lucide-react';
import { EmailFolder } from '../types';
import { useEmailStore } from '../store/emailStore';

interface EmailStackProps {
  folder: EmailFolder;
}

const EmailStack: React.FC<EmailStackProps> = ({ folder }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: folder.id.toString(),
  });
  const setSelectedFolder = useEmailStore((state) => state.setSelectedFolder);
  const emails = useEmailStore((state) => state.emails);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const hasStarredEmails = emails.some(
    (email) => email.folderId === folder.id && (email.starred || email.flagged)
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-full aspect-square scale-70 origin-top-left"
    >
      <div
        onClick={() => setSelectedFolder(folder)}
        className="absolute inset-0 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:rotate-0 group"
      >
        <div className="h-full w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm group-hover:shadow-lg">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <folder.icon className="h-5 w-5 text-[#ff6b35]" />
                <span className="text-sm font-light text-gray-800">{folder.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                {hasStarredEmails && (
                  <div className="h-2 w-2 rounded-full bg-[#ff6b35]" />
                )}
                {folder.unread > 0 && (
                  <span className="rounded-full bg-[#ff6b35] px-2 py-0.5 text-xs font-medium text-white">
                    {folder.unread}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="flex items-end justify-between">
                <span className="text-xs text-gray-500">Total emails</span>
                <span className="text-2xl font-light text-gray-800">{folder.total}</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full bg-[#ff6b35]"
                  style={{
                    width: `${(folder.unread / folder.total) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailStack;