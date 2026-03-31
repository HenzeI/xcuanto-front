import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductImageGalleryProps {
  images: string[]
  alt: string
}

export function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
        Sin imágenes
      </div>
    )
  }

  const prev = () => setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 group">
        <img
          src={images[activeIdx]}
          alt={`${alt} - imagen ${activeIdx + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-700 shadow-md opacity-0 group-hover:opacity-100 hover:bg-white transition-all"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-700 shadow-md opacity-0 group-hover:opacity-100 hover:bg-white transition-all"
              aria-label="Imagen siguiente"
            >
              <ChevronRight size={18} />
            </button>
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeIdx ? 'bg-yellow-400 w-4' : 'bg-white/60 w-1.5 hover:bg-white/90'
                  }`}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                i === activeIdx
                  ? 'border-yellow-400 opacity-100'
                  : 'border-gray-200 opacity-60 hover:opacity-90'
              }`}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
