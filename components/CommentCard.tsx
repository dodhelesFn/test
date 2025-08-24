import React from 'react';
import { Comment } from '../types';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const formattedDate = comment.timestamp
    ? comment.timestamp.toDate().toLocaleString()
    : 'Just now';

  // Generate a consistent avatar based on the user's name
  const avatarUrl = `https://i.pravatar.cc/40?u=${encodeURIComponent(comment.name)}`;

  return (
    <div className="bg-gray-900/50 p-4 rounded-lg flex space-x-4 border border-gray-700/50 transform transition-transform hover:scale-[1.02] hover:border-indigo-500/50">
      <img
        src={avatarUrl}
        alt={`${comment.name}'s avatar`}
        className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0"
      />
      <div className="flex-1">
        <div className="flex items-baseline justify-between">
          <p className="font-bold text-indigo-400">{comment.name}</p>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
        <p className="text-gray-300 mt-1 whitespace-pre-wrap break-words">
          {comment.text}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
