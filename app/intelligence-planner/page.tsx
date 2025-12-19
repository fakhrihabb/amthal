import { Metadata } from 'next';
import IntelligencePlannerClient from '../components/intelligence-planner/IntelligencePlannerClient';

export const metadata: Metadata = {
    title: 'Intelligence Planner - SIVANA',
    description: 'Analyze EV Charging Station and Battery Swap Station locations with AI and spatial data',
};

export default function IntelligencePlannerPage() {
    return <IntelligencePlannerClient />;
}

