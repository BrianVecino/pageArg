// src/components/layout/DashboardGrid.jsx
export default function DashboardGrid({ children }) {
  return (
    <main className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 md:grid-cols-2 xl:grid-cols-3">
      {children}
    </main>
  )
}