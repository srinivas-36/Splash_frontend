"use client"

import { useState, useEffect, useCallback } from "react"
import { WorkflowSteps } from "@/components/project/workflow-steps"
import { BriefAndConcept } from "@/components/project/brief-and-concept"
import { ThemesAndBackgrounds } from "@/components/project/themes-and-backgrounds"
import { ColorPalette } from "@/components/project/color-palette"
import { GlobalInstructions } from "@/components/project/global-instructions"
import { SelectedColorsDisplay } from "@/components/project/selected-colors-display"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Lock } from "lucide-react"
import { ModelSelectionSection } from "@/components/project/model-selection-section"
import { ProductUploadPage } from "@/components/project/product-upload-page"
import { ImageGrid } from "../Image-grid"
import { GenerateSection } from "../generate-section"
import { apiService } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { canEditProject, getUserProjectRole } from "@/lib/permissions"

export function WorkflowTab({ project }) {
    console.log("roject : ", project)
    const [activeStep, setActiveStep] = useState(1)
    const [collectionData, setCollectionData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const { token, user } = useAuth()

    // Check if user can edit
    const canEdit = canEditProject(project, user)
    console.log("can Edit : ", canEdit)
    const userRole = project.userRole
    console.log("userRole : ", userRole)
    // State for sequential display logic
    const [suggestionsRequested, setSuggestionsRequested] = useState(false)

    // State to hold current selections
    const [currentSelections, setCurrentSelections] = useState({
        themes: [],
        backgrounds: [],
        poses: [],
        locations: [],
        colors: [],
        pickedColors: [],
        colorInstructions: "",
        globalInstructions: ""
    })

    // State to hold uploaded images
    const [uploadedImages, setUploadedImages] = useState({
        themes: [],
        backgrounds: [],
        poses: [],
        locations: [],
        colors: []
    })

    // Memoized callback for global instructions change
    const handleGlobalInstructionsChange = useCallback((instructions) => {
        setCurrentSelections(prev => ({ ...prev, globalInstructions: instructions }))
    }, [])

    // Handlers for sequential display logic
    const handleRequestSuggestions = async (description) => {
        if (!description || !project?.id) {
            setError('Please enter a description first')
            return
        }

        setSuggestionsRequested(true)
        setLoading(true)
        setError(null)
        setSuccessMessage(null)

        try {
            // Call the API to generate AI suggestions (will update existing or create new)
            const response = await apiService.updateCollectionDescription(
                project.id,
                description,
                null
            )

            if (response.success && response.collection) {
                // Update the collection data with NEW suggestions
                setCollectionData(response.collection)
                setSuccessMessage('AI suggestions updated successfully!')
                console.log('AI suggestions generated/updated successfully:', response.collection.items?.[0])

                // Clear success message after 3 seconds
                setTimeout(() => setSuccessMessage(null), 3000)
            } else {
                throw new Error(response.error || 'Failed to generate suggestions')
            }
        } catch (err) {
            console.error('Error generating suggestions:', err)
            setError(err.message)
            setSuggestionsRequested(false)
        } finally {
            setLoading(false)
        }
    }

    // Fetch collection data when project changes
    console.log("suggestionsRequested", suggestionsRequested)
    useEffect(() => {
        const fetchCollectionData = async () => {
            if (project?.collection?.id) {
                try {
                    setLoading(true)
                    const data = await apiService.getCollection(project.collection.id, token)
                    setCollectionData(data)

                    // Check if we have suggestions already generated
                    if (data.items && data.items.length > 0) {
                        const item = data.items[0]
                        const hasSuggestions = (
                            (item.suggested_themes && item.suggested_themes.length > 0) ||
                            (item.suggested_backgrounds && item.suggested_backgrounds.length > 0) ||
                            (item.suggested_colors && item.suggested_colors.length > 0)
                        )
                        if (hasSuggestions) {
                            setSuggestionsRequested(true)
                        }
                    }
                } catch (err) {
                    console.error('Error fetching collection:', err)
                    setError(err.message)
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchCollectionData()
    }, [project?.collection?.id])

    const handleStepSave = async (stepData) => {
        try {
            setLoading(true)
            setError(null)
            setSuccessMessage(null)

            switch (activeStep) {
                case 1:
                    // Save selections for themes, backgrounds, poses, locations, and colors
                    // Also generates prompts using Gemini AI
                    if (project?.id && collectionData?.id) {
                        const response = await apiService.updateCollectionSelections(
                            project.id,
                            collectionData.id,
                            currentSelections,
                            uploadedImages
                        )

                        if (response.success) {
                            console.log('Selections saved successfully:', currentSelections)
                            console.log('Generated prompts:', response.generated_prompts)

                            setSuccessMessage(response.message || 'Selections saved and prompts generated successfully!')

                            // Refresh collection data after saving
                            const updatedData = await apiService.getCollection(collectionData.id, token)
                            setCollectionData(updatedData)

                            // Clear success message after 3 seconds
                            setTimeout(() => setSuccessMessage(null), 3000)
                        }
                    }
                    break
                case 2:
                    // Model generation step - refresh data if models were saved
                    if (stepData.modelsSaved && collectionData?.id) {
                        console.log("✅ Model selected in WorkflowTab:", stepData.selectedModel)
                        const updatedData = await apiService.getCollection(collectionData.id, token)
                        setCollectionData(updatedData)
                        setSuccessMessage('Models saved successfully!')
                        setTimeout(() => setSuccessMessage(null), 3000)
                    }
                    break
                case 3:
                    // Product upload step - refresh data if products were uploaded
                    if (stepData.productsUploaded && collectionData?.id) {
                        const updatedData = await apiService.getCollection(collectionData.id, token)
                        setCollectionData(updatedData)
                        setSuccessMessage('Products uploaded successfully!')
                        setTimeout(() => setSuccessMessage(null), 3000)
                    }
                    break
                case 4:
                    // Image generation step - refresh data if images were generated
                    if (stepData.imagesGenerated && collectionData?.id) {
                        const updatedData = await apiService.getCollection(collectionData.id, token)
                        setCollectionData(updatedData)
                        setSuccessMessage('Images generated successfully!')
                        setTimeout(() => setSuccessMessage(null), 3000)
                    }
                    break
            }

            setError(null)
        } catch (err) {
            console.error('Error saving step:', err)
            setError(err.message || 'Failed to save')
        } finally {
            setLoading(false)
        }
    }

    const renderStepContent = () => {
        return (
            <>
                {/* Role-based access message */}
                {!canEdit && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 flex items-center gap-3">
                        <Lock className="w-5 h-5 text-amber-600" />
                        <div>
                            <p className="text-amber-800 font-medium">View-Only Access</p>
                            <p className="text-amber-600 text-sm">
                                You have {userRole} access. Only Editors and Owners can make changes to this project.
                            </p>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7753ff]"></div>
                        <span className="ml-2">Loading...</span>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <p className="text-red-600">Error: {error}</p>
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <p className="text-green-600">✓ {successMessage}</p>
                    </div>
                )}

                {!loading && renderStepComponents()}
            </>
        )
    }

    const renderStepComponents = () => {

        switch (activeStep) {
            case 1:
                return (
                    <>
                        <BriefAndConcept
                            project={project}
                            collectionData={collectionData}
                            onSave={handleStepSave}
                            onRequestSuggestions={handleRequestSuggestions}
                            suggestionsRequested={suggestionsRequested}
                            canEdit={canEdit}
                        />
                        <ThemesAndBackgrounds
                            project={project}
                            collectionData={collectionData}
                            onSave={handleStepSave}
                            showSuggestions={suggestionsRequested}
                            onSelectionsChange={(selections) => setCurrentSelections(prev => ({ ...prev, ...selections }))}
                            onImagesChange={(images) => setUploadedImages(prev => ({ ...prev, ...images }))}
                            canEdit={canEdit}
                        />
                        <ColorPalette
                            project={project}
                            collectionData={collectionData}
                            onSave={handleStepSave}
                            showSuggestions={suggestionsRequested}
                            onSelectionsChange={(selections) => setCurrentSelections(prev => ({ ...prev, ...selections }))}
                            onImagesChange={(images) => setUploadedImages(prev => ({ ...prev, colors: images }))}
                            canEdit={canEdit}
                        />
                        <SelectedColorsDisplay
                            collectionData={collectionData}
                            canEdit={canEdit}
                        />
                        <GlobalInstructions
                            project={project}
                            collectionData={collectionData}
                            onSave={handleStepSave}
                            canEdit={canEdit}
                            onInstructionsChange={handleGlobalInstructionsChange}
                        />
                        {/* <GeneratedPromptsDisplay
                            collectionData={collectionData}
                        /> */}
                    </>
                )
            case 2:
                return (
                    <ModelSelectionSection
                        project={project}
                        collectionData={collectionData}
                        onSave={handleStepSave}
                        canEdit={canEdit}
                    />
                )
            case 3:
                return (
                    <ProductUploadPage
                        project={project}
                        collectionData={collectionData}
                        onSave={handleStepSave}
                        canEdit={canEdit}
                    />
                )
            case 4:
                return (
                    <>
                        <GenerateSection
                            project={project}
                            collectionData={collectionData}
                            onGenerate={handleStepSave}
                            canEdit={canEdit}
                        />
                        <ImageGrid
                            project={project}
                            collectionData={collectionData}
                            onDataRefresh={(updatedData) => setCollectionData(updatedData)}
                            canEdit={canEdit}
                        />
                    </>
                )
            default:
                return null
        }
    }

    return (
        <div className="space-y-8">
            <WorkflowSteps activeStep={activeStep} setActiveStep={setActiveStep} />

            {renderStepContent()}

            <div className="flex items-center justify-between pt-8 border-t border-[#e6e6e6]">
                <Button
                    variant="outline"
                    className="gap-2 bg-transparent"
                    onClick={() => setActiveStep(prev => Math.max(prev - 1, 1))}
                    disabled={loading}
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                </Button>

                <Button
                    className="bg-[#884cff] hover:bg-[#7a3ff0] text-white px-8"
                    onClick={async () => {
                        await handleStepSave({})
                        if (!error) {
                            setActiveStep(prev => Math.min(prev + 1, 4))
                        }
                    }}
                    disabled={loading || !canEdit}
                    title={canEdit ? "" : "You need Editor or Owner role to save changes"}
                >
                    {loading ? (activeStep === 1 ? 'Generating Prompts...' : 'Saving...') : 'Save and Continue'}
                </Button>

                <Button
                    variant="ghost"
                    className="text-[#884cff]"
                    onClick={() => setActiveStep(prev => Math.min(prev + 1, 4))}
                    disabled={loading}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
