"use client"
import { useEffect, useState } from "react";
import { api } from "../../../../lib/axios";

import StatsCards from "../../../../components/StatsCards";




type TopContributer = {
  totalItems: number;
  name: string
}

interface Stats {
  fresh: number;
  expiringSoon: number;
  expired: number;
  wasteScore: number;
  totalItem: number;
  wasted: number;
  topContributors: TopContributer[];
  used:number;
}

interface LeaderboardEntry {
  userId: string;
  name: string;
  usedCount: number;
}









export default function DashboardPage() {
  
  const [stats, setStats] = useState<Stats>({ fresh: 0, expiringSoon: 0, expired: 0, wasteScore: 0, totalItem: 0,used:0, wasted: 0, topContributors: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  const fetchAll = async () => {
    try {
      setError("");
      const response = await api.get("/dashboard/stats");
      //  console.log("res",response.data);
      setStats(response.data);

    } catch {
      setError("Could not load dashboard. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  const fechtExpirtyItem = async () => {
    try {
      const respone = await api.get("/dashboard/expiry");
      console.log("response", respone);
    } catch (err) {
      console.log("err", err);
    }
  }
  useEffect(() => {
    fetchAll();
    fechtExpirtyItem();
  }, []);






  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main className="max-w-6xl mx-auto p-6 lg:p-8">

        {/* Error banner */}
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-xl">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error}
            <button onClick={fetchAll} className="ml-auto underline underline-offset-2 font-medium">Retry</button>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>

          </div>

        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

       

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <h2 className="text-lg font-bold text-slate-900">Top Contributors</h2>
            </div>
            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              This month
            </span>
          </div>

          {stats.topContributors.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No contributors yet</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {stats.topContributors.map((entry, i) => {
                const max = stats.topContributors[0].totalItems;
                const initials = entry.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
                const avatarColors = [
                  { bg: "#EEEDFE", text: "#3C3489" },
                  { bg: "#E1F5EE", text: "#085041" },
                  { bg: "#E6F1FB", text: "#0C447C" },
                  { bg: "#FAEEDA", text: "#633806" },
                  { bg: "#FBEAF0", text: "#72243E" },
                ];
                const barColors = ["#7F77DD", "#1D9E75", "#378ADD", "#EF9F27", "#D4537E"];
                const ac = avatarColors[i % avatarColors.length];
                const bc = barColors[i % barColors.length];
                const pct = Math.round((entry.totalItems / max) * 100);

                return (
                  <div key={entry.name} className="flex items-center gap-3 py-3">
                    <span className="text-sm min-w-6 text-center">
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : <span className="text-slate-400 font-medium">{i + 1}</span>}
                    </span>

                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                      style={{ backgroundColor: ac.bg, color: ac.text }}
                    >
                      {initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate mb-1">{entry.name}</p>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: bc }} />
                      </div>
                    </div>

                    <span className="text-sm font-semibold min-w-7 text-right" style={{ color: bc }}>
                      {entry.totalItems}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>


    </div>
  );
}