"use client"
import { useEffect, useState } from "react";
import {api} from "../../../../lib/axios";
import  EditItemModal  from "../../../../components/EditModal"
import DeleteModal from "../../../../components/DeletModal";
import StatsCards from "../../../../components/StatsCards";

type Status = "fresh" | "expiring-soon" | "expired" | "used" | "wasted";

interface Item {
  _id: string;
  name: string;
  category: string;
  status: Status;
  expiryDate: string;
  quantity: number;
  unit?: string;
}

interface Stats {
  fresh: number;
  expiringSoon: number;
  expired: number;
  wasteScore: number;
  totalItem: number ;
  wasted:number;
}

interface LeaderboardEntry {
  userId: string;
  name: string;
  usedCount: number;
}

interface User {
  name: string;
  householdName?: string;
}

const STATUS_CONFIG: Record<string, { dot: string; titleColor: string; cardBg: string; tagBg: string }> = {
  fresh: {
    dot: "bg-emerald-500",
    titleColor: "text-emerald-700",
    cardBg: "bg-emerald-50 hover:bg-emerald-100",
    tagBg: "bg-emerald-100 text-emerald-700",
  },
  "expiring-soon": {
    dot: "bg-amber-400",
    titleColor: "text-amber-700",
    cardBg: "bg-amber-50 hover:bg-amber-100",
    tagBg: "bg-amber-100 text-amber-700",
  },
  expired: {
    dot: "bg-rose-500",
    titleColor: "text-rose-700",
    cardBg: "bg-rose-50 hover:bg-rose-100",
    tagBg: "bg-rose-100 text-rose-700",
  },
};

const SHELF_SECTIONS = [
  { key: "fresh", label: "Fresh" },
  { key: "expiring-soon", label: "Expiring Soon" },
  { key: "expired", label: "Expired" },
];

function getDaysLabel(expiryDate: string): string {
  const diff = Math.ceil(
    (new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  if (diff < 0) return `${Math.abs(diff)}d ago`;
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return `${diff} days left`;
}

const MEDALS = ["🥇", "🥈", "🥉"];

export default function DashboardPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [stats, setStats] = useState<Stats>({ fresh: 0, expiringSoon: 0, expired: 0, wasteScore: 0, totalItem: 0,wasted:0, });
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [user, setUser] = useState<User>({ name: "", householdName: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  const fetchAll = async () => {
    try {
      setError("");
         const response= await api.get("/dashboard/stats");
        //  console.log("res",response.data);
         setStats(response.data);
         
    } catch {
      setError("Could not load dashboard. Please refresh.");
    } finally {
      setLoading(false);
    }
  };
  
  const fechtExpirtyItem=async()=>{
    try{
       const respone=await api.get("/dashboard/expiry");
       console.log("response",respone);
    }catch(err){
      console.log("err",err);
    }
  }
  useEffect(() => {
    fetchAll();
    fechtExpirtyItem();
  }, []);



 

  const maxScore = leaderboard[0]?.usedCount || 1;

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
       <StatsCards stats={stats}/>

        {/* Shelf Display */}
        <div className="grid lg:grid-cols-3 gap-5 mb-8">
          {SHELF_SECTIONS.map(({ key, label }) => {
            const cfg = STATUS_CONFIG[key];
            const sectionItems = items.filter((i) => i.status === key);
            return (
              <div key={key} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                  <h2 className={`font-bold text-sm uppercase tracking-wide ${cfg.titleColor}`}>{label}</h2>
                  <span className="ml-auto text-xs text-slate-400">{sectionItems.length} items</span>
                </div>

                {sectionItems.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No items here</p>
                ) : (
                  <div className="space-y-2">
                    {sectionItems.map((item) => (
                      <div
                        key={item._id}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors group ${cfg.cardBg}`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{getDaysLabel(item.expiryDate)}</p>
                        </div>
                        <div className="flex items-center gap-1.5 ml-2 shrink-0">
                          <span className={`text-xs font-medium px-2 py-1 rounded-lg ${cfg.tagBg}`}>
                            {item.quantity}{item.unit ? ` ${item.unit}` : ""}
                          </span>
                          <button
                            onClick={() => openEdit(item)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-white text-slate-400 hover:text-slate-600"
                            title="Edit"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </button>
                          <button
                            onClick={() => openDelete(item)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-white text-slate-400 hover:text-rose-500"
                            title="Delete"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

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

          {leaderboard.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No data yet — start marking items as used!</p>
          ) : (
            <div className="space-y-4">
              {leaderboard.slice(0, 5).map((entry, i) => (
                <div key={entry.userId} className="flex items-center gap-4">
                  <span className="text-xl w-8 text-center">{MEDALS[i] ?? `#${i + 1}`}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-semibold text-slate-800">{entry.name}</span>
                      <span className="text-xs font-medium text-slate-500">{entry.usedCount} used items</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700"
                        style={{ width: `${Math.round((entry.usedCount / maxScore) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

     
    </div>
  );
}