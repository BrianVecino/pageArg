// src/components/layout/Header.jsx
export default function Header({ secciones }) {
  const hoy = new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-2xl font-bold">Panorama</h1>
          <span className="text-sm text-gray-500">{hoy}</span>
        </div>

        <nav className="mt-3 flex gap-4 overflow-x-auto text-sm">
          {secciones.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="whitespace-nowrap text-gray-600 hover:text-black"
            >
              {s.nombre}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}