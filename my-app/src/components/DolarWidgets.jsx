import { useDolar } from '../hooks/useDolar'
import Card from './ui/Card'
import Loading from './ui/Loading'
import ErrorMessage from './ui/ErrorMessage'
import { formatCurrency } from '../utils/formatCurrency'

export default function DolarWidget() {
    const { data, loading, error } = useDolar()

    if (loading) return <Loading />
    if (error) return <ErrorMessage message={error.message} />

    const ultimo = data[data.length - 1]

    return (
        <Card title={`Dólar ${ultimo.tipo}`}>
        <p><strong>Compra:</strong> {formatCurrency(ultimo.compra)}</p>
        <p><strong>Venta:</strong> {formatCurrency(ultimo.venta)}</p>
        </Card>
    )
}