// src/components/NoticiasWidget.jsx
import { useNoticias } from '../hooks/useNoticias'
import Card from './ui/Card'
import Loading from './ui/Loading'

export default function NoticiasWidget() {
  const { noticias, loading } = useNoticias()
  if (loading) return <Loading />

  return (
    <Card title="Noticias">
      {noticias.map((n) => (
        <a
          key={n.link}
          href={n.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block py-2 border-b last:border-0 hover:underline"
        >
          <p className="text-sm font-medium">{n.titulo}</p>
          <span className="text-xs text-gray-500">{n.fuente}</span>
        </a>
      ))}
    </Card>
  )
}