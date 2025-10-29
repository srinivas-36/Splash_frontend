"use client"

import { useState, useEffect } from "react"
import { Users, TrendingUp, Hash, Sparkles } from "lucide-react"
import { apiService } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

export function ModelUsageStats({ collectionId, className = "" }) {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { token } = useAuth()

    useEffect(() => {
        if (collectionId) {
            loadStats()
        }
    }, [collectionId])

    const loadStats = async () => {
        try {
            setLoading(true)
            const data = await apiService.getModelUsageStats(collectionId, token)
            if (data.success) {
                setStats(data)
            } else {
                setError(data.error || "Failed to load model statistics")
            }
        } catch (err) {
            console.error("Error loading model stats:", err)
            setError(err.message || "Failed to load model statistics")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className={`bg-white rounded-2xl border border-gray-200 p-6 shadow-sm ${className}`}>
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={`bg-white rounded-2xl border border-red-200 p-6 shadow-sm ${className}`}>
                <div className="text-center py-4">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            </div>
        )
    }

    if (!stats || stats.total_models_used === 0) {
        return (
            <div className={`bg-white rounded-2xl border border-gray-200 p-6 shadow-sm ${className}`}>
                <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">No model usage yet</p>
                    <p className="text-sm text-gray-500 mt-1">
                        Generate images to see model statistics
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className={`bg-white rounded-2xl border border-gray-200 p-6 shadow-sm ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Model Usage Statistics</h3>
                        <p className="text-sm text-gray-500">Track which models were used for generation</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-full">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">Analytics</span>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Hash className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-purple-700 font-medium">Total Models Used</p>
                            <p className="text-2xl font-bold text-purple-900">{stats.total_models_used}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-700 font-medium">Total Generations</p>
                            <p className="text-2xl font-bold text-blue-900">{stats.total_generations}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Model Breakdown */}
            {stats.models_breakdown && stats.models_breakdown.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Model Breakdown</h4>
                    <div className="space-y-3">
                        {stats.models_breakdown.map((model, index) => {
                            const isAI = model.type === 'ai'
                            const percentage = ((model.usage_count / stats.total_generations) * 100).toFixed(1)

                            return (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${isAI
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'bg-green-100 text-green-700'
                                                }`}>
                                                {isAI ? '🤖 AI Model' : '👤 Real Model'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {model.name || `${model.type} Model`}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {model.usage_count} generation{model.usage_count !== 1 ? 's' : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-gray-900">{percentage}%</p>
                                            <p className="text-xs text-gray-500">of total</p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all ${isAI
                                                    ? 'bg-gradient-to-r from-purple-500 to-purple-600'
                                                    : 'bg-gradient-to-r from-green-500 to-green-600'
                                                }`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Info Note */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-xs text-blue-800 font-medium mb-1">📊 How it works</p>
                <p className="text-xs text-blue-700">
                    These statistics show which models were used for initial generation and regeneration.
                    Each unique model is counted separately, even when used multiple times with different products.
                </p>
            </div>
        </div>
    )
}

