
"use client";

import { useEffect, useState } from "react";
import { ProjectHistory } from "@/app/lib/types";
import { Calendar, History } from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

interface HistoryTimelineProps {
  projectId: string;
}

export const HistoryTimeline = ({ projectId }: HistoryTimelineProps) => {
  const [history, setHistory] = useState<ProjectHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [projectId]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/history`);
      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "d MMM yyyy, HH:mm", { locale: localeId });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex border-b border-gray-100 bg-gray-50/50 px-6 py-4">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <History className="w-4 h-4 text-brand-primary" />
          Project Activity History
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-gray-200">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#134474]"></div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {history.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-8">No activity history yet.</p>
            ) : (
              <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
                {history.map((item) => (
                  <div key={item.id} className="relative pl-8">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                      {/* Dot */}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-400 flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3" /> {formatDate(item.created_at)}
                      </span>
                      <p className="text-gray-800 font-medium text-sm">{item.description}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 mt-1 inline-block">
                        {item.action_type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
