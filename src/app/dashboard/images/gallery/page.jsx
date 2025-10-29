"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Grid, Download, Trash2, Filter, Calendar, Tag, RefreshCw, Loader2, X, Sparkles, AlertCircle } from "lucide-react"
import Image from "next/image"
import { apiService } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

export default function GalleryPage() {
    const router = useRouter()
    const { token } = useAuth()
    const [images, setImages] = useState([])
    const [filter, setFilter] = useState("all")
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [regenerateModal, setRegenerateModal] = useState({
        isOpen: false,
        image: null,
        prompt: '',
        loading: false,
        error: null
    })

    useEffect(() => {
        loadImages()
    }, [filter, page])

    const loadImages = async () => {
        setLoading(true)
        try {
            const filterType = filter === "all" ? null : filter
            const response = await apiService.getUserImages(filterType, page, 20)

            if (response.success) {
                setImages(response.images)
                setTotalPages(response.pagination.pages)
            }
        } catch (error) {
            console.error("Error loading images:", error)
        } finally {
            setLoading(false)
        }
    }

    const filteredImages = images

    const handleRegenerate = (image) => {
        setRegenerateModal({
            isOpen: true,
            image,
            prompt: '',
            loading: false,
            error: null
        })
    }

    const submitRegenerate = async () => {
        if (!regenerateModal.prompt.trim()) {
            setRegenerateModal(prev => ({
                ...prev,
                error: 'Please enter a prompt for regeneration'
            }))
            return
        }
        console.log(regenerateModal.prompt)

        setRegenerateModal(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await apiService.regenerateImage(
                regenerateModal.image.id,
                regenerateModal.prompt, token
            )

            if (response.success) {
                // Refresh the gallery
                await loadImages()

                // Close modal and show success
                setRegenerateModal({
                    isOpen: false,
                    image: null,
                    prompt: '',
                    loading: false,
                    error: null
                })

                alert('Image regenerated successfully!')
            } else {
                throw new Error(response.error || 'Regeneration failed')
            }
        } catch (error) {
            console.error("Error regenerating image:", error)
            setRegenerateModal(prev => ({
                ...prev,
                loading: false,
                error: error.response?.data?.error || error.message || 'Failed to regenerate image'
            }))
        }
    }

    const closeRegenerateModal = () => {
        if (!regenerateModal.loading) {
            setRegenerateModal({
                isOpen: false,
                image: null,
                prompt: '',
                loading: false,
                error: null
            })
        }
    }

    const typeLabels = {
        white_background: "White Background",
        background_change: "Background Replace",
        model_with_ornament: "AI Model",
        real_model_with_ornament: "Real Model",
        campaign_shot_advanced: "Campaign Shot",
    }

    const typeColors = {
        white_background: "bg-blue-100 text-blue-700",
        background_change: "bg-green-100 text-green-700",
        model_with_ornament: "bg-purple-100 text-purple-700",
        real_model_with_ornament: "bg-pink-100 text-pink-700",
        campaign_shot_advanced: "bg-orange-100 text-orange-700",
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fcfcfc] via-[#f8f7ff] to-[#f5f3ff] p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-gradient-to-r from-[#884cff] to-[#5a2fcf] rounded-2xl shadow-lg">
                                    <Grid className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1a1a1a] to-[#884cff] bg-clip-text text-transparent">
                                        My Generated Images
                                    </h1>
                                    <p className="text-[#737373] mt-2">View, download, and regenerate all your AI-generated images</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-3 px-6 py-3 text-[#884cff] font-semibold hover:bg-[#f0e6ff] rounded-xl transition-all duration-300"
                        >
                            <ChevronLeft size={20} />
                            Back
                        </button>
                    </div>

                    {/* Filter and Actions */}
                    <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                        <div className="flex items-center gap-4">
                            <Filter className="w-5 h-5 text-[#884cff]" />
                            <select
                                value={filter}
                                onChange={(e) => {
                                    setFilter(e.target.value)
                                    setPage(1)
                                }}
                                className="px-4 py-2 border border-[#e6e6e6] rounded-xl bg-white text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#884cff] focus:border-transparent"
                            >
                                <option value="all">All Types</option>
                                <option value="white_background">White Background</option>
                                <option value="background_change">Background Replace</option>
                                <option value="model_with_ornament">AI Model</option>
                                <option value="real_model_with_ornament">Real Model</option>
                                <option value="campaign_shot_advanced">Campaign Shot</option>
                            </select>
                            <span className="text-[#737373] font-medium">
                                {filteredImages.length} {filteredImages.length === 1 ? "image" : "images"}
                            </span>
                        </div>
                        <button
                            onClick={loadImages}
                            className="flex items-center gap-2 px-4 py-2 text-[#884cff] hover:bg-[#f0e6ff] rounded-xl transition-all font-semibold"
                        >
                            <RefreshCw size={18} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Gallery Grid */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 text-[#884cff] animate-spin mx-auto mb-4" />
                            <p className="text-[#737373]">Loading your images...</p>
                        </div>
                    </div>
                ) : filteredImages.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-16 shadow-xl border border-white/20 text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#884cff]/10 to-[#5a2fcf]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Grid className="w-12 h-12 text-[#884cff]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">No Images Yet</h3>
                        <p className="text-[#737373] mb-6">
                            {filter === "all"
                                ? "Start generating images to see them here"
                                : "No images found for this filter"}
                        </p>
                        <button
                            onClick={() => router.push("/dashboard/images")}
                            className="px-8 py-3 bg-gradient-to-r from-[#884cff] to-[#5a2fcf] text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg"
                        >
                            Start Creating
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredImages.map((image) => (
                                <div
                                    key={image.id}
                                    className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group"
                                >
                                    {/* Image */}
                                    <div className="relative h-64 bg-gray-100">
                                        <Image
                                            src={image.generated_image_url}
                                            alt={image.prompt || "Generated image"}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

                                        {/* Parent indicator */}
                                        {image.parent_image_id && (
                                            <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                                <RefreshCw size={12} />
                                                Regenerated
                                            </div>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Tag className="w-4 h-4 text-[#884cff]" />
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[image.type] || 'bg-gray-100 text-gray-700'}`}>
                                                {typeLabels[image.type] || image.type}
                                            </span>
                                        </div>

                                        {image.prompt && (
                                            <div className="mb-4">
                                                <p className="text-xs font-semibold text-gray-500 mb-1">Prompt:</p>
                                                <p className="text-sm text-[#737373] line-clamp-2">
                                                    {image.prompt}
                                                </p>
                                            </div>
                                        )}

                                        {image.created_at && (
                                            <div className="flex items-center gap-2 text-xs text-[#737373] mb-4">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(image.created_at).toLocaleDateString()}
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <a
                                                href={image.generated_image_url}
                                                download
                                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-[#884cff] to-[#5a2fcf] text-white rounded-xl text-sm font-semibold hover:scale-105 transition-all"
                                            >
                                                <Download size={14} />
                                                Download
                                            </a>
                                            <button
                                                onClick={() => handleRegenerate(image)}
                                                className="px-3 py-2 border-2 border-[#884cff] text-[#884cff] rounded-xl hover:bg-[#f0e6ff] transition-all flex items-center gap-1 text-sm font-semibold"
                                            >
                                                <RefreshCw size={14} />
                                                Regen
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-8 flex items-center justify-center gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 text-gray-700 font-medium">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Info Note */}
                <div className="mt-12 bg-green-50 border border-green-200 rounded-2xl p-6">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        ✨ Regeneration Feature
                    </h4>
                    <p className="text-green-700 text-sm">
                        Click the "Regen" button on any image to regenerate it with modifications. The system will combine your original prompt with the new one to maintain context while applying your changes!
                    </p>
                </div>
            </div>

            {/* Regenerate Modal */}
            {regenerateModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-r from-[#884cff] to-[#5a2fcf] rounded-xl">
                                        <RefreshCw className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#1a1a1a]">Regenerate Image</h2>
                                        <p className="text-sm text-gray-500">Modify and regenerate this image</p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeRegenerateModal}
                                    disabled={regenerateModal.loading}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
                                >
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Current Image */}
                            <div>
                                <p className="text-sm font-semibold text-gray-700 mb-3">Current Image:</p>
                                <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-gray-200">
                                    <Image
                                        src={regenerateModal.image.generated_image_url}
                                        alt="Current image"
                                        fill
                                        className="object-contain bg-gray-50"
                                    />
                                </div>
                            </div>

                            {/* Original Prompt */}
                            {regenerateModal.image.original_prompt && (
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <p className="text-xs font-semibold text-blue-900 mb-2">Original Prompt:</p>
                                    <p className="text-sm text-blue-700">
                                        {regenerateModal.image.original_prompt}
                                    </p>
                                </div>
                            )}

                            {/* New Prompt Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#884cff]" />
                                    What would you like to change?
                                </label>
                                <textarea
                                    value={regenerateModal.prompt}
                                    onChange={(e) => setRegenerateModal(prev => ({ ...prev, prompt: e.target.value }))}
                                    placeholder="E.g., 'Add more sparkle and brightness', 'Make it more vibrant', 'Add gold accents'..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#884cff] focus:border-transparent resize-none"
                                    rows="4"
                                    disabled={regenerateModal.loading}
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    💡 Your modification will be combined with the original prompt to maintain context
                                </p>
                            </div>

                            {/* Error Message */}
                            {regenerateModal.error && (
                                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                    <p className="text-red-700 text-sm">{regenerateModal.error}</p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <button
                                    onClick={closeRegenerateModal}
                                    disabled={regenerateModal.loading}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={submitRegenerate}
                                    disabled={regenerateModal.loading || !regenerateModal.prompt.trim()}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#884cff] to-[#5a2fcf] text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                                >
                                    {regenerateModal.loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Regenerating...
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCw className="w-5 h-5" />
                                            Regenerate Image
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Loading Info */}
                            {regenerateModal.loading && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                    <p className="text-yellow-800 text-sm text-center">
                                        ⏱️ This may take 10-30 seconds. Please wait...
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
