'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
    {
        question: 'What is SIVANA?',
        answer: 'SIVANA (EV Intelligence System for Global EV Charger Location Analytics) is a web-based planning platform that helps stakeholders identify, analyze, and propose optimal locations for EV charging infrastructure globally.',
    },
    {
        question: 'Who can use SIVANA?',
        answer: 'SIVANA is designed for government infrastructure planners, private investors, developers, regional coordinators, and consultants involved in EV infrastructure planning.',
    },
    {
        question: 'Is SIVANA free?',
        answer: 'For this MVP hackathon version, SIVANA can be accessed openly without requiring registration or login. Projects are saved in your local browser.',
    },
    {
        question: 'What data is used for analysis?',
        answer: 'SIVANA integrates data from Google Maps (POI, routes, distances), PLN grid data (capacity), BPS population data, and national EV charger registries to provide comprehensive analysis.',
    },
    {
        question: 'How long does it take to analyze one location?',
        answer: 'Analysis for one location typically takes less than 15 minutes, including score calculation, AI recommendations, and financial estimation.',
    },
    {
        question: 'Can I compare multiple locations at once?',
        answer: 'Yes! You can add multiple candidate locations to a Project and compare them side-by-side with comparison tables and charts.',
    },
    {
        question: 'What formats are available for reports?',
        answer: 'Reports can be exported in professional PDF format, complete with map visualizations, analysis, recommendations, and financial estimates.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="section-padding bg-white">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Find answers to common questions
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            className="glass-card overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-800 pr-4">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-[var(--color-blue)] flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <motion.div
                                initial={false}
                                animate={{
                                    height: openIndex === index ? 'auto' : 0,
                                    opacity: openIndex === index ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
