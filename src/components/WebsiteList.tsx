import React from 'react';
import { Website } from '../types';
import { RefreshCw, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface WebsiteListProps {
  websites: Website[];
  onCheck: (id: string) => Promise<void>;
  onRemove: (id: string) => void;
  isLoading: boolean;
}

export function WebsiteList({ websites, onCheck, onRemove, isLoading }: WebsiteListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {websites.map((website) => (
          <li key={website.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0">
                {website.status === 'up' ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {website.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{website.url}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  <p>Uptime: {website.uptime.toFixed(1)}%</p>
                  <p>Response: {website.responseTime}ms</p>
                </div>
                <button
                  onClick={() => onCheck(website.id)}
                  disabled={isLoading}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onRemove(website.id)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
        {websites.length === 0 && (
          <li className="p-4 text-center text-gray-500">
            No websites monitored yet. Add one above to get started!
          </li>
        )}
      </ul>
    </div>
  );
}