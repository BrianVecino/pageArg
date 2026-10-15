// src/components/Cs2Widget.jsx
import { useCs2 } from '../hooks/useCs2'
import Card from './ui/Card'
import Loading from './ui/Loading'

export default function Cs2Widget() {
  const { partidos, loading } = useCs2()
  if (loading) return <Loading />

  return (
    <Card title="CS2">
      {partidos.map((p) => (
        <div key={p.id} className="py-2 border-b last:border-0">
          <p className="text-sm font-medium">{p.equipo1} vs {p.equipo2}</p>
          <p className="text-xs text-gray-500">
            {p.torneo} —{' '}
            {new Date(p.fecha).toLocaleString('es-AR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      ))}
    </Card>
  )
}