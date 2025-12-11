'use client';

import { POIFilterState, POIType } from '@/app/types/poi';
import { POI_TYPES, POI_RADIUS_OPTIONS } from '@/app/constants/poi-types';
import { ChevronDown, ChevronUp, MapPin, X } from 'lucide-react';
import { useState } from 'react';

interface POIFilterPanelProps {
    filterState: POIFilterState;
    onFilterChange: (filterState: POIFilterState) => void;
    poiCount: number;
}

export default function POIFilterPanel({
    filterState,
    onFilterChange,
    poiCount
}: POIFilterPanelProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleToggleEnabled = () => {
        onFilterChange({
            ...filterState,
            enabled: !filterState.enabled
        });
    };

    const handleCategoryToggle = (category: POIType) => {
        onFilterChange({
            ...filterState,
            categories: {
                ...filterState.categories,
                [category]: !filterState.categories[category]
            }
        });
    };

    const handleRadiusChange = (radius: 500 | 1000 | 2000 | 5000) => {
        onFilterChange({
            ...filterState,
            radius
        });
    };

    const handleSelectAll = () => {
        const allSelected = Object.values(filterState.categories).every(v => v);
        const newCategories = Object.keys(filterState.categories).reduce((acc, key) => {
            acc[key as POIType] = !allSelected;
            return acc;
        }, {} as POIFilterState['categories']);

        onFilterChange({
            ...filterState,
            categories: newCategories
        });
    };

    const selectedCount = Object.values(filterState.categories).filter(v => v).length;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--color-light-blue)] to-[var(--color-dark-blue)] p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MapPin size={20} className="text-white" />
                        <h3 className="font-semibold text-white">Layer POI</h3>
                    </div>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-white hover:bg-white/20 rounded p-1 transition-colors"
                        aria-label={isExpanded ? 'Ciutkan' : 'Perluas'}
                    >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                </div>

                {/* Master Toggle */}
                <div className="mt-3 flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filterState.enabled}
                            onChange={handleToggleEnabled}
                            className="w-4 h-4 rounded border-white/30 bg-white/20 text-[var(--color-dark-blue)] focus:ring-2 focus:ring-white/50"
                        />
                        <span className="text-sm text-white font-medium">
                            Tampilkan POI
                        </span>
                    </label>
                    {filterState.enabled && (
                        <span className="text-xs text-white/80 bg-white/20 px-2 py-1 rounded-full">
                            {poiCount} POI
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            {isExpanded && filterState.enabled && (
                <div className="p-4 space-y-4">
                    {/* Category Filters */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold text-gray-700">
                                Kategori POI
                            </h4>
                            <button
                                onClick={handleSelectAll}
                                className="text-xs text-[var(--color-light-blue)] hover:text-[var(--color-dark-blue)] font-medium transition-colors"
                            >
                                {selectedCount === Object.keys(filterState.categories).length
                                    ? 'Hapus Semua'
                                    : 'Pilih Semua'}
                            </button>
                        </div>

                        <div className="space-y-2">
                            {Object.values(POI_TYPES).map((poiType) => (
                                <label
                                    key={poiType.id}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filterState.categories[poiType.id]}
                                        onChange={() => handleCategoryToggle(poiType.id)}
                                        className="w-4 h-4 rounded border-gray-300 text-[var(--color-light-blue)] focus:ring-2 focus:ring-[var(--color-light-blue)]/50"
                                    />
                                    <span className="text-lg">{poiType.icon}</span>
                                    <span className="text-sm text-gray-700 flex-1">
                                        {poiType.label}
                                    </span>
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: poiType.color }}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Radius Selector */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">
                            Radius Pencarian
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {POI_RADIUS_OPTIONS.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleRadiusChange(option.value)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${filterState.radius === option.value
                                            ? 'bg-[var(--color-light-blue)] text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            POI dalam radius {POI_RADIUS_OPTIONS.find(o => o.value === filterState.radius)?.label} dari lokasi kandidat
                        </p>
                    </div>

                    {/* Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs text-blue-800">
                            💡 <strong>Tips:</strong> Tambahkan lokasi kandidat di peta untuk melihat POI di sekitarnya
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
