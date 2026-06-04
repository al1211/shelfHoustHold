"use client";
import { useEffect, useState } from "react";
import {
  Copy, Check, LogOut, Users, Home, Hash, Plus, ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { api } from "../../../../lib/axios";


export interface Member {
  _id: string;
  name: string;
  email: string;
}

export interface Household {
  _id: string;
  name: string;
  inviteCode: string;
  members: Member[];
  wasteScore: number | null;
  createdAt: string;
  updatedAt: string;
}
export default function HouseholdPage() {
  const [copied, setCopied] = useState(false);
  const [householddata,setHouseHoldData]=useState<Household>();
  const [houseName, setHouseName] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText("ABC123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
   
   const handleCreateHouseHold=async()=>{
      try{
        const response=await api.post("/households",{name:houseName})
        console.log(response.data);
        alert("succesfull create house hold")
      }catch(err){
              console.log("err",err);
      }
   }
   

   const handleJoinhousehold=async()=>{
    try{
      const response=await api.post("/households/join",{code:inviteCode })
      alert("succesfull join")
      console.log(response.data)

    }catch(err){
      console.log("err",err);
    }

   }
   const fetchHouseHold=async()=>{
    try{
      const response=await api.get("/households/me");
      setHouseHoldData(response.data.data )
      console.log(response.data);

    }catch(err){
      console.log("err",err)
    }
   }

   useEffect(()=>{
        fetchHouseHold();
   }
   ,[])
   


  return (
    <div className="min-h-screen bg-gray-50/60 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* ── Page Header ── */}
        <div className="animate-[fadeSlide_0.4s_ease_forwards]">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-green-100 to-emerald-200 border border-green-200 flex items-center justify-center shrink-0">
              <Home size={17} className="text-green-700" strokeWidth={2} />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Household
            </h1>
          </div>
          <p className="text-sm text-gray-400 ml-11.5">
            Manage your shared household or join an existing one.
          </p>
        </div>

        {/* ── Create + Join ── */}
        <div className="grid sm:grid-cols-2 gap-4">

          {/* Create */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.03)] p-5 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                <Plus size={17} className="text-green-600" strokeWidth={2.2} />
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-gray-900 tracking-tight">
                  Create Household
                </h2>
                <p className="text-xs text-gray-400">Start fresh with your own home</p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">
                Household name
              </label>
              <input
                type="text"
                placeholder="e.g. Sharma Villa, PG Block B"
                value={houseName}
                onChange={(e) => setHouseName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-400 outline-none transition-all focus:bg-white focus:border-green-300 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button onClick={handleCreateHouseHold} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-linear-to-br from-green-500 to-green-600 rounded-xl shadow-[0_2px_8px_rgba(34,197,94,0.3)] hover:opacity-90 hover:-translate-y-px active:scale-[0.98] transition-all duration-150">
              <Plus size={15} strokeWidth={2.5} />
              Create Household
            </button>
          </div>

          {/* Join */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.03)] p-5 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <Hash size={17} className="text-blue-600" strokeWidth={2.2} />
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-gray-900 tracking-tight">
                  Join Household
                </h2>
                <p className="text-xs text-gray-400">Enter a code from your roommate</p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">
                Invite code
              </label>
              <input
                type="text"
                placeholder="e.g. ABC123"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 text-sm font-mono tracking-widest uppercase text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-400 outline-none transition-all focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button onClick={handleJoinhousehold} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gray-900 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:bg-gray-800 hover:-translate-y-px active:scale-[0.98] transition-all duration-150">
              <ArrowRight size={15} strokeWidth={2.5} />
              Join Household
            </button>
          </div>
        </div>

        {/* ── Current Household ── */}
        {householddata ? 
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.03)] p-5 sm:p-6">

          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-green-100 to-emerald-200 border border-green-200 flex items-center justify-center shrink-0">
                <Users size={20} className="text-green-700" strokeWidth={1.8} />
              </div>
              <div>
                <h2 className="text-base sm:text-[17px] font-bold text-gray-900 tracking-tight">
                  {householddata?.name}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">{householddata?.members.length} · Active</p>
              </div>
            </div>

            {/* Invite code chip */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl flex-wrap">
              <span className="text-[11.5px] text-gray-500 font-medium">Invite code</span>
              <code className="text-[13px] font-bold text-gray-900 tracking-widest font-mono">
                {householddata?.inviteCode}
              </code>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150
                  ${copied
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                  }`}
              >
                {copied
                  ? <Check size={12} strokeWidth={2.5} />
                  : <Copy size={12} strokeWidth={1.8} />
                }
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mb-5" />

          {/* Members section */}
          <div className="mb-5">
            <p className="text-[10.5px] font-semibold text-gray-300 uppercase tracking-widest mb-2.5 px-1">
              Members
            </p>
            <div className="flex flex-col gap-1">
              {householddata?.members.map((m:any) => (
                <div
                  key={m._id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-100 group"
                >
                  {/* Avatar */}
                  <div className={`w-9 h-9 rounded-full bg-green-500 text-green-700 flex items-center justify-center text-xs font-bold shrink-0`}>
                    {m.name.slice(0,2)}
                  </div>

                  {/* Name */}
                  <p className="flex-1 text-sm font-medium text-gray-900">{m.name}</p>

                  {/* Role badge */}
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border
                    ${false
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-gray-50 text-gray-400 border-gray-100"
                    }`}
                  >
                    {m.email}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 border border-red-100 hover:bg-red-50 hover:border-red-200 active:scale-[0.98] transition-all duration-150">
              <LogOut size={14} strokeWidth={2} />
              Leave Household
            </button>
          </div>
        </div>:<h2>no house hold</h2>
}

      </div>

     
    </div>
  );
}