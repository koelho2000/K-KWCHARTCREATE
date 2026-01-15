
import { LoadSettings, ProfileData, CalculationResults } from '../types';

export const calculate8760 = (settings: LoadSettings, profile: ProfileData): CalculationResults => {
  const hourly8760: number[] = [];
  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  let currentHour = 0;
  let currentDayOfYear = 0;

  for (let m = 0; m < 12; m++) {
    const monthMult = profile.monthly[m];
    for (let d = 0; d < daysInMonths[m]; d++) {
      const dayOfWeek = (currentDayOfYear) % 7;
      const weekMult = profile.weekly[dayOfWeek];
      
      for (let h = 0; h < 24; h++) {
        const dayMult = profile.daily[h];
        
        // Value = maxLoad * normalized intensity
        // Max intensity in profile data is around 1.0 (ASHRAE normalization)
        let value = settings.maxLoad * dayMult * weekMult * monthMult;
        
        // Safety clamp (cannot exceed maxLoad by definition of "normalized multipliers" in this context)
        if (value > settings.maxLoad) value = settings.maxLoad;
        if (value < 0) value = 0;

        hourly8760.push(value);
        currentHour++;
      }
      currentDayOfYear++;
    }
  }

  const peak = Math.max(...hourly8760);
  const min = Math.min(...hourly8760);
  const sum = hourly8760.reduce((a, b) => a + b, 0);
  const avg = sum / hourly8760.length;

  return {
    hourly8760,
    statistics: {
      totalEnergy: sum,
      peakLoad: peak,
      minLoad: min,
      averageLoad: avg,
      loadFactor: peak > 0 ? avg / peak : 0
    }
  };
};

export const exportCSV = (data: number[]) => {
  let csvContent = "data:text/csv;charset=utf-8,Hour,Load (kW)\n";
  data.forEach((val, idx) => {
    csvContent += `${idx},${val.toFixed(3)}\n`;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "load_profile_8760.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
