"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Sparkles, Upload, Award, Zap, Loader2, CheckCircle, AlertCircle, X, Download, RefreshCw, Cpu, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { apiService } from "@/lib/api"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"

export default function CampaignForm() {
    const router = useRouter()
    const { token } = useAuth()
    const [formData, setFormData] = useState({
        modelType: "ai_model",
        modelImage: null,
        ornamentImages: [],
        ornamentNames: [],
        themeImages: [],
        prompt: "",
    })
    const [modelPreview, setModelPreview] = useState(null)
    const [ornamentPreviews, setOrnamentPreviews] = useState([])
    const [themePreviews, setThemePreviews] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    const [regenerateModal, setRegenerateModal] = useState({
        isOpen: false,
        prompt: '',
        loading: false,
        error: null
    })

    const handleModelImageChange = (file) => {
        if (file) {
            setFormData((prev) => ({ ...prev, modelImage: file }))
            const reader = new FileReader()
            reader.onloadend = () => {
                setModelPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleOrnamentImagesChange = (files) => {
        const fileArray = Array.from(files)
        setFormData((prev) => ({
            ...prev,
            ornamentImages: [...prev.ornamentImages, ...fileArray],
            ornamentNames: [...prev.ornamentNames, ...fileArray.map((f) => f.name)],
        }))

        fileArray.forEach((file) => {
            const reader = new FileReader()
            reader.onloadend = () => {
                setOrnamentPreviews((prev) => [...prev, reader.result])
            }
            reader.readAsDataURL(file)
        })
    }

    const handleThemeImagesChange = (files) => {
        const fileArray = Array.from(files)
        setFormData((prev) => ({ ...prev, themeImages: [...prev.themeImages, ...fileArray] }))

        fileArray.forEach((file) => {
            const reader = new FileReader()
            reader.onloadend = () => {
                setThemePreviews((prev) => [...prev, reader.result])
            }
            reader.readAsDataURL(file)
        })
    }

    const removeOrnament = (index) => {
        setFormData((prev) => ({
            ...prev,
            ornamentImages: prev.ornamentImages.filter((_, i) => i !== index),
            ornamentNames: prev.ornamentNames.filter((_, i) => i !== index),
        }))
        setOrnamentPreviews((prev) => prev.filter((_, i) => i !== index))
    }

    const removeTheme = (index) => {
        setFormData((prev) => ({
            ...prev,
            themeImages: prev.themeImages.filter((_, i) => i !== index),
        }))
        setThemePreviews((prev) => prev.filter((_, i) => i !== index))
    }

    const handleRegenerate = () => {
        setRegenerateModal({
            isOpen: true,
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

        setRegenerateModal(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await apiService.regenerateImage(
                result.mongo_id,
                regenerateModal.prompt,
                token
            )

            if (response.success) {
                setResult({
                    ...result,
                    generated_image_url: response.generated_image_url,
                    mongo_id: response.mongo_id,
                    prompt: response.combined_prompt
                })

                setRegenerateModal({
                    isOpen: false,
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
                prompt: '',
                loading: false,
                error: null
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setResult(null)

        if (formData.ornamentImages.length === 0) {
            setError("Please upload at least one ornament image")
            return
        }

        if (formData.modelType === "real_model" && !formData.modelImage) {
            setError("Please upload a model image for Real Model option")
            return
        }

        setIsLoading(true)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append("model_type", formData.modelType)
            if (formData.modelImage) {
                formDataToSend.append("model_image", formData.modelImage)
            }
            formData.ornamentImages.forEach((image) => {
                formDataToSend.append("ornament_images", image)
            })
            formData.ornamentNames.forEach((name) => {
                formDataToSend.append("ornament_names", name)
            })
            formData.themeImages.forEach((image) => {
                formDataToSend.append("theme_images", image)
            })
            formDataToSend.append("prompt", formData.prompt || "Create professional campaign shot")

            const response = await apiService.generateCampaignShot(formDataToSend, token)

            if (response.status === "success") {
                setResult(response)
            } else {
                setError(response.message || "Failed to generate campaign shot")
            }
        } catch (err) {
            console.error("Error generating campaign shot:", err)
            setError(err.message || "An error occurred while generating the campaign shot")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fcfcfc] via-[#f8f7ff] to-[#f5f3ff] p-8">
            <div className="max-w-7xl mx-auto">
                {/* Enhanced Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-[#7753ff] rounded-2xl shadow-lg">
                            <Award className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-[#7753ff]">
                                Campaign Shots
                            </h1>
                            <p className="text-[#737373] mt-2">Create stunning marketing visuals with AI-powered campaign shots</p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={() => setFormData((prev) => ({ ...prev, modelType: "ai_model" }))}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${formData.modelType === "ai_model"
                                ? "bg-white/90 backdrop-blur-md text-[#7753ff] shadow-[0_8px_32px_0_rgba(119,83,255,0.3)] border border-white/20"
                                : "bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-gray-200/50 shadow-sm"
                                }`}
                        >
                            <Cpu className="w-5 h-5" />
                            AI Model
                        </button>
                        <button
                            onClick={() => setFormData((prev) => ({ ...prev, modelType: "real_model" }))}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${formData.modelType === "real_model"
                                ? "bg-white/90 backdrop-blur-md text-[#7753ff] shadow-[0_8px_32px_0_rgba(119,83,255,0.3)] border border-white/20"
                                : "bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-gray-200/50 shadow-sm"
                                }`}
                        >
                            <Users className="w-5 h-5" />
                            Real Model
                        </button>
                    </div>
                </div>

                {/* Form and Result Container */}
                <div className={`grid grid-cols-1 gap-8 transition-all duration-500 ${result ? 'lg:grid-cols-[4fr_6fr]' : 'lg:grid-cols-[7fr_3fr]'}`}>
                    {/* Form */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Model Image (if real_model) */}
                            {formData.modelType === "real_model" && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#7753ff] rounded-full"></div>
                                        Model Image<span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <div
                                        className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer"
                                        onClick={() => document.getElementById("model-image").click()}
                                    >
                                        <input
                                            type="file"
                                            id="model-image"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleModelImageChange(e.target.files[0])}
                                        />
                                        {modelPreview ? (
                                            <div className="relative w-full h-32">
                                                <Image src={modelPreview} alt="Model Preview" fill className="object-contain rounded-lg" />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center gap-3 text-center">
                                                <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#7753ff] transition-colors" />
                                                <p className="text-sm text-gray-500">Upload model image</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Ornament Images */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#7753ff] rounded-full"></div>
                                    Ornament Images<span className="text-red-500 ml-1">*</span>
                                </label>
                                <div
                                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer"
                                    onClick={() => document.getElementById("ornament-images").click()}
                                >
                                    <input
                                        type="file"
                                        id="ornament-images"
                                        className="hidden"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => handleOrnamentImagesChange(e.target.files)}
                                    />
                                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                                        <Upload className="w-8 h-8 text-gray-400 group-hover:text-purple-500 transition-colors" />
                                        <p className="text-sm text-gray-500">Upload one or more ornaments (multiple selection)</p>
                                    </div>
                                </div>
                                {ornamentPreviews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-3 gap-3">
                                        {ornamentPreviews.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <div className="relative w-full h-24 rounded-lg overflow-hidden border border-gray-200">
                                                    <Image src={preview} alt={`Ornament ${index + 1}`} fill className="object-cover" />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeOrnament(index)}
                                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Theme Images */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#7753ff] rounded-full"></div>
                                    Theme/Style Images (Optional)
                                </label>
                                <div
                                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer"
                                    onClick={() => document.getElementById("theme-images").click()}
                                >
                                    <input
                                        type="file"
                                        id="theme-images"
                                        className="hidden"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => handleThemeImagesChange(e.target.files)}
                                    />
                                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                                        <Upload className="w-8 h-8 text-gray-400 group-hover:text-purple-500 transition-colors" />
                                        <p className="text-sm text-gray-500">Upload theme reference images (optional)</p>
                                    </div>
                                </div>
                                {themePreviews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-3 gap-3">
                                        {themePreviews.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <div className="relative w-full h-24 rounded-lg overflow-hidden border border-gray-200">
                                                    <Image src={preview} alt={`Theme ${index + 1}`} fill className="object-cover" />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeTheme(index)}
                                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Campaign Instructions */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#7753ff]" />
                                    Campaign Instructions (Optional)
                                </label>
                                <textarea
                                    value={formData.prompt}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, prompt: e.target.value }))}
                                    placeholder="Add specific instructions for your campaign shot..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7753ff] focus:border-transparent resize-none shadow-sm"
                                    rows="3"
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="flex items-center gap-2 text-[#7753ff] font-semibold hover:text-[#6a47e6] transition-colors group"
                                >
                                    <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                                    Back
                                </button>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-[#7753ff] hover:bg-[#6a47e6] text-white px-8 py-3 rounded-xl flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            Generate Campaign Shots
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Result Preview */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
                            <CheckCircle className="w-6 h-6 text-[#7753ff]" />
                            Campaign Shot Preview
                        </h3>
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-[600px] text-center">
                                <Loader2 className="w-16 h-16 text-[#7753ff] animate-spin mb-4" />
                                <p className="text-[#737373] text-lg">Creating your campaign shot...</p>
                                <p className="text-[#737373] text-sm mt-2">This may take up to 45 seconds</p>
                            </div>
                        ) : result ? (
                            <div className="space-y-6">
                                <div className="relative w-full h-[550px] rounded-2xl overflow-hidden border-2 border-[#7753ff]/20">
                                    <Image
                                        src={result.generated_image_url}
                                        alt="Campaign Shot"
                                        fill
                                        className="object-contain bg-gray-50"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                                        <p className="text-green-700 font-semibold">✓ Campaign shot generated successfully!</p>
                                        {result.mongo_id && (
                                            <p className="text-green-600 text-xs mt-1">Image ID: {result.mongo_id}</p>
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <a
                                                href={result.generated_image_url}
                                                download
                                                className="px-4 py-3 bg-[#7753ff] text-white rounded-xl font-semibold text-center hover:scale-105 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Download size={16} />
                                                Download
                                            </a>
                                            <button
                                                onClick={handleRegenerate}
                                                className="px-4 py-3 border-2 border-[#7753ff] text-[#7753ff] hover:bg-[#7753ff]/10 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                                            >
                                                <RefreshCw size={16} />
                                                Regenerate
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setResult(null)
                                                setFormData({
                                                    modelType: "ai_model",
                                                    modelImage: null,
                                                    ornamentImages: [],
                                                    ornamentNames: [],
                                                    themeImages: [],
                                                    prompt: "",
                                                })
                                                setModelPreview(null)
                                                setOrnamentPreviews([])
                                                setThemePreviews([])
                                            }}
                                            className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                                        >
                                            New Campaign
                                        </button>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                        <p className="text-blue-700 text-sm flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" />
                                            Click "Regenerate" to modify this image with new instructions!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[600px] text-center">
                                <div className="w-24 h-24 bg-[#7753ff]/10 rounded-full flex items-center justify-center mb-4">
                                    <Award className="w-12 h-12 text-[#7753ff]" />
                                </div>
                                <p className="text-[#737373] text-lg">Your campaign shot will appear here</p>
                                <p className="text-[#737373] text-sm mt-2">Upload ornaments and configure settings to start</p>
                            </div>
                        )}
                    </div>
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
                                    <div className="p-2 bg-[#7753ff] rounded-xl">
                                        <RefreshCw className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#1a1a1a]">Regenerate Campaign Shot</h2>
                                        <p className="text-sm text-gray-500">Modify and regenerate this campaign shot</p>
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
                                        src={result.generated_image_url}
                                        alt="Current image"
                                        fill
                                        className="object-contain bg-gray-50"
                                    />
                                </div>
                            </div>

                            {/* Original Prompt */}
                            {result.prompt && (
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <p className="text-xs font-semibold text-blue-900 mb-2">Original Prompt:</p>
                                    <p className="text-sm text-blue-700">{result.prompt}</p>
                                </div>
                            )}

                            {/* New Prompt Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#7753ff]" />
                                    What would you like to change?
                                </label>
                                <textarea
                                    value={regenerateModal.prompt}
                                    onChange={(e) => setRegenerateModal(prev => ({ ...prev, prompt: e.target.value }))}
                                    placeholder="E.g., 'Add more lighting', 'Make it more vibrant', 'Change the background color'..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7753ff] focus:border-transparent resize-none"
                                    rows="4"
                                    disabled={regenerateModal.loading}
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    💡 Your modification will be applied to regenerate the campaign shot
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
                                    className="flex-1 px-6 py-3 bg-[#7753ff] text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
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
                                        ⏱️ This may take up to 45 seconds. Please wait...
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
