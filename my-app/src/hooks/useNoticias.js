// src/hooks/useNoticias.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useNoticias() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('noticias')
      .select('*')
      .order('publicado_en', { ascending: false })
      .limit(10)
      .then(({ data }) => {
        setNoticias(data ?? [])
        setLoading(false)
      })
  }, [])

  return { noticias, loading }
}