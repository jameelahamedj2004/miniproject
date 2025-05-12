import React from 'react';
import { AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export const TextInput: React.FC<Props> = ({
  title,
  content,
  onTitleChange,
  onContentChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Article Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className={clsx(
            "w-full px-4 py-2 border rounded-md",
            "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            "placeholder:text-gray-400"
          )}
          placeholder="Enter the article title"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Article Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className={clsx(
            "w-full px-4 py-2 border rounded-md",
            "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            "placeholder:text-gray-400",
            "min-h-[200px]"
          )}
          placeholder="Paste the article content here"
        />
      </div>

      {(!title || !content) && (
        <div className="flex items-center gap-2 text-yellow-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>Both title and content are required for analysis</span>
        </div>
      )}
    </div>
  );
};