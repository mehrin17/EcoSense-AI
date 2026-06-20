export interface ClimateRisk {
  floodRisk: 'Low' | 'Medium' | 'High';
  heatwaveRisk: 'Low' | 'Medium' | 'High';
  droughtRisk: 'Low' | 'Medium' | 'High';
  floodScore: number;
  heatwaveScore: number;
  droughtScore: number;
}

export interface Location {
  country: string;
  state: string;
  city: string;
}

export interface CarbonFootprint {
  annual: number;
  monthly: number;
  category: 'Low' | 'Moderate' | 'High';
  transportEmissions: number;
  electricityEmissions: number;
  lifestyleEmissions: number;
  sustainabilityScore: number;
}

export interface CarbonInputs {
  vehicleType: string;
  dailyDistance: number;
  monthlyElectricity: number;
  dietType: string;
  wasteGeneration: string;
}

export interface AIRecommendation {
  category: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  impact: string;
}

export interface DashboardData {
  location: Location;
  climateRisk: ClimateRisk;
  carbonFootprint: CarbonFootprint;
  carbonInputs: CarbonInputs;
  recommendations: AIRecommendation[];
}
