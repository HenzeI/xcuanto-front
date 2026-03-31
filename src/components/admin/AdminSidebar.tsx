import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Tag,
  Users,
  BarChart3,
  Settings,
  ArrowLeft,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Productos', href: '/admin#productos', icon: Package },
  { label: 'Categorías', href: '/admin#categorias', icon: Tag },
  { label: 'Usuarios', href: '/admin#usuarios', icon: Users },
  { label: 'Estadísticas', href: '/admin#estadisticas', icon: BarChart3 },
  { label: 'Configuración', href: '/admin#config', icon: Settings },
]

export function AdminSidebar() {
  const location = useLocation()

  return (
    <aside className="w-60 shrink-0 hidden lg:flex flex-col bg-zinc-950 border-r border-zinc-800 min-h-screen">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-zinc-800">
        <span className="text-lg font-black">
          <span className="text-yellow-400">x</span>
          <span className="text-white">cuanto</span>
        </span>
        <p className="text-xs text-zinc-600 mt-0.5">Panel de administración</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = location.pathname === '/admin' && href === '/admin'
          return (
            <Link
              key={href}
              to={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Back to site */}
      <div className="p-4 border-t border-zinc-800">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver al sitio
        </Link>
      </div>
    </aside>
  )
}
