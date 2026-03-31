import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search,
  Gamepad2,
  Smartphone,
  Laptop,
  Zap,
  Package,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Truck,
  RefreshCw,
} from 'lucide-react'
import { ProductCard } from '../components/product/ProductCard'
import { PageSpinner } from '../components/ui/Spinner'
import { useFeaturedProducts, useLatestProducts } from '../hooks/useProducts'
import { useCategories } from '../hooks/useCategories'

const iconMap: Record<string, React.ElementType> = {
  Gamepad2,
  Smartphone,
  Laptop,
  Zap,
  Package,
}

const SLIDES = ['/x1.png', '/x2.png', '/x3.png', '/x4.png', '/x5.png', '/x6.png', '/x7.png']

function HeroSection() {
  const [query, setQuery] = useState('')
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current)
      setAnimating(true)
      setCurrent((c) => (c + 1) % SLIDES.length)
      setTimeout(() => {
        setPrev(null)
        setAnimating(false)
      }, 900)
    }, 4000)
    return () => clearInterval(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <section className="relative overflow-hidden h-[580px] sm:h-[640px]">

      {/* ── Imagen saliente (se desplaza a la izquierda) ── */}
      {prev !== null && (
        <div
          className="absolute inset-0"
          style={{
            animation: animating ? 'slideOutLeft 0.9s ease-in-out forwards' : undefined,
          }}
        >
          <img src={SLIDES[prev]} alt="" className="w-full h-full object-cover object-center" />
        </div>
      )}

      {/* ── Imagen entrante (entra desde la derecha) ── */}
      <div
        className="absolute inset-0"
        style={{
          animation: animating ? 'slideInRight 0.9s ease-in-out forwards' : undefined,
        }}
      >
        <img src={SLIDES[current]} alt="" className="w-full h-full object-cover object-center" />
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes slideOutLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      {/* ── Indicadores ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (i !== current) { setPrev(current); setAnimating(true); setCurrent(i); setTimeout(() => { setPrev(null); setAnimating(false) }, 900) } }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-yellow-400 w-6' : 'bg-white/40 w-1.5 hover:bg-white/70'}`}
            aria-label={`Imagen ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Overlay oscuro para legibilidad del texto ── */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* ── Contenido centrado ── */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="¿X Cuánto?"
            className="h-16 sm:h-20 w-auto drop-shadow-2xl"
            onError={(e) => {
              const t = e.currentTarget
              t.style.display = 'none'
              const fb = t.nextElementSibling as HTMLElement | null
              if (fb) fb.style.display = 'flex'
            }}
          />
          <span
            className="hidden items-center text-4xl font-black"
            style={{ display: 'none' }}
          >
            <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-md mr-1">X</span>
            <span className="text-white">CUANTO??</span>
          </span>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/40 rounded-full px-4 py-1.5 mb-5">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-yellow-300 text-sm font-medium">+285 artículos disponibles ahora</span>
        </div>

        {/* Titular */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-5 leading-[1.05] tracking-tight drop-shadow-lg">
          Segunda mano.{' '}
          <span className="text-yellow-400">Primera calidad.</span>
        </h1>

        <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed drop-shadow">
          Electrónica, gaming, móviles y más — al mejor precio,
          con garantía y entrega a domicilio.
        </p>

        {/* Buscador */}
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 bg-white rounded-2xl p-2 max-w-2xl w-full mx-auto shadow-2xl shadow-black/60"
        >
          <Search size={18} className="text-gray-400 ml-2 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Qué estás buscando? iPhone, PS5, MacBook..."
            className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm sm:text-base py-1"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-bold px-5 sm:px-7 py-2.5 rounded-xl transition-colors text-sm shrink-0"
          >
            Buscar
          </button>
        </form>

        {/* Links rápidos */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <span className="text-gray-500 text-xs">Popular:</span>
          {['PlayStation 5', 'iPhone 14', 'MacBook', 'AirPods', 'Nintendo Switch'].map((term) => (
            <Link
              key={term}
              to={`/catalogo?q=${encodeURIComponent(term)}`}
              className="text-xs text-gray-400 hover:text-yellow-400 underline underline-offset-2 decoration-dotted transition-colors"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  return (
    <div className="bg-yellow-400 border-y border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-sm font-semibold text-black">
          <div className="flex items-center gap-2">
            <Truck size={16} />
            <span>Envío gratuito desde 50€</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-black/20" />
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} />
            <span>Compra 100% segura</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-black/20" />
          <div className="flex items-center gap-2">
            <RefreshCw size={16} />
            <span>Devolución en 15 días</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-black/20" />
          <div className="flex items-center gap-2">
            <Package size={16} />
            <span>+285 artículos verificados</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CategoriesSection() {
  const { categories, loading } = useCategories()

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Explorar categorías</h2>
            <p className="text-gray-500 text-sm mt-1">Encuentra lo que buscas por sección</p>
          </div>
          <Link
            to="/catalogo"
            className="text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1 transition-colors"
          >
            Ver todo
            <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icono] ?? Package
              return (
                <Link
                  key={cat.slug}
                  to={`/categoria/${cat.slug}`}
                  className="group flex flex-col items-center gap-3 p-5 bg-white border-2 border-gray-200 rounded-2xl hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/10 hover:-translate-y-0.5 transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                    <Icon size={22} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-yellow-700 transition-colors">
                      {cat.nombre}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{cat.total_productos} artículos</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

function FeaturedSection() {
  const { products, loading } = useFeaturedProducts()

  return (
    <section className="py-14 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-100 border border-yellow-200 flex items-center justify-center">
              <TrendingUp size={16} className="text-yellow-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Productos destacados</h2>
              <p className="text-gray-500 text-sm mt-0.5">Selección de calidad verificada</p>
            </div>
          </div>
          <Link
            to="/catalogo"
            className="text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1 transition-colors"
          >
            Ver catálogo
            <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <PageSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function LatestSection() {
  const { products, loading } = useLatestProducts(8)

  return (
    <section className="py-14 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Últimas incorporaciones</h2>
            <p className="text-gray-500 text-sm mt-1">Artículos recién llegados a la tienda</p>
          </div>
          <Link
            to="/catalogo?ordenar=fecha_desc"
            className="text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1 transition-colors"
          >
            Ver más
            <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <PageSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoriesSection />
      <FeaturedSection />
      <LatestSection />
    </>
  )
}
