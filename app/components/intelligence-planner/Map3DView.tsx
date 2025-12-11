import { Compass, RotateCcw, RotateCw, ChevronUp, ChevronDown } from 'lucide-react';
import { useCallback } from 'react';

interface Map3DViewProps {
    map: google.maps.Map | null;
    map3D?: google.maps.maps3d.Map3DElement | null;
    is3DMode: boolean;
}

export default function Map3DView({ map, map3D, is3DMode }: Map3DViewProps) {
    const handleRotate = useCallback((direction: 'cw' | 'ccw') => {
        const adjustment = direction === 'cw' ? 45 : -45;

        if (is3DMode && map3D) {
            // 3D Mode - modify element property directly
            map3D.heading = (map3D.heading || 0) + adjustment;
        } else if (map) {
            // 2D Mode
            const currentHeading = map.getHeading() || 0;
            map.setHeading(currentHeading + adjustment);
        }
    }, [map, map3D, is3DMode]);

    const handleTilt = useCallback((direction: 'up' | 'down') => {
        const adjustment = direction === 'down' ? 20 : -20;

        if (is3DMode && map3D) {
            // 3D Mode
            const currentTilt = map3D.tilt || 0;
            map3D.tilt = Math.min(67.5, Math.max(0, currentTilt + adjustment));
        } else if (map) {
            // 2D Mode
            const currentTilt = map.getTilt() || 0;
            // Tilt range is typically 0 to 67.5 depending on zoom
            map.setTilt(Math.min(67.5, Math.max(0, currentTilt + adjustment)));
        }
    }, [map, map3D, is3DMode]);

    return (
        <>
            {/* Custom 3D Controls - Right Side */}
            <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10 flex flex-col gap-2">
                {is3DMode && (
                    <>
                        {/* Tilt Controls */}
                        <div className="glass-panel p-1 rounded-lg flex flex-col gap-1">
                            <button
                                onClick={() => handleTilt('down')}
                                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                                title="Miringkan Bawah (Lebih Datar)"
                            >
                                <ChevronUp className="w-5 h-5 text-gray-700" />
                            </button>
                            <div className="h-[1px] bg-gray-200 w-full" />
                            <button
                                onClick={() => handleTilt('up')}
                                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                                title="Miringkan Atas (Lebih 3D)"
                            >
                                <ChevronDown className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>

                        {/* Rotate Controls */}
                        <div className="glass-panel p-1 rounded-lg flex flex-col gap-1">
                            <button
                                onClick={() => handleRotate('ccw')}
                                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                                title="Putar Kiri"
                            >
                                <RotateCcw className="w-5 h-5 text-gray-700" />
                            </button>
                            <div className="h-[1px] bg-gray-200 w-full" />
                            <button
                                onClick={() => handleRotate('cw')}
                                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                                title="Putar Kanan"
                            >
                                <RotateCw className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    </>
                )}

                {/* Compass Reset - Visible in both modes */}
                <button
                    onClick={() => {
                        if (is3DMode && map3D) {
                            map3D.heading = 0;
                        } else {
                            map?.setHeading(0);
                        }
                    }}
                    className="glass-panel p-2 rounded-lg hover:bg-white/90 transition-all shadow-md"
                    title="Reset Kompas (Utara)"
                >
                    <Compass className="w-6 h-6 text-[var(--color-light-blue)]" />
                </button>
            </div>

            {is3DMode && (
                <div className="absolute top-20 left-4 z-10">
                    {/* Instructions */}
                    <div className="glass-panel px-4 py-2 rounded-lg max-w-xs">
                        <p className="text-xs text-gray-600">
                            <strong>Kontrol 3D:</strong><br />
                            • Shift + Drag: Putar peta<br />
                            • Gunakan kompas di kanan untuk rotasi
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
