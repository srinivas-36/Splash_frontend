// stats-cards.jsx
import { CheckCircle, RotateCw, Camera, TrendingUp } from "lucide-react"

export function StatsCards() {
    const stats = [
        {
            title: "Images Generated",
            value: "3",
            subtitle: "+2 this week",
            icon: Camera,
            trend: "up",
            color: "from-blue-500 to-purple-500"
        },
        {
            title: "Avg. Processing Time",
            value: "23s",
            subtitle: "Faster than last week",
            icon: RotateCw,
            trend: "down",
            color: "from-green-500 to-teal-500"
        },
        {
            title: "Success Rate",
            value: "100%",
            subtitle: "Perfect results",
            icon: CheckCircle,
            trend: "up",
            color: "from-emerald-500 to-green-500"
        },
    ]

    return (
        <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl p-7 border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover-lift group scale-in"
                    style={{ animationDelay: `${idx * 100}ms` }}
                >
                    <div className="flex items-start justify-between mb-6">
                        <h3 className="text-[#737373] font-bold uppercase tracking-wider text-sm">{stat.title}</h3>
                        <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                            <stat.icon size={22} strokeWidth={2} />
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-5xl font-extrabold bg-gradient-to-r from-[#7753ff] to-[#ec4899] bg-clip-text text-transparent mb-2">{stat.value}</p>
                            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-1.5 rounded-lg">
                                <TrendingUp size={16} className={stat.trend === "up" ? "text-green-500" : "text-red-500"} />
                                <span className="text-xs text-[#737373] font-semibold">{stat.subtitle}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}