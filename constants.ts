
import { ProfileData } from './types';

export const APP_INFO = {
  name: "K-KWCHARTCREATE",
  version: "1.2.0",
  author: "By Koelho2000",
  website: "www.koelho2000.com",
  date: new Date().toLocaleDateString('pt-PT')
};

export const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const standardDaily = [0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.4, 0.8, 0.9, 1.0, 1.0, 0.9, 0.9, 1.0, 1.0, 0.9, 0.8, 0.6, 0.4, 0.2, 0.1, 0.1, 0.1, 0.1];
const residentialDaily = [0.3, 0.2, 0.2, 0.2, 0.3, 0.5, 0.8, 0.7, 0.4, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.5, 0.7, 0.9, 1.0, 0.9, 0.7, 0.5, 0.4, 0.3];
const constantDaily = [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9];
const eveningPeakDaily = [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 0.9, 0.7, 0.5, 0.3, 0.2];

export const ASHRAE_PROFILES_LIST: ProfileData[] = [
  // OFFICES
  { category: "Escritórios", name: "Escritório Grande - Padrão", description: "Pico no meio do dia. Carga pesada Seg-Sex, mínima no fim de semana.", daily: standardDaily, weekly: [1, 1, 1, 1, 1, 0.2, 0.1], monthly: [0.8, 0.8, 0.8, 0.9, 1.0, 1.0, 1.0, 1.0, 0.9, 0.8, 0.8, 0.8] },
  { category: "Escritórios", name: "Escritório Pequeno - Noturno", description: "Atividade estendida até noite. Redução parcial Sábado.", daily: eveningPeakDaily, weekly: [1, 1, 1, 1, 1, 0.4, 0.1], monthly: [0.9, 0.9, 0.9, 1, 1, 1, 1, 1, 1, 0.9, 0.9, 0.9] },
  { category: "Escritórios", name: "Office 24/7 - Data Center", description: "Carga constante 24h todos os dias da semana.", daily: constantDaily, weekly: [1, 1, 1, 1, 1, 1, 1], monthly: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },

  // RESIDENTIAL
  { category: "Residencial", name: "Apartamento Família", description: "Picos manhã e noite. Carga maior no fim de semana.", daily: residentialDaily, weekly: [0.9, 0.9, 0.9, 0.9, 0.9, 1.1, 1.2], monthly: [1.1, 1.0, 0.8, 0.7, 0.7, 0.8, 0.9, 1.0, 0.9, 0.8, 1.0, 1.1] },
  { category: "Residencial", name: "Moradia Unifamiliar - Verão", description: "Pico noturno (arrefecimento). Fins de semana intensos.", daily: eveningPeakDaily, weekly: [1, 1, 1, 1, 1, 1.2, 1.2], monthly: [0.5, 0.5, 0.6, 0.8, 1.1, 1.3, 1.4, 1.4, 1.2, 0.8, 0.6, 0.5] },
  { category: "Residencial", name: "Moradia Unifamiliar - Inverno", description: "Carga base elevada para aquecimento. Uniforme na semana.", daily: constantDaily.map(v => v * 0.8), weekly: [1, 1, 1, 1, 1, 1, 1], monthly: [1.4, 1.3, 1.1, 0.7, 0.4, 0.3, 0.3, 0.3, 0.4, 0.8, 1.2, 1.4] },

  // HOSPITAL
  { category: "Saúde", name: "Hospital Geral", description: "24h ativo. Pequena redução fim de semana nas consultas.", daily: constantDaily, weekly: [1, 1, 1, 1, 1, 0.9, 0.9], monthly: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  { category: "Saúde", name: "Clínica de Dia", description: "Apenas dias úteis. Sem carga fim de semana.", daily: standardDaily, weekly: [1, 1, 1, 1, 1, 0.05, 0.05], monthly: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },

  // EDUCATION
  { category: "Educação", name: "Escola Primária", description: "Pico manhã/tarde. Fechado Agosto e fins de semana.", daily: standardDaily, weekly: [1, 1, 1, 1, 1, 0.05, 0.05], monthly: [1, 1, 1, 1, 1, 0.7, 0.1, 0.1, 1, 1, 1, 0.8] },
  { category: "Educação", name: "Universidade - Campus", description: "Misto 24h (residências) e dia (aulas). Redução no Verão.", daily: residentialDaily, weekly: [1, 1, 1, 1, 1, 0.6, 0.5], monthly: [1, 1, 1, 1, 1, 0.8, 0.4, 0.4, 1, 1, 1, 0.9] },

  // RETAIL
  { category: "Comércio", name: "Centro Comercial", description: "Pico tarde/noite. Domingo é o dia mais forte.", daily: eveningPeakDaily, weekly: [0.8, 0.8, 0.8, 0.9, 1.1, 1.3, 1.4], monthly: [0.9, 0.9, 0.9, 1, 1, 1.1, 1.1, 1.1, 1, 1, 1.1, 1.3] },
  { category: "Comércio", name: "Supermercado", description: "Carga constante (frio alimentar). Pico ligeiro ao Sábado.", daily: constantDaily, weekly: [1, 1, 1, 1, 1, 1.1, 0.9], monthly: [1, 1, 1, 1, 1, 1.1, 1.1, 1.1, 1, 1, 1, 1] },

  // INDUSTRY
  { category: "Indústria", name: "Fábrica - 2 Turnos", description: "Seg-Sex (06h-22h). Paragem total fim de semana.", daily: [0.1, 0.1, 0.1, 0.1, 0.1, 0.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0.1, 0.1], weekly: [1, 1, 1, 1, 1, 0.1, 0.1], monthly: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  { category: "Indústria", name: "Fábrica - Contínua", description: "Operação 24/7 sem variação semanal.", daily: Array(24).fill(0.95), weekly: Array(7).fill(1), monthly: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },

  // RECS/OTHER
  { category: "Outros", name: "Hotel - Turismo", description: "Pico noturno. Verão muito forte.", daily: eveningPeakDaily, weekly: [1, 1, 1, 1, 1, 1.2, 1.2], monthly: [0.7, 0.7, 0.8, 1, 1.2, 1.4, 1.5, 1.5, 1.3, 1, 0.8, 0.9] },
  { category: "Outros", name: "Restaurante", description: "Picos Almoço e Jantar. Fins de semana fortes.", daily: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.4, 0.7, 0.9, 1, 1.1, 1.1, 1, 0.8, 0.7, 0.8, 1.1, 1.3, 1.2, 0.8, 0.4, 0.2, 0.1], weekly: [0.7, 0.8, 0.9, 1, 1.2, 1.4, 1.3], monthly: [1, 1, 1, 1, 1, 1, 1.1, 1.1, 1, 1, 1.1, 1.2] },
];
