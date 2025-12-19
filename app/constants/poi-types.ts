import { POITypeConfig } from '@/app/types/poi';

export const POI_TYPES: Record<string, POITypeConfig> = {
    SHOPPING_MALL: {
        id: 'shopping_mall',
        label: 'Shopping Mall',
        icon: '🏬',
        color: '#3B82F6', // Blue
        googlePlaceType: 'shopping_mall'
    },
    UNIVERSITY: {
        id: 'university',
        label: 'University',
        icon: '🎓',
        color: '#8B5CF6', // Purple
        googlePlaceType: 'university'
    },
    PARKING: {
        id: 'parking',
        label: 'Parking Area',
        icon: '🅿️',
        color: '#10B981', // Green
        googlePlaceType: 'parking'
    },
    REST_STOP: {
        id: 'rest_stop',
        label: 'Rest Area',
        icon: '🛑',
        color: '#F59E0B', // Orange
        googlePlaceType: 'rest_stop'
    },
    TRANSIT_STATION: {
        id: 'transit_station',
        label: 'Transit Station',
        icon: '🚉',
        color: '#EF4444', // Red
        googlePlaceType: 'transit_station'
    }
};

export const POI_RADIUS_OPTIONS = [
    { value: 500, label: '500m' },
    { value: 1000, label: '1km' },
    { value: 2000, label: '2km' },
    { value: 5000, label: '5km' }
] as const;

export const DEFAULT_POI_RADIUS = 2000; // 2km default
export const MAX_POI_RESULTS = 100; // Maximum POI markers to display
