// src/components/ui/Card.jsx
export default function Card({ title, children }) {
    return (
        <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">{title}</h2>
        {/* si la lista es muy larga, scrollea adentro de la card */}
        <div className="max-h-80 overflow-y-auto pr-1">{children}</div>
        </div>
    )
}