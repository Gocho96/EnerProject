export interface DailyLogEntry {
  date: string;              
  content?: string;         
  installationNews?: string; 
}

export interface Installation {
  _id: string;
  projectId: string;
  dailyLog: DailyLogEntry[];
  createdAt: string;
  updatedAt: string;
}
