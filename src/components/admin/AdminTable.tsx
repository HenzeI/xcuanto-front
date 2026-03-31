import { useState } from 'react'
import { Eye, Pencil, Trash2, Search, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { formatPrice, formatDateFull, getConditionLabel, getConditionVariant } from '../../utils/formatters'

interface AdminTableProps {
  products: Product[]
}

export function AdminTable({ products }: AdminTableProps) {
  const [search, setSearch] = useState('')
  const [deletedIds, setDeletedIds] = useState<Set<number>>(new Set())

  const filtered = products.filter(
    (p) =>
      !deletedIds.has(p.id) &&
      (p.nombre.toLowerCase().includes(search.toLowerCase()) ||
        p.categoria.nombre.toLowerCase().includes(search.toLowerCase())),
  )

  function handleDelete(id: number) {
    if (window.confirm('¿Eliminar este producto? (simulado)')) {
      setDeletedIds((prev) => new Set([...prev, id]))
    }
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 p-5 border-b border-zinc-800">
        <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 flex-1 max-w-sm">
          <Search size={15} className="text-zinc-500 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="bg-transparent text-sm text-white placeholder-zinc-600 outline-none w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Filter size={14} />
            Filtrar
          </Button>
          <Button variant="primary" size="sm">
            + Nuevo
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider py-3 px-5">
                Producto
              </th>
              <th className="text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider py-3 px-3">
                Categoría
              </th>
              <th className="text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider py-3 px-3">
                Precio
              </th>
              <th className="text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider py-3 px-3">
                Estado
              </th>
              <th className="text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider py-3 px-3">
                Publicado
              </th>
              <th className="text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider py-3 px-5">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {filtered.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-zinc-800/30 transition-colors group"
              >
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imagenes[0] ?? ''}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover bg-zinc-800 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate max-w-[180px]">
                        {product.nombre}
                      </p>
                      <p className="text-xs text-zinc-600">{product.vistas ?? 0} vistas</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-3">
                  <Badge variant="yellow">{product.categoria.nombre}</Badge>
                </td>
                <td className="py-4 px-3">
                  <span className="text-yellow-400 font-bold text-sm">
                    {formatPrice(product.precio)}
                  </span>
                </td>
                <td className="py-4 px-3">
                  <Badge variant={getConditionVariant(product.estado)}>
                    {getConditionLabel(product.estado)}
                  </Badge>
                </td>
                <td className="py-4 px-3">
                  <span className="text-zinc-500 text-xs">
                    {formatDateFull(product.fecha_publicacion)}
                  </span>
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to={`/producto/${product.slug}`}>
                      <button
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-700 transition-colors"
                        title="Ver"
                      >
                        <Eye size={15} />
                      </button>
                    </Link>
                    <button
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-yellow-400 hover:bg-zinc-700 transition-colors"
                      title="Editar"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-700 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-zinc-600 text-sm">
            No se encontraron productos que coincidan con la búsqueda.
          </div>
        )}
      </div>

      {/* Pagination row */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-zinc-800">
        <p className="text-xs text-zinc-600">
          Mostrando {filtered.length} de {products.length - deletedIds.size} productos
        </p>
        <div className="flex gap-1">
          <button className="px-3 py-1.5 text-xs rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors">
            Anterior
          </button>
          <button className="px-3 py-1.5 text-xs rounded-lg bg-yellow-400 text-zinc-950 font-semibold">
            1
          </button>
          <button className="px-3 py-1.5 text-xs rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  )
}
