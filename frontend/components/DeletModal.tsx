import { Item, Status } from "@/app/(dashboard)/items/page";
import { api } from "../lib/axios";


interface DeleteItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: Item | null;
  fetchItem: () => Promise<void>;
}

const STATUS_COLORS: Record<Status, string> = {
  fresh: "text-emerald-600",
  expired: "text-slate-500",
  used: "text-amber-500",
  wasted: "text-rose-500",
  "expiring-soon":"text-slate-900"
};

export default function DeleteModal({
  isOpen,
  onClose,
  selectedItem,
  fetchItem,
}: DeleteItemModalProps) {
  if (!isOpen || !selectedItem) return null;

  const handleDelete = async () => {
    try {
      await api.delete(`/items/${selectedItem._id}`);
      alert("Item deleted successfully");
      fetchItem();
      onClose();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

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
              Delete Item
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

        {/* Body */}
        <div className="px-6 py-6 flex flex-col items-center gap-4 text-center">

          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>

          {/* Message */}
          <div>
            <p className="text-slate-800 font-medium text-sm mb-1">Are you sure?</p>
            <p className="text-slate-500 text-sm leading-relaxed">
              You are about to delete{" "}
              <span className="font-semibold text-slate-700">{selectedItem.name}</span>.
              This action cannot be undone.
            </p>
          </div>

          {/* Item Summary */}
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-left space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Category</span>
              <span className="text-slate-700 font-medium capitalize">{selectedItem.category}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Status</span>
              <span className={`font-medium capitalize ${STATUS_COLORS[selectedItem.status]}`}>
                {selectedItem.status}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Quantity</span>
              <span className="text-slate-700 font-medium">{selectedItem.quantity}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-500 active:scale-95 transition shadow-md"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}