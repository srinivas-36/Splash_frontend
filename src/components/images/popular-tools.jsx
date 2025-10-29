// popular-tools.jsx
"use client"

import { Zap, ImageIcon, Star } from "lucide-react"
import { useRouter } from "next/navigation"

export function PopularTools() {
    const router = useRouter()

    const tools = [
        {
            icon: Zap,
            title: "Plain Background",
            description: "Clean product shots with custom backgrounds",
            popular: true,
            gradient: "from-purple-500 to-pink-500",
            path: "/dashboard/images/white-bg"
        },
        {
            icon: ImageIcon,
            title: "Background Replace",
            description: "AI-powered background transformation",
            popular: true,
            gradient: "from-blue-500 to-cyan-500",
            path: "/dashboard/images/replace-bg"
        },
    ]

    return (
        <div>
            <div className="flex items-center gap-3 mb-6 fade-in">
                <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#7753ff] to-[#ec4899] bg-clip-text text-transparent">Popular Tools</h2>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border-2 border-amber-200 shadow-sm">
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-amber-700">Most Used</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                {tools.map((tool, idx) => (
                    <div
                        key={idx}
                        className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover-lift cursor-pointer group relative overflow-hidden scale-in"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-full blur-2xl -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                        {tool.popular && (
                            <div className="absolute top-5 right-5">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border-2 border-amber-200 shadow-md">
                                    <Star size={14} className="text-amber-500 fill-amber-500" />
                                    <span className="text-xs font-bold text-amber-700">Popular</span>
                                </div>
                            </div>
                        )}
                        <div className="flex items-start gap-5">
                            <div className={`p-4 bg-gradient-to-br ${tool.gradient} rounded-2xl text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                <tool.icon size={32} strokeWidth={2} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-extrabold text-[#1a1a1a] text-xl mb-2 group-hover:text-[#7753ff] transition-colors">{tool.title}</h3>
                                <p className="text-sm text-[#737373] leading-relaxed font-medium mb-4">{tool.description}</p>
                                <button
                                    onClick={() => router.push(tool.path)}
                                    className="text-sm font-bold bg-gradient-to-r from-[#7753ff] to-[#ec4899] bg-clip-text text-transparent hover:from-[#884cff] hover:to-[#f472b6] transition-all group-hover:translate-x-2 inline-flex items-center gap-1"
                                >
                                    Try now <span className="text-lg">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}