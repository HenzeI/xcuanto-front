import type { Product } from '../types/product'
import { mockCategories } from './categories'

const [juegos, moviles, informatica, electronica, accesorios] = mockCategories
const U = 'https://images.unsplash.com'

export const mockProducts: Product[] = [
  // ── JUEGOS ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    nombre: 'PlayStation 5 Edición Estándar',
    slug: 'playstation-5-edicion-estandar',
    precio: 449,
    descripcion:
      'PS5 en perfecto estado. Viene con dos mandos DualSense, todos los cables originales y la caja. Solo 8 meses de uso. Sin arañazos ni golpes. Se vende por cambio de plataforma a PC gaming.',
    categoria: juegos,
    estado: 'como_nuevo',
    imagenes: [
      `${U}/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800&q=80`,
      `${U}/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: true,
    fecha_publicacion: '2024-02-15T10:30:00Z',
    vendedor: { id: 1, nombre: 'Carlos M.', valoracion: 4.8, total_ventas: 23, fecha_registro: '2022-03-10T00:00:00Z' },
    vistas: 342,
  },
  {
    id: 2,
    nombre: 'Nintendo Switch OLED Blanca',
    slug: 'nintendo-switch-oled-blanca',
    precio: 269,
    descripcion:
      'Nintendo Switch OLED modelo blanco. En muy buen estado, pantalla impecable sin arañazos. Incluye base, cable HDMI, adaptador de corriente y 2 Joy-Con. Caja original.',
    categoria: juegos,
    estado: 'buen_estado',
    imagenes: [
      `${U}/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80`,
      `${U}/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-02-10T14:20:00Z',
    vendedor: { id: 2, nombre: 'Ana L.', valoracion: 4.5, total_ventas: 7, fecha_registro: '2023-01-15T00:00:00Z' },
    vistas: 189,
  },
  {
    id: 3,
    nombre: 'Xbox Series X 1TB',
    slug: 'xbox-series-x-1tb',
    precio: 389,
    descripcion:
      'Xbox Series X con 1TB de almacenamiento SSD de alta velocidad. Incluye mando inalámbrico, cable HDMI 2.1 y cable de alimentación. Perfecto funcionamiento, sin rayaduras.',
    categoria: juegos,
    estado: 'como_nuevo',
    imagenes: [
      `${U}/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-02-08T09:15:00Z',
    vendedor: { id: 3, nombre: 'Javier R.', valoracion: 5.0, total_ventas: 41, fecha_registro: '2021-06-20T00:00:00Z' },
    vistas: 156,
  },
  {
    id: 4,
    nombre: 'The Legend of Zelda: Tears of the Kingdom',
    slug: 'zelda-tears-of-the-kingdom',
    precio: 52,
    descripcion:
      'Juego físico para Nintendo Switch. Cartucho en perfecto estado, caja sin daños y con manual de instrucciones. Completado al 100%. Envío inmediato.',
    categoria: juegos,
    estado: 'buen_estado',
    imagenes: [
      `${U}/photo-1551103782-8ab9e23e68a6?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-02-05T16:45:00Z',
    vendedor: { id: 4, nombre: 'María S.', valoracion: 4.2, total_ventas: 5, fecha_registro: '2023-08-01T00:00:00Z' },
    vistas: 78,
  },

  // ── MÓVILES ──────────────────────────────────────────────────────────────────
  {
    id: 5,
    nombre: 'iPhone 14 Pro 256GB Negro Espacial',
    slug: 'iphone-14-pro-256gb-negro',
    precio: 849,
    descripcion:
      'iPhone 14 Pro en excelente estado. Batería al 94%. Incluye caja original, cable USB-C Lightning y funda Apple transparente. Desbloqueado para cualquier operadora. Sin golpes ni arañazos visibles.',
    categoria: moviles,
    estado: 'como_nuevo',
    imagenes: [
      `${U}/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80`,
      `${U}/photo-1592950630581-03335bc2b46f?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: true,
    fecha_publicacion: '2024-02-14T11:00:00Z',
    vendedor: { id: 5, nombre: 'Pablo T.', valoracion: 4.9, total_ventas: 18, fecha_registro: '2022-11-05T00:00:00Z' },
    vistas: 521,
  },
  {
    id: 6,
    nombre: 'Samsung Galaxy S23 Ultra 512GB',
    slug: 'samsung-galaxy-s23-ultra-512gb',
    precio: 699,
    descripcion:
      'Samsung Galaxy S23 Ultra con 512GB de almacenamiento y S-Pen incluido. Cargador rápido 45W y caja original. Pantalla sin arañazos, cuerpo impecable. Color Phantom Black.',
    categoria: moviles,
    estado: 'buen_estado',
    imagenes: [
      `${U}/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-02-12T13:30:00Z',
    vendedor: { id: 6, nombre: 'Laura G.', valoracion: 4.7, total_ventas: 12, fecha_registro: '2022-05-20T00:00:00Z' },
    vistas: 298,
  },
  {
    id: 7,
    nombre: 'Google Pixel 7 Pro 128GB',
    slug: 'google-pixel-7-pro-128gb',
    precio: 419,
    descripcion:
      'Pixel 7 Pro con cámara de 50MP y teleobjetivo 5x. Android puro con actualizaciones garantizadas hasta 2028. Batería en buen estado, caja y accesorios originales.',
    categoria: moviles,
    estado: 'buen_estado',
    imagenes: [
      `${U}/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-02-03T08:00:00Z',
    vendedor: { id: 7, nombre: 'Diego F.', valoracion: 4.3, total_ventas: 3, fecha_registro: '2023-10-12T00:00:00Z' },
    vistas: 143,
  },
  {
    id: 8,
    nombre: 'OnePlus 11 256GB Eternal Green',
    slug: 'oneplus-11-256gb-eternal-green',
    precio: 349,
    descripcion:
      'OnePlus 11 en color verde. Carga rápida SuperVOOC 100W incluida. Pequeño arañazo apenas visible en la parte trasera. Pantalla AMOLED perfecta. IMEI libre de cualquier compañía.',
    categoria: moviles,
    estado: 'aceptable',
    imagenes: [
      `${U}/photo-1573148169893-c51b0e70e460?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-01-28T17:20:00Z',
    vendedor: { id: 8, nombre: 'Raúl H.', valoracion: 3.9, total_ventas: 2, fecha_registro: '2024-01-10T00:00:00Z' },
    vistas: 92,
  },

  // ── INFORMÁTICA ──────────────────────────────────────────────────────────────
  {
    id: 9,
    nombre: 'MacBook Pro M2 14" 16GB/512GB',
    slug: 'macbook-pro-m2-14-16gb-512gb',
    precio: 1799,
    descripcion:
      'MacBook Pro con chip M2 Pro, 16GB RAM unificada y 512GB SSD. 6 meses de uso, batería al 98% de salud. Incluye cargador MagSafe 96W y caja original. Pantalla Liquid Retina XDR sin defectos.',
    categoria: informatica,
    estado: 'como_nuevo',
    imagenes: [
      `${U}/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80`,
      `${U}/photo-1611186871525-7b5e73e4f3b4?auto=format&fit=crop&w=800&q=80`,
      `${U}/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: true,
    fecha_publicacion: '2024-02-13T09:45:00Z',
    vendedor: { id: 9, nombre: 'Sofía P.', valoracion: 5.0, total_ventas: 8, fecha_registro: '2022-08-15T00:00:00Z' },
    vistas: 487,
  },
  {
    id: 10,
    nombre: 'Dell XPS 15 9530 i7/32GB/1TB',
    slug: 'dell-xps-15-9530-i7-32gb-1tb',
    precio: 1249,
    descripcion:
      'Dell XPS 15 (2023) con Intel Core i7-13700H, 32GB RAM LPDDR5 y 1TB NVMe SSD. Pantalla OLED 3.5K táctil. Adaptador USB-C 130W incluido. Ideal para profesionales creativos.',
    categoria: informatica,
    estado: 'buen_estado',
    imagenes: [
      `${U}/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-02-07T14:30:00Z',
    vendedor: { id: 10, nombre: 'Andrés V.', valoracion: 4.6, total_ventas: 15, fecha_registro: '2021-12-01T00:00:00Z' },
    vistas: 234,
  },
  {
    id: 11,
    nombre: 'Teclado Mecánico Keychron K2 V2 (Red)',
    slug: 'teclado-keychron-k2-v2-red',
    precio: 72,
    descripcion:
      'Teclado mecánico Keychron K2 V2 con switches rojos lineales. Layout 75%, retroiluminación RGB. Conexión USB-C y Bluetooth 5.1 multidispositivo. El favorito de los programadores.',
    categoria: informatica,
    estado: 'buen_estado',
    imagenes: [
      `${U}/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=800&q=80`,
      `${U}/photo-1595044778572-6bf8e41e72de?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-01-30T10:00:00Z',
    vendedor: { id: 11, nombre: 'Marta B.', valoracion: 4.4, total_ventas: 6, fecha_registro: '2023-03-22T00:00:00Z' },
    vistas: 112,
  },
  {
    id: 12,
    nombre: 'Monitor LG UltraFine 4K 27" (27UL850)',
    slug: 'monitor-lg-ultrafine-4k-27',
    precio: 329,
    descripcion:
      'Monitor LG 27" 4K UHD IPS con HDR10. Puerto USB-C 60W para carga del portátil. Sin píxeles muertos garantizados. Incluye cables HDMI y DisplayPort. Soporte ergonómico con pivote.',
    categoria: informatica,
    estado: 'buen_estado',
    imagenes: [
      `${U}/photo-1527443224154-c4a573d5f5ef?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-01-25T12:15:00Z',
    vendedor: { id: 12, nombre: 'Fernando Q.', valoracion: 4.8, total_ventas: 31, fecha_registro: '2020-09-05T00:00:00Z' },
    vistas: 176,
  },

  // ── ELECTRÓNICA ──────────────────────────────────────────────────────────────
  {
    id: 13,
    nombre: 'Sony WH-1000XM5 Auriculares ANC',
    slug: 'sony-wh-1000xm5-auriculares-anc',
    precio: 219,
    descripcion:
      'Auriculares Sony con cancelación de ruido líder en la industria. Autonomía de 30 horas. Incluye estuche de transporte rígido, cable USB-C y adaptador de avión. Color negro. LDAC compatible.',
    categoria: electronica,
    estado: 'como_nuevo',
    imagenes: [
      `${U}/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80`,
      `${U}/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: true,
    fecha_publicacion: '2024-02-11T15:00:00Z',
    vendedor: { id: 13, nombre: 'Elena C.', valoracion: 4.9, total_ventas: 27, fecha_registro: '2021-04-18T00:00:00Z' },
    vistas: 395,
  },
  {
    id: 14,
    nombre: 'Sony Alpha 7 IV Cuerpo',
    slug: 'sony-alpha-7-iv-cuerpo',
    precio: 2150,
    descripcion:
      'Cámara mirrorless full-frame Sony A7 IV. Solo 12.000 disparos en el obturador. Incluye batería NP-FZ100, cargador dual, correa y caja original. IBIS de 5 ejes, vídeo 4K 60fps.',
    categoria: electronica,
    estado: 'buen_estado',
    imagenes: [
      `${U}/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80`,
      `${U}/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-02-06T10:30:00Z',
    vendedor: { id: 14, nombre: 'Roberto K.', valoracion: 4.7, total_ventas: 9, fecha_registro: '2022-02-14T00:00:00Z' },
    vistas: 267,
  },
  {
    id: 15,
    nombre: 'GoPro Hero 11 Black + Kit Accesorios',
    slug: 'gopro-hero-11-black-accesorios',
    precio: 275,
    descripcion:
      'GoPro Hero 11 Black con sensor de 27MP y vídeo 5.3K60. Incluye batería extra, cargador dual, 2 montajes adhesivos, soporte de muñeca y microSD SanDisk 64GB. Perfecta para deportes y viajes.',
    categoria: electronica,
    estado: 'como_nuevo',
    imagenes: [
      `${U}/photo-1622455823784-3a1e9f8ad60b?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-01-22T09:00:00Z',
    vendedor: { id: 15, nombre: 'Natalia O.', valoracion: 4.5, total_ventas: 4, fecha_registro: '2023-06-30T00:00:00Z' },
    vistas: 148,
  },
  {
    id: 16,
    nombre: 'Amazon Echo Dot 5ª Gen con Reloj',
    slug: 'amazon-echo-dot-5-gen-reloj',
    precio: 32,
    descripcion:
      'Echo Dot de 5ª generación con pantalla de reloj incorporada. Color antracita. Buen estado de uso, funciona perfectamente con Alexa. Ideal para controlar el hogar inteligente.',
    categoria: electronica,
    estado: 'aceptable',
    imagenes: [
      `${U}/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-01-18T14:00:00Z',
    vendedor: { id: 16, nombre: 'Tomás N.', valoracion: 4.0, total_ventas: 11, fecha_registro: '2022-07-08T00:00:00Z' },
    vistas: 63,
  },

  // ── ACCESORIOS ───────────────────────────────────────────────────────────────
  {
    id: 17,
    nombre: 'AirPods Pro 2ª Generación (USB-C)',
    slug: 'airpods-pro-2gen-usbc',
    precio: 185,
    descripcion:
      'AirPods Pro 2ª Gen con estuche de carga MagSafe USB-C. Cancelación de ruido activa mejorada y modo transparencia adaptable. Salud de batería al 85%. Incluye todas las puntas de silicona.',
    categoria: accesorios,
    estado: 'como_nuevo',
    imagenes: [
      `${U}/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80`,
      `${U}/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-02-09T11:30:00Z',
    vendedor: { id: 17, nombre: 'Carmen W.', valoracion: 4.6, total_ventas: 19, fecha_registro: '2021-11-22T00:00:00Z' },
    vistas: 203,
  },
  {
    id: 18,
    nombre: 'Cargador MagSafe Apple 15W',
    slug: 'cargador-magsafe-apple-15w',
    precio: 28,
    descripcion:
      'Cargador MagSafe original de Apple con carga inalámbrica de hasta 15W. Cable de 1 metro. Compatible con iPhone 12 y posteriores. Perfecto estado, sin desgaste en el cable.',
    categoria: accesorios,
    estado: 'buen_estado',
    imagenes: [
      `${U}/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-01-20T16:00:00Z',
    vendedor: { id: 18, nombre: 'Luis E.', valoracion: 4.1, total_ventas: 8, fecha_registro: '2023-02-14T00:00:00Z' },
    vistas: 87,
  },
  {
    id: 19,
    nombre: 'Hub USB-C 7 en 1 Anker 552',
    slug: 'hub-usbc-7-en-1-anker-552',
    precio: 42,
    descripcion:
      'Hub Anker 7 en 1 con HDMI 4K@30Hz, 3x USB-A 3.0, USB-C PD 85W, lector SD y microSD. Compatible con MacBook, iPad Pro y cualquier portátil USB-C. En caja sin estrenar.',
    categoria: accesorios,
    estado: 'nuevo',
    imagenes: [
      `${U}/photo-1583394293214-5835a3f99e0a?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-02-01T09:30:00Z',
    vendedor: { id: 19, nombre: 'Patricia Z.', valoracion: 4.8, total_ventas: 44, fecha_registro: '2020-05-11T00:00:00Z' },
    vistas: 134,
  },
  {
    id: 20,
    nombre: 'Mando DualSense PS5 Blanco',
    slug: 'mando-dualsense-ps5-blanco',
    precio: 54,
    descripcion:
      'Mando DualSense original para PS5 en color blanco. Gatillos adaptativos y vibración háptica funcionando perfectamente. Batería en buen estado. Cable USB-C incluido.',
    categoria: accesorios,
    estado: 'buen_estado',
    imagenes: [
      `${U}/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-01-15T13:00:00Z',
    vendedor: { id: 20, nombre: 'Álvaro X.', valoracion: 4.4, total_ventas: 7, fecha_registro: '2023-04-05T00:00:00Z' },
    vistas: 99,
  },
  {
    id: 21,
    nombre: 'Ratón Logitech MX Master 3S',
    slug: 'raton-logitech-mx-master-3s',
    precio: 68,
    descripcion:
      'Ratón inalámbrico Logitech MX Master 3S con rueda electromagnética de alta precisión. 8000 DPI, silencioso. Bluetooth y receptor USB Bolt incluido. Color grafito. Perfecto para productividad.',
    categoria: accesorios,
    estado: 'como_nuevo',
    imagenes: [
      `${U}/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80`,
    ],
    destacado: false,
    fecha_publicacion: '2024-02-04T10:45:00Z',
    vendedor: { id: 21, nombre: 'Beatriz Y.', valoracion: 4.7, total_ventas: 16, fecha_registro: '2022-01-03T00:00:00Z' },
    vistas: 167,
  },
]
