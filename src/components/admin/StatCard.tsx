import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change?: string
  changePositive?: boolean
  icon: LucideIcon
  iconColor?: string
}

export function StatCard({
  title,
  value,
  change,
  changePositive = true,
  icon: Icon,
  iconColor = 'text-yellow-400',
}: StatCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center ${iconColor}`}>
          <Icon size={20} />
        </div>
      </div>
      {change && (
        <p
          className={`text-xs font-medium ${
            changePositive ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {changePositive ? '↑' : '↓'} {change}
        </p>
      )}
    </div>
  )
}
