// supabase/functions/update-cs2/index.ts
import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async () => {
  try {
    const token = Deno.env.get('PANDASCORE_TOKEN')!
    const url = `https://api.pandascore.co/csgo/matches/upcoming?token=${token}&per_page=10`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)

    if (!res.ok) throw new Error(`PandaScore respondió ${res.status}`)
    const data = await res.json()

    const partidos = data.map((m: any) => ({
      id: m.id,
      fecha: m.scheduled_at,
      torneo: m.league?.name ?? m.serie?.full_name,
      equipo1: m.opponents?.[0]?.opponent?.name ?? 'TBD',
      equipo2: m.opponents?.[1]?.opponent?.name ?? 'TBD',
    }))

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { error } = await supabase
      .from('cs2_cache')
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