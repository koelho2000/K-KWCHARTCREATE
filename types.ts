
export enum ViewMode {
  PROFILE_LIST = 'PROFILE_LIST',
  TABLE = 'TABLE',
  MATRIX = 'MATRIX'
}

export interface LoadSettings {
  maxLoad: number;
}

export interface ProfileData {
  name: string;
  category: string;
  description: string;
  daily: number[]; // 24 hours
  weekly: number[]; // 7 days (Mon-Sun)
  monthly: number[]; // 12 months (Jan-Dec)
}

export interface CalculationResults {
  hourly8760: number[];
  statistics: {
    totalEnergy: number;
    peakLoad: number;
    minLoad: number;
    averageLoad: number;
    loadFactor: number;
  };
}
