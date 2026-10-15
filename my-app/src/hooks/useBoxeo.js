// src/hooks/useBoxeo.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useBoxeo() {
  const [peleas, setPeleas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const hace7dias = new Date()
    hace7dias.setDate(hace7dias.getDate() - 7)
    const desde = hace7dias.toISOString().split('T')[0]

    supabase
      .from('peleas')
      .select('*')
      .gte('fecha', desde)
      .order('fecha', { ascending: true })
      .limit(6)
      .then(({ data, error }) => {
        if (error) setError(error)
        else setPeleas(data ?? [])
        setLoading(false)
      })
  }, [])

  return { peleas, loading, error }
}