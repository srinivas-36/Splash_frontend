// all-tools.jsx
"use client"

import { Zap, ImageIcon, Wand2, Users, Camera, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function AllTools() {
    const router = useRouter()

    const tools = [
        {
            icon: Zap,
            title: "Plain Background",
            description: "Clean product shots with custom backgrounds",
            status: "active",
            gradient: "from-purple-500 to-pink-500",
            path: "/dashboard/images/white-bg"
        },
        {
            icon: ImageIcon,
            title: "Background Replace",
            description: "AI-Powered background Transformation",
            status: "active",
            gradient: "from-blue-500 to-cyan-500",
            path: "/dashboard/images/replace-bg"
        },
        {
            icon: Wand2,
            title: "AI Model",
            description: "Generate with AI Model wearing Products",
            status: "active",
            gradient: "from-green-500 to-emerald-500",
            path: "/dashboard/images/ai-model"
        },
        {
            icon: Users,
            title: "Real Model",
            description: "Lifestyle shot with realistic models",
            status: "active",
            gradient: "from-orange-500 to-red-500",
            path: "/dashboard/images/real-model"
        },
        {
            icon: Camera,
            title: "Campaign Shots",
            description: "Marketing ready campaign Photography",
            status: "active",
            gradient: "from-indigo-500 to-purple-500",
            path: "/dashboard/images/campaign"
        },
    ]

    const getStatusBadge = (status) => {
        const styles = {
            active: "bg-green-50 text-green-700 border-green-200",
            new: "bg-blue-50 text-blue-700 border-blue-200",
            coming: "bg-gray-50 text-gray-700 border-gray-200"
        }

        const labels = {
            active: "Available",
            new: "New",
            coming: "Coming Soon"
        }

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
                {labels[status]}
            </span>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6 fade-in">
                <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#7753ff] to-[#ec4899] bg-clip-text text-transparent">All Tools</h2>
                <button className="flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-[#7753ff] to-[#ec4899] bg-clip-text text-transparent hover:from-[#884cff] hover:to-[#f472b6] transition-all group">
                    View all tools
                    <ArrowRight size={18} className="text-[#7753ff] group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
                {tools.map((tool, idx) => (
                    <div
                        key={idx}
                        className="bg-white/80 backdrop-blur-sm rounded-3xl p-7 border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover-lift cursor-pointer group scale-in"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <div className="flex items-start justify-between mb-5">
                            <div className={`p-4 bg-gradient-to-br ${tool.gradient} rounded-2xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                <tool.icon size={28} strokeWidth={2} />
                            </div>
                            {getStatusBadge(tool.status)}
                        </div>
                        <h3 className="font-extrabold text-[#1a1a1a] mb-3 text-xl group-hover:text-[#7753ff] transition-colors">{tool.title}</h3>
                        <p className="text-sm text-[#737373] mb-5 leading-relaxed font-medium">{tool.description}</p>
                        <button
                            onClick={() => tool.path && router.push(tool.path)}
                            disabled={tool.status === 'coming'}
                            className={`w-full py-3 px-5 rounded-xl text-sm font-bold transition-all duration-300 ${tool.status === 'coming'
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-purple-50 to-pink-50 text-[#7753ff] border-2 border-purple-200 hover:from-[#7753ff] hover:to-[#a855f7] hover:text-white hover:border-transparent shadow-sm hover:shadow-lg hover:-translate-y-0.5'
                                }`}
                        >
                            {tool.status === 'coming' ? 'Coming Soon' : 'Get Started'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}