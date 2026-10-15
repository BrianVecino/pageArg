import { useCrypto } from '../hooks/useCrypto'
import Card from './ui/Card'
import Loading from './ui/Loading'
import ErrorMessage from './ui/ErrorMessage'

const usd = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
})

export default function CryptoWidget() {
    const { monedas, loading, error } = useCrypto()

    if (loading) return <Loading />
    if (error) return <ErrorMessage message={error.message} />

    return (
        <Card title="Crypto">
        {monedas.map((m) => (
            <div key={m.id} className="flex justify-between text-sm py-1">
            <span className="uppercase font-medium">{m.symbol}</span>
            <span>
                {usd.format(m.price)}{' '}
                <span className={m.change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                {m.change24h >= 0 ? '▲' : '▼'} {Math.abs(m.change24h).toFixed(1)}%
            </span>
            </span>
            </div>
        ))}
        </Card>
    )
}