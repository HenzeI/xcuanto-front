import { Link, useParams } from 'react-router-dom'
import {
  Gamepad2,
  Smartphone,
  Laptop,
  Zap,
  Package,
  ChevronRight,
  AlertCircle,
} from 'lucide-react'
import { ProductGrid } from '../components/product/ProductGrid'
import { PageSpinner } from '../components/ui/Spinner'
import { useProducts } from '../hooks/useProducts'
import { useCategory } from '../hooks/useCategories'

const iconMap: Record<string, React.ElementType> = {
  Gamepad2,
  Smartphone,
  Laptop,
  Zap,
  Package,
}

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const { category, loading: catLoading } = useCategory(slug ?? '')
  const { products, loading: prodLoading } = useProducts({ categoria: slug })

  if (catLoading) return <PageSpinner />

  if (!category) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-5">
          <AlertCircle size={28} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Categoría no encontrada</h1>
        <p className="text-gray-500 mb-8">
          Esta categoría no existe. Explora el catálogo completo.
        </p>
        <Link
          to="/catalogo"
          className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Ver catálogo
        </Link>
      </div>
    )
  }

  const Icon = iconMap[category.icono] ?? Package

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-yellow-600 transition-colors">Inicio</Link>
        <ChevronRight size={14} />
        <Link to="/catalogo" className="hover:text-yellow-600 transition-colors">Catálogo</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900">{category.nombre}</span>
      </nav>

      {/* Category hero */}
      <div className="relative bg-black rounded-3xl p-8 sm:p-12 mb-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-yellow-400 flex items-center justify-center shrink-0">
            <Icon size={36} className="text-black" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">{category.nombre}</h1>
            {category.descripcion && (
              <p className="text-gray-400 text-base">{category.descripcion}</p>
            )}
            <p className="text-gray-600 text-sm mt-2">
              {category.total_productos} artículos disponibles
            </p>
          </div>
          <div className="sm:ml-auto">
            <Link
              to={`/catalogo?categoria=${category.slug}`}
              className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
            >
              Ver con filtros →
            </Link>
          </div>
        </div>
      </div>

      {/* Other categories quick nav */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { label: 'Juegos', slug: 'juegos' },
          { label: 'Móviles', slug: 'moviles' },
          { label: 'Informática', slug: 'informatica' },
          { label: 'Electrónica', slug: 'electronica' },
          { label: 'Accesorios', slug: 'accesorios' },
        ]
          .filter((c) => c.slug !== slug)
          .map((c) => (
            <Link
              key={c.slug}
              to={`/categoria/${c.slug}`}
              className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-full text-gray-600 hover:text-gray-900 hover:border-gray-300 shadow-sm transition-colors"
            >
              {c.label}
            </Link>
          ))}
      </div>

      {/* Products grid */}
      <ProductGrid
        products={products}
        loading={prodLoading}
        emptyMessage={`No hay artículos en ${category.nombre} por el momento.`}
      />
    </div>
  )
}
