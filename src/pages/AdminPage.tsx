import { Link } from 'react-router-dom'
import {
  Package,
  TrendingUp,
  Users,
  Euro,
  ArrowLeft,
  Bell,
  Plus,
  Activity,
} from 'lucide-react'
import { StatCard } from '../components/admin/StatCard'
import { AdminTable } from '../components/admin/AdminTable'
import { Button } from '../components/ui/Button'
import { useProducts } from '../hooks/useProducts'

const stats = [
  {
    title: 'Total productos',
    value: '285',
    change: '24 nuevos esta semana',
    changePositive: true,
    icon: Package,
    iconColor: 'text-yellow-400',
  },
  {
    title: 'Ventas del mes',
    value: '143',
    change: '+18% vs mes anterior',
    changePositive: true,
    icon: TrendingUp,
    iconColor: 'text-emerald-400',
  },
  {
    title: 'Usuarios activos',
    value: '1.247',
    change: '89 nuevos registros',
    changePositive: true,
    icon: Users,
    iconColor: 'text-blue-400',
  },
  {
    title: 'Ingresos estimados',
    value: '4.832€',
    change: '+12% respecto al mes pasado',
    changePositive: true,
    icon: Euro,
    iconColor: 'text-purple-400',
  },
]

const recentActivity = [
  { text: 'Nuevo producto publicado: PS5 Edición Estándar', time: 'Hace 5 min', type: 'product' },
  { text: 'Usuario Carlos M. alcanzó 20 ventas', time: 'Hace 1 hora', type: 'user' },
  { text: 'Venta completada: iPhone 14 Pro — 849€', time: 'Hace 2 horas', type: 'sale' },
  { text: 'Nuevo producto publicado: Sony WH-1000XM5', time: 'Hace 3 horas', type: 'product' },
  { text: 'Usuario Ana L. verificó su cuenta', time: 'Hace 5 horas', type: 'user' },
]

export function AdminPage() {
  const { products, loading } = useProducts()

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Dashboard</h1>
          <p className="text-xs text-zinc-500">Panel de administración — xcuanto</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="lg:hidden">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={16} />
              Sitio
            </Button>
          </Link>
          <button className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-yellow-400" />
          </button>
          <Button variant="primary" size="sm">
            <Plus size={16} />
            Nuevo producto
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Main content: table + activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Products table */}
          <div className="xl:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Package size={18} className="text-yellow-400" />
              <h2 className="text-base font-bold text-white">Gestión de productos</h2>
            </div>
            {loading ? (
              <div className="h-64 bg-zinc-900 border border-zinc-800 rounded-2xl animate-pulse" />
            ) : (
              <AdminTable products={products} />
            )}
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Recent activity */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={16} className="text-yellow-400" />
                <h3 className="text-sm font-bold text-white">Actividad reciente</h3>
              </div>
              <div className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        item.type === 'product'
                          ? 'bg-yellow-400'
                          : item.type === 'sale'
                          ? 'bg-emerald-400'
                          : 'bg-blue-400'
                      }`}
                    />
                    <div>
                      <p className="text-xs text-zinc-300 leading-snug">{item.text}</p>
                      <p className="text-xs text-zinc-600 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini stats by category */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-4">Por categoría</h3>
              {[
                { nombre: 'Accesorios', total: 82, pct: 82 },
                { nombre: 'Móviles', total: 63, pct: 63 },
                { nombre: 'Electrónica', total: 55, pct: 55 },
                { nombre: 'Juegos', total: 48, pct: 48 },
                { nombre: 'Informática', total: 37, pct: 37 },
              ].map((cat) => (
                <div key={cat.nombre} className="mb-3 last:mb-0">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-zinc-400">{cat.nombre}</span>
                    <span className="text-zinc-500">{cat.total} prod.</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all"
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-4">Acciones rápidas</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Nuevo producto', icon: '📦' },
                  { label: 'Ver usuarios', icon: '👥' },
                  { label: 'Estadísticas', icon: '📊' },
                  { label: 'Configuración', icon: '⚙️' },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex flex-col items-center gap-2 p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs text-zinc-300 hover:text-white transition-colors text-center"
                  >
                    <span className="text-xl">{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
