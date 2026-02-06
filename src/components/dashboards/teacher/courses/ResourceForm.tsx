"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ResourceFormProps {
  resourceType: string;
  onSubmit: (formData: FormData) => void;
  onClose: () => void;
}

export default function ResourceForm({ resourceType, onSubmit, onClose }: ResourceFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    fileUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("content", formData.content);
    fd.append("fileUrl", formData.fileUrl);
    onSubmit(fd);
  };

  const getTitle = () => {
    switch (resourceType) {
      case 'text': return 'Add Text Content';
      case 'video': return 'Add Video';
      case 'file': return 'Add File';
      default: return 'Add Resource';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{getTitle()}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {resourceType === 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          {(resourceType === 'video' || resourceType === 'file') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {resourceType === 'video' ? 'Video URL *' : 'File URL *'}
              </label>
              <input
                type="url"
                value={formData.fileUrl}
                onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={resourceType === 'video' ? 'https://youtube.com/watch?v=...' : 'https://example.com/file.pdf'}
                required
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}