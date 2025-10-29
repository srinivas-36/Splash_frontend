// header.jsx
"use client"

import { ChevronRight, Sparkles, Grid } from "lucide-react"
import { useRouter } from "next/navigation"

export function Header() {
    const router = useRouter()

    return (
        <div className="relative bg-gradient-to-r from-white via-purple-50/40 to-pink-50/30 border-b-2 border-purple-100 px-8 py-8 shadow-lg overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl -z-10"></div>

            <div className="flex items-center gap-4 mb-5 fade-in">
                <div className="relative float-animation">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7753ff] via-[#a855f7] to-[#ec4899] flex items-center justify-center shadow-xl glow-effect">
                        <Sparkles size={24} className="text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-3 border-white shadow-lg pulse-glow"></div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="scale-in">
                    <h1 className="text-4xl font-extrabold text-[#1a1a1a] mb-3">
                        Welcome to Glo AI, <span className="bg-gradient-to-r from-[#7753ff] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">Ryagati</span>
                    </h1>
                    <p className="text-[#737373] text-lg max-w-2xl font-medium leading-relaxed">
                        Create stunning product photography with our AI-powered tools. Transform your products with just a few clicks. ✨
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push("/dashboard/images/gallery")}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 shadow-lg hover-lift hover:from-purple-100 hover:to-pink-100 transition-all"
                    >
                        <Grid size={18} className="text-[#7753ff]" />
                        <span className="text-sm font-bold bg-gradient-to-r from-[#7753ff] to-[#ec4899] bg-clip-text text-transparent">Gallery</span>
                    </button>
                    <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 shadow-lg hover-lift">
                        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg"></div>
                        <span className="text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">System Active</span>
                    </div>
                </div>
            </div>
        </div>
    )
}