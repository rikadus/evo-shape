import { useState, useEffect } from 'react';
import type { BodyMeasurements, MeasurementFormData } from '../types';
const STORAGE_KEY = 'body-tracker-v1';
export function useMeasurements(activeUserId: string | null) {
  const [allMeasurements, setAllMeasurements] = useState<BodyMeasurements[]>([]);
  
  // Carregar dados ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setAllMeasurements(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao carregar dados:', e);
      }
    }
  }, []);
  // Salvar dados sempre que mudar
  useEffect(() => {
    if (allMeasurements.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allMeasurements));
    }
  }, [allMeasurements]);
  // Medidas filtadas pelo usuário ativo
  const measurements = activeUserId 
    ? allMeasurements.filter(m => m.userId === activeUserId)
    : [];
  const addMeasurement = (data: MeasurementFormData) => {
    if (!activeUserId) return;
    const newMeasurement: BodyMeasurements = {
      ...data,
      id: crypto.randomUUID(),
      userId: activeUserId,
    };
    
    setAllMeasurements(prev => [...prev, newMeasurement].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  };
  const deleteMeasurement = (id: string) => {
    setAllMeasurements(prev => prev.filter(m => m.id !== id));
  };
  // Função auxiliar para pegar a evolução do peso (para gráficos)
  const getWeightHistory = () => {
    return measurements
      .map(m => ({ date: m.date, weight: m.weight }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };
  // Retornar todas para comparação
  const getMeasurementsByUserId = (userId: string) => {
    return allMeasurements
      .filter(m => m.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };
  return {
    measurements,
    allMeasurements, // Exposto para comparação global
    addMeasurement,
    deleteMeasurement,
    getWeightHistory,
    getMeasurementsByUserId
  };
}
