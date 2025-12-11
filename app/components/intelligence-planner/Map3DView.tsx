'use client';

import { useEffect, useRef, useState } from 'react';

interface Map3DViewProps {
    center: { lat: number; lng: number };
    map: google.maps.Map | null;
    onClose: () => void;
}

export default function Map3DView({ center, map, onClose }: Map3DViewProps) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!map) return;

        // Enable 3D tilt
        map.setTilt(45);

        // Smooth animation to the center with tilt
        map.panTo(center);

        // Set appropriate zoom for 3D view
        const currentZoom = map.getZoom() || 15;
        if (currentZoom < 15) {
            map.setZoom(15);
        }

        setIsReady(true);

        // Cleanup: reset tilt when component unmounts
        return () => {
            if (map) {
                map.setTilt(0);
            }
        };
    }, [map, center]);

    return (
        <div className="absolute top-4 left-4 z-10">
            {/* Close button */}
            <button
                onClick={onClose}
                className="glass-panel px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-white/90 transition-all shadow-md hover:shadow-lg"
            >
                <span className="text-sm font-medium text-gray-700">← Kembali ke 2D</span>
            </button>

            {!isReady && (
                <div className="glass-panel px-4 py-2 rounded-lg mt-2">
                    <p className="text-sm text-gray-600">Mengaktifkan tampilan 3D...</p>
                </div>
            )}
        </div>
    );
}
