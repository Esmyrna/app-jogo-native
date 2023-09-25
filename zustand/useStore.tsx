import AsyncStorage from '@react-native-async-storage/async-storage';
import { Result } from '../pages/Result';

// Função para salvar histórico de partidas
export const saveMatchHistory = async (history: any) => {
  try {
    await AsyncStorage.setItem('matchHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Erro ao salvar histórico de partidas:', error);
  }
};

// Função para carregar histórico de partidas
export const loadMatchHistory = async () => {
    try {
      const historyString = await AsyncStorage.getItem('matchHistory');
      if (historyString !== null) {
        const historyData = JSON.parse(historyString);
  
        // Converter as datas de string ISO 8601 para objetos Date
        const historyWithDates = historyData.map((item: Result) => ({
          ...item,
          date: new Date(item.date),
        }));
  
        return historyWithDates;
      }
    } catch (error) {
      console.error('Erro ao carregar histórico de partidas:', error);
    }
    return [];
  };