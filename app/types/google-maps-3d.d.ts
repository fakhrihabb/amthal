declare global {
    namespace google.maps.maps3d {
        interface Map3DElement extends HTMLElement {
            center: google.maps.LatLngLiteral;
            range: number;
            heading: number;
            tilt: number;
            roll: number;
            defaultLabelsDisabled: boolean;
            mode: 'hybrid' | 'satellite';
        }

        interface Marker3DElement extends HTMLElement {
            position: google.maps.LatLngLiteral | google.maps.LatLng;
            altitudeMode: 'RELATIVE_TO_GROUND' | 'ABSOLUTE' | 'CLAMP_TO_GROUND';
            collisionBehavior: 'REQUIRED' | 'OPTIONAL_AND_HIDES_LOWER_PRIORITY' | 'REQUIRED_AND_HIDES_OPTIONAL';
            drawsWhenOccluded: boolean;
            label: string;
            src: string; // For icon URL
            title: string;
            zIndex: number;
        }

        // Add other event interfaces if needed throughout the lifecycle
    }

    interface HTMLElementTagNameMap {
        'gmp-map-3d': google.maps.maps3d.Map3DElement;
        'gmp-marker-3d': google.maps.maps3d.Marker3DElement;
    }
}

export { };
