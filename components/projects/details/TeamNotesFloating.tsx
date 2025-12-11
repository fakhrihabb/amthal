"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Maximize2 } from "lucide-react";
import { ProjectNote } from "@/app/lib/types";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

interface TeamNotesFloatingProps {
  projectId: string;
}

export const TeamNotesFloating = ({ projectId }: TeamNotesFloatingProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<ProjectNote[]>([]);
  const [newNote, setNewNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Poll for notes or fetch on open
  useEffect(() => {
    if (isOpen) {
      fetchNotes();
      // Optional: Polling every 10s
      const interval = setInterval(fetchNotes, 10000);
      return () => clearInterval(interval);
    }
  }, [isOpen, projectId]);

  // Auto-scroll to bottom on new notes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [notes, isOpen]);

  const fetchNotes = async () => {
    // Only set loading on first load to avoid flickering during polling
    if (notes.length === 0) setIsLoading(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/notes`);
      if (res.ok) {
        const data = await res.json();
        setNotes(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch notes", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note_text: newNote })
      });
      
      if (res.ok) {
        setNewNote("");
        fetchNotes();
      }
    } catch (err) {
      console.error("Failed to add note", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "d MMM, HH:mm", { locale: localeId });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4 pointer-events-none">
      
      {/* Chat Box Logic */}
      <div 
        className={`
          pointer-events-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right
          ${isOpen ? "w-[350px] h-[500px] opacity-100 scale-100" : "w-0 h-0 opacity-0 scale-90"}
        `}
      >
        {/* Header */}
        <div className="bg-[#134474] p-4 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <h3 className="font-semibold text-sm">Catatan Tim</h3>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-medium">
              {notes.length}
            </span>
          </div>
        </div>

        {/* Content */}
        <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 relative"
        >
           {isLoading && notes.length === 0 ? (
             <div className="flex justify-center py-4">
               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#134474]"></div>
             </div>
           ) : notes.length === 0 ? (
             <div className="text-center py-8 text-gray-400 text-sm">
               <p>Belum ada diskusi.</p>
               <p className="text-xs mt-1">Mulai percakapan dengan tim Anda.</p>
             </div>
           ) : (
             notes.map((note) => (
               <div key={note.id} className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-gray-100 ml-4 relative group">
                 <p className="text-gray-800 text-sm whitespace-pre-wrap">{note.note_text}</p>
                 <div className="mt-1 flex justify-end items-center gap-1 opacity-60">
                    <span className="text-[10px]">{formatDate(note.created_at)}</span>
                 </div>
               </div>
             ))
           )}
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100 shrink-0">
          <form onSubmit={handleAddNote} className="flex gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Tulis pesan..."
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#134474]"
            />
            <button
              type="submit"
              disabled={!newNote.trim() || isSubmitting}
              className="p-2 bg-[#134474] text-white rounded-lg hover:bg-[#0D263F] disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Toggle Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
            pointer-events-auto shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center
            ${isOpen 
                ? "bg-white text-gray-500 w-12 h-12 rounded-full border border-gray-200" 
                : "bg-[#134474] text-white w-14 h-14 rounded-full animate-bounce-subtle"}
        `}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

    </div>
  );
};
