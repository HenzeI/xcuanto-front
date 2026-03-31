import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Search,
  Menu,
  ChevronDown,
  Gamepad2,
  Smartphone,
  Laptop,
  Zap,
  Package,
  ShoppingCart,
} from 'lucide-react'
import { MobileMenu } from './MobileMenu'

const categories = [
  { label: 'Juegos', slug: 'juegos', icon: Gamepad2 },
  { label: 'Móviles', slug: 'moviles', icon: Smartphone },
  { label: 'Informática', slug: 'informatica', icon: Laptop },
  { label: 'Electrónica', slug: 'electronica', icon: Zap },
  { label: 'Accesorios', slug: 'accesorios', icon: Package },
]

function Logo() {
  return (
    <Link to="/" className="flex items-center shrink-0" aria-label="¿X Cuánto? - Inicio">
      <img
        src="/logo.png"
        alt="¿X Cuánto?"
        className="h-10 w-auto"
        onError={(e) => {
          const target = e.currentTarget
          target.style.display = 'none'
          const fallback = target.nextElementSibling as HTMLElement | null
          if (fallback) fallback.style.display = 'flex'
        }}
      />
      <span
        className="hidden items-center text-xl font-black tracking-tight"
        style={{ display: 'none' }}
      >
        <span className="bg-black text-yellow-400 px-2 py-0.5 rounded-md mr-1">X</span>
        <span className="text-black">CUANTO??</span>
      </span>
    </Link>
  )
}

function CategoryDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-1 py-1"
        aria-expanded={open}
      >
        Categorías
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-50">
          {categories.map(({ label, slug, icon: Icon }) => (
            <Link
              key={slug}
              to={`/categoria/${slug}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <Icon size={16} className="text-yellow-500 shrink-0" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function SearchBar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      inputRef.current?.blur()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 max-w-xl hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 hover:border-gray-300 focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20 transition-all"
    >
      <Search size={16} className="text-gray-400 shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
      />
    </form>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          {/* Logo */}
          <Logo />

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-5 ml-4">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/catalogo"
              className={`text-sm font-medium transition-colors ${
                isActive('/catalogo') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Catálogo
            </Link>
            <CategoryDropdown />
          </nav>

          {/* Search */}
          <SearchBar />

          {/* Cart icon desktop */}
          <div className="hidden md:flex items-center gap-2 ml-auto shrink-0">
            <button className="relative p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
              <ShoppingCart size={22} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-yellow-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Mobile: burger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="ml-auto md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
