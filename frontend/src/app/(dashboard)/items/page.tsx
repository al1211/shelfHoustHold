"use client";
import { useState, useMemo, useEffect } from "react";
import { api } from "../../../../lib/axios";
import EditItemModal from "../../../../components/EditModal";
import DeleteModal from "../../../../components/DeletModal";



const catStyles = {
  dairy: { badge: "bg-blue-50 text-blue-800", icon: "💧" },
  meat: { badge: "bg-amber-50 text-amber-900", icon: "🌾" },
  produce: { badge: "bg-green-50 text-green-800", icon: "🌿" },
  pantry: { badge: "bg-pink-50 text-pink-800", icon: "🍒" },
  other: { badge: "bg-green-50 text-green-800", icon: "🍒" },
};



const statusStyles = {
  fresh: { badge: "bg-green-50 text-green-800", dot: "bg-green-500" },
  expired: { badge: "bg-amber-50 text-amber-800", dot: "bg-amber-500" },
  used: { badge: "bg-red-50 text-red-800", dot: "bg-red-500" },
  wasted: { badge: "bg-slate-50 text-slate-900", dot: "bg-stone-500" },
  expigin: { badge: "bg-slate-50 text-slate-900", dot: "bg-stone-500" },
  

};

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, valueClass = "" }) {
  return (
    <div className="bg-white rounded-xl p-4">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${valueClass || "text-slate-800"}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function ItemsPage() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [statusFilter, setStatus] = useState("");
  const [sort, setSort] = useState("expiry-asc");
  const [ItemData, setItemData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [isDelete, setIsDelete] = useState(false);

  // const filtered = useMemo(() => {
  //   let data = items.filter(
  //     (i) =>
  //       (!search || i.name.toLowerCase().includes(search.toLowerCase())) &&
  //       (!catFilter || i.cat === catFilter) &&
  //       (!statusFilter || i.status === statusFilter)
  //   );
  //   if (sort === "expiry-asc") data = [...data].sort((a, b) => a.expDays - b.expDays);
  //   if (sort === "expiry-desc") data = [...data].sort((a, b) => b.expDays - a.expDays);
  //   if (sort === "name-asc") data = [...data].sort((a, b) => a.name.localeCompare(b.name));
  //   if (sort === "qty-asc") data = [...data].sort((a, b) => a.qty - b.qty);
  //   return data;
  // }, [search, catFilter, statusFilter, sort]);


  const fetchItem = async () => {
    const respnse = await api.get("/items");
    setItemData(respnse.data);
  }
  useEffect(() => {
    try {
      fetchItem();

    } catch (err) {
      console.log("err", err)
    }

  }, []);
  // console.log(selectedItem);
  function formatted(dateString: any) {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }



  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Inventory Items</h1>
            <p className="text-sm text-slate-400 mt-0.5">Track, manage and monitor your stock levels</p>
          </div>
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 active:scale-95 transition text-white text-sm font-medium px-4 py-2.5 rounded-xl">
            <span className="text-lg leading-none">+</span> Add Item
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Total Items" value={ItemData.count} sub="across 4 categories" />
        </div>

        {/* ── Filters ── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="flex items-center gap-2 flex-1 min-w-40 bg-slate-50 border border-slate-200 rounded-xl px-3 h-9">
            <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
            />
          </div>

          {/* Category */}
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 h-9 text-sm text-slate-700 outline-none cursor-pointer min-w-35"
          >
            <option value="">All categories</option>
            <option>Dairy</option>
            <option>Bakery</option>
            <option>Vegetables</option>
            <option>Fruit</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 h-9 text-sm text-slate-700 outline-none cursor-pointer min-w-35"
          >
            <option value="">All statuses</option>
            <option>Fresh</option>
            <option>Expiring</option>
            <option>Expired</option>
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 h-9 text-sm text-slate-700 outline-none cursor-pointer min-w-37.5"
          >
            <option value="expiry-asc">Expiry: soonest</option>
            <option value="expiry-desc">Expiry: latest</option>
            <option value="name-asc">Name: A–Z</option>
            <option value="qty-asc">Qty: low first</option>
          </select>
        </div>

        {/* ── Table ── */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["Item", "Category", "Qty", "Expiry", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ItemData.data?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-sm text-slate-400">
                      <div className="text-3xl mb-2">📦</div>
                      No items match your filters
                    </td>
                  </tr>
                ) : (
                  ItemData?.data?.map((item) => (
                    <tr key={item._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">

                      {/* Item */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">

                          <div>
                            <p className="text-sm font-medium text-slate-800">{item.name}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full  ${catStyles[item.category]?.badge}`}>

                          {item.category}
                        </span>
                      </td>

                      {/* Qty */}
                      <td className="px-4 py-3">
                        <span className={`text-sm font-semibold ${item.qty <= 1 ? "text-red-500" : "text-slate-700"}`}>
                          {item.quantity}
                          {item.quantity <= 1 && (
                            <span className="ml-1 text-xs font-normal text-red-400">low</span>
                          )}
                        </span>
                      </td>

                      {/* Expiry */}
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1.5 text-sm ${item.expDays <= 3 ? "text-red-500" : "text-slate-500"}`}>
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                          </svg>
                          {formatted(item.expiryDate)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full  ${statusStyles[item.status]?.badge}`} >


                          <span className={`w-1.5 h-1.5 rounded-full ${statusStyles[item.status]?.dot} `} />
                          {item.status}
                        </span>
                      </td>

                      <EditItemModal isOpen={isOpen} onClose={() => setIsOpen(false)} selectedItem={selectedItem!} fetchItem={fetchItem} />
                      <DeleteModal isOpen={isDelete} onClose={() => setIsDelete(false)} selectedItem={selectedItem!} fetchItem={fetchItem} />
                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            title="Edit"
                            onClick={() => { setIsOpen(true); setSelectedItem(item) }}
                            className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center text-slate-500 hover:text-slate-700 transition"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>


                          <button
                            title="Delete"
                            onClick={()=>{setIsDelete(true);setSelectedItem(item)}}
                            className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-red-50 hover:border-red-200 flex items-center justify-center text-slate-500 hover:text-red-500 transition"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                            </svg>
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {/* {filtered.length > 0 && (
            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Showing <span className="font-medium text-slate-600">{filtered.length}</span> of {items.length} items
              </p>
              <div className="flex gap-1">
                <button className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition">Previous</button>
                <button className="px-3 py-1.5 text-xs bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition">1</button>
                <button className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition">Next</button>
              </div>
            </div>
          )} */}
        </div>

      </div>
    </div>
  );
}