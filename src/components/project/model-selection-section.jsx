"use client"

import { useState, useEffect, useRef } from "react"
import { Users, Sparkles, CheckCircle, Upload, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { apiService } from "@/lib/api"

export function ModelSelectionSection({ project, collectionData, onSave, canEdit = true }) {
    const [activeTab, setActiveTab] = useState("ai") // 'ai' or 'real'

    // AI Models State
    const [aiModels, setAiModels] = useState([])
    const [generatedModels, setGeneratedModels] = useState([])
    const [generating, setGenerating] = useState(false)

    // Real Models State
    const [realModels, setRealModels] = useState([])
    const [uploadingReal, setUploadingReal] = useState(false)

    // Common State
    const [selectedModel, setSelectedModel] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    // Load existing models from collection data
    useEffect(() => {
        loadAllModels()
    }, [collectionData])

    const loadAllModels = async () => {
        if (!collectionData?.id) return

        try {
            const response = await apiService.getAllModels(collectionData.id)

            if (response.success) {
                setAiModels(response.ai_models || [])
                setRealModels(response.real_models || [])

                // Set selected model if exists
                if (response.selected_model) {
                    setSelectedModel(response.selected_model)
                    // Switch to the appropriate tab
                    if (response.selected_model.type === 'real') {
                        setActiveTab('real')
                    }
                }
            }
        } catch (err) {
            console.error('Error loading models:', err)
        }
    }

    const handleGenerateAIModels = async () => {
        if (!collectionData?.id) {
            setError('No collection found')
            return
        }

        setGenerating(true)
        setError(null)
        setSuccess(null)

        try {
            const response = await apiService.generateAIImages(collectionData.id)

            if (response.images && response.images.length > 0) {
                // Add newly generated models to the list
                setGeneratedModels(response.images)
                setSuccess(`Generated ${response.images.length} new AI models! Select which ones to keep along with your existing models.`)
            } else {
                setError('No images were generated')
            }
        } catch (err) {
            console.error('Error generating models:', err)
            setError(err.message || 'Failed to generate models')
        } finally {
            setGenerating(false)
        }
    }

    const handleSaveAIModels = async (selectedImages) => {
        if (selectedImages.length === 0) {
            setError('Please select at least one model to save')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await apiService.saveGeneratedImages(
                collectionData.id,
                selectedImages
            )

            if (response.success) {
                // Reload all models to get the updated list
                await loadAllModels()
                setGeneratedModels([])
                setSuccess('AI models saved successfully!')
            }
        } catch (err) {
            console.error('Error saving models:', err)
            setError(err.message || 'Failed to save models')
        } finally {
            setLoading(false)
        }
    }

    const handleUploadRealModels = async (event) => {
        const files = Array.from(event.target.files)

        if (files.length === 0) return

        setUploadingReal(true)
        setError(null)
        setSuccess(null)

        try {
            const response = await apiService.uploadRealModels(collectionData.id, files)

            if (response.success) {
                // Reload all models
                await loadAllModels()
                setSuccess(`${response.count} real model(s) uploaded successfully!`)
            } else {
                setError(response.error || 'Failed to upload models')
            }
        } catch (err) {
            console.error('Error uploading real models:', err)
            setError(err.message || 'Failed to upload real models')
        } finally {
            setUploadingReal(false)
            event.target.value = '' // Reset file input
        }
    }

    const handleSelectModel = async (model, type) => {
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const response = await apiService.selectModel(collectionData.id, type, model)

            if (response.success) {
                setSelectedModel(response.selected_model)
                setSuccess(`Model selected successfully!`)

                // Notify parent component
                if (onSave) {
                    await onSave({
                        modelSelected: true,
                        selectedModel: response.selected_model
                    })
                }
            }
        } catch (err) {
            console.error('Error selecting model:', err)
            setError(err.message || 'Failed to select model')
        } finally {
            setLoading(false)
        }
    }

    const isModelSelected = (model, type) => {
        if (!selectedModel) return false
        if (selectedModel.type !== type) return false

        const selectedPath = selectedModel.cloud || selectedModel.local
        const modelPath = model.cloud || model.local

        return selectedPath === modelPath
    }

    return (
        <div className="mb-12">
            <div className="flex items-start justify-between gap-3 mb-6">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#e6e6e6] rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-[#708090]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-[#1a1a1a]">Model Selection</h2>
                        <p className="text-sm text-[#708090] mt-1">
                            Select one model (AI generated or real) to use in your project
                        </p>
                        {selectedModel && (
                            <p className="text-sm text-[#884cff] mt-1 font-medium">
                                ✓ {selectedModel.type === 'ai' ? 'AI Model' : 'Real Model'} selected
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-600">{error}</p>
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-green-600">{success}</p>
                </div>
            )}

            {/* Tabs */}
            <div className="border-b border-[#e6e6e6] mb-6">
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('ai')}
                        className={`pb-3 px-4 font-medium transition-colors relative ${activeTab === 'ai'
                            ? 'text-[#884cff]'
                            : 'text-[#708090] hover:text-[#1a1a1a]'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            AI Models
                            {aiModels.length > 0 && (
                                <span className="text-xs bg-[#e6e6e6] px-2 py-0.5 rounded-full">
                                    {aiModels.length}
                                </span>
                            )}
                        </div>
                        {activeTab === 'ai' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#884cff]" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('real')}
                        className={`pb-3 px-4 font-medium transition-colors relative ${activeTab === 'real'
                            ? 'text-[#884cff]'
                            : 'text-[#708090] hover:text-[#1a1a1a]'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            Real Models
                            {realModels.length > 0 && (
                                <span className="text-xs bg-[#e6e6e6] px-2 py-0.5 rounded-full">
                                    {realModels.length}
                                </span>
                            )}
                        </div>
                        {activeTab === 'real' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#884cff]" />
                        )}
                    </button>
                </div>
            </div>

            {/* AI Models Tab Content */}
            {activeTab === 'ai' && (
                <AIModelsTab
                    aiModels={aiModels}
                    generatedModels={generatedModels}
                    generating={generating}
                    loading={loading}
                    selectedModel={selectedModel}
                    onGenerate={handleGenerateAIModels}
                    onSave={handleSaveAIModels}
                    onSelect={(model) => handleSelectModel(model, 'ai')}
                    isModelSelected={(model) => isModelSelected(model, 'ai')}
                    canEdit={canEdit}
                />
            )}

            {/* Real Models Tab Content */}
            {activeTab === 'real' && (
                <RealModelsTab
                    realModels={realModels}
                    uploading={uploadingReal}
                    loading={loading}
                    selectedModel={selectedModel}
                    onUpload={handleUploadRealModels}
                    onSelect={(model) => handleSelectModel(model, 'real')}
                    isModelSelected={(model) => isModelSelected(model, 'real')}
                    canEdit={canEdit}
                />
            )}
        </div>
    )
}

