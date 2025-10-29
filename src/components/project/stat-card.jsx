export default function StatCard({ label, value, icon }) {
    return (
        <div className="bg-white border border-[#e6e6e6] rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
                <span className="text-[#737373] text-sm font-medium">{label}</span>
                <span className="text-xl">{icon}</span>
            </div>
            <div className="text-3xl font-bold text-[#1a1a1a]">{value}</div>
        </div>
    )
}
