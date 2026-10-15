// src/components/BoxeoWidget.jsx
import { useBoxeo } from '../hooks/useBoxeo'
import Card from './ui/Card'
import Loading from './ui/Loading'
import ErrorMessage from './ui/ErrorMessage'

export default function BoxeoWidget() {
  const { peleas, loading, error } = useBoxeo()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <Card title="Boxeo">
      {peleas.length === 0 && (
        <p className="text-sm text-gray-500">No hay peleas cargadas por ahora.</p>
      )}
      {peleas.map((p) => (
        <div key={p.id} className="py-2 border-b last:border-0">
          <p className="text-sm font-medium">
            {p.peleador_1} vs {p.peleador_2}
          </p>
          <p className="text-xs text-gray-500">
            {p.categoria} —{' '}
            {new Date(p.fecha + 'T12:00:00').toLocaleDateString('es-AR', {
              day: 'numeric',
              month: 'long',
            })}
          </p>
          {p.estado === 'finalizada' && p.resultado && (
            <p className="text-xs text-green-600 mt-1">{p.resultado}</p>
          )}
        </div>
      ))}
    </Card>
  )
}