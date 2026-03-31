import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

const categories = [
  { label: 'Juegos', slug: 'juegos' },
  { label: 'Móviles', slug: 'moviles' },
  { label: 'Informática', slug: 'informatica' },
  { label: 'Electrónica', slug: 'electronica' },
  { label: 'Accesorios', slug: 'accesorios' },
]

const discover = [
  { label: 'Inicio', href: '/' },
  { label: 'Catálogo', href: '/catalogo' },
  { label: 'Destacados', href: '/catalogo?destacado=true' },
]

const support = [
  { label: 'Centro de ayuda', href: '#' },
  { label: 'Contacto', href: '#' },
  { label: 'Términos de uso', href: '#' },
  { label: 'Privacidad', href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/logo.png"
                alt="¿X Cuánto?"
                className="h-12 w-auto"
                onError={(e) => {
                  const t = e.currentTarget
                  t.style.display = 'none'
                  const fb = t.nextElementSibling as HTMLElement | null
                  if (fb) fb.style.display = 'block'
                }}
              />
              <span className="hidden text-xl font-black">
                <span className="text-yellow-400">X</span>
                <span className="text-white">CUANTO??</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Compra, vende y empeña artículos de segunda mano de calidad.
              Electrónica, gaming, móviles y mucho más.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <ShieldCheck size={13} className="text-yellow-400" />
              <span>Compra segura garantizada</span>
            </div>
          </div>

          {/* Discover */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Tienda
            </h3>
            <ul className="space-y-2.5">
              {discover.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Categorías
            </h3>
            <ul className="space-y-2.5">
              {categories.map(({ label, slug }) => (
                <li key={slug}>
                  <Link
                    to={`/categoria/${slug}`}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Soporte
            </h3>
            <ul className="space-y-2.5">
              {support.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} ¿X Cuánto? Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-700">
            Compra · Vende · Empeña
          </p>
        </div>
      </div>
    </footer>
  )
}
