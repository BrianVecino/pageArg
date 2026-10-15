import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useCrypto() {
    const [monedas, setMonedas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        supabase
        .from('crypto_cache')
        .select('*')
        .eq('id', 1)
        .single()
        .then(({ data, error }) => {
            if (error) setError(error)
            else setMonedas(data.monedas)
            setLoading(false)
        })
    }, [])

    return { monedas, loading, error }
}