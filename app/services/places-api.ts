'use client';

import { POI, POIType } from '@/app/types/poi';
import { POI_TYPES, MAX_POI_RESULTS } from '@/app/constants/poi-types';

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const CACHE_KEY_PREFIX = 'poi_cache_';

interface CachedPOIData {
    pois: POI[];
    timestamp: number;
}

/**
 * Service for interacting with Google Places API
 */
export class PlacesService {
    private placesService: google.maps.places.PlacesService | null = null;

    constructor(map?: google.maps.Map) {
        if (map) {
            this.placesService = new google.maps.places.PlacesService(map);
        }
    }

    /**
     * Initialize the service with a map instance
     */
    initialize(map: google.maps.Map) {
        this.placesService = new google.maps.places.PlacesService(map);
    }

    /**
     * Search for nearby POIs
     * @param location Center point for search
     * @param radius Search radius in meters
     * @param types Array of POI types to search for
     * @returns Promise of POI array
     */
    async searchNearby(
        location: google.maps.LatLngLiteral,
        radius: number,
        types: POIType[]
    ): Promise<POI[]> {
        if (!this.placesService) {
            throw new Error('PlacesService not initialized');
        }

        // Check cache first
        const cacheKey = this.getCacheKey(location, radius, types);
        const cached = this.getFromCache(cacheKey);
        if (cached) {
            return cached;
        }

        const allPOIs: POI[] = [];

        // Search for each type
        for (const type of types) {
            const poiConfig = Object.values(POI_TYPES).find(config => config.id === type);
            if (!poiConfig) continue;

            try {
                const results = await this.searchByType(location, radius, poiConfig.googlePlaceType);
                allPOIs.push(...results);
            } catch (error) {
                console.error(`Error searching for ${type}:`, error);
            }
        }

        // Limit results and remove duplicates
        const uniquePOIs = this.removeDuplicates(allPOIs);
        const limitedPOIs = uniquePOIs.slice(0, MAX_POI_RESULTS);

        // Cache the results
        this.saveToCache(cacheKey, limitedPOIs);

        return limitedPOIs;
    }

    /**
     * Search for a specific POI type
     */
    private searchByType(
        location: google.maps.LatLngLiteral,
        radius: number,
        type: string
    ): Promise<POI[]> {
        return new Promise((resolve, reject) => {
            if (!this.placesService) {
                reject(new Error('PlacesService not initialized'));
                return;
            }

            const request: google.maps.places.PlaceSearchRequest = {
                location,
                radius,
                type
            };

            this.placesService.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    const pois = results
                        .filter(place => place.place_id && place.geometry?.location)
                        .map(place => this.convertToPOI(place, type as POIType));
                    resolve(pois);
                } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                    resolve([]);
                } else {
                    reject(new Error(`Places API error: ${status}`));
                }
            });
        });
    }

    /**
     * Convert Google Places result to POI
     */
    private convertToPOI(place: google.maps.places.PlaceResult, type: POIType): POI {
        const location = place.geometry!.location!;

        return {
            id: place.place_id!,
            name: place.name || 'Unknown',
            type,
            latitude: location.lat(),
            longitude: location.lng(),
            address: place.vicinity || '',
            rating: place.rating,
            placeId: place.place_id!
        };
    }

    /**
     * Remove duplicate POIs based on place_id
     */
    private removeDuplicates(pois: POI[]): POI[] {
        const seen = new Set<string>();
        return pois.filter(poi => {
            if (seen.has(poi.placeId)) {
                return false;
            }
            seen.add(poi.placeId);
            return true;
        });
    }

    /**
     * Generate cache key
     */
    private getCacheKey(location: google.maps.LatLngLiteral, radius: number, types: POIType[]): string {
        const lat = location.lat.toFixed(4);
        const lng = location.lng.toFixed(4);
        const typesStr = types.sort().join(',');
        return `${CACHE_KEY_PREFIX}${lat}_${lng}_${radius}_${typesStr}`;
    }

    /**
     * Get data from cache
     */
    private getFromCache(key: string): POI[] | null {
        try {
            const cached = localStorage.getItem(key);
            if (!cached) return null;

            const data: CachedPOIData = JSON.parse(cached);
            const now = Date.now();

            // Check if cache is still valid
            if (now - data.timestamp < CACHE_DURATION) {
                return data.pois;
            }

            // Cache expired, remove it
            localStorage.removeItem(key);
            return null;
        } catch (error) {
            console.error('Error reading from cache:', error);
            return null;
        }
    }

    /**
     * Save data to cache
     */
    private saveToCache(key: string, pois: POI[]): void {
        try {
            const data: CachedPOIData = {
                pois,
                timestamp: Date.now()
            };
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to cache:', error);
        }
    }

    /**
     * Clear all POI cache
     */
    static clearCache(): void {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(CACHE_KEY_PREFIX)) {
                    localStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.error('Error clearing cache:', error);
        }
    }
}
