
import React, { useState } from 'react';
import SendIcon from './SendIcon';

interface CommentFormProps {
  onSubmit: (name: string, text: string) => Promise<void>;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    await onSubmit(name, text);
    setText(''); // Only clear text field, keep name
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        required
        maxLength={50}
      />
      <textarea
        placeholder="Write your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        rows={4}
        required
        maxLength={500}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !name.trim() || !text.trim()}
          className="flex items-center justify-center px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
          {!isSubmitting && <SendIcon className="ml-2 w-5 h-5" />}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
