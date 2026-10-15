import Header from "./components/ui/layout/Header"
import Footer from "./components/ui/layout/Footer"
import DashboardGrid from "./components/ui/layout/DashboardGrid"

import DolarWidget from "./components/dolarWidgets"
import F1Widget from './components/F1Widgets'
import CryptoWidget from "./components/CryptoWidget"
import NoticiasWidget from "./components/NoticiasWidget"
import FutbolWidget from "./components/FutbolWidget"
import Cs2Widget from "./components/Cs2Widget"
import BoxeoWidget from "./components/BoxeoWidget"

const SECCIONES = [
  { id: 'dolar', nombre: 'Dólar', Componente: DolarWidget },
  { id: 'f1', nombre: 'F1', Componente: F1Widget },
  { id: 'crypto', nombre: 'Crypto', Componente: CryptoWidget },
  { id: 'noticias', nombre: 'Noticias', Componente: NoticiasWidget, destacada: true },
  { id: 'futbol', nombre: 'Fútbol', Componente: FutbolWidget },
  { id: 'cs2', nombre: 'CS2', Componente: Cs2Widget },
  { id: 'boxeo', nombre: 'Boxeo', Componente: BoxeoWidget },
]


export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header secciones={SECCIONES} />

      <DashboardGrid>
        {SECCIONES.map(({ id, Componente, destacada }) => (
          <section
            key={id}
            id={id}
            className={`scroll-mt-32 ${destacada ? 'xl:col-span-2' : ''}`}
          >
            <Componente />
          </section>
        ))}
      </DashboardGrid>

      <Footer />
    </div>
  )
}