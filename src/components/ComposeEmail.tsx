import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useEmailStore } from '../store/emailStore';
import TextareaAutosize from 'react-textarea-autosize';

const ComposeEmail = () => {
  const { composeOpen, toggleCompose } = useEmailStore();
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  if (!composeOpen) return null;

  return (
    <div className="fixed bottom-0 right-24 w-[600px] bg-white shadow-xl rounded-t-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">New Message</h2>
        <button onClick={toggleCompose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="To"
            className="w-full p-2 border-b focus:outline-none focus:border-[#ff6b35]"
          />
          <input
            type="text"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
            placeholder="Cc"
            className="w-full p-2 border-b focus:outline-none focus:border-[#ff6b35]"
          />
          <input
            type="text"
            value={bcc}
            onChange={(e) => setBcc(e.target.value)}
            placeholder="Bcc"
            className="w-full p-2 border-b focus:outline-none focus:border-[#ff6b35]"
          />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="w-full p-2 border-b focus:outline-none focus:border-[#ff6b35]"
          />
          <TextareaAutosize
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 focus:outline-none min-h-[200px]"
            minRows={10}
          />
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button className="px-4 py-2 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff8255]">
            Send
          </button>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              Attach Files
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              Format Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeEmail;