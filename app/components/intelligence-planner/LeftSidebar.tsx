'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LeftSidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

export default function LeftSidebar({ isOpen, onToggle }: LeftSidebarProps) {
    return (
        <div
            className={`relative h-full bg-white border-r border-gray-200 transition-all duration-300 ${isOpen ? 'w-80' : 'w-12'
                }`}
        >
            {/* Toggle Button */}
            <button
                onClick={onToggle}
                className="absolute -right-3 top-4 z-10 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                aria-label={isOpen ? 'Tutup sidebar' : 'Buka sidebar'}
            >
                {isOpen ? (
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                )}
            </button>

            {/* Sidebar Content */}
            <div className={`h-full overflow-hidden ${isOpen ? 'p-4' : 'p-2'}`}>
                {isOpen ? (
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                Kontrol Peta
                            </h2>
                            <p className="text-sm text-gray-600">
                                Panel kontrol untuk analisis lokasi dan layer data.
                            </p>
                        </div>

                        {/* Placeholder for future controls */}
                        <div className="glass-panel p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                Konteks Analisis
                            </h3>
                            <p className="text-xs text-gray-500">
                                Pengaturan area fokus dan tujuan analisis akan ditampilkan di sini.
                            </p>
                        </div>

                        <div className="glass-panel p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                Layer Data
                            </h3>
                            <p className="text-xs text-gray-500">
                                Toggle untuk layer POI, permintaan, kompetisi, dan grid akan ditambahkan di sini.
                            </p>
                        </div>

                        <div className="glass-panel p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                Daftar Lokasi
                            </h3>
                            <p className="text-xs text-gray-500">
                                Lokasi kandidat yang ditambahkan akan muncul di sini.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 pt-12">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-500">📍</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
