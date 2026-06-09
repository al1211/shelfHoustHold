"use client";
import { useState } from "react";
import { Package, ChevronDown, Plus, Camera, Scan, AlertTriangle } from "lucide-react";
import { api } from "../../../../lib/axios";

const categories = [
  { value: "dairy",      label: "Dairy"       },
 
  { value: "produce",    label: " Vegetables"   },
  { value: "meat",       label: " Meat"         },
  { value: "pantry",     label: " Snacks"       },
  { value: "other",     label: " Frozen"       },
];
const statusss = [
  { value: "fresh",label: "Fresh"       },
  { value: "expiring-soon",label: "Expiring-Soon"   },
  { value: "expired", label: "Expired"         },
  { value: "used", label: "Used"       },
  { value: "wasted",label: " Wasted"       },
];



export default function AddItemPage() {
  const [scanned, setScanned] = useState(false);
  const [title,setTitle]=useState("");
  const [quality,setQuality]=useState<number>(1);
  const [status,setStatus]=useState("");
  const [expirty,setExpity]=useState("");
  const [category,setCategory]=useState("");

  const handleSumbit=async(e:React.FormEvent)=>{
    e.preventDefault();
    try{
      
      const response=await api.post("/items",{ name:title, category, quantity:quality, status, expiryDate:expirty })
     console.log(response.data);
          alert("successful add");
    }catch(err){
      console.log("err",err);
    }

  }

  const newLocal = "flex-2 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-[0_2px_8px_rgba(34,197,94,0.3)] hover:opacity-90 hover:-translate-y-px active:scale-[0.98] transition-all duration-150";
  return (
    <div className="min-h-screen bg-gray-50/60 p-4 sm:p-6 lg:p-8">
      <div className="max-w-xl mx-auto space-y-5">

        {/* Page Header */}
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-green-100 to-emerald-200 border border-green-200 flex items-center justify-center shrink-0">
              <Package size={17} className="text-green-700" strokeWidth={2} />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Add Grocery Item
            </h1>
          </div>
          <p className="text-sm text-gray-400 ml-11.5 ">
            Fill in the details or scan a barcode to add quickly.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.03)] p-5 sm:p-6">
          <form className="space-y-5" onSubmit={handleSumbit}>

          

            {/* Item Name */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-500">
                Item Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Full Cream Milk"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-400 outline-none transition-all focus:bg-white focus:border-green-300 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="block text-sm  font-medium text-gray-500">
                Category <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full appearance-none px-3.5 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-green-300 focus:ring-2 focus:ring-green-100 pr-10 cursor-pointer">
                  {categories.map((c) => (
                    <option  key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  strokeWidth={2}
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-500">
                Status <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select value={status} onChange={(e)=>setStatus(e.target.value)} className="w-full appearance-none px-3.5 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-green-300 focus:ring-2 focus:ring-green-100 pr-10 cursor-pointer">
                  {statusss.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  strokeWidth={2}
                />
              </div>
            </div>

            {/* Quantity + Expiry — side by side on sm+ */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-500">
                  Quantity <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                     placeholder="1"
                     value={quality}
                     onChange={(e)=>setQuality(Number(e.target.value))}
                    min={1}
                    className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-400 outline-none transition-all focus:bg-white focus:border-green-300 focus:ring-2 focus:ring-green-100"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-500">
                  Expiry Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  value={expirty}
                  onChange={(e)=>setExpity(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-green-300 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

           

            {/* Submit */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
              <button
                type="button"
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-500 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-gray-700 active:scale-[0.98] transition-all duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={newLocal}
              >
                <Plus size={16} strokeWidth={2.5} />
                Add Item
              </button>
            </div>

          </form>
        </div>

        {/* Helper tip */}
        <p className="text-center text-xs text-gray-300 pb-2">
          Items expiring within 3 days will trigger an alert to your household.
        </p>

      </div>
    </div>
  );
}