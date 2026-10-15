// src/hooks/useFutbol.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useFutbol() {
  const [partidos, setPartidos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('futbol_cache')
      .select('*')
      .eq('id', 1)
      .single()
      .then(({ data }) => {
        setPartidos(data?.partidos ?? [])
        setLoading(false)
      })
  }, [])

  return { partidos, loading }
}