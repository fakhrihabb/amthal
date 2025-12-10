import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  // In a real implementation, we would fetch the project data here
  // For now, we'll just use the ID from the params
  
  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-brand-light/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-primary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link 
          href="/projects" 
          className="inline-flex items-center text-brand-primary hover:text-brand-dark mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Daftar Proyek
        </Link>
        
        <div className="glass-panel p-8 rounded-2xl border border-brand-primary/10">
          <h1 className="text-3xl font-bold text-brand-dark mb-4">Detail Proyek</h1>
          <p className="text-gray-600 mb-8">
            Halaman detail untuk proyek dengan ID: <code className="bg-gray-100 px-2 py-1 rounded text-sm text-brand-primary font-mono">{params.id}</code>
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
             <div className="bg-yellow-100 p-2 rounded-full mr-3 text-yellow-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
             </div>
             <div>
               <h3 className="font-bold text-yellow-800">Sedang Dalam Pengembangan</h3>
               <p className="text-yellow-700 text-sm mt-1">
                 Fitur detail proyek ini akan dikembangkan pada tahap selanjutnya. Saat ini Anda hanya dapat melihat daftar proyek dan membuat proyek baru.
               </p>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
