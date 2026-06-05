// StatsCards.tsx
// Usage: <StatsCards stats={statsFromAPI} />
// API shape: { fresh, expiringSoon, expired, used, wasted, wasteScore, totalItem }

interface StatsData {
  fresh: number;
  expiringSoon: number;
  expired: number;
  used: number;
  wasted: number;
  wasteScore: number;
  totalItem: number;
}

interface StatsCardsProps {
  stats: StatsData;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const total = stats.totalItem || 1; // avoid divide by zero

  const cards = [
    {
      label: "Fresh",
      value: stats.fresh,
      pct: Math.round((stats.fresh / total) * 100),
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      bar: "bg-emerald-500",
      iconColor: "text-emerald-600",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Expiring Soon",
      value: stats.expiringSoon,
      pct: Math.round((stats.expiringSoon / total) * 100),
      color: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-100",
      bar: "bg-amber-400",
      iconColor: "text-amber-600",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
        </svg>
      ),
    },
    {
      label: "Expired",
      value: stats.expired,
      pct: Math.round((stats.expired / total) * 100),
      color: "text-rose-700",
      bg: "bg-rose-50",
      border: "border-rose-100",
      bar: "bg-rose-500",
      iconColor: "text-rose-600",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
    },
    {
      label: "Total Items",
      value: stats.totalItem,
      pct: 100,
      color: "text-slate-700",
      bg: "bg-slate-50",
      border: "border-slate-100",
      bar: "bg-slate-400",
      iconColor: "text-slate-500",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
    },
    {
      label: "Used",
      value: stats.used,
      pct: Math.round((stats.used / total) * 100),
      color: "text-sky-700",
      bg: "bg-sky-50",
      border: "border-sky-100",
      bar: "bg-sky-500",
      iconColor: "text-sky-600",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      label: "Wasted",
      value: stats.wasted,
      pct: Math.round((stats.wasted / total) * 100),
      color: "text-orange-700",
      bg: "bg-orange-50",
      border: "border-orange-100",
      bar: "bg-orange-400",
      iconColor: "text-orange-600",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      ),
    },
    {
      label: "Waste Score",
      value: `${Math.round(stats.wasteScore)}%`,
      pct: Math.round(stats.wasteScore),
      color: stats.wasteScore >= 70 ? "text-emerald-700" : stats.wasteScore >= 40 ? "text-amber-700" : "text-rose-700",
      bg: stats.wasteScore >= 70 ? "bg-emerald-50" : stats.wasteScore >= 40 ? "bg-amber-50" : "bg-rose-50",
      border: stats.wasteScore >= 70 ? "border-emerald-100" : stats.wasteScore >= 40 ? "border-amber-100" : "border-rose-100",
      bar: stats.wasteScore >= 70 ? "bg-emerald-500" : stats.wasteScore >= 40 ? "bg-amber-400" : "bg-rose-500",
      iconColor: stats.wasteScore >= 70 ? "text-emerald-600" : stats.wasteScore >= 40 ? "text-amber-600" : "text-rose-600",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`bg-white rounded-2xl border ${card.border} p-5 shadow-sm hover:shadow-md transition-all duration-200`}
        >
          {/* Top row: label + icon */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold uppercase tracking-wider ${card.color}`}>
              {card.label}
            </span>
            <span className={`${card.bg} ${card.iconColor} p-1.5 rounded-lg`}>
              {card.icon}
            </span>
          </div>

          {/* Value */}
          <p className="text-3xl font-bold text-slate-900 mb-1">{card.value}</p>

          {/* Percentage hint */}
          {typeof card.value === "number" && card.label !== "Total Items" && (
            <p className={`text-xs font-medium mb-2 ${card.color}`}>
              {card.pct}% of total
            </p>
          )}
          {card.label === "Total Items" && (
            <p className="text-xs text-slate-400 mb-2">across household</p>
          )}
          {card.label === "Waste Score" && (
            <p className={`text-xs font-medium mb-2 ${card.color}`}>
              {stats.wasteScore >= 70 ? "Great job! 🎉" : stats.wasteScore >= 40 ? "Room to improve" : "Needs attention"}
            </p>
          )}

          {/* Progress bar */}
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-1 ${card.bar} rounded-full transition-all duration-700`}
              style={{ width: `${card.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}