// supabase/functions/update-noticias/index.ts
import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async () => {
  try {
    const apiKey = Deno.env.get('NEWSDATA_API_KEY')!
    const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=ar&language=es`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 segundos

    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)

    if (!res.ok) throw new Error(`NewsData respondió ${res.status}`)
    const data = await res.json()

    const noticias = (data.results ?? []).map((n: any) => ({
      titulo: n.title,
      link: n.link,
      fuente: n.source_name ?? n.source_id,
      publicado_en: n.pubDate ? new Date(n.pubDate).toISOString() : null,
    }))

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { error } = await supabase
      .from('noticias')
      .upsert(noticias, { onConflict: 'link', ignoreDuplicates: true })

    if (error) throw error

    return new Response(JSON.stringify({ ok: true, cantidad: noticias.length }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})