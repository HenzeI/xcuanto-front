import { Link } from 'react-router-dom'
import { Star, ShoppingCart } from 'lucide-react'
import type { Product } from '../../types/product'
import { Badge } from '../ui/Badge'
import {
  formatPrice,
  formatDate,
  getConditionLabel,
  getConditionVariant,
} from '../../utils/formatters'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.imagenes[0] ?? ''

  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-400/10 hover:-translate-y-1 transition-all duration-300">
      <Link to={`/producto/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.nombre}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              Sin imagen
            </div>
          )}
          {product.destacado && (
            <div className="absolute top-2.5 left-2.5">
              <span className="inline-flex items-center gap-1 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                <Star size={10} fill="currentColor" />
                Destacado
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            <Badge variant="yellow">{product.categoria.nombre}</Badge>
            <Badge variant={getConditionVariant(product.estado)}>
              {getConditionLabel(product.estado)}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-auto group-hover:text-yellow-600 transition-colors">
            {product.nombre}
          </h3>

          {/* Price + date */}
          <div className="flex items-end justify-between mt-3 pt-3 border-t border-gray-100">
            <span className="text-yellow-500 font-black text-lg leading-none">
              {formatPrice(product.precio)}
            </span>
            <span className="text-gray-400 text-xs">{formatDate(product.fecha_publicacion)}</span>
          </div>
        </div>
      </Link>

      {/* Quick add to cart */}
      <div className="px-4 pb-4">
        <button
          onClick={(e) => e.preventDefault()}
          className="w-full flex items-center justify-center gap-2 bg-black hover:bg-yellow-400 text-white hover:text-black text-xs font-bold py-2.5 rounded-xl transition-all duration-200"
        >
          <ShoppingCart size={14} />
          Añadir a la cesta
        </button>
      </div>
    </div>
  )
}
