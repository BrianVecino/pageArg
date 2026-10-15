// src/hooks/useDolar.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useDolar() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // 1. Traer los datos iniciales
    supabase
      .from('dolar')
      .select('*')
      .then(({ data, error }) => {
        if (error) setError(error)
        else setData(data)
        setLoading(false)
      })

    // 2. Suscribirse a cambios en tiempo real
    const channel = supabase
      .channel('dolar-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'dolar' },
        () => {
          // cuando hay un cambio, volvemos a pedir los datos
          supabase
            .from('dolar')
            .select('*')
            .then(({ data }) => setData(data))
        }
      )
      .subscribe()

    // 3. Limpieza al desmontar el componente
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { data, loading, error }
}