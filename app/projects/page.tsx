'use client';

import { FolderKanban, FileText, BarChart3 } from 'lucide-react';

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-24 h-24 mx-auto mb-8 rounded-2xl gradient-primary flex items-center justify-center">
                        <FolderKanban className="w-12 h-12 text-white" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="gradient-text">Proyek</span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        Halaman ini akan berisi daftar proyek, detail proyek, dan fitur report generation.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="glass-card p-6">
                            <FolderKanban className="w-8 h-8 text-[var(--color-blue)] mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Kelola Proyek</h3>
                            <p className="text-sm text-gray-600">Create, view, edit projects</p>
                        </div>
                        <div className="glass-card p-6">
                            <BarChart3 className="w-8 h-8 text-[var(--color-blue)] mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Bandingkan Lokasi</h3>
                            <p className="text-sm text-gray-600">Side-by-side comparison</p>
                        </div>
                        <div className="glass-card p-6">
                            <FileText className="w-8 h-8 text-[var(--color-blue)] mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Generate Laporan</h3>
                            <p className="text-sm text-gray-600">Professional PDF reports</p>
                        </div>
                    </div>

                    <div className="glass-card p-8 text-left">
                        <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                        <p className="text-gray-600 mb-4">
                            Fitur Projects akan diimplementasikan oleh Developer 3, meliputi:
                        </p>
                        <ul className="space-y-2 text-gray-600">
                            <li>✅ Project list dengan search dan filter</li>
                            <li>✅ Create new project</li>
                            <li>✅ Project details dengan location list</li>
                            <li>✅ Comparison view untuk multiple locations</li>
                            <li>✅ Report generation (PDF)</li>
                            <li>✅ Project history dan notes</li>
                            <li>✅ LocalStorage + Supabase hybrid storage</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
