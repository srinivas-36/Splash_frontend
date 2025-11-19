import React, { useState, useEffect } from 'react'
import { FileText } from 'lucide-react'

export function GlobalInstructions({
    collectionData,
    project,
    onSave,
    canEdit = true,
    onInstructionsChange
}) {
    const [instructions, setInstructions] = useState("")

    // Load existing instructions when collection data changes
    useEffect(() => {
        const item = collectionData?.items?.[0]
        if (item) {
            setInstructions(item.global_instructions || "")
        }
    }, [collectionData])

    // Notify parent of instruction changes
    useEffect(() => {
        if (onInstructionsChange) {
            onInstructionsChange(instructions)
        }
    }, [instructions, onInstructionsChange])

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#884cff]" />
                <h3 className="font-bold text-[#1a1a1a] text-lg">Additional Instructions</h3>
            </div>

            <div className="space-y-3">
                <p className="text-sm text-[#708090]">
                    Provide specific instructions for how the uploaded content and selections should be used in the generated images:
                </p>
                <textarea
                    placeholder="e.g., 'Use the uploaded theme images as primary inspiration', 'Apply the selected colors as accent colors', 'Make sure the model poses match the uploaded reference images', 'Use the background images to create similar atmospheres'"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full h-24 px-4 py-3 border border-[#e6e6e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#884cff] focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                    disabled={!canEdit}
                />
            </div>
        </div>
    )
}
