import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RefreshCw,
  BadgeCheck,
  ChevronRight,
  AlertCircle,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
} from 'lucide-react'
import { ProductImageGallery } from '../components/product/ProductImageGallery'
import { ProductCard } from '../components/product/ProductCard'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { PageSpinner } from '../components/ui/Spinner'
import { useProduct } from '../hooks/useProduct'
import {
  formatPrice,
  formatDateFull,
  getConditionLabel,
  getConditionVariant,
} from '../utils/formatters'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { product, related, loading, error } = useProduct(slug ?? '')
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [wishlist, setWishlist] = useState(false)

  function handleAddToCart() {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  if (loading) return <PageSpinner />

  if (error || !product) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-5">
          <AlertCircle size={28} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Producto no encontrado</h1>
        <p className="text-gray-500 mb-8">
          Este producto no está disponible o ha sido retirado de la tienda.
        </p>
        <Link to="/catalogo">
          <Button variant="primary">Explorar catálogo</Button>
        </Link>
      </div>
    )
  }

  // For the prototype, all products are in stock
  const enStock = true
  const tiempoEntrega = '2 - 4 días laborables'
  const garantia = product.estado === 'nuevo' || product.estado === 'como_nuevo'
    ? '12 meses de garantía'
    : '3 meses de garantía del vendedor'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-8 flex-wrap">
        <Link to="/" className="hover:text-yellow-600 transition-colors">Inicio</Link>
        <ChevronRight size={14} />
        <Link to="/catalogo" className="hover:text-yellow-600 transition-colors">Catálogo</Link>
        <ChevronRight size={14} />
        <Link
          to={`/categoria/${product.categoria.slug}`}
          className="hover:text-yellow-600 transition-colors"
        >
          {product.categoria.nombre}
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-700 truncate max-w-[200px]">{product.nombre}</span>
      </nav>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Gallery */}
        <div>
          <ProductImageGallery images={product.imagenes} alt={product.nombre} />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="yellow" size="md">{product.categoria.nombre}</Badge>
            <Badge variant={getConditionVariant(product.estado)} size="md">
              {getConditionLabel(product.estado)}
            </Badge>
            {product.destacado && (
              <Badge variant="purple" size="md">
                <Star size={11} fill="currentColor" className="mr-1" />
                Destacado
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {product.nombre}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black text-yellow-500">
              {formatPrice(product.precio)}
            </span>
            <span className="text-sm text-gray-400">IVA incluido</span>
          </div>

          {/* Stock status */}
          <div className="flex items-center gap-2">
            {enStock ? (
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span className="font-semibold text-emerald-700">En stock</span>
                <span className="text-gray-400">— disponible para envío inmediato</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-orange-500" />
                <span className="font-semibold text-orange-700">Bajo pedido</span>
              </div>
            )}
          </div>

          {/* Quantity + Add to cart */}
          <div className="border-t border-gray-100 pt-5">
            {/* Quantity selector */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-medium text-gray-700">Cantidad:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 hover:bg-gray-100 transition-colors text-gray-600"
                  disabled={quantity <= 1}
                >
                  <Minus size={15} />
                </button>
                <span className="w-10 text-center text-sm font-bold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2.5 hover:bg-gray-100 transition-colors text-gray-600"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-base transition-all duration-200 ${
                  addedToCart
                    ? 'bg-emerald-500 text-white'
                    : 'bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black shadow-md hover:shadow-yellow-300/40'
                }`}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle2 size={20} />
                    ¡Añadido a la cesta!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Añadir a la cesta
                  </>
                )}
              </button>

              <button className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-base bg-black hover:bg-gray-900 active:bg-gray-800 text-white transition-colors">
                Comprar ahora
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setWishlist((w) => !w)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                    wishlist
                      ? 'border-red-300 bg-red-50 text-red-600'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Heart size={16} className={wishlist ? 'fill-current' : ''} />
                  {wishlist ? 'En lista de deseos' : 'Lista de deseos'}
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                  <Share2 size={16} />
                  Compartir
                </button>
              </div>
            </div>
          </div>

          {/* Delivery, warranty, returns */}
          <div className="border border-gray-200 rounded-2xl divide-y divide-gray-100 overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3.5">
              <Truck size={18} className="text-yellow-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Entrega disponible</p>
                <p className="text-xs text-gray-500">{tiempoEntrega} · Envío estándar gratuito</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3.5">
              <BadgeCheck size={18} className="text-yellow-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Garantía incluida</p>
                <p className="text-xs text-gray-500">{garantia}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3.5">
              <RefreshCw size={18} className="text-yellow-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Devolución fácil</p>
                <p className="text-xs text-gray-500">15 días para devoluciones sin coste</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3.5">
              <ShieldCheck size={18} className="text-yellow-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Pago seguro</p>
                <p className="text-xs text-gray-500">Transacción cifrada y protegida</p>
              </div>
            </div>
          </div>

          {/* Published date */}
          <p className="text-xs text-gray-400">
            Publicado el {formatDateFull(product.fecha_publicacion)}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-3xl mb-16">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
          Descripción del producto
        </h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {product.descripcion}
        </p>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="border-t border-gray-200 pt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Productos relacionados</h2>
            <Link
              to={`/categoria/${product.categoria.slug}`}
              className="text-sm text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
            >
              Ver categoría →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
