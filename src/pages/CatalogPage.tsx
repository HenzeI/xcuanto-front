import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
} from 'lucide-react'
import { ProductGrid } from '../components/product/ProductGrid'
import { Badge } from '../components/ui/Badge'
import { useProducts } from '../hooks/useProducts'
import { useCategories } from '../hooks/useCategories'
import type { ProductCondition } from '../types/product'
import { getConditionLabel } from '../utils/formatters'

const conditions: ProductCondition[] = ['nuevo', 'como_nuevo', 'buen_estado', 'aceptable']

const sortOptions = [
  { value: 'fecha_desc', label: 'Más recientes' },
  { value: 'fecha_asc', label: 'Más antiguos' },
  { value: 'precio_asc', label: 'Menor precio' },
  { value: 'precio_desc', label: 'Mayor precio' },
]

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 mb-3"
      >
        {title}
        {open ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
      </button>
      {open && children}
    </div>
  )
}

interface FilterSidebarProps {
  categoryFilter: string
  conditionFilter: string
  priceMin: string
  priceMax: string
  onCategoryChange: (v: string) => void
  onConditionChange: (v: string) => void
  onPriceMinChange: (v: string) => void
  onPriceMaxChange: (v: string) => void
  onReset: () => void
}

function FilterSidebar({
  categoryFilter,
  conditionFilter,
  priceMin,
  priceMax,
  onCategoryChange,
  onConditionChange,
  onPriceMinChange,
  onPriceMaxChange,
  onReset,
}: FilterSidebarProps) {
  const { categories } = useCategories()
  const hasFilters = categoryFilter || conditionFilter || priceMin || priceMax

  return (
    <aside className="w-64 shrink-0">
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sticky top-20 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-yellow-500" />
            <h3 className="font-semibold text-gray-900 text-sm">Filtros</h3>
          </div>
          {hasFilters && (
            <button
              onClick={onReset}
              className="text-xs text-yellow-600 hover:text-yellow-700 flex items-center gap-1 transition-colors font-medium"
            >
              <X size={12} />
              Limpiar
            </button>
          )}
        </div>

        <FilterSection title="Categoría">
          <div className="space-y-1.5">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="categoria"
                value=""
                checked={!categoryFilter}
                onChange={() => onCategoryChange('')}
                className="accent-yellow-400"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                Todas las categorías
              </span>
            </label>
            {categories.map((cat) => (
              <label key={cat.slug} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="categoria"
                  value={cat.slug}
                  checked={categoryFilter === cat.slug}
                  onChange={() => onCategoryChange(cat.slug)}
                  className="accent-yellow-400"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors flex-1">
                  {cat.nombre}
                </span>
                <span className="text-xs text-gray-400">{cat.total_productos}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Estado del artículo">
          <div className="space-y-1.5">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="estado"
                value=""
                checked={!conditionFilter}
                onChange={() => onConditionChange('')}
                className="accent-yellow-400"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                Cualquiera
              </span>
            </label>
            {conditions.map((c) => (
              <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="estado"
                  value={c}
                  checked={conditionFilter === c}
                  onChange={() => onConditionChange(c)}
                  className="accent-yellow-400"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {getConditionLabel(c)}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Precio (€)" defaultOpen={false}>
          <div className="flex gap-2">
            <input
              type="number"
              value={priceMin}
              onChange={(e) => onPriceMinChange(e.target.value)}
              placeholder="Mín"
              min={0}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-colors"
            />
            <input
              type="number"
              value={priceMax}
              onChange={(e) => onPriceMaxChange(e.target.value)}
              placeholder="Máx"
              min={0}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-colors"
            />
          </div>
        </FilterSection>
      </div>
    </aside>
  )
}

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const queryParam = searchParams.get('q') ?? ''
  const categoryParam = searchParams.get('categoria') ?? ''
  const conditionParam = searchParams.get('estado') ?? ''
  const priceMinParam = searchParams.get('precio_min') ?? ''
  const priceMaxParam = searchParams.get('precio_max') ?? ''
  const sortParam = searchParams.get('ordenar') ?? 'fecha_desc'

  const { products: allProducts, loading } = useProducts()

  const filteredProducts = useMemo(() => {
    let result = [...allProducts]
    if (queryParam) {
      const q = queryParam.toLowerCase()
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q) ||
          p.categoria.nombre.toLowerCase().includes(q),
      )
    }
    if (categoryParam) result = result.filter((p) => p.categoria.slug === categoryParam)
    if (conditionParam) result = result.filter((p) => p.estado === conditionParam)
    if (priceMinParam) result = result.filter((p) => p.precio >= Number(priceMinParam))
    if (priceMaxParam) result = result.filter((p) => p.precio <= Number(priceMaxParam))

    switch (sortParam) {
      case 'precio_asc':
        result.sort((a, b) => a.precio - b.precio)
        break
      case 'precio_desc':
        result.sort((a, b) => b.precio - a.precio)
        break
      case 'fecha_asc':
        result.sort(
          (a, b) =>
            new Date(a.fecha_publicacion).getTime() - new Date(b.fecha_publicacion).getTime(),
        )
        break
      default:
        result.sort(
          (a, b) =>
            new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime(),
        )
    }
    return result
  }, [allProducts, queryParam, categoryParam, conditionParam, priceMinParam, priceMaxParam, sortParam])

  function updateParam(key: string, value: string) {
    const p = new URLSearchParams(searchParams)
    if (value) p.set(key, value)
    else p.delete(key)
    setSearchParams(p)
  }

  function resetFilters() {
    setSearchParams(queryParam ? { q: queryParam } : {})
  }

  const activeFiltersCount = [categoryParam, conditionParam, priceMinParam, priceMaxParam].filter(Boolean).length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-yellow-600 transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-gray-900">Catálogo</span>
        {queryParam && (
          <>
            <span>/</span>
            <span className="text-yellow-600">"{queryParam}"</span>
          </>
        )}
      </nav>

      {/* Header row */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {queryParam ? `Resultados para "${queryParam}"` : 'Catálogo completo'}
          </h1>
          {!loading && (
            <p className="text-gray-500 text-sm mt-1">
              {filteredProducts.length} artículo{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile filters toggle */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-gray-300 shadow-sm transition-colors"
          >
            <SlidersHorizontal size={15} />
            Filtros
            {activeFiltersCount > 0 && (
              <Badge variant="yellow">{activeFiltersCount}</Badge>
            )}
          </button>

          {/* Sort */}
          <select
            value={sortParam}
            onChange={(e) => updateParam('ordenar', e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 outline-none focus:border-yellow-400 hover:border-gray-300 shadow-sm transition-colors cursor-pointer"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {/* View icon (decorative) */}
          <div className="hidden sm:flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            <div className="p-1.5 rounded-lg bg-gray-100 text-gray-700">
              <LayoutGrid size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Active filters chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {categoryParam && (
            <button
              onClick={() => updateParam('categoria', '')}
              className="flex items-center gap-1.5 text-xs bg-yellow-100 border border-yellow-300 text-yellow-800 px-3 py-1 rounded-full hover:bg-yellow-200 transition-colors font-medium"
            >
              {categoryParam}
              <X size={12} />
            </button>
          )}
          {conditionParam && (
            <button
              onClick={() => updateParam('estado', '')}
              className="flex items-center gap-1.5 text-xs bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              {getConditionLabel(conditionParam as ProductCondition)}
              <X size={12} />
            </button>
          )}
          {(priceMinParam || priceMaxParam) && (
            <button
              onClick={() => {
                updateParam('precio_min', '')
                updateParam('precio_max', '')
              }}
              className="flex items-center gap-1.5 text-xs bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              {priceMinParam && `Desde ${priceMinParam}€`}
              {priceMinParam && priceMaxParam && ' — '}
              {priceMaxParam && `Hasta ${priceMaxParam}€`}
              <X size={12} />
            </button>
          )}
        </div>
      )}

      {/* Main layout */}
      <div className="flex gap-7">
        {/* Sidebar desktop */}
        <div className="hidden lg:block">
          <FilterSidebar
            categoryFilter={categoryParam}
            conditionFilter={conditionParam}
            priceMin={priceMinParam}
            priceMax={priceMaxParam}
            onCategoryChange={(v) => updateParam('categoria', v)}
            onConditionChange={(v) => updateParam('estado', v)}
            onPriceMinChange={(v) => updateParam('precio_min', v)}
            onPriceMaxChange={(v) => updateParam('precio_max', v)}
            onReset={resetFilters}
          />
        </div>

        {/* Mobile filters drawer */}
        {mobileFiltersOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/30"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Filtros</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-5">
                <FilterSidebar
                  categoryFilter={categoryParam}
                  conditionFilter={conditionParam}
                  priceMin={priceMinParam}
                  priceMax={priceMaxParam}
                  onCategoryChange={(v) => updateParam('categoria', v)}
                  onConditionChange={(v) => updateParam('estado', v)}
                  onPriceMinChange={(v) => updateParam('precio_min', v)}
                  onPriceMaxChange={(v) => updateParam('precio_max', v)}
                  onReset={resetFilters}
                />
              </div>
            </div>
          </>
        )}

        {/* Products */}
        <div className="flex-1 min-w-0">
          <ProductGrid
            products={filteredProducts}
            loading={loading}
            emptyMessage="Prueba a cambiar los filtros o ampliar la búsqueda."
          />
        </div>
      </div>
    </div>
  )
}
