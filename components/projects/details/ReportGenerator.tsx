"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import { FileText, Loader2, Download, X } from "lucide-react";
import { Project, Location } from "../../../app/lib/types";

interface ReportGeneratorProps {
  project: Project;
}

// Brand Colors (RGB)
const BRAND = {
  darkBlue: [13, 38, 63] as [number, number, number],    // #0D263F
  blue: [19, 68, 116] as [number, number, number],       // #134474
  lightBlue: [39, 111, 176] as [number, number, number], // #276FB0
  white: [255, 255, 255] as [number, number, number],
  gray50: [249, 250, 251] as [number, number, number],
  gray200: [229, 231, 235] as [number, number, number],
  gray400: [156, 163, 175] as [number, number, number],
  gray500: [107, 114, 128] as [number, number, number],
  gray700: [55, 65, 81] as [number, number, number],
  gray900: [17, 24, 39] as [number, number, number],
};

// Consistent margins
const MARGIN = {
  left: 20,
  right: 20,
  top: 30,      // After header
  bottom: 25,   // Before footer
  headerHeight: 15,
  footerHeight: 12,
};

export const ReportGenerator = ({ project }: ReportGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportUrl, setReportUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  // Default: OFF in development, ON in production
  const [includeMaps, setIncludeMaps] = useState(process.env.NODE_ENV === 'production');
  const [mounted, setMounted] = useState(false);

  // For client-side portal rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const generateReport = async (withMaps: boolean) => {
    setShowModal(false);
    setIsGenerating(true);
    setReportUrl(null);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const contentWidth = pageWidth - MARGIN.left - MARGIN.right;

      const dateStr = new Date().toLocaleDateString("id-ID", {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });

      // Helper function to add header and footer
      const addHeaderFooter = (pageNum: number, totalPages: number, isFirstPage: boolean = false) => {
        // Header - gradient bar effect
        doc.setFillColor(...BRAND.darkBlue);
        doc.rect(0, 0, pageWidth, MARGIN.headerHeight - 2, "F");
        doc.setFillColor(...BRAND.blue);
        doc.rect(0, MARGIN.headerHeight - 2, pageWidth, 2, "F");
        
        // Header text (except first page which is cover)
        if (!isFirstPage) {
          doc.setFontSize(9);
          doc.setTextColor(...BRAND.white);
          doc.setFont("helvetica", "bold");
          doc.text(project.name.toUpperCase(), MARGIN.left, 9);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(8);
          doc.text("Laporan Analisis Lokasi", pageWidth - MARGIN.right, 9, { align: "right" });
        }
        
        // Footer line
        doc.setDrawColor(...BRAND.lightBlue);
        doc.setLineWidth(0.5);
        doc.line(MARGIN.left, pageHeight - MARGIN.footerHeight, pageWidth - MARGIN.right, pageHeight - MARGIN.footerHeight);
        
        // Footer text
        doc.setFontSize(8);
        doc.setTextColor(...BRAND.gray500);
        doc.text(`SIVANA Platform`, MARGIN.left, pageHeight - 6);
        doc.text(`Halaman ${pageNum} dari ${totalPages}`, pageWidth / 2, pageHeight - 6, { align: "center" });
        doc.text(dateStr, pageWidth - MARGIN.right, pageHeight - 6, { align: "right" });
      };

      // Calculate total pages first (for footer)
      const totalPages = 2 + project.locations.length + 1; // Cover + Summary + Locations + Charts

      // --- PAGE 1: COVER ---
      // Full cover design with gradient
      doc.setFillColor(...BRAND.darkBlue);
      doc.rect(0, 0, pageWidth, pageHeight, "F");
      
      // Add accent bar
      doc.setFillColor(...BRAND.blue);
      doc.rect(0, pageHeight * 0.35, pageWidth, 5, "F");
      doc.setFillColor(...BRAND.lightBlue);
      doc.rect(0, pageHeight * 0.35 + 5, pageWidth, 2, "F");
      
      // Title
      doc.setFontSize(28);
      doc.setTextColor(...BRAND.white);
      doc.setFont("helvetica", "bold");
      doc.text("LAPORAN ANALISIS", pageWidth / 2, pageHeight * 0.45, { align: "center" });
      doc.text("LOKASI SPKLU/SPBKLU", pageWidth / 2, pageHeight * 0.45 + 12, { align: "center" });
      
      // Project name
      doc.setFontSize(18);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...BRAND.lightBlue);
      doc.text(project.name, pageWidth / 2, pageHeight * 0.55, { align: "center" });
      
      // Date
      doc.setFontSize(11);
      doc.setTextColor(...BRAND.gray400);
      doc.text(dateStr, pageWidth / 2, pageHeight * 0.62, { align: "center" });
      
      // Bottom branding
      doc.setFontSize(10);
      doc.setTextColor(...BRAND.gray500);
      doc.text("Dibuat oleh SIVANA Platform", pageWidth / 2, pageHeight - 30, { align: "center" });
      
      // Bottom accent
      doc.setFillColor(...BRAND.lightBlue);
      doc.rect(0, pageHeight - 15, pageWidth, 15, "F");

      // --- PAGE 2: EXEC SUMMARY ---
      doc.addPage();
      addHeaderFooter(2, totalPages);
      
      let yPos = MARGIN.top + 5;
      
      doc.setFontSize(18);
      doc.setTextColor(...BRAND.darkBlue);
      doc.setFont("helvetica", "bold");
      doc.text("Ringkasan Eksekutif", MARGIN.left, yPos);
      
      yPos += 15;
      doc.setFontSize(10);
      doc.setTextColor(...BRAND.gray700);
      doc.setFont("helvetica", "normal");
      const summaryText = `Laporan ini menyajikan hasil analisis mendalam untuk proyek "${project.name}". ` +
                          `Tujuan utama adalah mengidentifikasi lokasi optimal untuk infrastruktur EV. ` +
                          `Analisis mencakup ${project.locations.length} lokasi kandidat dengan mempertimbangkan faktor permintaan, jaringan listrik, dan aksesibilitas.`;
      
      const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
      doc.text(splitSummary, MARGIN.left, yPos);
      
      yPos += splitSummary.length * 5 + 15;
      
      // Objective section with styled box
      doc.setFillColor(...BRAND.gray50);
      doc.setDrawColor(...BRAND.lightBlue);
      doc.setLineWidth(0.5);
      doc.roundedRect(MARGIN.left, yPos, contentWidth, 35, 3, 3, "FD");
      
      yPos += 10;
      doc.setFontSize(11);
      doc.setTextColor(...BRAND.blue);
      doc.setFont("helvetica", "bold");
      doc.text("Tujuan Proyek", MARGIN.left + 8, yPos);
      
      yPos += 8;
      doc.setFontSize(10);
      doc.setTextColor(...BRAND.gray700);
      doc.setFont("helvetica", "italic");
      const objectiveText = doc.splitTextToSize(project.objective || "Tidak ada tujuan spesifik dicantumkan.", contentWidth - 16);
      doc.text(objectiveText, MARGIN.left + 8, yPos);

      // --- LOCATION PAGES ---
      for (const [index, loc] of project.locations.entries()) {
        doc.addPage();
        addHeaderFooter(3 + index, totalPages);
        
        let locY = MARGIN.top + 5;
        
        // Section title with accent
        doc.setFillColor(...BRAND.lightBlue);
        doc.rect(MARGIN.left, locY - 4, 3, 12, "F");
        
        doc.setFontSize(16);
        doc.setTextColor(...BRAND.darkBlue);
        doc.setFont("helvetica", "bold");
        doc.text(`Analisis Lokasi ${index + 1}: ${loc.name}`, MARGIN.left + 8, locY + 4);
        
        locY += 18;
        doc.setFontSize(10);
        doc.setTextColor(...BRAND.gray700);
        doc.setFont("helvetica", "normal");
        doc.text(`Alamat: ${loc.address || "Lat: " + loc.latitude.toFixed(5) + ", Lng: " + loc.longitude.toFixed(5)}`, MARGIN.left, locY);
        locY += 6;
        doc.text(`Koordinat: ${loc.latitude.toFixed(5)}, ${loc.longitude.toFixed(5)}`, MARGIN.left, locY);
        
        locY += 12;
        
        // Map Snapshot - conditional based on user choice
        if (withMaps) {
          try {
            const mapUrl = `/api/proxy-map?center=${loc.latitude},${loc.longitude}&markers=color:red%7C${loc.latitude},${loc.longitude}&size=600x300`;
            console.log("Fetching map from proxy:", mapUrl);

            const response = await fetch(mapUrl);
            if (!response.ok) {
              console.error("Map fetch failed:", response.status, response.statusText);
              throw new Error(`Map fetch failed: ${response.statusText}`);
            }

            const blob = await response.blob();
            const base64 = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });

            doc.addImage(base64, 'PNG', MARGIN.left, locY, contentWidth, 75);
            locY += 80;
          } catch (e) {
            console.error("Failed to load map image", e);
            // Draw Placeholder with brand styling
            doc.setFillColor(...BRAND.gray50);
            doc.setDrawColor(...BRAND.gray200);
            doc.rect(MARGIN.left, locY, contentWidth, 75, "FD");
            
            doc.setFontSize(10);
            doc.setTextColor(...BRAND.gray500);
            doc.text("Peta tidak tersedia", pageWidth / 2, locY + 35, { align: "center" });
            
            doc.setFontSize(8);
            doc.setTextColor(...BRAND.gray400);
            doc.text("(Cek 'API Restrictions' pada Google Cloud Console Anda)", pageWidth / 2, locY + 45, { align: "center" });
            
            locY += 80;
          }
        } else {
          // User chose not to include maps - show placeholder
          doc.setFillColor(...BRAND.gray50);
          doc.setDrawColor(...BRAND.gray200);
          doc.rect(MARGIN.left, locY, contentWidth, 75, "FD");
          
          doc.setFontSize(10);
          doc.setTextColor(...BRAND.gray500);
          doc.text("Peta dinonaktifkan (Mode Dev)", pageWidth / 2, locY + 35, { align: "center" });
          
          doc.setFontSize(8);
          doc.setTextColor(...BRAND.gray400);
          doc.text("Aktifkan 'Sertakan Peta Lokasi' saat generate untuk menampilkan", pageWidth / 2, locY + 45, { align: "center" });
          
          locY += 80;
        }

        locY += 5;

        // Scores Table with brand colors
        const analysis = loc.analysis;
        const tableData = [
          ["Komponen", "Skor (0-100)", "Keterangan"],
          ["Permintaan (Demand)", analysis?.demand_score || "-", "Tinggi"],
          ["Ketersediaan Grid", analysis?.grid_score || "-", "Stabil"],
          ["Aksesibilitas", analysis?.accessibility_score || "-", "Mudah"],
          ["Kompetisi", analysis?.competition_score || "-", "Rendah"],
          ["TOTAL SKOR", loc.suitability_score || "-", loc.suitability_score && loc.suitability_score > 70 ? "Sangat Layak" : "Perlu Tinjauan"],
        ];

        autoTable(doc, {
          startY: locY,
          margin: { left: MARGIN.left, right: MARGIN.right },
          head: [tableData[0]],
          body: tableData.slice(1),
          theme: 'grid',
          headStyles: { 
            fillColor: BRAND.darkBlue,
            textColor: BRAND.white,
            fontStyle: 'bold',
            fontSize: 10
          },
          bodyStyles: {
            fontSize: 9,
            textColor: BRAND.gray700
          },
          alternateRowStyles: {
            fillColor: BRAND.gray50
          },
          columnStyles: {
            0: { cellWidth: 70 },
            1: { cellWidth: 40, halign: 'center' },
            2: { halign: 'center' }
          }
        });

        // Notes section
        if (loc.notes) {
          const finalY = (doc as any).lastAutoTable.finalY || locY + 60;
          const notesY = finalY + 12;
          
          doc.setFontSize(11);
          doc.setTextColor(...BRAND.blue);
          doc.setFont("helvetica", "bold");
          doc.text("Catatan Tambahan:", MARGIN.left, notesY);
          
          doc.setFontSize(10);
          doc.setTextColor(...BRAND.gray700);
          doc.setFont("helvetica", "italic");
          doc.text(doc.splitTextToSize(loc.notes, contentWidth), MARGIN.left, notesY + 7);
          doc.setFont("helvetica", "normal");
        }
      }

      // --- COMPARISON CHARTS PAGE ---
      const chartContainer = document.getElementById("comparison-charts-container");
      if (chartContainer) {
        doc.addPage();
        addHeaderFooter(totalPages, totalPages);
        
        let chartY = MARGIN.top + 5;
        
        doc.setFillColor(...BRAND.lightBlue);
        doc.rect(MARGIN.left, chartY - 4, 3, 12, "F");
        
        doc.setFontSize(16);
        doc.setTextColor(...BRAND.darkBlue);
        doc.setFont("helvetica", "bold");
        doc.text("Perbandingan Visual", MARGIN.left + 8, chartY + 4);
        
        try {
          const canvas = await html2canvas(chartContainer);
          const imgData = canvas.toDataURL("image/png");
          const imgProps = doc.getImageProperties(imgData);
          const pdfWidth = contentWidth;
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          
          doc.addImage(imgData, 'PNG', MARGIN.left, chartY + 15, pdfWidth, pdfHeight);
        } catch (e) {
          console.error("Failed to capture charts", e);
          doc.setFontSize(10);
          doc.setTextColor(...BRAND.gray500);
          doc.text("(Grafik tidak tersedia - buka tab Perbandingan sebelum generate)", MARGIN.left, chartY + 25);
        }
      }

      // --- UPLOAD / SAVE ---
      const pdfBlob = doc.output('blob');
      
      const formData = new FormData();
      formData.append("file", pdfBlob, `report-${project.id}.pdf`);

      const response = await fetch(`/api/projects/${project.id}/report`, {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        const localUrl = URL.createObjectURL(pdfBlob);
        setReportUrl(localUrl);
      } else {
        alert("Gagal mengunggah laporan ke server.");
        const localUrl = URL.createObjectURL(pdfBlob);
        setReportUrl(localUrl);
      }

    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat membuat PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="flex items-center">
        {reportUrl ? (
          <a 
            href={reportUrl} 
            download={`Laporan_Analisis_${project.name.replace(/\s+/g, '_')}.pdf`}
            className="flex items-center gap-2 px-4 py-2 bg-[#134474] text-white rounded-lg hover:bg-[#0D263F] transition-colors shadow-sm font-semibold text-sm"
          >
            <Download className="w-4 h-4" /> Unduh Laporan
          </a>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-semibold text-sm disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
            Buat Laporan
          </button>
        )}
      </div>

      {/* Report Options Modal - Rendered via Portal */}
      {mounted && showModal && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col transform transition-all scale-100">
            
            {/* Header */}
            <div className="p-5 flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-50 text-[#134474]">
                  <FileText className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Opsi Laporan</h2>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <span className="font-medium text-gray-800">Sertakan Peta Lokasi</span>
                  <p className="text-sm text-gray-500 mt-0.5">Memerlukan Google Maps API aktif</p>
                </div>
                {/* Slider Toggle */}
                <button 
                  onClick={() => setIncludeMaps(!includeMaps)}
                  className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${includeMaps ? 'bg-[#134474]' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${includeMaps ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">
                {includeMaps ? "Peta akan disertakan dalam laporan" : "Peta dinonaktifkan (Mode Dev)"}
              </p>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => generateReport(includeMaps)}
                className="px-6 py-2 rounded-lg font-semibold text-white shadow-md transition-all active:scale-95 bg-[#134474] hover:bg-[#0D263F]"
              >
                Generate PDF
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
