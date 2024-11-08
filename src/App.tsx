import React from 'react';
import { Activity } from 'lucide-react';
import { AddWebsiteForm } from './components/AddWebsiteForm';
import { WebsiteList } from './components/WebsiteList';
import { useWebsiteMonitor } from './hooks/useWebsiteMonitor';

function App() {
  const { websites, isLoading, addWebsite, checkWebsite, removeWebsite } = useWebsiteMonitor();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">UptimeGuard</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Website Monitoring</h1>
          <p className="text-gray-600">Monitor your websites' uptime and performance in real-time.</p>
        </div>

        <AddWebsiteForm onAdd={addWebsite} isLoading={isLoading} />
        <WebsiteList
          websites={websites}
          onCheck={checkWebsite}
          onRemove={removeWebsite}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default App;