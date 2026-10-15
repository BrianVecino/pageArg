// supabase/functions/update-f1/index.ts
import { createClient } from 'jsr:@supabase/supabase-js@2'

const BASE = 'https://api.jolpi.ca/ergast/f1'

Deno.serve(async () => {
  try {
    // 1. Próxima carrera
    const resCarreras = await fetch(`${BASE}/current.json`)
    const dataCarreras = await resCarreras.json()
    const carreras = dataCarreras.MRData.RaceTable.Races
    const hoy = new Date()
    const proxima = carreras.find((r: any) => new Date(r.date) >= hoy)

    // 2. Standings de pilotos
    const resStandings = await fetch(`${BASE}/current/driverstandings.json`)
    const dataStandings = await resStandings.json()
    const lista = dataStandings.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? []
    const top5 = lista.slice(0, 5)

    // 3. Guardar (upsert) en Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { error } = await supabase
      .from('f1_cache')
      .upsert({
        id: 1,
        proxima_carrera: proxima ?? null,
        standings: top5,
        updated_at: new Date().toISOString(),
      })

    if (error) throw error

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})