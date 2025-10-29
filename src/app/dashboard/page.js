"use client"

import React from 'react'
import { LayoutDashboard, TrendingUp, Zap, Users, Activity, Mail } from 'lucide-react'
import PendingInvitations from '@/components/PendingInvitations'

const Dashboard = () => {
    const quickStats = [
        { label: 'Active Projects', value: '12', icon: LayoutDashboard, color: 'from-purple-500 to-pink-500' },
        { label: 'Total Users', value: '1.2K', icon: Users, color: 'from-blue-500 to-cyan-500' },
        { label: 'Growth', value: '+23%', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
        { label: 'System Status', value: 'Active', icon: Activity, color: 'from-orange-500 to-red-500' },
    ]

    return (
        <div className="min-h-screen p-8">
            {/* Header */}
            <div className="mb-10 fade-in">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-1 h-16 bg-gradient-to-b from-[#7753ff] to-[#ec4899] rounded-full"></div>
                    <div>
                        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-[#7753ff] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <p className="text-[#737373] text-lg font-medium mt-2">Welcome back! Here's what's happening today ✨</p>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-4 gap-6 mb-10">
                {quickStats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-3xl p-8 hover-lift hover:border-purple-300 transition-all duration-300 group scale-in"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                            <stat.icon size={32} className="text-white" strokeWidth={2} />
                        </div>
                        <p className="text-sm font-bold text-[#737373] uppercase tracking-wider mb-2">{stat.label}</p>
                        <p className="text-4xl font-extrabold bg-gradient-to-r from-[#7753ff] to-[#ec4899] bg-clip-text text-transparent">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Pending Invitations Section */}
            <div className="mb-10 fade-in">
                <div className="flex items-center gap-3 mb-6">
                    <Mail size={32} className="text-[#7753ff]" strokeWidth={2} />
                    <div>
                        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#7753ff] to-[#ec4899] bg-clip-text text-transparent">
                            Pending Invitations
                        </h2>
                        <p className="text-[#737373] text-sm font-medium mt-1">
                            Review and respond to project invitations
                        </p>
                    </div>
                </div>
                <PendingInvitations />
            </div>

            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-[#7753ff] via-[#a855f7] to-[#ec4899] rounded-3xl p-12 shadow-2xl glow-effect-strong slide-in-bottom relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <Zap size={48} className="text-white" strokeWidth={2} />
                        <h2 className="text-4xl font-extrabold text-white">Get Started with Splash AI</h2>
                    </div>
                    <p className="text-white/90 text-lg font-medium max-w-3xl mb-8 leading-relaxed">
                        Unlock the power of AI to transform your creative projects. Create stunning visuals, manage your workflow, and bring your ideas to life faster than ever before.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-white text-[#7753ff] font-bold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                            Explore Features
                        </button>
                        <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/50 hover:bg-white/30 transition-all duration-300 hover:-translate-y-1">
                            View Documentation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard