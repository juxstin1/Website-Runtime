import { useState, useEffect } from 'react';
import { Website, MonitoringResult } from '../types';

export function useWebsiteMonitor() {
  const [websites, setWebsites] = useState<Website[]>(() => {
    const saved = localStorage.getItem('monitored-websites');
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('monitored-websites', JSON.stringify(websites));
  }, [websites]);

  const addWebsite = async (url: string, name: string) => {
    const newWebsite: Website = {
      id: Date.now().toString(),
      url,
      name,
      status: 'up',
      lastChecked: new Date(),
      uptime: 100,
      responseTime: 0,
    };

    setWebsites(prev => [...prev, newWebsite]);
    await checkWebsite(newWebsite.id);
  };

  const checkWebsite = async (id: string) => {
    setIsLoading(true);
    const website = websites.find(w => w.id === id);
    if (!website) return;

    try {
      const startTime = Date.now();
      const response = await fetch(website.url);
      const responseTime = Date.now() - startTime;
      
      const result: MonitoringResult = {
        timestamp: new Date(),
        status: response.ok ? 'up' : 'down',
        responseTime,
      };

      setWebsites(prev => prev.map(w => {
        if (w.id === id) {
          return {
            ...w,
            status: result.status,
            lastChecked: result.timestamp,
            responseTime: result.responseTime,
            uptime: w.uptime * 0.9 + (result.status === 'up' ? 10 : 0),
          };
        }
        return w;
      }));
    } catch (error) {
      setWebsites(prev => prev.map(w => {
        if (w.id === id) {
          return {
            ...w,
            status: 'down',
            lastChecked: new Date(),
            uptime: w.uptime * 0.9,
          };
        }
        return w;
      }));
    }
    setIsLoading(false);
  };

  const removeWebsite = (id: string) => {
    setWebsites(prev => prev.filter(w => w.id !== id));
  };

  return {
    websites,
    isLoading,
    addWebsite,
    checkWebsite,
    removeWebsite,
  };
}