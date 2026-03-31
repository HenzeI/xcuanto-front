import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, Gamepad2, Smartphone, Laptop, Zap, Package, Home, Grid3x3 } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const categoryLinks = [
  { label: 'Juegos', slug: 'juegos', icon: Gamepad2 },
  { label: 'Móviles', slug: 'moviles', icon: Smartphone },
  { label: 'Informática', slug: 'informatica', icon: Laptop },
  { label: 'Electrónica', slug: 'electronica', icon: Zap },
  { label: 'Accesorios', slug: 'accesorios', icon: Package },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation()

  useEffect(() => {
    onClose()
  }, [location.pathname, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-80 bg-white border-l border-gray-200 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <img
            src="/logo.png"
            alt="¿X Cuánto?"
            className="h-8 w-auto"
            onError={(e) => {
              const t = e.currentTarget
              t.style.display = 'none'
              const fb = t.nextElementSibling as HTMLElement | null
              if (fb) fb.style.display = 'block'
            }}
          />
          <span className="hidden text-lg font-black">
            <span className="bg-black text-yellow-400 px-1.5 rounded mr-1">X</span>
            CUANTO??
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-5 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <Home size={18} className="text-yellow-500" />
            <span className="font-medium">Inicio</span>
          </Link>
          <Link
            to="/catalogo"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <Grid3x3 size={18} className="text-yellow-500" />
            <span className="font-medium">Catálogo</span>
          </Link>

          <div className="pt-4 pb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              Categorías
            </p>
            {categoryLinks.map(({ label, slug, icon: Icon }) => (
              <Link
                key={slug}
                to={`/categoria/${slug}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <Icon size={18} className="text-gray-400" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}
