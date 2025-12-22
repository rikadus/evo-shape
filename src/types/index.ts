export interface UserProfile {
    id: string;
    name: string;
    color: string;
    createdAt: string;
    targetWeight?: number;
    targetDate?: string;
  }
  
  export interface BodyMeasurements {
    id: string;
    userId: string; // Novo campo
    date: string; // ISO string
    
    // Gerais
    weight: number;
    
    // Tronco
    neck: number;
    shoulders: number;
    shoulderWidth: number;
    chest: number;
    waist: number;
    abdomen: number;
    glutes: number;
    
    // Membros Superiores
    armRightRelaxed: number;
    armLeftRelaxed: number;
    armRightContracted: number;
    armLeftContracted: number;
    forearmRight: number;
    forearmLeft: number;
    
    // Membros Inferiores
    thighRightUpper: number;
    thighLeftUpper: number;
    thighRightMedial: number;
    thighLeftMedial: number;
    thighRightMedialContracted: number;
    thighLeftMedialContracted: number;
    calfRightRelaxed: number;
    calfLeftRelaxed: number;
    calfRightContracted: number;
    calfLeftContracted: number;
  }
  
  export type MeasurementFormData = Omit<BodyMeasurements, 'id' | 'userId'>;
