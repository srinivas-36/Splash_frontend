"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Star, Sparkles, Upload, Image as ImageIcon, Settings, Loader2, CheckCircle, AlertCircle, RefreshCw, X, Download } from "lucide-react"
import { apiService } from "@/lib/api"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
const BackgroundReplaceForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        productImage: null,
        referenceImage: null,
        backgroundColor: "#ffffff",
        prompt: "",
    })
    const [productPreview, setProductPreview] = useState(null)
    const [referencePreview, setReferencePreview] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    const { token } = useAuth()
    const [regenerateModal, setRegenerateModal] = useState({
        isOpen: false,
        prompt: '',
        loading: false,
        error: null
    })

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
    const handleFileChange = (type, file) => {
        if (file) {
            setFormData((prev) => ({ ...prev, [type]: file }))
            const reader = new FileReader()
            reader.onloadend = () => {
                if (type === 'productImage') {
                    setProductPreview(reader.result)
                } else {
                    setReferencePreview(reader.result)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setResult(null)

        if (!formData.productImage) {
            setError("Please upload a product image")
            return
        }

        setIsLoading(true)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append("ornament_image", formData.productImage)
            if (formData.referenceImage) {
                formDataToSend.append("background_image", formData.referenceImage)
            }
            formDataToSend.append("background_color", formData.backgroundColor)
            formDataToSend.append("prompt", formData.prompt || "Change the background")

            const response = await apiService.changeBackground(formDataToSend, token)

            if (response.success) {
                setResult(response)
            } else {
                setError(response.error || "Failed to generate image")
            }
        } catch (err) {
            console.error("Error generating image:", err)
            setError(err.message || "An error occurred while generating the image")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fcfcfc] via-[#f8f7ff] to-[#f5f3ff] p-8">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-10 w-40 h-40 bg-[#7753ff]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-[#7753ff]/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-[#7753ff] rounded-2xl shadow-lg">
                            <ImageIcon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-[#7753ff]">
                                Background Replace
                            </h1>
                            <p className="text-[#737373] mt-2">Replace product backgrounds with AI-powered precision</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#7753ff]/10 rounded-full w-fit border border-[#7753ff]/20">
                        <Star className="w-4 h-4 text-[#7753ff]" />
                        <span className="text-sm font-medium text-[#7753ff]">Most Popular Tool</span>
                    </div>
                </div>

                {/* Form and Result Container */}
                <div className={`grid grid-cols-1 gap-8 transition-all duration-500 ${result ? 'lg:grid-cols-[4fr_6fr]' : 'lg:grid-cols-[7fr_3fr]'}`}>
                    {/* Form Container */}
                    <div className="space-y-8 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Product Image */}
                            <div>
                                <label className="block text-lg font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                                    <Upload className="w-5 h-5 text-[#7753ff]" />
                                    Product Image<span className="text-red-500 ml-1">*</span>
                                </label>
                                <div
                                    className={`border-2 border-dashed rounded-2xl p-6 transition-all duration-300 cursor-pointer ${isDragging
                                        ? "border-[#7753ff] bg-[#7753ff]/5"
                                        : "border-[#e6e6e6] hover:border-[#7753ff] hover:bg-[#7753ff]/5"
                                        }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onClick={() => document.getElementById("product-image").click()}
                                >
                                    <input
                                        type="file"
                                        id="product-image"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange('productImage', e.target.files[0])}
                                    />
                                    {productPreview ? (
                                        <div className="relative w-full h-40">
                                            <Image src={productPreview} alt="Product Preview" fill className="object-contain rounded-lg" />
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <Upload className="w-12 h-12 text-[#7753ff] mx-auto mb-3" />
                                            <p className="text-[#1a1a1a] font-medium mb-1">Upload Product Image</p>
                                            <p className="text-[#737373] text-sm">PNG, JPG up to 10MB</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Reference Background Image */}
                            <div>
                                <label className="block text-lg font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5 text-[#7753ff]" />
                                    Reference Background Image
                                </label>
                                <div
                                    className="border-2 border-dashed border-[#e6e6e6] rounded-2xl p-6 hover:border-[#884cff] hover:bg-[#884cff]/5 transition-all duration-300 cursor-pointer"
                                    onClick={() => document.getElementById("reference-image").click()}
                                >
                                    <input
                                        type="file"
                                        id="reference-image"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange('referenceImage', e.target.files[0])}
                                    />
                                    {referencePreview ? (
                                        <div className="relative w-full h-40">
                                            <Image src={referencePreview} alt="Reference Preview" fill className="object-contain rounded-lg" />
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <ImageIcon className="w-12 h-12 text-[#7753ff] mx-auto mb-3" />
                                            <p className="text-[#1a1a1a] font-medium mb-1">Upload Reference Image</p>
                                            <p className="text-[#737373] text-sm">Optional - for style reference</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Background Color */}
                            <div>
                                <label className="block text-lg font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                                    <Settings className="w-5 h-5 text-[#7753ff]" />
                                    Background Color
                                </label>
                                <div className="flex items-center gap-4 p-4 bg-[#f8f7ff] rounded-2xl border border-[#e6e6e6]">
                                    <input
                                        type="color"
                                        value={formData.backgroundColor}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, backgroundColor: e.target.value }))}
                                        className="w-16 h-16 rounded-2xl cursor-pointer border-2 border-white shadow-lg"
                                    />
                                    <input
                                        type="text"
                                        value={formData.backgroundColor}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, backgroundColor: e.target.value }))}
                                        className="flex-1 px-4 py-3 border border-[#e6e6e6] rounded-xl bg-white text-[#1a1a1a] font-mono focus:outline-none focus:ring-2 focus:ring-[#7753ff] focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Custom Prompt */}
                            <div>
                                <label className="block text-lg font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-[#7753ff]" />
                                    Custom Prompt (Optional)
                                </label>
                                <textarea
                                    value={formData.prompt}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, prompt: e.target.value }))}
                                    placeholder="Add specific instructions for background replacement..."
                                    className="w-full px-4 py-3 border border-[#e6e6e6] rounded-xl bg-white text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#7753ff] focus:border-transparent resize-none"
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
                            <div className="flex items-center justify-between pt-8 border-t border-[#e6e6e6]">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="flex items-center gap-3 px-6 py-3 text-[#7753ff] font-semibold hover:bg-[#7753ff]/10 rounded-xl transition-all duration-300 hover:scale-105"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex items-center gap-3 px-8 py-4 bg-[#7753ff] hover:bg-[#6a47e6] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-[#7753ff]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            Generate Image
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Result Preview */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
                            <CheckCircle className="w-6 h-6 text-[#7753ff]" />
                            Result Preview
                        </h3>
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-[500px] text-center">
                                <Loader2 className="w-16 h-16 text-[#7753ff] animate-spin mb-4" />
                                <p className="text-[#737373] text-lg">Replacing background...</p>
                                <p className="text-[#737373] text-sm mt-2">This may take a few moments</p>
                            </div>
                        ) : result ? (
                            <div className="space-y-6">
                                <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border-2 border-[#7753ff]/20">
                                    <Image
                                        src={result.generated_image_url}
                                        alt="Generated"
                                        fill
                                        className="object-contain bg-gray-50"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                                        <p className="text-green-700 font-semibold">✓ Background replaced successfully!</p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <a
                                                href={result.generated_image_url}
                                                download
                                                className="px-4 py-3 bg-[#7753ff] text-white rounded-xl font-semibold text-center hover:scale-105 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Download size={18} />
                                                Download
                                            </a>
                                            <button
                                                onClick={handleRegenerate}
                                                className="px-4 py-3 border-2 border-[#7753ff] text-[#7753ff] rounded-xl font-semibold hover:bg-[#7753ff]/10 transition-all flex items-center justify-center gap-2"
                                            >
                                                <RefreshCw size={18} />
                                                Regenerate
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setResult(null)
                                                setFormData({
                                                    productImage: null,
                                                    referenceImage: null,
                                                    backgroundColor: "#ffffff",
                                                    prompt: "",
                                                })
                                                setProductPreview(null)
                                                setReferencePreview(null)
                                            }}
                                            className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                                        >
                                            New Image
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[500px] text-center">
                                <div className="w-24 h-24 bg-[#7753ff]/10 rounded-full flex items-center justify-center mb-4">
                                    <Sparkles className="w-12 h-12 text-[#7753ff]" />
                                </div>
                                <p className="text-[#737373] text-lg">Your generated image will appear here</p>
                                <p className="text-[#737373] text-sm mt-2">Upload images and click generate to start</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Regenerate Modal */}
            {regenerateModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#7753ff] rounded-xl">
                                        <RefreshCw className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#1a1a1a]">Regenerate Image</h2>
                                        <p className="text-sm text-gray-500">Modify and regenerate your image</p>
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

                        <div className="p-6 space-y-6">
                            <div>
                                <p className="text-sm font-semibold text-gray-700 mb-3">Current Image:</p>
                                <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-gray-200">
                                    <Image
                                        src={result?.generated_image_url}
                                        alt="Current"
                                        fill
                                        className="object-contain bg-gray-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#7753ff]" />
                                    What would you like to change?
                                </label>
                                <textarea
                                    value={regenerateModal.prompt}
                                    onChange={(e) => setRegenerateModal(prev => ({ ...prev, prompt: e.target.value }))}
                                    placeholder="E.g., 'Make it brighter', 'Change to blue background', 'Add more details'..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#884cff] focus:border-transparent resize-none"
                                    rows="4"
                                    disabled={regenerateModal.loading}
                                />
                            </div>

                            {regenerateModal.error && (
                                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                    <p className="text-red-700 text-sm">{regenerateModal.error}</p>
                                </div>
                            )}

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
                                            Regenerate
                                        </>
                                    )}
                                </button>
                            </div>

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


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fcfcfc] via-[#f8f7ff] to-[#f5f3ff] p-8">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-10 w-40 h-40 bg-gradient-to-r from-[#884cff]/10 to-[#5a2fcf]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-gradient-to-r from-[#884cff]/5 to-[#5a2fcf]/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-[#7753ff] rounded-2xl shadow-lg">
                            <ImageIcon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-[#7753ff]">
                                Background Replace
                            </h1>
                            <p className="text-[#737373] mt-2">
                                Replace product backgrounds with AI-powered precision
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#7753ff]/10 rounded-full w-fit border border-[#7753ff]/20">
                        <Star className="w-4 h-4 text-[#7753ff]" />
                        <span className="text-sm font-medium text-[#7753ff]">Most Popular Tool</span>
                    </div>
                </div>

                {/* Main Content - Styled like first UI */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Card – Product & Options */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-border/40 p-6 lg:p-8 luxury-card">
                        {/* Card header style like first UI */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold tracking-tight">Product & Background Settings</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Upload your product and customize how the background should look
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Product Image */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                                    <Upload className="w-4 h-4 text-[#884cff]" />
                                    Product Image <span className="text-red-500 ml-1">*</span>
                                </label>

                                <div
                                    className={`border-2 border-dashed rounded-xl p-6 lg:p-8 text-center smooth-transition cursor-pointer ${isDragging
                                        ? "border-[#884cff] bg-[#884cff]/5"
                                        : "border-border hover:border-primary/60 hover:bg-primary/5"
                                        }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onClick={() => document.getElementById("product-image")?.click()}
                                >
                                    <input
                                        type="file"
                                        id="product-image"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleFileChange("productImage", e.target.files?.[0] || null)
                                        }
                                    />

                                    {productPreview ? (
                                        <div className="relative w-full h-40 lg:h-48">
                                            <Image
                                                src={productPreview}
                                                alt="Product Preview"
                                                fill
                                                className="object-contain rounded-lg"
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                                            <p className="text-sm font-medium text-foreground">
                                                Upload Product Image
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                PNG, JPG up to 10MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Reference Background Image */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-[#884cff]" />
                                    Reference Background Image
                                    <span className="text-xs text-muted-foreground">(Optional)</span>
                                </label>

                                <div
                                    className="border-2 border-dashed border-border rounded-xl p-6 lg:p-8 text-center hover:border-primary/60 hover:bg-primary/5 smooth-transition cursor-pointer"
                                    onClick={() => document.getElementById("reference-image")?.click()}
                                >
                                    <input
                                        type="file"
                                        id="reference-image"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleFileChange("referenceImage", e.target.files?.[0] || null)
                                        }
                                    />

                                    {referencePreview ? (
                                        <div className="relative w-full h-40 lg:h-48">
                                            <Image
                                                src={referencePreview}
                                                alt="Reference Preview"
                                                fill
                                                className="object-contain rounded-lg"
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <ImageIcon className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                                            <p className="text-sm font-medium text-foreground">
                                                Upload Reference Image
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Optional – for style reference
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Background Color */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                                    <Settings className="w-4 h-4 text-[#7753ff]" />
                                    Background Color
                                </label>
                                <div className="flex items-center gap-4 rounded-xl border border-border bg-[#f8f7ff] p-4">
                                    <input
                                        type="color"
                                        value={formData.backgroundColor}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                backgroundColor: e.target.value,
                                            }))
                                        }
                                        className="w-14 h-14 rounded-xl cursor-pointer border border-white shadow-sm"
                                    />
                                    <input
                                        type="text"
                                        value={formData.backgroundColor}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                backgroundColor: e.target.value,
                                            }))
                                        }
                                        className="flex-1 px-3 py-2 rounded-lg border border-border bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#884cff] focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Custom Prompt */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#7753ff]" />
                                    Custom Prompt (Optional)
                                </label>
                                <textarea
                                    value={formData.prompt}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, prompt: e.target.value }))
                                    }
                                    placeholder="E.g., 'Soft studio lighting with clean white background...'"
                                    className="w-full px-3 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#884cff] focus:border-transparent resize-none min-h-[100px]"
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-200">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="pt-4 flex items-center justify-between border-t border-border/60 mt-2">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-[#884cff] hover:text-[#5a2fcf] smooth-transition"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Back
                                </button>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-[#7753ff] hover:bg-[#6a47e6] text-white text-sm font-semibold shadow-md hover:shadow-lg smooth-transition disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4" />
                                            Generate Background (1 Credit)
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Card – Preview (styled like first UI) */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-border/40 p-6 lg:p-8 luxury-card">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-[#884cff]" />
                                    Preview
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    See your generated background in real-time
                                </p>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-[420px] text-center">
                                <div className="w-24 h-24 rounded-full bg-[#7753ff]/10 flex items-center justify-center mb-4">
                                    <Loader2 className="w-10 h-10 text-[#7753ff] animate-spin" />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Replacing background with AI magic...
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    This usually completes in a few seconds
                                </p>
                            </div>
                        ) : result ? (
                            <div className="space-y-5">
                                <div className="aspect-[4/5] rounded-xl overflow-hidden border border-border bg-muted relative">
                                    <Image
                                        src={result.generated_image_url}
                                        alt="Generated"
                                        fill
                                        className="object-contain bg-gray-50"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700">
                                        ✓ Background replaced successfully!
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <a
                                            href={result.generated_image_url}
                                            download
                                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-[#7753ff] hover:bg-[#6a47e6] text-white shadow-md hover:shadow-lg smooth-transition"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </a>
                                        <button
                                            onClick={handleRegenerate}
                                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border border-[#884cff] text-[#884cff] hover:bg-[#f3e9ff] smooth-transition"
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                            Regenerate
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setResult(null);
                                            setFormData({
                                                productImage: null,
                                                referenceImage: null,
                                                backgroundColor: "#ffffff",
                                                prompt: "",
                                            });
                                            setProductPreview(null);
                                            setReferencePreview(null);
                                        }}
                                        className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold border border-border hover:bg-muted smooth-transition"
                                    >
                                        New Image
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[420px] text-center">
                                <div className="aspect-square w-32 rounded-2xl bg-[#7753ff]/5 flex items-center justify-center mb-4">
                                    <Sparkles className="w-10 h-10 text-muted-foreground" />
                                </div>
                                <p className="text-sm font-medium text-foreground">
                                    Your generated image will appear here
                                </p>
                                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                                    Upload a product image, optionally add a reference and prompt, then click
                                    <span className="font-semibold"> Generate Background</span>.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Regenerate Modal – you can keep this mostly as-is */}
            {regenerateModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-border p-6 rounded-t-3xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#7753ff] rounded-xl">
                                        <RefreshCw className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold">Regenerate Image</h2>
                                        <p className="text-xs text-muted-foreground">
                                            Modify the background and generate an updated version
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeRegenerateModal}
                                    disabled={regenerateModal.loading}
                                    className="p-2 hover:bg-muted rounded-xl transition-colors disabled:opacity-50"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <p className="text-xs font-medium text-muted-foreground mb-2">
                                    Current Image
                                </p>
                                <div className="relative w-full h-64 rounded-xl overflow-hidden border border-border bg-muted">
                                    {result && (
                                        <Image
                                            src={result.generated_image_url}
                                            alt="Current"
                                            fill
                                            className="object-contain bg-gray-50"
                                        />
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#7753ff]" />
                                    What would you like to change?
                                </label>
                                <textarea
                                    value={regenerateModal.prompt}
                                    onChange={(e) =>
                                        setRegenerateModal((prev) => ({
                                            ...prev,
                                            prompt: e.target.value,
                                        }))
                                    }
                                    placeholder="E.g., 'Make the background brighter', 'Change to pastel blue', 'Add soft shadows'..."
                                    className="w-full px-3 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#884cff] focus:border-transparent resize-none min-h-[110px]"
                                    rows={4}
                                    disabled={regenerateModal.loading}
                                />
                            </div>

                            {regenerateModal.error && (
                                <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                    <p className="text-sm text-red-700">{regenerateModal.error}</p>
                                </div>
                            )}

                            <div className="flex gap-3 pt-4 border-t border-border/70">
                                <button
                                    onClick={closeRegenerateModal}
                                    disabled={regenerateModal.loading}
                                    className="flex-1 px-4 py-3 border border-border rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted smooth-transition disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={submitRegenerate}
                                    disabled={regenerateModal.loading || !regenerateModal.prompt.trim()}
                                    className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold bg-[#7753ff] hover:bg-[#6a47e6] text-white shadow-md hover:shadow-lg smooth-transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {regenerateModal.loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Regenerating...
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCw className="w-4 h-4" />
                                            Regenerate
                                        </>
                                    )}
                                </button>
                            </div>

                            {regenerateModal.loading && (
                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                                    <p className="text-xs text-amber-800 text-center">
                                        ⏱️ This may take a few seconds. Please don&apos;t close the window.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );


}

export default BackgroundReplaceForm
