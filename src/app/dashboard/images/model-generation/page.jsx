"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Sparkles, Upload, Cpu, Users, Ruler, Zap, Loader2, CheckCircle, AlertCircle, RefreshCw, X, Download } from "lucide-react"
import { apiService } from "@/lib/api"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { OrnamentSelection } from "@/components/images/OrnamentSelection"

export default function ModelGenerationForm() {
    const router = useRouter()
    const { token } = useAuth()
    const [activeTab, setActiveTab] = useState("ai_model") // "ai_model" or "real_model"

    // AI Model State
    const [aiFormData, setAiFormData] = useState({
        ornamentImage: null,
        poseImage: null,
        prompt: "",
        measurements: "",
    })
    const [aiOrnamentType, setAiOrnamentType] = useState("")
    const [aiOrnamentMeasurements, setAiOrnamentMeasurements] = useState({})
    const [aiOrnamentPreview, setAiOrnamentPreview] = useState(null)
    const [aiPosePreview, setAiPosePreview] = useState(null)
    const [aiResult, setAiResult] = useState(null)
    const [aiError, setAiError] = useState(null)
    const [aiIsLoading, setAiIsLoading] = useState(false)
    const [aiRegenerateModal, setAiRegenerateModal] = useState({
        isOpen: false,
        prompt: '',
        loading: false,
        error: null
    })

    // Real Model State
    const [realFormData, setRealFormData] = useState({
        modelImage: null,
        ornamentImage: null,
        poseImage: null,
        prompt: "",
        measurements: "",
    })
    const [realOrnamentType, setRealOrnamentType] = useState("")
    const [realOrnamentMeasurements, setRealOrnamentMeasurements] = useState({})
    const [realModelPreview, setRealModelPreview] = useState(null)
    const [realOrnamentPreview, setRealOrnamentPreview] = useState(null)
    const [realPosePreview, setRealPosePreview] = useState(null)
    const [realResult, setRealResult] = useState(null)
    const [realError, setRealError] = useState(null)
    const [realIsLoading, setRealIsLoading] = useState(false)
    const [realRegenerateModal, setRealRegenerateModal] = useState({
        isOpen: false,
        prompt: '',
        loading: false,
        error: null
    })

    // Get current state based on active tab
    const getCurrentState = () => {
        if (activeTab === "ai_model") {
            return {
                result: aiResult,
                isLoading: aiIsLoading,
                error: aiError,
                regenerateModal: aiRegenerateModal,
                setRegenerateModal: setAiRegenerateModal
            }
        } else {
            return {
                result: realResult,
                isLoading: realIsLoading,
                error: realError,
                regenerateModal: realRegenerateModal,
                setRegenerateModal: setRealRegenerateModal
            }
        }
    }

    const currentState = getCurrentState()

    // AI Model Handlers
    const handleAiFileChange = (type, file) => {
        if (file) {
            setAiFormData((prev) => ({ ...prev, [type]: file }))
            const reader = new FileReader()
            reader.onloadend = () => {
                if (type === 'ornamentImage') {
                    setAiOrnamentPreview(reader.result)
                } else {
                    setAiPosePreview(reader.result)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAiRegenerate = () => {
        setAiRegenerateModal({
            isOpen: true,
            prompt: '',
            loading: false,
            error: null
        })
    }

    const submitAiRegenerate = async () => {
        if (!aiRegenerateModal.prompt.trim()) {
            setAiRegenerateModal(prev => ({
                ...prev,
                error: 'Please enter a prompt for regeneration'
            }))
            return
        }

        setAiRegenerateModal(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await apiService.regenerateImage(
                aiResult.mongo_id,
                aiRegenerateModal.prompt,
                token
            )

            if (response.success) {
                setAiResult({
                    ...aiResult,
                    generated_image_url: response.generated_image_url,
                    mongo_id: response.mongo_id,
                    prompt: response.combined_prompt
                })

                setAiRegenerateModal({
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
            setAiRegenerateModal(prev => ({
                ...prev,
                loading: false,
                error: error.response?.data?.error || error.message || 'Failed to regenerate image'
            }))
        }
    }

    const closeAiRegenerateModal = () => {
        if (!aiRegenerateModal.loading) {
            setAiRegenerateModal({
                isOpen: false,
                prompt: '',
                loading: false,
                error: null
            })
        }
    }

    const handleAiSubmit = async (e) => {
        e.preventDefault()
        setAiError(null)
        setAiResult(null)

        if (!aiFormData.ornamentImage) {
            setAiError("Please upload an ornament image")
            return
        }

        setAiIsLoading(true)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append("ornament_image", aiFormData.ornamentImage)
            if (aiFormData.poseImage) {
                formDataToSend.append("pose_style", aiFormData.poseImage)
            }
            formDataToSend.append("prompt", aiFormData.prompt || "Generate an AI model wearing this ornament")
            formDataToSend.append("measurements", aiFormData.measurements || "")
            formDataToSend.append("ornament_type", aiOrnamentType || "")
            formDataToSend.append("ornament_measurements", JSON.stringify(aiOrnamentMeasurements))

            const response = await apiService.generateModelWithOrnament(formDataToSend, token)

            if (response.status === "success") {
                setAiResult(response)
            } else {
                setAiError(response.message || "Failed to generate image")
            }
        } catch (err) {
            console.error("Error generating image:", err)
            setAiError(err.message || "An error occurred while generating the image")
        } finally {
            setAiIsLoading(false)
        }
    }

    // Real Model Handlers
    const handleRealFileChange = (type, file) => {
        if (file) {
            setRealFormData((prev) => ({ ...prev, [type]: file }))
            const reader = new FileReader()
            reader.onloadend = () => {
                if (type === 'modelImage') {
                    setRealModelPreview(reader.result)
                } else if (type === 'ornamentImage') {
                    setRealOrnamentPreview(reader.result)
                } else {
                    setRealPosePreview(reader.result)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRealRegenerate = () => {
        setRealRegenerateModal({
            isOpen: true,
            prompt: '',
            loading: false,
            error: null
        })
    }

    const submitRealRegenerate = async () => {
        if (!realRegenerateModal.prompt.trim()) {
            setRealRegenerateModal(prev => ({
                ...prev,
                error: 'Please enter a prompt for regeneration'
            }))
            return
        }

        setRealRegenerateModal(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await apiService.regenerateImage(
                realResult.mongo_id,
                realRegenerateModal.prompt,
                token
            )

            if (response.success) {
                setRealResult({
                    ...realResult,
                    generated_image_url: response.generated_image_url,
                    mongo_id: response.mongo_id,
                    prompt: response.combined_prompt
                })

                setRealRegenerateModal({
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
            setRealRegenerateModal(prev => ({
                ...prev,
                loading: false,
                error: error.response?.data?.error || error.message || 'Failed to regenerate image'
            }))
        }
    }

    const closeRealRegenerateModal = () => {
        if (!realRegenerateModal.loading) {
            setRealRegenerateModal({
                isOpen: false,
                prompt: '',
                loading: false,
                error: null
            })
        }
    }

    const handleRealSubmit = async (e) => {
        e.preventDefault()
        setRealError(null)
        setRealResult(null)

        if (!realFormData.modelImage) {
            setRealError("Please upload a model image")
            return
        }

        if (!realFormData.ornamentImage) {
            setRealError("Please upload an ornament image")
            return
        }

        setRealIsLoading(true)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append("model_image", realFormData.modelImage)
            formDataToSend.append("ornament_image", realFormData.ornamentImage)
            if (realFormData.poseImage) {
                formDataToSend.append("pose_style", realFormData.poseImage)
            }
            formDataToSend.append("prompt", realFormData.prompt || "Generate realistic image with model wearing ornament")
            formDataToSend.append("measurements", realFormData.measurements || "")
            formDataToSend.append("ornament_type", realOrnamentType || "")
            formDataToSend.append("ornament_measurements", JSON.stringify(realOrnamentMeasurements))

            const response = await apiService.generateRealModelWithOrnament(formDataToSend, token)

            if (response.status === "success") {
                setRealResult(response)
            } else {
                setRealError(response.message || "Failed to generate image")
            }
        } catch (err) {
            console.error("Error generating image:", err)
            setRealError(err.message || "An error occurred while generating the image")
        } finally {
            setRealIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fcfcfc] via-[#f8f7ff] to-[#f5f3ff] p-8">
            <div className="max-w-6xl mx-auto">
                {/* Enhanced Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-[#7753ff] rounded-2xl shadow-lg">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-[#7753ff]">
                                Model Generation
                            </h1>
                            <p className="text-[#737373] mt-2">Generate AI models or use real models with your products</p>
                        </div>
                    </div>

                    {/* Sub-tabs */}
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={() => setActiveTab("ai_model")}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${activeTab === "ai_model"
                                ? "bg-white/90 backdrop-blur-md text-[#7753ff] shadow-[0_8px_32px_0_rgba(119,83,255,0.3)] border border-white/20"
                                : "bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-gray-200/50 shadow-sm"
                                }`}
                        >
                            <Cpu className="w-5 h-5" />
                            AI Model
                        </button>
                        <button
                            onClick={() => setActiveTab("real_model")}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${activeTab === "real_model"
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
                <div className={`grid grid-cols-1 gap-8 transition-all duration-500 ${currentState.result ? 'lg:grid-cols-[4fr_6fr]' : 'lg:grid-cols-[7fr_3fr]'}`}>
                    {/* Form */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                        {activeTab === "ai_model" ? (
                            <form onSubmit={handleAiSubmit} className="space-y-6">
                                {/* Ornament Image */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#7753ff] rounded-full"></div>
                                        Ornament/Product Image<span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <div
                                        className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer"
                                        onClick={() => document.getElementById("ai-ornament-input").click()}
                                    >
                                        <input
                                            type="file"
                                            id="ai-ornament-input"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleAiFileChange('ornamentImage', e.target.files[0])}
                                        />
                                        {aiOrnamentPreview ? (
                                            <div className="relative w-full h-40">
                                                <Image src={aiOrnamentPreview} alt="Ornament Preview" fill className="object-contain rounded-lg" />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center gap-3 text-center">
                                                <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#7753ff] transition-colors" />
                                                <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 15MB</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Pose Style */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#7753ff] rounded-full"></div>
                                        Pose Style Reference (Optional)
                                    </label>
                                    <div
                                        className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer"
                                        onClick={() => document.getElementById("ai-pose-input").click()}
                                    >
                                        <input
                                            type="file"
                                            id="ai-pose-input"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleAiFileChange('poseImage', e.target.files[0])}
                                        />
                                        {aiPosePreview ? (
                                            <div className="relative w-full h-40">
                                                <Image src={aiPosePreview} alt="Pose Preview" fill className="object-contain rounded-lg" />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center gap-3 text-center">
                                                <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#7753ff] transition-colors" />
                                                <p className="text-sm text-gray-500">Upload a reference pose image</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Ornament Selection */}
                                <OrnamentSelection
                                    selectedType={aiOrnamentType}
                                    onTypeChange={setAiOrnamentType}
                                    measurements={aiOrnamentMeasurements}
                                    onMeasurementsChange={setAiOrnamentMeasurements}
                                />

                                {/* Custom Prompt */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-[#7753ff]" />
                                        Custom Instructions (Optional)
                                    </label>
                                    <textarea
                                        value={aiFormData.prompt}
                                        onChange={(e) => setAiFormData((prev) => ({ ...prev, prompt: e.target.value }))}
                                        placeholder="Add specific instructions for the AI model generation..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7753ff] focus:border-transparent resize-none shadow-sm"
                                        rows="3"
                                    />
                                </div>

                                {/* Error Message */}
                                {aiError && (
                                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                        <p className="text-red-700 text-sm">{aiError}</p>
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
                                    <button
                                        type="submit"
                                        disabled={aiIsLoading}
                                        className="bg-[#7753ff] hover:bg-[#6a47e6] text-white px-8 py-3 rounded-xl flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {aiIsLoading ? (
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
                        ) : (
                            <form onSubmit={handleRealSubmit} className="space-y-6">
                                {/* Model Image */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#7753ff] rounded-full"></div>
                                        Model Image<span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <div
                                        className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer"
                                        onClick={() => document.getElementById("real-model-input").click()}
                                    >
                                        <input
                                            type="file"
                                            id="real-model-input"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleRealFileChange('modelImage', e.target.files[0])}
                                        />
                                        {realModelPreview ? (
                                            <div className="relative w-full h-40">
                                                <Image src={realModelPreview} alt="Model Preview" fill className="object-contain rounded-lg" />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center gap-3 text-center">
                                                <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#7753ff] transition-colors" />
                                                <p className="text-sm text-gray-500">Upload model image</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Ornament Image */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#7753ff] rounded-full"></div>
                                        Ornament/Product Image<span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <div
                                        className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer"
                                        onClick={() => document.getElementById("real-ornament-input").click()}
                                    >
                                        <input
                                            type="file"
                                            id="real-ornament-input"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleRealFileChange('ornamentImage', e.target.files[0])}
                                        />
                                        {realOrnamentPreview ? (
                                            <div className="relative w-full h-40">
                                                <Image src={realOrnamentPreview} alt="Ornament Preview" fill className="object-contain rounded-lg" />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center gap-3 text-center">
                                                <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#7753ff] transition-colors" />
                                                <p className="text-sm text-gray-500">Upload ornament/product image</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Pose Style */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#7753ff] rounded-full"></div>
                                        Pose Style Reference (Optional)
                                    </label>
                                    <div
                                        className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer"
                                        onClick={() => document.getElementById("real-pose-input").click()}
                                    >
                                        <input
                                            type="file"
                                            id="real-pose-input"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleRealFileChange('poseImage', e.target.files[0])}
                                        />
                                        {realPosePreview ? (
                                            <div className="relative w-full h-40">
                                                <Image src={realPosePreview} alt="Pose Preview" fill className="object-contain rounded-lg" />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center gap-3 text-center">
                                                <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#7753ff] transition-colors" />
                                                <p className="text-sm text-gray-500">Upload reference pose (optional)</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Ornament Selection */}
                                <OrnamentSelection
                                    selectedType={realOrnamentType}
                                    onTypeChange={setRealOrnamentType}
                                    measurements={realOrnamentMeasurements}
                                    onMeasurementsChange={setRealOrnamentMeasurements}
                                />

                                {/* Additional Measurements */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <Ruler className="w-4 h-4 text-[#7753ff]" />
                                        Additional Measurements (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="E.g., Length: 5cm, Width: 3cm"
                                        value={realFormData.measurements}
                                        onChange={(e) => setRealFormData((prev) => ({ ...prev, measurements: e.target.value }))}
                                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
                                    />
                                </div>

                                {/* Custom Prompt */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-[#7753ff]" />
                                        Custom Instructions (Optional)
                                    </label>
                                    <textarea
                                        value={realFormData.prompt}
                                        onChange={(e) => setRealFormData((prev) => ({ ...prev, prompt: e.target.value }))}
                                        placeholder="Add specific instructions for placing the ornament on the model..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7753ff] focus:border-transparent resize-none shadow-sm"
                                        rows="3"
                                    />
                                </div>

                                {/* Error Message */}
                                {realError && (
                                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                        <p className="text-red-700 text-sm">{realError}</p>
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
                                    <button
                                        type="submit"
                                        disabled={realIsLoading}
                                        className="bg-[#7753ff] hover:bg-[#6a47e6] text-white px-8 py-3 rounded-xl flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {realIsLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                Generate Image
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Result Preview */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
                            <CheckCircle className="w-6 h-6 text-[#7753ff]" />
                            {activeTab === "ai_model" ? "Generated AI Model" : "Generated Image"}
                        </h3>
                        {currentState.isLoading ? (
                            <div className="flex flex-col items-center justify-center h-[500px] text-center">
                                <Loader2 className="w-16 h-16 text-[#7753ff] animate-spin mb-4" />
                                <p className="text-[#737373] text-lg">
                                    {activeTab === "ai_model" ? "Generating AI model..." : "Generating realistic model image..."}
                                </p>
                                <p className="text-[#737373] text-sm mt-2">This may take up to 30 seconds</p>
                            </div>
                        ) : currentState.result ? (
                            <div className="space-y-6">
                                <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border-2 border-[#7753ff]/20">
                                    <Image
                                        src={currentState.result.generated_image_url}
                                        alt={activeTab === "ai_model" ? "Generated AI Model" : "Generated Real Model"}
                                        fill
                                        className="object-contain bg-gray-50"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                                        <p className="text-green-700 font-semibold">
                                            ✓ {activeTab === "ai_model" ? "AI model" : "Real model image"} generated successfully!
                                        </p>
                                        {currentState.result.mongo_id && (
                                            <p className="text-green-600 text-xs mt-1">Image ID: {currentState.result.mongo_id}</p>
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <a
                                                href={currentState.result.generated_image_url}
                                                download
                                                className="px-4 py-3 bg-[#7753ff] text-white rounded-xl font-semibold text-center hover:scale-105 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Download size={16} />
                                                Download
                                            </a>
                                            <button
                                                onClick={activeTab === "ai_model" ? handleAiRegenerate : handleRealRegenerate}
                                                className="px-4 py-3 border-2 border-[#7753ff] text-[#7753ff] hover:bg-[#7753ff]/10 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                                            >
                                                <RefreshCw size={16} />
                                                Regenerate
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (activeTab === "ai_model") {
                                                    setAiResult(null)
                                                    setAiFormData({
                                                        ornamentImage: null,
                                                        poseImage: null,
                                                        prompt: "",
                                                        measurements: "",
                                                    })
                                                    setAiOrnamentType("")
                                                    setAiOrnamentMeasurements({})
                                                    setAiOrnamentPreview(null)
                                                    setAiPosePreview(null)
                                                } else {
                                                    setRealResult(null)
                                                    setRealFormData({
                                                        modelImage: null,
                                                        ornamentImage: null,
                                                        poseImage: null,
                                                        prompt: "",
                                                        measurements: "",
                                                    })
                                                    setRealOrnamentType("")
                                                    setRealOrnamentMeasurements({})
                                                    setRealModelPreview(null)
                                                    setRealOrnamentPreview(null)
                                                    setRealPosePreview(null)
                                                }
                                            }}
                                            className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                                        >
                                            {activeTab === "ai_model" ? "New Model" : "New Image"}
                                        </button>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                        <p className="text-blue-700 text-sm flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" />
                                            Click "Regenerate" to modify this {activeTab === "ai_model" ? "AI model" : "image"} with new instructions!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[500px] text-center">
                                <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4 bg-[#7753ff]/10">
                                    {activeTab === "ai_model" ? (
                                        <Cpu className="w-12 h-12 text-[#7753ff]" />
                                    ) : (
                                        <Users className="w-12 h-12 text-[#7753ff]" />
                                    )}
                                </div>
                                <p className="text-[#737373] text-lg">
                                    Your {activeTab === "ai_model" ? "AI model" : "generated image"} will appear here
                                </p>
                                <p className="text-[#737373] text-sm mt-2">
                                    {activeTab === "ai_model"
                                        ? "Upload an ornament and click generate to start"
                                        : "Upload model and ornament images to start"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Regenerate Modals */}
            {/* AI Model Regenerate Modal */}
            {aiRegenerateModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#7753ff] rounded-xl">
                                        <RefreshCw className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#1a1a1a]">Regenerate AI Model</h2>
                                        <p className="text-sm text-gray-500">Modify and regenerate this AI model image</p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeAiRegenerateModal}
                                    disabled={aiRegenerateModal.loading}
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
                                        src={aiResult?.generated_image_url}
                                        alt="Current image"
                                        fill
                                        className="object-contain bg-gray-50"
                                    />
                                </div>
                            </div>

                            {aiResult?.prompt && (
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <p className="text-xs font-semibold text-blue-900 mb-2">Original Prompt:</p>
                                    <p className="text-sm text-blue-700">{aiResult.prompt}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#7753ff]" />
                                    What would you like to change?
                                </label>
                                <textarea
                                    value={aiRegenerateModal.prompt}
                                    onChange={(e) => setAiRegenerateModal(prev => ({ ...prev, prompt: e.target.value }))}
                                    placeholder="E.g., 'Change the model's pose', 'Adjust the lighting', 'Make it more dramatic'..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7753ff] focus:border-transparent resize-none"
                                    rows="4"
                                    disabled={aiRegenerateModal.loading}
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    💡 Your modification will be applied to regenerate the AI model
                                </p>
                            </div>

                            {aiRegenerateModal.error && (
                                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                    <p className="text-red-700 text-sm">{aiRegenerateModal.error}</p>
                                </div>
                            )}

                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <button
                                    onClick={closeAiRegenerateModal}
                                    disabled={aiRegenerateModal.loading}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={submitAiRegenerate}
                                    disabled={aiRegenerateModal.loading || !aiRegenerateModal.prompt.trim()}
                                    className="flex-1 px-6 py-3 bg-[#7753ff] text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                                >
                                    {aiRegenerateModal.loading ? (
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

                            {aiRegenerateModal.loading && (
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

            {/* Real Model Regenerate Modal */}
            {realRegenerateModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#7753ff] rounded-xl">
                                        <RefreshCw className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#1a1a1a]">Regenerate Real Model Image</h2>
                                        <p className="text-sm text-gray-500">Modify and regenerate this real model image</p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeRealRegenerateModal}
                                    disabled={realRegenerateModal.loading}
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
                                        src={realResult?.generated_image_url}
                                        alt="Current image"
                                        fill
                                        className="object-contain bg-gray-50"
                                    />
                                </div>
                            </div>

                            {realResult?.prompt && (
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <p className="text-xs font-semibold text-blue-900 mb-2">Original Prompt:</p>
                                    <p className="text-sm text-blue-700">{realResult.prompt}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#7753ff]" />
                                    What would you like to change?
                                </label>
                                <textarea
                                    value={realRegenerateModal.prompt}
                                    onChange={(e) => setRealRegenerateModal(prev => ({ ...prev, prompt: e.target.value }))}
                                    placeholder="E.g., 'Adjust the lighting', 'Change the pose', 'Make it more realistic'..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7753ff] focus:border-transparent resize-none"
                                    rows="4"
                                    disabled={realRegenerateModal.loading}
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    💡 Your modification will be applied to regenerate the real model image
                                </p>
                            </div>

                            {realRegenerateModal.error && (
                                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                    <p className="text-red-700 text-sm">{realRegenerateModal.error}</p>
                                </div>
                            )}

                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <button
                                    onClick={closeRealRegenerateModal}
                                    disabled={realRegenerateModal.loading}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={submitRealRegenerate}
                                    disabled={realRegenerateModal.loading || !realRegenerateModal.prompt.trim()}
                                    className="flex-1 px-6 py-3 bg-[#7753ff] text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                                >
                                    {realRegenerateModal.loading ? (
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

                            {realRegenerateModal.loading && (
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

