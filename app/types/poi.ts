export type POIType = 'shopping_mall' | 'university' | 'parking' | 'rest_stop' | 'transit_station';

export interface POI {
    id: string;
    name: string;
    type: POIType;
    latitude: number;
    longitude: number;
    address: string;
    rating?: number;
    placeId: string;
}

export interface POIFilterState {
    enabled: boolean;
    categories: {
        shopping_mall: boolean;
        university: boolean;
        parking: boolean;
        rest_stop: boolean;
        transit_station: boolean;
    };
    radius: 500 | 1000 | 2000 | 5000; // in meters
}

export interface POITypeConfig {
    id: POIType;
    label: string; // Bahasa Indonesia label
    icon: string;
    color: string;
    googlePlaceType: string; // Google Places API type
}
