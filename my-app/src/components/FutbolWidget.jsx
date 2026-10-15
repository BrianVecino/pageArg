// src/components/FutbolWidget.jsx
import { useFutbol } from '../hooks/useFutbol'
import Card from './ui/Card'
import Loading from './ui/Loading'

export default function FutbolWidget() {
  const { partidos, loading } = useFutbol()
  if (loading) return <Loading />

  return (
    <Card title="Fútbol">
      {partidos.map((p) => (
        <div key={p.id} className="flex justify-between text-sm py-1 border-b last:border-0">
          <span>{p.local} vs {p.visitante}</span>
          <span className="font-medium">
            {p.estado === 'FINISHED'
              ? `${p.golesLocal} - ${p.golesVisitante}`
              : new Date(p.fecha).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
          </span>
        </div>
      ))}
    </Card>
  )
}