'use client';

import { motion } from 'framer-motion';
import { Map, Brain, BarChart3, FileText } from 'lucide-react';

const benefits = [
    {
        icon: Map,
        title: 'Interactive 2D & 3D Visualization',
        description: 'Explore candidate locations with interactive maps and realistic 3D views for better context understanding.',
    },
    {
        icon: Brain,
        title: 'AI-Based Analysis',
        description: 'Gain deep insights with Gemini AI technology that analyzes demand, accessibility, and location feasibility.',
    },
    {
        icon: BarChart3,
        title: 'Data-Driven Recommendations',
        description: 'Decisions backed by real-time data from Google Maps, POIs, and grid analysis for accurate results.',
    },
    {
        icon: FileText,
        title: 'Automated Reporting',
        description: 'Generate professional ready-to-use reports in PDF format for presentations and proposal submissions.',
    },
];

export default function WhySivana() {
    return (
        <section id="kenapa-sivana" className="section-padding bg-gray-50">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Why <span className="gradient-text">Amthal</span>?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        A complete platform simplifying the EV infrastructure planning process with the latest technology
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="glass-card p-8 text-center group"
                        >
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                <benefit.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
