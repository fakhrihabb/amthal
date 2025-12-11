'use client';

import { useState } from 'react';
import GoogleMapComponent from './GoogleMapComponent';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

export default function IntelligencePlannerClient() {
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

    const handleMapLoad = (map: google.maps.Map) => {
        console.log('Map loaded:', map);
        // Store map instance for future use
    };

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            console.log('Map clicked at:', e.latLng.lat(), e.latLng.lng());
            // Future: Add marker at clicked location
        }
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] w-full">
            {/* Left Sidebar */}
            <LeftSidebar
                isOpen={leftSidebarOpen}
                onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
            />

            {/* Map Container */}
            <div className="flex-1 relative">
                <GoogleMapComponent onMapLoad={handleMapLoad} onMapClick={handleMapClick} />
            </div>

            {/* Right Sidebar */}
            <RightSidebar
                isOpen={rightSidebarOpen}
                onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
            />
        </div>
    );
}
