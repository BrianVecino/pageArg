import { useF1 } from '../hooks/useF1'
import Card from './ui/Card'
import Loading from './ui/Loading'
import ErrorMessage from './ui/ErrorMessage'

export default function F1Widget() {
    const { proximaCarrera, standings, loading, error } = useF1()

    if (loading) return <Loading />
    if (error) return <ErrorMessage message={error.message} />

    return (
        <Card title="Fórmula 1">
        {proximaCarrera && (
            <div className="mb-4">
            <p className="font-semibold">{proximaCarrera.raceName}</p>
            <p className="text-sm text-gray-500">
            {proximaCarrera.Circuit.circuitName} —{' '}
            {new Date(proximaCarrera.date).toLocaleDateString('es-AR', {
                day: 'numeric', month: 'long'
            })}
            </p>
        </div>
        )}

        <p className="font-semibold mb-2">Campeonato de pilotos</p>
        {standings.map((s) => (
            <div key={s.Driver.driverId} className="flex justify-between text-sm py-1">
            <span>{s.position}. {s.Driver.givenName} {s.Driver.familyName}</span>
            <span className="font-medium">{s.points} pts</span>
            </div>
        ))}
        </Card>
    )
}