// AI Models Tab Component
function AIModelsTab({
    aiModels,
    generatedModels,
    generating,
    loading,
    selectedModel,
    onGenerate,
    onSave,
    onSelect,
    isModelSelected,
    canEdit = true
}) {
    const [tempSelectedModels, setTempSelectedModels] = useState([])

    // When new models are generated or saved models change, pre-select all saved models
    useEffect(() => {
        if (generatedModels.length > 0) {
            // Pre-select all existing saved models
            const savedUrls = aiModels.map(model => model.cloud || model.local)
            setTempSelectedModels(savedUrls)
        }
    }, [generatedModels.length, aiModels])

    const toggleTempSelection = (imageUrl) => {
        setTempSelectedModels(prev =>
            prev.includes(imageUrl)
                ? prev.filter(url => url !== imageUrl)
                : [...prev, imageUrl]
        )
    }

    const handleSaveClick = () => {
        onSave(tempSelectedModels)
        setTempSelectedModels([])
    }

    const allGeneratedUrls = generatedModels
    const hasSavedModels = aiModels.length > 0
    const hasGeneratedModels = generatedModels.length > 0

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-[#708090]">
                    Generate AI models based on your collection description
                </p>
                <Button
                    onClick={onGenerate}
                    disabled={generating || !canEdit}
                    className="bg-[#884cff] hover:bg-[#7a3ff0] text-white gap-2"
                    title={canEdit ? "" : "You need Editor or Owner role to generate models"}
                >
                    <Sparkles className="w-4 h-4" />
                    {generating ? 'Generating...' : 'Generate AI Models'}
                </Button>
            </div>

            {generating && (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#884cff] mx-auto mb-4"></div>
                        <p className="text-[#708090]">Generating AI models... This may take a minute</p>
                    </div>
                </div>
            )}

            {/* Show all models (existing + newly generated) with save option when new models are generated */}
            {hasGeneratedModels && !generating && (
                <div className="mb-8">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <p className="text-blue-800 text-sm">
                            💡 <strong>Select which models to keep:</strong> Your existing saved models are pre-selected.
                            Click to add new models or deselect existing ones.
                        </p>
                    </div>

                    {/* Existing Saved Models */}
                    {hasSavedModels && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4 text-[#1a1a1a]">
                                Your Existing Models (Already Selected)
                            </h3>
                            <div className="grid grid-cols-4 gap-6">
                                {aiModels.map((model, index) => {
                                    const imageUrl = model.cloud || model.local
                                    const isSelected = tempSelectedModels.includes(imageUrl)

                                    return (
                                        <div
                                            key={`existing-${index}`}
                                            className={`relative border-2 rounded-lg overflow-hidden transition-all ${canEdit ? 'cursor-pointer' : 'cursor-not-allowed'
                                                } ${isSelected
                                                    ? 'border-[#884cff] shadow-lg'
                                                    : 'border-[#e6e6e6] hover:border-[#884cff]/50'
                                                }`}
                                            onClick={() => canEdit && toggleTempSelection(imageUrl)}
                                        >
                                            <img
                                                src={imageUrl}
                                                alt={`Existing Model ${index + 1}`}
                                                className="w-full h-48 object-cover"
                                            />
                                            {isSelected && (
                                                <div className="absolute top-2 right-2 bg-[#884cff] rounded-full p-1">
                                                    <CheckCircle className="w-5 h-5 text-white" />
                                                </div>
                                            )}
                                            <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                                Existing
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Newly Generated Models */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#1a1a1a]">
                            Newly Generated Models (Click to Add)
                        </h3>
                        <div className="grid grid-cols-4 gap-6 mb-4">
                            {allGeneratedUrls.map((imageUrl, index) => (
                                <div
                                    key={`new-${index}`}
                                    className={`relative border-2 rounded-lg overflow-hidden transition-all ${canEdit ? 'cursor-pointer' : 'cursor-not-allowed'
                                        } ${tempSelectedModels.includes(imageUrl)
                                            ? 'border-[#884cff] shadow-lg'
                                            : 'border-[#e6e6e6] hover:border-[#884cff]/50'
                                        }`}
                                    onClick={() => canEdit && toggleTempSelection(imageUrl)}
                                >
                                    <img
                                        src={imageUrl}
                                        alt={`New Model ${index + 1}`}
                                        className="w-full h-48 object-cover"
                                    />
                                    {tempSelectedModels.includes(imageUrl) && (
                                        <div className="absolute top-2 right-2 bg-[#884cff] rounded-full p-1">
                                            <CheckCircle className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                        New
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button
                            onClick={handleSaveClick}
                            disabled={loading || tempSelectedModels.length === 0 || !canEdit}
                            className="bg-[#884cff] hover:bg-[#7a3ff0] text-white px-8"
                            title={canEdit ? "" : "You need Editor or Owner role to save models"}
                        >
                            {loading ? 'Saving...' : `Save Selected Models (${tempSelectedModels.length} total)`}
                        </Button>
                    </div>
                </div>
            )}

            {/* Show saved AI models */}
            {hasSavedModels && (
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-[#1a1a1a]">
                        Saved AI Models (Click to Select)
                    </h3>
                    <div className="grid grid-cols-4 gap-6">
                        {aiModels.map((model, index) => {
                            const imageUrl = model.cloud || model.local
                            const selected = isModelSelected(model)

                            return (
                                <div
                                    key={index}
                                    className={`relative border-2 rounded-lg overflow-hidden transition-all ${canEdit ? 'cursor-pointer' : 'cursor-not-allowed'
                                        } ${selected
                                            ? 'border-[#884cff] shadow-lg ring-2 ring-[#884cff] ring-offset-2'
                                            : 'border-[#e6e6e6] hover:border-[#884cff]/50'
                                        }`}
                                    onClick={() => canEdit && onSelect(model)}
                                >
                                    <img
                                        src={imageUrl}
                                        alt={`AI Model ${index + 1}`}
                                        className="w-full h-48 object-cover"
                                    />
                                    {selected && (
                                        <div className="absolute top-2 right-2 bg-[#884cff] rounded-full p-1">
                                            <CheckCircle className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                        <p className="text-white text-sm font-medium">
                                            AI Model {index + 1}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {!generating && !hasSavedModels && !hasGeneratedModels && (
                <div className="text-center py-12 border-2 border-dashed border-[#e6e6e6] rounded-lg">
                    <Sparkles className="w-16 h-16 text-[#708090] mx-auto mb-4" />
                    <p className="text-[#708090] mb-4">No AI models generated yet</p>
                    <p className="text-sm text-[#708090]">
                        Click "Generate AI Models" to create model images based on your collection
                    </p>
                </div>
            )}
        </div>
    )
}

// Real Models Tab Component
function RealModelsTab({
    realModels,
    uploading,
    loading,
    selectedModel,
    onUpload,
    onSelect,
    isModelSelected,
    canEdit = true
}) {
    const hasModels = realModels.length > 0
    const fileInputRef = useRef(null)

    const handleButtonClick = () => {
        if (!uploading && canEdit && fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-[#708090]">
                    Upload your own model images to use in the project
                </p>
                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={onUpload}
                        disabled={uploading || !canEdit}
                        className="hidden"
                        style={{ display: 'none' }}
                    />
                    <Button
                        onClick={handleButtonClick}
                        disabled={uploading || !canEdit}
                        className="bg-[#884cff] hover:bg-[#7a3ff0] text-white gap-2"
                        title={canEdit ? "" : "You need Editor or Owner role to upload models"}
                    >
                        <Upload className="w-4 h-4" />
                        {uploading ? 'Uploading...' : 'Upload Real Models'}
                    </Button>
                </div>
            </div>

            {uploading && (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#884cff] mx-auto mb-4"></div>
                        <p className="text-[#708090]">Uploading models...</p>
                    </div>
                </div>
            )}

            {hasModels && !uploading && (
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-[#1a1a1a]">
                        Your Real Models (Click to Select)
                    </h3>
                    <div className="grid grid-cols-4 gap-6">
                        {realModels.map((model, index) => {
                            const imageUrl = model.cloud || model.local
                            const selected = isModelSelected(model)

                            return (
                                <div
                                    key={index}
                                    className={`relative border-2 rounded-lg overflow-hidden transition-all ${canEdit ? 'cursor-pointer' : 'cursor-not-allowed'
                                        } ${selected
                                            ? 'border-[#884cff] shadow-lg ring-2 ring-[#884cff] ring-offset-2'
                                            : 'border-[#e6e6e6] hover:border-[#884cff]/50'
                                        }`}
                                    onClick={() => canEdit && onSelect(model)}
                                >
                                    <img
                                        src={imageUrl}
                                        alt={`Real Model ${index + 1}`}
                                        className="w-full h-48 object-cover"
                                    />
                                    {selected && (
                                        <div className="absolute top-2 right-2 bg-[#884cff] rounded-full p-1">
                                            <CheckCircle className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                        <p className="text-white text-sm font-medium">
                                            {model.name || `Real Model ${index + 1}`}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {!uploading && !hasModels && (
                <div className="text-center py-12 border-2 border-dashed border-[#e6e6e6] rounded-lg">
                    <ImageIcon className="w-16 h-16 text-[#708090] mx-auto mb-4" />
                    <p className="text-[#708090] mb-4">No real models uploaded yet</p>
                    <p className="text-sm text-[#708090]">
                        Upload your own model images to use in the project
                    </p>
                </div>
            )}
        </div>
    )
}
