import { useEffect, useState } from "react";
import { api } from "../lib/axios";

type Status = "fresh" | "expired" | "used" | "wasted";

interface Item {
  _id:string
  name: string;
  category: string;
  status: Status;
  expiryDate: string;
  quantity: number;
}

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: Item | null;
  fetchItem: () => Promise<void>;

}

const STATUS_OPTIONS: { value: Status; label: string; color: string }[] = [
  { value: "fresh", label: "Fresh", color: "text-emerald-600" },
  { value: "expired", label: "Expired", color: "text-slate-500" },
  { value: "used", label: "Used", color: "text-amber-500" },
  { value: "wasted", label: "Wasted", color: "text-rose-500" },
];

const CATEGORY_OPTIONS = [
  "dairy",
  "meat",
  "produce",
  "pantry",
  "other",

];

export default function EditItemModal({
  isOpen,
  onClose,
  selectedItem,
  fetchItem

}: EditItemModalProps) {
  if (!isOpen || !selectedItem) return null;

  const [formData,setFormData]=useState({
    name: "",
  category: "",
  status: "",
  expiryDate: "",
  quantity: 0,
  });
  console.log(formData);

  useEffect(()=>{

    if(selectedItem){
         setFormData({
          name:selectedItem.name,
          category:selectedItem.category,
          status:selectedItem.status,
          expiryDate:selectedItem.expiryDate,
          quantity:selectedItem.quantity
         })
    }
  },[selectedItem])
 

  const handleUpdate=async()=>{
    try{
       const response=await api.put(`/items/${selectedItem._id}`,formData);
       console.log(response);
       alert("item is saved");
       fetchItem();
       onClose();

    }catch(err){
      console.log("err");
    }
  }
 


  return (
    <div
      className="fixed inset-0 bg-slate-200/10 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="bg-linear-to-r from-slate-800 to-slate-700 px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-0.5">
              Inventory
            </p>
            <h2 className="text-white text-xl font-bold tracking-tight">
              Edit Item
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <div className="px-6 py-6 space-y-5">

          {/* Title / Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Title
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e)=>{
                setFormData({...formData,name:e.target.value})
              }}
              placeholder="Item name"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent focus:bg-white transition"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Category
            </label>
            <div className="relative">
              <select
                value={formData.category}
                name="category"
                onChange={(e)=>{
                setFormData({...formData,category:e.target.value})
              }}
                className="w-full appearance-none px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent focus:bg-white transition cursor-pointer"
              >
                <option value="" disabled>Select a category</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Category
            </label>
            <div className="relative">
              <select
               name="status"
                value={formData.status}
                onChange={(e)=>{
                setFormData({...formData,status:e.target.value})
              }}
                className="w-full appearance-none px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent focus:bg-white transition cursor-pointer"
              >
                <option value="" disabled>Select a category</option>
                {STATUS_OPTIONS.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Date & Quantity — side by side */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={
                  formData?.expiryDate
                    ? new Date(formData.expiryDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e)=>{
                setFormData({...formData,expiryDate:e.target.value})
              }}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent focus:bg-white transition"
              />
            </div>

            {/* Quantity */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Quantity
              </label>
              <div className="flex items-center border border-slate-200 bg-slate-50 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-slate-400 focus-within:bg-white transition">
              
                <input
                  type="number"
                  min={0}
                  value={formData.quantity}
                  name="quantity"
                  onChange={(e)=>{
                setFormData({...formData,quantity:Number(e.target.value)})
              }}
                  className="flex-1 text-center bg-transparent text-slate-800 text-sm font-semibold focus:outline-none w-0"
                />
               
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 active:scale-95 transition shadow-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}