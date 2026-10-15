import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async () => {
  try {
    // 1. Top 5 criptos por market cap, en USD
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1',
      { headers: { 'x-cg-demo-api-key': Deno.env.get('COINGECKO_API_KEY')! } }
    )
    if (!res.ok) throw new Error(`CoinGecko respondió ${res.status}`)
    const data = await res.json()

    // 2. Quedarnos solo con lo que vamos a mostrar
    const monedas = data.map((c: any) => ({
      id: c.id,
      symbol: c.symbol,
      name: c.name,
      price: c.current_price,
      change24h: c.price_change_percentage_24h,
    }))

    // 3. Guardar (upsert) en Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { error } = await supabase
      .from('crypto_cache')
      .upsert({ id: 1, monedas, updated_at: new Date().toISOString() })

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