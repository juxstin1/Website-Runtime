export interface Website {
  id: string;
  url: string;
  name: string;
  status: 'up' | 'down';
  lastChecked: Date;
  uptime: number;
  responseTime: number;
}

export interface MonitoringResult {
  timestamp: Date;
  status: 'up' | 'down';
  responseTime: number;
}