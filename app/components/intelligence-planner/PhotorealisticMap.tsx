import React, { useEffect, useRef, useState } from 'react';
import { Station, CandidateLocation, SelectedMarker } from '@/app/types/intelligence-planner';
import { getMarkerIcon } from '@/app/utils/markerIcons';

interface PhotorealisticMapProps {
    center: google.maps.LatLngLiteral;
    zoom: number; // We'll convert zoom to range
    heading: number;
    tilt: number;
    stations: Station[];
    candidates: CandidateLocation[];
    onMarkerClick: (marker: SelectedMarker) => void;
    onCameraChange?: (camera: { center: google.maps.LatLngLiteral; zoom: number; heading: number; tilt: number }) => void;
    onLoad?: (map: google.maps.maps3d.Map3DElement) => void;
}

// Helper to convert Zoom level to Range (altitude in meters)
// This is an approximation as they behave differently
const zoomToRange = (zoom: number) => {
    // Basic approximation: range = 591657550.500000 / 2^(zoom - 1)
    // Adjusting for realistic viewing 
    return 150000000 / Math.pow(2, zoom);
};

// Helper (reverse)
const rangeToZoom = (range: number) => {
    return Math.log2(150000000 / range);
};

// Wrapper for 3D Marker to handle property assignment (React 18 limitation)
const Marker3DWrapper = ({
    position,
    title,
    src,
    onClick
}: {
    position: google.maps.LatLngLiteral,
    title: string,
    src: string,
    onClick: () => void
}) => {
    const markerRef = useRef<google.maps.maps3d.Marker3DElement>(null);

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.position = position;
        }
    }, [position]);

    return (
        // @ts-ignore
        <gmp-marker-3d
            ref={markerRef}
            title={title}
            src={src}
            height={0} // Ensure it's reachable
            onClick={onClick}
        />
    );
};

// React 18 / Custom Element wrapper using Attributes
export default function PhotorealisticMap({
    center,
    zoom,
    heading,
    tilt,
    stations,
    candidates,
    onMarkerClick,
    onCameraChange,
    onLoad
}: PhotorealisticMapProps) {
    const mapRef = useRef<google.maps.maps3d.Map3DElement>(null);

    // Initialize Map Listener (only once or when callback changes)
    useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current;
        if (onLoad) onLoad(map);

        // Add event listeners for camera movement
        const handleCameraChange = () => {
            if (onCameraChange && map.center) {
                // Throttle this if performance is bad
                onCameraChange({
                    center: {
                        lat: map.center.lat,
                        lng: map.center.lng
                    },
                    zoom: rangeToZoom(map.range || 1000),
                    heading: map.heading || 0,
                    tilt: map.tilt || 0
                });
            }
        };

        map.addEventListener('gmp-center-change', handleCameraChange);
        map.addEventListener('gmp-range-change', handleCameraChange);
        map.addEventListener('gmp-heading-change', handleCameraChange);
        map.addEventListener('gmp-tilt-change', handleCameraChange);

        return () => {
            map.removeEventListener('gmp-center-change', handleCameraChange);
            map.removeEventListener('gmp-range-change', handleCameraChange);
            map.removeEventListener('gmp-heading-change', handleCameraChange);
            map.removeEventListener('gmp-tilt-change', handleCameraChange);
        };
    }, [onCameraChange, onLoad]);

    // Update Map properties when props change
    useEffect(() => {
        if (!mapRef.current) return;
        const map = mapRef.current;

        // map.center requires altitude in 3D maps.
        // We strictly construct the object to prevent type errors.
        if (center) {
            map.center = {
                lat: typeof center.lat === 'function' ? center.lat() : Number(center.lat),
                lng: typeof center.lng === 'function' ? center.lng() : Number(center.lng),
                altitude: 0
            };
        }

        // Heading & Tilt
        map.heading = Number(heading || 0);
        map.tilt = Number(tilt || 0);

        // Range (Zoom)
        if (zoom) {
            map.range = zoomToRange(zoom);
        }
    }, [center, heading, tilt, zoom]);

    return (
        // @ts-ignore - Custom element
        <gmp-map-3d
            ref={mapRef}
            style={{ width: '100%', height: '100%' }}
        >
            {/* Station Markers */}
            {stations.map(station => (
                <Marker3DWrapper
                    key={`station-${station.id}`}
                    position={{ lat: station.latitude, lng: station.longitude }}
                    title={station.name}
                    src={(getMarkerIcon(station.type) as google.maps.Icon)?.url || ''}
                    onClick={() => onMarkerClick({ type: 'station', data: station })}
                />
            ))}

            {/* Candidate Markers */}
            {candidates.map(candidate => (
                <Marker3DWrapper
                    key={`candidate-${candidate.id}`}
                    position={{ lat: candidate.latitude, lng: candidate.longitude }}
                    title="Kandidat Lokasi"
                    src={(getMarkerIcon('CANDIDATE') as google.maps.Icon)?.url || ''}
                    onClick={() => onMarkerClick({ type: 'candidate', data: candidate })}
                />
            ))}
        </gmp-map-3d>
    );
}
