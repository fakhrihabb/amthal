import { POI } from './poi';

export interface Station {
    id: string;
    name: string;
    type: 'CHARGING_STATION' | 'BATTERY_SWAP_STATION';
    latitude: number;
    longitude: number;
    capacity: number; // Number of chargers
    operator: string;
    created_at: string;
}

export interface CandidateLocation {
    id: string;
    latitude: number;
    longitude: number;
    address: string;
    createdAt: Date;
    analysisScore?: number; // 0-100, undefined if not analyzed
}

export interface LayerState {
    charging_station: boolean;
    battery_swap_station: boolean;
    candidates: boolean;
    poi: boolean;
}

export interface SelectedMarker {
    type: 'station' | 'candidate' | 'poi';
    data: Station | CandidateLocation | POI;
}
