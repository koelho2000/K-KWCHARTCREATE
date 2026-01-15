
import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { APP_INFO, ASHRAE_PROFILES_LIST, DAYS_OF_WEEK, MONTHS, DAYS_IN_MONTH } from './constants';
import { ViewMode, LoadSettings, ProfileData, CalculationResults } from './types';
import { calculate8760, exportCSV } from './services/calculations';

const Header: React.FC = () => (
  <header className="bg-slate-900 text-white p-4 shadow-lg flex justify-between items-center sticky top-0 z-50">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{APP_INFO.name}</h1>
      <p className="text-xs text-slate-400 opacity-80">{APP_INFO.version} | {APP_INFO.date}</p>
    </div>
    <div className="text-right">
      <p className="font-semibold text-blue-400">{APP_INFO.author}</p>
      <a href={`https://${APP_INFO.website}`} target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-white transition-colors">
        {APP_INFO.website}
      </a>
    </div>
  </header>
);

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.PROFILE_LIST);
  const [loadSettings, setLoadSettings] = useState<LoadSettings>({ maxLoad: 1000 });
  const [currentProfile, setCurrentProfile] = useState<ProfileData>(ASHRAE_PROFILES_LIST[0]);
  const [override8760, setOverride8760] = useState<number[] | null>(null);

  const results: CalculationResults = useMemo(() => {
    const baseResults = calculate8760(loadSettings, currentProfile);
    if (override8760) {
      const sum = override8760.reduce((a, b) => a + b, 0);
      const peak = Math.max(...override8760);
      return {
        hourly8760: override8760,
        statistics: {
          totalEnergy: sum,
          peakLoad: peak,
          minLoad: Math.min(...override8760),
          averageLoad: sum / 8760,
          loadFactor: peak > 0 ? (sum / 8760) / peak : 0
        }
      };
    }
    return baseResults;
  }, [loadSettings, currentProfile, override8760]);

  const updateProfileValue = (type: 'daily' | 'weekly' | 'monthly', index: number, value: number) => {
    setOverride8760(null);
    setCurrentProfile(prev => {
      const updated = { ...prev };
      updated[type] = [...updated[type]];
      updated[type][index] = Math.max(0, Math.min(1.5, value));
      return updated;
    });
  };

  const saveJson = () => {
    const data = JSON.stringify({ loadSettings, currentProfile, results }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KW_Project_${new Date().getTime()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.loadSettings) setLoadSettings(json.loadSettings);
        if (json.currentProfile) setCurrentProfile(json.currentProfile);
        if (json.results?.hourly8760) setOverride8760(json.results.hourly8760);
      } catch (err) {
        alert("Erro ao ler ficheiro.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-1 p-6 max-w-[1400px] mx-auto w-full space-y-8">
        
        {/* Load Config Section */}
        <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">⚡</span>
            Menu Carga
          </h2>
          <div className="max-w-md">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Carga Máxima Instalada (kW)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={loadSettings.maxLoad} 
                  onChange={e => {
                    setLoadSettings({ maxLoad: Number(e.target.value) });
                    setOverride8760(null);
                  }}
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all text-xl font-bold"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">kW</span>
              </div>
            </div>
          </div>
        </section>

        {/* View Selection */}
        <nav className="flex flex-wrap gap-2">
          {[
            { id: ViewMode.PROFILE_LIST, label: "Lista de Perfis (Tipo/Carga)" },
            { id: ViewMode.TABLE, label: "Sliders de Ajuste" },
            { id: ViewMode.MATRIX, label: "Matriz Anual (8760h)" }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setViewMode(btn.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                viewMode === btn.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-3 space-y-6">
            
            {viewMode === ViewMode.PROFILE_LIST && (
              <ProfileList 
                currentProfile={currentProfile} 
                onSelect={(p) => { setCurrentProfile(p); setOverride8760(null); }} 
              />
            )}

            {viewMode === ViewMode.TABLE && (
              <ProfileEditor 
                profile={currentProfile} 
                maxLoad={loadSettings.maxLoad}
                onUpdate={updateProfileValue} 
              />
            )}

            {viewMode === ViewMode.MATRIX && (
              <AnnualMatrixEditor 
                hourlyData={results.hourly8760} 
                onUpdate={(new8760) => setOverride8760(new8760)} 
              />
            )}

            <Visualizer results={results} />
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
              <h3 className="text-lg font-bold mb-4">Sumário Estatístico</h3>
              <div className="space-y-4">
                <StatItem label="Energia Anual" value={`${(results.statistics.totalEnergy/1000).toFixed(2)} MWh`} />
                <StatItem label="Pico de Carga" value={`${results.statistics.peakLoad.toFixed(1)} kW`} />
                <StatItem label="Carga Mínima" value={`${results.statistics.minLoad.toFixed(1)} kW`} />
                <StatItem label="Carga Média" value={`${results.statistics.averageLoad.toFixed(1)} kW`} />
                <StatItem label="Fator de Carga" value={`${(results.statistics.loadFactor * 100).toFixed(1)}%`} />
              </div>

              <div className="mt-8 space-y-3">
                <button 
                  onClick={() => exportCSV(results.hourly8760)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  📥 Exportar CSV (8760h)
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={saveJson} className="bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 px-3 rounded-lg text-sm transition-colors">💾 Gravar JSON</button>
                  <label className="bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-2 px-3 rounded-lg text-sm transition-colors text-center cursor-pointer">📂 Abrir JSON<input type="file" className="hidden" accept=".json" onChange={openJson} /></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-slate-100 p-4 text-center text-xs text-slate-500 mt-12 border-t">
        {APP_INFO.name} v{APP_INFO.version} - &copy; 2024 Koelho2000. All rights reserved.
      </footer>
    </div>
  );
};

const ProfileList: React.FC<{ currentProfile: ProfileData, onSelect: (p: ProfileData) => void }> = ({ currentProfile, onSelect }) => {
  const categories = useMemo<Record<string, ProfileData[]>>(() => {
    const map: Record<string, ProfileData[]> = {};
    ASHRAE_PROFILES_LIST.forEach(p => {
      if (!map[p.category]) map[p.category] = [];
      map[p.category].push(p);
    });
    return map;
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[500px]">
      <h3 className="text-lg font-bold mb-6">Lista de Perfis (Agrupados por Edifício)</h3>
      <div className="space-y-8 overflow-y-auto max-h-[700px] pr-2">
        {(Object.entries(categories) as [string, ProfileData[]][]).map(([cat, profiles]) => (
          <div key={cat}>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 border-b pb-2">{cat}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {profiles.map(p => (
                <button
                  key={p.name}
                  onClick={() => onSelect(p)}
                  className={`p-4 rounded-xl border text-left transition-all hover:bg-slate-50 group ${
                    currentProfile.name === p.name ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100' : 'border-slate-100'
                  }`}
                >
                  <span className="block font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{p.name}</span>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{p.description}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileEditor: React.FC<{ profile: ProfileData, maxLoad: number, onUpdate: (t: any, i: number, v: number) => void }> = ({ profile, maxLoad, onUpdate }) => (
  <div className="space-y-6">
    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="font-bold text-slate-800 mb-6">Ajuste Diário (Mixer)</h3>
      <div className="flex items-end justify-between gap-1 h-64 border-b border-slate-100 pb-2 overflow-x-auto">
        {profile.daily.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center h-full group min-w-[24px]">
            <span className="text-[8px] font-bold text-blue-600 mb-1 leading-tight text-center h-8 flex items-end">
              {(v * maxLoad).toFixed(0)}<br/>kW
            </span>
            <div className="flex-1 w-full relative">
              <input 
                type="range" min="0" max="1" step="0.01" value={v} 
                onChange={e => onUpdate('daily', i, Number(e.target.value))}
                style={{ writingMode: 'bt-lr', appearance: 'slider-vertical', height: '100%', width: '100%' } as any}
                className="accent-blue-600 opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="text-[8px] font-bold text-slate-400 mt-1">{i}h</span>
          </div>
        ))}
      </div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase">Fatores Semanais</h3>
        <div className="space-y-3">
          {DAYS_OF_WEEK.map((day, i) => (
            <div key={day} className="flex items-center gap-4">
              <span className="w-10 text-[10px] font-black text-slate-400 uppercase">{day}</span>
              <input type="range" min="0" max="1.5" step="0.05" value={profile.weekly[i]} onChange={e => onUpdate('weekly', i, Number(e.target.value))} className="flex-1 accent-blue-600" />
              <span className="w-10 text-right text-xs font-mono">{(profile.weekly[i]*100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase">Sazonalidade Mensal</h3>
        <div className="grid grid-cols-2 gap-4">
          {MONTHS.map((month, i) => (
            <div key={month} className="space-y-1">
              <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">
                <span>{month}</span>
                <span className="text-blue-500">{(profile.monthly[i]*100).toFixed(0)}%</span>
              </div>
              <input type="range" min="0" max="1.5" step="0.05" value={profile.monthly[i]} onChange={e => onUpdate('monthly', i, Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AnnualMatrixEditor: React.FC<{ hourlyData: number[], onUpdate: (data: number[]) => void }> = ({ hourlyData, onUpdate }) => {
  const [selection, setSelection] = useState<{ start: number, end: number } | null>(null);
  const [bulkValue, setBulkValue] = useState<string>("");

  const handleCellChange = (globalIdx: number, val: number) => {
    const newData = [...hourlyData];
    newData[globalIdx] = isNaN(val) ? 0 : val;
    onUpdate(newData);
  };

  const applyBulkEdit = () => {
    if (!selection || bulkValue === "") return;
    const val = parseFloat(bulkValue);
    if (isNaN(val)) return;
    const newData = [...hourlyData];
    const start = Math.min(selection.start, selection.end);
    const end = Math.max(selection.start, selection.end);
    for (let i = start; i <= end; i++) {
      newData[i] = val;
    }
    onUpdate(newData);
    setSelection(null);
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-[700px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold">Matriz de Edição Anual (365 Dias)</h3>
          <p className="text-xs text-slate-500">Introdução direta de valores (sem setas). Arraste para selecionar múltiplas células.</p>
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-xs font-bold text-slate-400 uppercase">Lote:</label>
          <input 
            type="number" placeholder="kW" value={bulkValue} 
            onChange={e => setBulkValue(e.target.value)}
            className="w-20 px-3 py-2 border-2 border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none"
          />
          <button 
            onClick={applyBulkEdit}
            disabled={!selection}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold disabled:bg-slate-100 disabled:text-slate-400 transition-colors shadow-sm"
          >
            Aplicar
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto border rounded-xl relative">
        <table className="w-full text-[10px] border-collapse bg-white table-fixed">
          <thead className="sticky top-0 bg-slate-900 text-white shadow-md z-30">
            <tr>
              <th className="p-2 border border-slate-800 font-black w-14 sticky left-0 bg-slate-900 z-40">DIA</th>
              {Array.from({ length: 24 }).map((_, h) => (
                <th key={h} className="p-2 border border-slate-800 font-bold w-12 text-center uppercase tracking-tighter">{h}h</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 365 }).map((_, d) => (
              <tr key={d} className="hover:bg-slate-50 group">
                <td className="p-2 border border-slate-200 font-black text-center bg-slate-100 sticky left-0 z-20 group-hover:bg-blue-50">
                  {d + 1}
                </td>
                {Array.from({ length: 24 }).map((_, h) => {
                  const globalIdx = d * 24 + h;
                  const isSelected = selection && globalIdx >= Math.min(selection.start, selection.end) && globalIdx <= Math.max(selection.start, selection.end);
                  return (
                    <td 
                      key={h} 
                      className={`border border-slate-100 p-0 transition-colors relative ${isSelected ? 'bg-blue-200' : ''}`}
                      onMouseDown={() => setSelection({ start: globalIdx, end: globalIdx })}
                      onMouseEnter={(e) => { if (e.buttons === 1 && selection) setSelection({ ...selection, end: globalIdx }) }}
                    >
                      <input 
                        type="number" 
                        value={hourlyData[globalIdx] !== undefined ? Number(hourlyData[globalIdx].toFixed(1)) : ''} 
                        onChange={(e) => handleCellChange(globalIdx, parseFloat(e.target.value))}
                        className="w-full h-9 p-0 border-none bg-transparent text-center focus:ring-2 focus:ring-blue-400 focus:bg-white focus:z-10 outline-none transition-all appearance-none"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const StatItem: React.FC<{label: string, value: string}> = ({label, value}) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
    <span className="text-sm text-slate-500 font-medium">{label}</span>
    <span className="text-sm text-slate-900 font-bold">{value}</span>
  </div>
);

const Visualizer: React.FC<{ results: CalculationResults }> = ({ results }) => {
  const [tab, setTab] = useState<'day' | 'week' | 'year'>('day');
  const chartData = useMemo(() => {
    if (tab === 'day') return results.hourly8760.slice(0, 24).map((v, i) => ({ x: `${i}h`, val: v }));
    if (tab === 'week') return results.hourly8760.slice(0, 168).map((v, i) => ({ x: `${Math.floor(i/24)}d ${i%24}h`, val: v }));
    const annualData = [];
    for (let i = 0; i < 365; i++) {
      const dayStart = i * 24;
      const dayAvg = results.hourly8760.slice(dayStart, dayStart + 24).reduce((a, b) => a + b, 0) / 24;
      annualData.push({ x: i, val: dayAvg });
    }
    return annualData;
  }, [results, tab]);

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Gráficos de Output</h3>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {(['day', 'week', 'year'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-md text-xs font-bold ${tab === t ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>{t === 'day' ? 'Dia' : t === 'week' ? 'Semana' : 'Anual'}</button>
          ))}
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs><linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="x" hide={tab === 'year'} fontSize={10} />
            <YAxis fontSize={10} unit="kW" />
            <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
            <Area type="monotone" dataKey="val" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLoad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default App;
