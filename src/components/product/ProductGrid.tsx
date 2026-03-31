import { PackageSearch } from 'lucide-react'
import type { Product } from '../../types/product'
import { ProductCard } from './ProductCard'
import { PageSpinner } from '../ui/Spinner'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  emptyMessage?: string
}

export function ProductGrid({
  products,
  loading = false,
  emptyMessage = 'No se encontraron productos.',
}: ProductGridProps) {
  if (loading) return <PageSpinner />

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
          <PackageSearch size={28} className="text-gray-400" />
        </div>
        <div>
          <p className="text-gray-700 font-medium mb-1">Sin resultados</p>
          <p className="text-gray-400 text-sm">{emptyMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
