import React, { useState } from 'react';
import { PlusCircle, Save } from 'lucide-react';
import type { MeasurementFormData } from '../types';
interface Props {
  onSubmit: (data: MeasurementFormData) => void;
}
const initialData: MeasurementFormData = {
  date: new Date().toISOString().split('T')[0],
  weight: 0,
  neck: 0,
  shoulders: 0,
  shoulderWidth: 0,
  chest: 0,
  waist: 0,
  abdomen: 0,
  glutes: 0,
  armRightRelaxed: 0,
  armLeftRelaxed: 0,
  armRightContracted: 0,
  armLeftContracted: 0,
  forearmRight: 0,
  forearmLeft: 0,
  thighRightUpper: 0,
  thighLeftUpper: 0,
  thighRightMedial: 0,
  thighLeftMedial: 0,
  thighRightMedialContracted: 0,
  thighLeftMedialContracted: 0,
  calfRightRelaxed: 0,
  calfLeftRelaxed: 0,
  calfRightContracted: 0,
  calfLeftContracted: 0,
};
const InputGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 border-slate-100">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  </div>
);
const Input = ({ label, value, onChange, type = "number", step = "0.1" }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs uppercase tracking-wide text-slate-500 font-semibold pl-1">{label}</label>
    <input 
      type={type} 
      step={step}
      value={value || ''} 
      onChange={onChange}
      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
      placeholder="0.0"
    />
  </div>
);
export function MeasurementForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<MeasurementFormData>(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (field: keyof MeasurementFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'date' ? value : parseFloat(value) || 0
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialData);
    setIsOpen(false);
  };
  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
      >
        <PlusCircle size={24} />
        Adicionar Nova Medida
      </button>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Nova Medida</h2>
        <button 
          type="button" 
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-slate-600 font-medium"
        >
          Cancelar
        </button>
      </div>
      <InputGroup title="Geral">
        <Input 
          label="Data" 
          type="date" 
          value={formData.date} 
          onChange={(e: any) => handleChange('date', e.target.value)} 
        />
        <Input 
          label="Peso (kg)" 
          value={formData.weight} 
          onChange={(e: any) => handleChange('weight', e.target.value)} 
        />
      </InputGroup>
      <InputGroup title="Tronco">
        <Input label="Pescoço" value={formData.neck} onChange={(e: any) => handleChange('neck', e.target.value)} />
        <Input label="Ombros" value={formData.shoulders} onChange={(e: any) => handleChange('shoulders', e.target.value)} />
        <Input label="Largura Ombros" value={formData.shoulderWidth} onChange={(e: any) => handleChange('shoulderWidth', e.target.value)} />
        <Input label="Peitoral" value={formData.chest} onChange={(e: any) => handleChange('chest', e.target.value)} />
        <Input label="Cintura" value={formData.waist} onChange={(e: any) => handleChange('waist', e.target.value)} />
        <Input label="Abdomen" value={formData.abdomen} onChange={(e: any) => handleChange('abdomen', e.target.value)} />
        <Input label="Glúteos" value={formData.glutes} onChange={(e: any) => handleChange('glutes', e.target.value)} />
      </InputGroup>
      <InputGroup title="Membros Superiores (Braços)">
        <Input label="Bíceps Dir. (Relaxado)" value={formData.armRightRelaxed} onChange={(e: any) => handleChange('armRightRelaxed', e.target.value)} />
        <Input label="Bíceps Esq. (Relaxado)" value={formData.armLeftRelaxed} onChange={(e: any) => handleChange('armLeftRelaxed', e.target.value)} />
        <Input label="Bíceps Dir. (Contraído)" value={formData.armRightContracted} onChange={(e: any) => handleChange('armRightContracted', e.target.value)} />
        <Input label="Bíceps Esq. (Contraído)" value={formData.armLeftContracted} onChange={(e: any) => handleChange('armLeftContracted', e.target.value)} />
        <Input label="Antebraço Dir." value={formData.forearmRight} onChange={(e: any) => handleChange('forearmRight', e.target.value)} />
        <Input label="Antebraço Esq." value={formData.forearmLeft} onChange={(e: any) => handleChange('forearmLeft', e.target.value)} />
      </InputGroup>
      <InputGroup title="Membros Inferiores (Pernas)">
        <Input label="Coxa Sup. Dir." value={formData.thighRightUpper} onChange={(e: any) => handleChange('thighRightUpper', e.target.value)} />
        <Input label="Coxa Sup. Esq." value={formData.thighLeftUpper} onChange={(e: any) => handleChange('thighLeftUpper', e.target.value)} />
        <Input label="Coxa Med. Dir." value={formData.thighRightMedial} onChange={(e: any) => handleChange('thighRightMedial', e.target.value)} />
        <Input label="Coxa Med. Esq." value={formData.thighLeftMedial} onChange={(e: any) => handleChange('thighLeftMedial', e.target.value)} />
        <Input label="Coxa Med. Dir. (Contr.)" value={formData.thighRightMedialContracted} onChange={(e: any) => handleChange('thighRightMedialContracted', e.target.value)} />
        <Input label="Coxa Med. Esq. (Contr.)" value={formData.thighLeftMedialContracted} onChange={(e: any) => handleChange('thighLeftMedialContracted', e.target.value)} />
        <Input label="Panturrilha Dir. (Relax)" value={formData.calfRightRelaxed} onChange={(e: any) => handleChange('calfRightRelaxed', e.target.value)} />
        <Input label="Panturrilha Esq. (Relax)" value={formData.calfLeftRelaxed} onChange={(e: any) => handleChange('calfLeftRelaxed', e.target.value)} />
        <Input label="Panturrilha Dir. (Contr.)" value={formData.calfRightContracted} onChange={(e: any) => handleChange('calfRightContracted', e.target.value)} />
        <Input label="Panturrilha Esq. (Contr.)" value={formData.calfLeftContracted} onChange={(e: any) => handleChange('calfLeftContracted', e.target.value)} />
      </InputGroup>
      <button 
        type="submit"
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2 mt-4"
      >
        <Save size={20} />
        Salvar Medidas
      </button>
    </form>
  );
}
