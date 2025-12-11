'use client';

import { POI } from '@/app/types/poi';
import { CandidateLocation } from '@/app/types/intelligence-planner';
import { InfoWindow } from '@react-google-maps/api';
import { POI_TYPES } from '@/app/constants/poi-types';
import { calculateDistance, formatDistance } from '@/app/utils/distance-calculator';
import { X, MapPin, Star } from 'lucide-react';

interface POIInfoWindowProps {
    poi: POI;
    candidateLocation?: CandidateLocation;
    onClose: () => void;
}

export default function POIInfoWindow({
    poi,
    candidateLocation,
    onClose
}: POIInfoWindowProps) {
    const poiConfig = Object.values(POI_TYPES).find(config => config.id === poi.type);

    // Calculate distance from candidate if available
    const distance = candidateLocation
        ? calculateDistance(
            candidateLocation.latitude,
            candidateLocation.longitude,
            poi.latitude,
            poi.longitude
        )
        : null;

    return (
        <InfoWindow
            position={{ lat: poi.latitude, lng: poi.longitude }}
            onCloseClick={onClose}
            options={{
                pixelOffset: new google.maps.Size(0, -30)
            }}
        >
            <div className="p-3 min-w-[250px] max-w-[300px]">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">{poiConfig?.icon || '📍'}</span>
                            <h3 className="font-semibold text-gray-900 text-sm">
                                {poi.name}
                            </h3>
                        </div>
                        <p className="text-xs text-gray-600">
                            {poiConfig?.label || 'POI'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        aria-label="Tutup"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Rating */}
                {poi.rating && (
                    <div className="flex items-center gap-1 mb-2">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">
                            {poi.rating.toFixed(1)}
                        </span>
                    </div>
                )}

                {/* Address */}
                <div className="flex items-start gap-2 mb-2">
                    <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-600 line-clamp-2">
                        {poi.address || 'Alamat tidak tersedia'}
                    </p>
                </div>

                {/* Distance from candidate */}
                {distance !== null && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                                Jarak dari kandidat:
                            </span>
                            <span className="text-sm font-semibold text-[var(--color-light-blue)]">
                                {formatDistance(distance)}
                            </span>
                        </div>
                    </div>
                )}

                {!candidateLocation && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-400 italic">
                            Tambahkan lokasi kandidat untuk melihat jarak
                        </p>
                    </div>
                )}
            </div>
        </InfoWindow>
    );
}
