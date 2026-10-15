// supabase/functions/update-futbol/index.ts
import { createClient } from 'jsr:@supabase/supabase-js@2'

const COMPETENCIAS = 'CL,PL,PD,SA,BL1,FL1,ELC'

Deno.serve(async () => {
  try {
    const apiKey = Deno.env.get('FOOTBALL_DATA_API_KEY')!

    const hoy = new Date()
    const desde = new Date(hoy)
    desde.setDate(desde.getDate() - 2)
    const hasta = new Date(hoy)
    hasta.setDate(hasta.getDate() + 7)

    const fmt = (d: Date) => d.toISOString().split('T')[0]

    const url = `https://api.football-data.org/v4/matches?competitions=${COMPETENCIAS}&dateFrom=${fmt(desde)}&dateTo=${fmt(hasta)}`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const res = await fetch(url, {
      headers: { 'X-Auth-Token': apiKey },
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (!res.ok) throw new Error(`football-data respondió ${res.status}`)
    const data = await res.json()

    const partidos = (data.matches ?? []).map((m: any) => ({
      id: m.id,
      fecha: m.utcDate,
      estado: m.status,
      competencia: m.competition.name,
      local: m.homeTeam.shortName ?? m.homeTeam.name,
      visitante: m.awayTeam.shortName ?? m.awayTeam.name,
      golesLocal: m.score.fullTime.home,
      golesVisitante: m.score.fullTime.away,
    }))

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { error } = await supabase
      .from('futbol_cache')
      .upsert({ id: 1, partidos, updated_at: new Date().toISOString() })

    if (error) throw error

    return new Response(JSON.stringify({ ok: true, cantidad: partidos.length }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})