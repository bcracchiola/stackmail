import React, { useState } from 'react';
import { X, Star, Trash2, Archive, Reply, ReplyAll, Forward, Flag } from 'lucide-react';
import { useEmailStore } from '../store/emailStore';
import TextareaAutosize from 'react-textarea-autosize';

const EmailView = () => {
  const { selectedEmail, emailViewOpen, toggleEmailView, starEmail } = useEmailStore();
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  if (!emailViewOpen || !selectedEmail) return null;

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-medium">{selectedEmail.subject}</h2>
          <button onClick={toggleEmailView} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-medium">{selectedEmail.from}</p>
              <p className="text-sm text-gray-500">
                To: {selectedEmail.to.join(', ')}
                {selectedEmail.cc?.length ? ` | CC: ${selectedEmail.cc.join(', ')}` : ''}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => starEmail(selectedEmail.id)}
                className={`p-2 rounded-full ${
                  selectedEmail.starred ? 'text-yellow-500' : 'text-gray-400'
                } hover:bg-gray-100`}
              >
                <Star className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
                <Flag className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
                <Reply className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
                <ReplyAll className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
                <Forward className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
                <Archive className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="prose max-w-none">
            {selectedEmail.body}
          </div>

          {selectedEmail.attachments?.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-sm font-medium mb-2">Attachments</h3>
              <div className="flex flex-wrap gap-2">
                {selectedEmail.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 cursor-pointer"
                  >
                    {attachment}
                  </div>
                ))}
              </div>
            </div>
          )}

          {isReplying && (
            <div className="mt-6 border-t pt-4">
              <TextareaAutosize
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Type your reply..."
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                minRows={5}
              />
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  onClick={() => setIsReplying(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff8255]">
                  Send Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailView;