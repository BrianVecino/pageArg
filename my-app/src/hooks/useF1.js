// src/hooks/useF1.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useF1() {
  const [proximaCarrera, setProximaCarrera] = useState(null)
  const [standings, setStandings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase
      .from('f1_cache')
      .select('*')
      .eq('id', 1)
      .single()
      .then(({ data, error }) => {
        if (error) {
          setError(error)
        } else {
          setProximaCarrera(data.proxima_carrera)
          setStandings(data.standings)
        }
        setLoading(false)
      })
  }, [])

  return { proximaCarrera, standings, loading, error }
}