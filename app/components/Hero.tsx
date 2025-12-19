'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    const scrollToNext = () => {
        document.getElementById('kenapa-amthal')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-primary">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="container-custom relative z-10 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                        >
                            Amthal
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-lg mb-10 text-white/80 max-w-xl"
                        >
                            AI-powered planning platform that helps you discover, analyze, and propose optimal locations for EV charging infrastructure globally.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link
                                href="/intelligence-planner"
                                className="group px-8 py-4 bg-white text-[var(--color-blue)] rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
                            >
                                Try Demo
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button
                                onClick={scrollToNext}
                                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-white/20 transition-all border border-white/30"
                            >
                                Learn More
                                <ChevronDown className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right Image/Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative"
                    >
                        <div className="glass-card p-8 backdrop-blur-xl bg-white/10">
                            <div className="aspect-square bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center overflow-hidden">
                                <Image
                                    src="/branding/hero.jpg"
                                    alt="Amthal - Visualisasi Interaktif 2D & 3D Maps"
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Floating Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 0.6 }}
                            className="absolute -top-6 -right-6 glass-card p-4 bg-white"
                        >
                            <p className="text-sm text-gray-600">Analysis Time</p>
                            <p className="text-2xl font-bold text-[var(--color-blue)]">&lt; 15 min</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-white/70 cursor-pointer"
                    onClick={scrollToNext}
                >
                    <ChevronDown className="w-8 h-8" />
                </motion.div>
            </motion.div>
        </section>
    );
}
