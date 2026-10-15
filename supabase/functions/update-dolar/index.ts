import { createClient } from 'jsr:@supabase/supabase-js@2'


Deno.serve(async () => {
  try {
    // 1. Traer el dato real de dolarapi.com
    const res = await fetch('https://dolarapi.com/v1/dolares/blue')
    if (!res.ok) throw new Error('No se pudo obtener el dólar')
    const { compra, venta } = await res.json()

    // 2. Conectarse a Supabase como admin (service_role)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // 3. Insertar el nuevo valor en la tabla
    const { error } = await supabase
      .from('dolar')
      .insert({ tipo: 'blue', compra, venta })

    if (error) throw error

    return new Response(
      JSON.stringify({ ok: true, compra, venta }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

