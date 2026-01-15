
import { ProfileData } from './types';

export const APP_INFO = {
  name: "K-KWCHARTCREATE",
  version: "1.5.0",
  author: "By Koelho2000",
  website: "www.koelho2000.com",
  date: new Date().toLocaleDateString('pt-PT')
};

export const DAYS_OF_WEEK = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
export const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
export const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Reusable Base Patterns
const p_flat = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const p_office = [0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.4, 0.8, 0.9, 1.0, 1.0, 0.9, 0.9, 1.0, 1.0, 0.9, 0.8, 0.6, 0.4, 0.2, 0.1, 0.1, 0.1, 0.1];
const p_residential = [0.3, 0.2, 0.2, 0.2, 0.3, 0.5, 0.8, 0.7, 0.4, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.5, 0.7, 0.9, 1.0, 0.9, 0.7, 0.5, 0.4, 0.3];
const p_retail = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.3, 0.5, 0.8, 0.9, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.9, 0.6, 0.3, 0.1, 0.1];
const p_2shifts = [0.1, 0.1, 0.1, 0.1, 0.1, 0.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0.1, 0.1];
const p_3shifts = [0.9, 0.9, 0.9, 0.9, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.9, 0.9, 0.9];
const p_evening = [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 0.9, 0.7, 0.5, 0.3, 0.2];
const p_morning = [0.8, 0.9, 1.0, 1.0, 0.9, 0.8, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.3, 0.3, 0.2, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.7, 0.8, 0.8];
const p_sports = [0.2, 0.1, 0.1, 0.1, 0.2, 0.4, 0.7, 0.8, 0.7, 0.6, 0.6, 0.6, 0.6, 0.6, 0.7, 0.8, 0.9, 1.0, 1.0, 0.9, 0.6, 0.4, 0.3, 0.2];
const p_thermal_cool = [0.4, 0.3, 0.3, 0.3, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.5, 0.4];
const p_thermal_heat = [0.8, 0.9, 1.0, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.0, 0.9, 0.8, 0.8];
const p_dhw = [0.2, 0.1, 0.1, 0.1, 0.2, 0.5, 0.9, 1.0, 0.8, 0.5, 0.4, 0.4, 0.5, 0.4, 0.4, 0.4, 0.5, 0.7, 0.9, 1.0, 0.7, 0.4, 0.3, 0.2];

