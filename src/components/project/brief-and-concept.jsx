"use client"

import { useState, useEffect } from "react"
import { FileText, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BriefAndConcept({ onRequestSuggestions, collectionData, suggestionsRequested: parentSuggestionsRequested, canEdit = true }) {
    const [description, setDescription] = useState("")
    const [hasDescription, setHasDescription] = useState(false)
    const [suggestionsRequested, setSuggestionsRequested] = useState(false)
    const [lastRequestedDescription, setLastRequestedDescription] = useState("")

    // Load existing description from collectionData
    useEffect(() => {
        if (collectionData?.description) {
            setDescription(collectionData.description)
            setHasDescription(true)
            // If suggestions were already requested, track that description
            if (parentSuggestionsRequested) {
                setLastRequestedDescription(collectionData.description)
            }
        }
    }, [collectionData?.description, parentSuggestionsRequested])

    // Sync with parent suggestions state
    useEffect(() => {
        if (parentSuggestionsRequested !== undefined) {
            setSuggestionsRequested(parentSuggestionsRequested)
        }
    }, [parentSuggestionsRequested])

    const handleDescriptionChange = (e) => {
        const value = e.target.value
        setDescription(value)
        setHasDescription(value.trim().length > 0)

        // If description changed after suggestions were requested, reset the request state
        // so the button appears again
        if (suggestionsRequested && value.trim() !== lastRequestedDescription.trim()) {
            setSuggestionsRequested(false)
        }
    }

    const handleRequestSuggestions = () => {
        setSuggestionsRequested(true)
        setLastRequestedDescription(description)

        // Call parent callback if provided
        if (onRequestSuggestions) {
            onRequestSuggestions(description)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#e6e6e6] rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#708090]" />
                </div>
                <div>
                    <h3 className="font-bold text-[#1a1a1a]">Brief & Concept</h3>
                    <p className="text-sm text-[#708090]">Define project vision and upload inspiration</p>
                </div>
            </div>

            <div className="space-y-3">
                <label htmlFor="project-description" className="block text-sm font-medium text-[#1a1a1a]">Project Description</label>
                <textarea
                    id="project-description"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter your project description..."
                    className="w-full h-32 px-4 py-3 border border-[#e6e6e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#884cff] focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                    disabled={!canEdit}
                />

                {/* Show Request Suggestions button only after description is entered */}
                {hasDescription && !suggestionsRequested && (
                    <div className="flex justify-center pt-4">
                        <Button
                            onClick={handleRequestSuggestions}
                            className="bg-[#884cff] hover:bg-[#7a3ff0] text-white px-6 py-2 gap-2"
                            disabled={!canEdit}
                        >
                            <Sparkles className="w-4 h-4" />
                            {lastRequestedDescription ? 'Request New Suggestions' : 'Request Suggestions'}
                        </Button>
                    </div>
                )}

                {/* Show confirmation message after suggestions are requested */}
                {suggestionsRequested && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-600 text-sm">
                            ✓ Suggestions requested! AI recommendations will appear in the sections below.
                        </p>
                    </div>
                )}

                {/* Show info message when description changes after suggestions */}
                {hasDescription && !suggestionsRequested && lastRequestedDescription && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-600 text-sm">
                            💡 Description changed. Click "Request New Suggestions" to update AI recommendations.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
