"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Sparkles, Upload, Cpu, Ruler, Zap, Loader2, CheckCircle, AlertCircle, RefreshCw, X, Download } from "lucide-react"
import { apiService } from "@/lib/api"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { OrnamentSelection } from "@/components/images/OrnamentSelection"
import toast from "react-hot-toast"

export default function AIModelForm() {
    const router = useRouter()
    const { token } = useAuth()
    const [formData, setFormData] = useState({
        ornamentImage: null,
        poseImage: null,
        prompt: "",
        measurements: "",
    })
    const [ornamentType, setOrnamentType] = useState("")
    const [ornamentMeasurements, setOrnamentMeasurements] = useState({})
    const [ornamentPreview, setOrnamentPreview] = useState(null)
    const [posePreview, setPosePreview] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    const [regenerateModal, setRegenerateModal] = useState({
        isOpen: false,
        prompt: '',
        loading: false,
        error: null
    })

    const handleFileChange = (type, file) => {
        if (file) {
            setFormData((prev) => ({ ...prev, [type]: file }))
            const reader = new FileReader()
            reader.onloadend = () => {
                if (type === 'ornamentImage') {
                    setOrnamentPreview(reader.result)
                } else {
                    setPosePreview(reader.result)
                }
            }
            reader.readAsDataURL(file)
        }
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
                regenerateModal.prompt, token
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

                toast.success('Image regenerated successfully!')
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

        if (!formData.ornamentImage) {
            setError("Please upload an ornament image")
            return
        }

        setIsLoading(true)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append("ornament_image", formData.ornamentImage)
            if (formData.poseImage) {
                formDataToSend.append("pose_style", formData.poseImage)
            }
            formDataToSend.append("prompt", formData.prompt || "Generate an AI model wearing this ornament")
            formDataToSend.append("measurements", formData.measurements || "")
            formDataToSend.append("ornament_type", ornamentType || "")
            formDataToSend.append("ornament_measurements", JSON.stringify(ornamentMeasurements))

            const response = await apiService.generateModelWithOrnament(formDataToSend, token)

            if (response.status === "success") {
                setResult(response)
            } else {
                setError(response.message || "Failed to generate image")
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
            <div className="max-w-6xl mx-auto">
                {/* Enhanced Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg">
                            <Cpu className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1a1a1a] to-purple-600 bg-clip-text text-transparent">
                                AI Model Generation
                            </h1>
                            <p className="text-[#737373] mt-2">Generate AI models wearing your products with advanced AI</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full w-fit border border-purple-200">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-600">AI Powered</span>
                    </div>
                </div>

                {/* Form and Result Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Ornament Image */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
                                    Ornament/Product Image<span className="text-red-500 ml-1">*</span>
                                </label>
                                <div
                                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer"
                                    onClick={() => document.getElementById("ornament-input").click()}
                                >
                                    <input
                                        type="file"
                                        id="ornament-input"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange('ornamentImage', e.target.files[0])}
                                    />
                                    {ornamentPreview ? (
                                        <div className="relative w-full h-40">
                                            <Image src={ornamentPreview} alt="Ornament Preview" fill className="object-contain rounded-lg" />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center gap-3 text-center">
                                            <Upload className="w-8 h-8 text-gray-400 group-hover:text-purple-500 transition-colors" />
                                            <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 15MB</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Pose Style */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
                                    Pose Style Reference (Optional)
                                </label>
                                <div
                                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer"
                                    onClick={() => document.getElementById("pose-input").click()}
                                >
                                    <input
                                        type="file"
                                        id="pose-input"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange('poseImage', e.target.files[0])}
                                    />
                                    {posePreview ? (
                                        <div className="relative w-full h-40">
                                            <Image src={posePreview} alt="Pose Preview" fill className="object-contain rounded-lg" />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center gap-3 text-center">
                                            <Upload className="w-8 h-8 text-gray-400 group-hover:text-purple-500 transition-colors" />
                                            <p className="text-sm text-gray-500">Upload a reference pose image</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Ornament Selection */}
                            <OrnamentSelection
                                selectedType={ornamentType}
                                onTypeChange={setOrnamentType}
                                measurements={ornamentMeasurements}
                                onMeasurementsChange={setOrnamentMeasurements}
                            />

                            {/* Legacy Measurements (Optional) */}
                            {/* <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <Ruler className="w-4 h-4 text-purple-600" />
                                    Additional Measurements (Optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="E.g., Length: 5cm, Width: 3cm"
                                    value={formData.measurements}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, measurements: e.target.value }))}
                                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                                />
                            </div> */}

                            {/* Custom Prompt */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-purple-600" />
                                    Custom Instructions (Optional)
                                </label>
                                <textarea
                                    value={formData.prompt}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, prompt: e.target.value }))}
                                    placeholder="Add specific instructions for the AI model generation..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none shadow-sm"
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
                                    className="flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors group"
                                >
                                    <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            Generate AI Model
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Result Preview */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
                            <CheckCircle className="w-6 h-6 text-purple-600" />
                            Generated Model
                        </h3>
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-[500px] text-center">
                                <Loader2 className="w-16 h-16 text-purple-600 animate-spin mb-4" />
                                <p className="text-[#737373] text-lg">Generating AI model...</p>
                                <p className="text-[#737373] text-sm mt-2">This may take up to 30 seconds</p>
                            </div>
                        ) : result ? (
                            <div className="space-y-6">
                                <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border-2 border-purple-200">
                                    <Image
                                        src={result.generated_image_url}
                                        alt="Generated AI Model"
                                        fill
                                        className="object-contain bg-gray-50"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                                        <p className="text-green-700 font-semibold">✓ AI model generated successfully!</p>
                                        {result.mongo_id && (
                                            <p className="text-green-600 text-xs mt-1">Image ID: {result.mongo_id}</p>
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <a
                                                href={result.generated_image_url}
                                                download
                                                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold text-center hover:scale-105 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Download size={16} />
                                                Download
                                            </a>
                                            <button
                                                onClick={handleRegenerate}
                                                className="px-4 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
                                            >
                                                <RefreshCw size={16} />
                                                Regenerate
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setResult(null)
                                                setFormData({
                                                    ornamentImage: null,
                                                    poseImage: null,
                                                    prompt: "",
                                                    measurements: "",
                                                })
                                                setOrnamentType("")
                                                setOrnamentMeasurements({})
                                                setOrnamentPreview(null)
                                                setPosePreview(null)
                                            }}
                                            className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                                        >
                                            New Model
                                        </button>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                        <p className="text-blue-700 text-sm flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" />
                                            Click "Regenerate" to modify this AI model with new instructions!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[500px] text-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                                    <Cpu className="w-12 h-12 text-purple-600" />
                                </div>
                                <p className="text-[#737373] text-lg">Your AI model will appear here</p>
                                <p className="text-[#737373] text-sm mt-2">Upload an ornament and click generate to start</p>
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
                                    <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl">
                                        <RefreshCw className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#1a1a1a]">Regenerate AI Model</h2>
                                        <p className="text-sm text-gray-500">Modify and regenerate this AI model image</p>
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
                                    <Sparkles className="w-4 h-4 text-purple-600" />
                                    What would you like to change?
                                </label>
                                <textarea
                                    value={regenerateModal.prompt}
                                    onChange={(e) => setRegenerateModal(prev => ({ ...prev, prompt: e.target.value }))}
                                    placeholder="E.g., 'Change the model's pose', 'Adjust the lighting', 'Make it more dramatic'..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                                    rows="4"
                                    disabled={regenerateModal.loading}
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    💡 Your modification will be applied to regenerate the AI model
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
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
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
                                        ⏱️ This may take up to 30 seconds. Please wait...
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