export const ASHRAE_PROFILES_LIST: ProfileData[] = [
  // ESCRITÓRIOS
  { category: "Escritórios", name: "Escritório Grande - Padrão", description: "Pico no meio do dia. Carga pesada Seg-Sex.", daily: p_office, weekly: [1, 1, 1, 1, 1, 0.2, 0.1], monthly: [0.8, 0.8, 0.8, 0.9, 1.0, 1.0, 1.0, 1.0, 0.9, 0.8, 0.8, 0.8] },
  { category: "Escritórios", name: "Escritório Noturno", description: "Atividade estendida até noite.", daily: p_evening, weekly: [1, 1, 1, 1, 1, 0.4, 0.1], monthly: [0.9, 0.9, 0.9, 1, 1, 1, 1, 1, 1, 0.9, 0.9, 0.9] },
  { category: "Escritórios", name: "Call Center 24h", description: "Carga constante 24h todos os dias.", daily: p_flat, weekly: [1, 1, 1, 1, 1, 1, 1], monthly: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },

  // RESIDENCIAL
  { category: "Residencial", name: "Apartamento Família", description: "Picos manhã e noite. Fins de semana fortes.", daily: p_residential, weekly: [0.9, 0.9, 0.9, 0.9, 0.9, 1.1, 1.2], monthly: [1.1, 1.0, 0.8, 0.7, 0.7, 0.8, 0.9, 1.0, 0.9, 0.8, 1.0, 1.1] },
  { category: "Residencial", name: "Moradia Unifamiliar - Verão", description: "Pico noturno (arrefecimento).", daily: p_evening, weekly: [1, 1, 1, 1, 1, 1.2, 1.2], monthly: [0.5, 0.5, 0.6, 0.8, 1.1, 1.3, 1.4, 1.4, 1.2, 0.8, 0.6, 0.5] },

  // SAÚDE
  { category: "Saúde", name: "Hospital Geral", description: "Operação 24/7 constante.", daily: p_flat, weekly: [1, 1, 1, 1, 1, 0.95, 0.95], monthly: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  { category: "Saúde", name: "Centro de Saúde / Clínica", description: "Apenas dias úteis e Sábado manhã.", daily: p_office, weekly: [1, 1, 1, 1, 1, 0.4, 0.05], monthly: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },

  // EDUCAÇÃO
  { category: "Educação", name: "Escola Básica", description: "Pico manhã/tarde. Fechado Agosto.", daily: p_office, weekly: [1, 1, 1, 1, 1, 0.05, 0.05], monthly: [1, 1, 1, 1, 1, 0.7, 0.1, 0.1, 1, 1, 1, 0.8] },
  { category: "Educação", name: "Creche", description: "Ocupação diurna constante.", daily: p_office, weekly: [1, 1, 1, 1, 1, 0.05, 0.05], monthly: [1, 1, 1, 1, 1, 0.8, 0.1, 0.1, 1, 1, 1, 0.9] },

  // COMÉRCIO
  { category: "Comércio", name: "Centro Comercial", description: "Pico tarde/noite. Domingo forte.", daily: p_retail, weekly: [0.8, 0.8, 0.8, 0.9, 1.1, 1.3, 1.4], monthly: [0.9, 0.9, 0.9, 1, 1, 1.1, 1.1, 1.1, 1, 1, 1.1, 1.3] },
  { category: "Comércio", name: "Supermercado", description: "Carga base (frio) + ocupação.", daily: p_flat.map(v => v * 0.7 + 0.3), weekly: [1, 1, 1, 1, 1, 1.1, 1.0], monthly: [1, 1, 1, 1, 1, 1.1, 1.1, 1.1, 1, 1, 1, 1] },

  // INDÚSTRIA (SETORES PT)
  { category: "Indústria (Setores PT)", name: "Alimentar (Conservas)", description: "Sazonalidade de campanhas. 2 turnos.", daily: p_2shifts, weekly: [1, 1, 1, 1, 1, 0.8, 0.1], monthly: [0.4, 0.4, 0.5, 0.6, 0.8, 1.0, 1.2, 1.2, 1.0, 0.7, 0.5, 0.4] },
  { category: "Indústria (Setores PT)", name: "Lacticínios", description: "Carga base de frio industrial 24/7.", daily: p_flat.map(v => v * 0.8 + 0.2), weekly: [1, 1, 1, 1, 1, 1, 1], monthly: [1, 1, 1.1, 1.2, 1.2, 1.1, 1, 1, 1.1, 1.1, 1, 1] },
  { category: "Indústria (Setores PT)", name: "Petrolífera", description: "Operação contínua alta intensidade.", daily: p_flat, weekly: [1, 1, 1, 1, 1, 1, 1], monthly: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  { category: "Indústria (Setores PT)", name: "Agro-Pecuária", description: "Picos de ordenha madrugada/tarde.", daily: [0.8, 1.0, 0.9, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.8, 1.0, 0.9, 0.5, 0.4, 0.4, 0.6, 0.7], weekly: [1, 1, 1, 1, 1, 1, 1], monthly: [0.8, 0.8, 0.9, 1.0, 1.1, 1.2, 1.2, 1.2, 1.1, 1.0, 0.9, 0.8] },
  { category: "Indústria (Setores PT)", name: "Cerâmica/Vidro", description: "Carga térmica constante (Fornos).", daily: p_flat, weekly: [1, 1, 1, 1, 1, 1, 1], monthly: [1.1, 1.1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 1] },

  // EQUIPAMENTOS INDUSTRIAIS
  { category: "Equipamentos Industriais", name: "Fornos (Batch)", description: "Ciclos de aquecimento intermitentes.", daily: [0, 0, 0, 0, 0, 0.2, 1.0, 0.8, 1.0, 0.8, 1.0, 0.8, 1.0, 0.8, 1.0, 0.8, 1.0, 0.6, 0.2, 0, 0, 0, 0, 0], weekly: [1, 1, 1, 1, 1, 0.1, 0], monthly: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  { category: "Equipamentos Industriais", name: "Secadores", description: "Contínuo durante colheitas.", daily: p_flat, weekly: [1, 1, 1, 1, 1, 1, 1], monthly: [0, 0, 0, 0, 0, 0, 0, 0.5, 1.0, 1.0, 0.2, 0] },
  { category: "Equipamentos Industriais", name: "Bombas de Vácuo", description: "Ritmo de produção (2 turnos).", daily: p_2shifts, weekly: [1, 1, 1, 1, 1, 0.2, 0.1], monthly: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  { category: "Equipamentos Industriais", name: "Prensas Hidráulicas", description: "Carga intermitente com picos.", daily: [0.1, 0.1, 0.1, 0.1, 0.1, 0.5, 1.0, 0.4, 1.0, 0.4, 1.0, 0.4, 1.0, 0.4, 1.0, 0.4, 1.0, 0.8, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1], weekly: [1, 1, 1, 1, 1, 0.1, 0], monthly: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },

  // SISTEMAS TÉRMICOS
  { category: "Sistemas Térmicos", name: "Aquecimento Central", description: "Forte no Inverno, nulo no Verão.", daily: p_thermal_heat, weekly: [1, 1, 1, 1, 1, 0.5, 0.3], monthly: [1.2, 1.1, 0.8, 0.4, 0.1, 0, 0, 0, 0.1, 0.4, 0.9, 1.2] },
  { category: "Sistemas Térmicos", name: "Arrefecimento (Chillers)", description: "Pico no Verão (15h-17h).", daily: p_thermal_cool, weekly: [1, 1, 1, 1, 1, 0.6, 0.4], monthly: [0, 0, 0.1, 0.3, 0.7, 1.1, 1.4, 1.5, 1.1, 0.5, 0.1, 0] },
  { category: "Sistemas Térmicos", name: "AQS (Águas Quentes)", description: "Pico de banhos manhã/noite.", daily: p_dhw, weekly: [0.9, 0.9, 0.9, 0.9, 0.9, 1.1, 1.2], monthly: [1.1, 1.1, 1.0, 1.0, 0.9, 0.8, 0.8, 0.8, 0.9, 1.0, 1.1, 1.1] },
  { category: "Sistemas Térmicos", name: "Desumidificação", description: "Ativo em meses húmidos.", daily: p_flat, weekly: [1, 1, 1, 1, 1, 1, 1], monthly: [0.6, 0.6, 0.8, 1.0, 0.7, 0.3, 0.2, 0.2, 0.5, 0.8, 1.0, 0.8] },

  // HOTELARIA
  { category: "Hotelaria", name: "Hotel de Cidade", description: "Picos manhã e noite.", daily: [0.4, 0.4, 0.4, 0.4, 0.4, 0.5, 0.8, 1.0, 0.8, 0.6, 0.5, 0.5, 0.6, 0.6, 0.5, 0.5, 0.6, 0.8, 0.9, 1.0, 0.9, 0.7, 0.5, 0.4], weekly: [1, 1, 1, 1, 1, 1.1, 1.1], monthly: [0.9, 0.9, 0.9, 1.0, 1.1, 1.2, 1.2, 1.2, 1.1, 1.0, 1.0, 1.1] },
  { category: "Hotelaria", name: "Resort de Verão", description: "Forte sazonalidade Verão.", daily: p_evening, weekly: [1, 1, 1, 1, 1, 1.2, 1.2], monthly: [0.2, 0.2, 0.3, 0.6, 1.0, 1.3, 1.5, 1.5, 1.2, 0.7, 0.3, 0.2] },

  // RESTAURAÇÃO
  { category: "Restauração", name: "Restaurante Gourmet", description: "Picos almoço/jantar intensos.", daily: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.3, 0.4, 0.7, 1.0, 1.0, 0.8, 0.5, 0.4, 0.6, 0.9, 1.2, 1.3, 1.1, 0.6, 0.3, 0.1], weekly: [0.7, 0.8, 0.9, 1, 1.2, 1.4, 1.3], monthly: [1, 1, 1, 1, 1, 1.1, 1.2, 1.2, 1.1, 1, 1.1, 1.4] },
  { category: "Restauração", name: "Bakery / Padaria", description: "Pico madrugada.", daily: p_morning, weekly: [1, 1, 1, 1, 1, 1.2, 1.3], monthly: [1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1.1, 1.2] },

  // LAZER & CULTURA
  { category: "Lazer & Cultura", name: "Cinema / Teatro", description: "Carga tarde e noite.", daily: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.0, 1.0, 1.0, 0.9, 0.4, 0.1], weekly: [0.6, 0.7, 0.8, 1.0, 1.2, 1.5, 1.5], monthly: [1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.6, 0.6, 0.8, 1.0, 1.2, 1.3] },
  { category: "Lazer & Cultura", name: "Museu", description: "Horário diurno. Fechado Segunda.", daily: p_office, weekly: [0.05, 1, 1, 1, 1, 1.3, 1.3], monthly: [1, 1, 1, 1, 1.1, 1.2, 1.3, 1.3, 1.1, 1, 1, 1] },

  // DESPORTO
  { category: "Desporto", name: "Ginásio", description: "Picos manhã e final da tarde.", daily: p_sports, weekly: [1, 1, 1, 1, 1, 0.7, 0.5], monthly: [1.3, 1.2, 1.1, 1, 0.9, 0.8, 0.7, 0.7, 1, 1.1, 1.1, 1.1] },

  // SERVIÇOS PÚBLICOS
  { category: "Serviços Públicos", name: "Bombeiros / Esquadra", description: "24/7 essencial.", daily: p_flat.map(v => v * 0.9), weekly: [1, 1, 1, 1, 1, 1, 1], monthly: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },

  // INFRAESTRUTURA
  { category: "Infraestrutura", name: "Data Center", description: "Carga informática constante.", daily: p_flat, weekly: [1, 1, 1, 1, 1, 1, 1], monthly: [0.9, 0.9, 0.9, 1.0, 1.1, 1.2, 1.2, 1.2, 1.1, 1.0, 0.9, 0.9] },
  { category: "Infraestrutura", name: "ETAR", description: "Contínuo com picos de caudal.", daily: [0.7, 0.7, 0.6, 0.6, 0.7, 0.8, 1.0, 1.0, 0.9, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.9, 1.0, 1.0, 0.9, 0.8, 0.7, 0.7, 0.7], weekly: [1, 1, 1, 1, 1, 1, 1], monthly: [1.1, 1.1, 1.0, 1.0, 0.9, 0.9, 0.9, 0.9, 1.0, 1.0, 1.1, 1.2] },
];
