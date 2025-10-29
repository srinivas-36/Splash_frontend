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

    // Check if there are any uploaded images or selected items to show instructions
    const item = collectionData?.items?.[0]
    const hasUploadedContent = item && (
        (item.uploaded_theme_images && item.uploaded_theme_images.length > 0) ||
        (item.uploaded_background_images && item.uploaded_background_images.length > 0) ||
        (item.uploaded_pose_images && item.uploaded_pose_images.length > 0) ||
        (item.uploaded_location_images && item.uploaded_location_images.length > 0) ||
        (item.uploaded_color_images && item.uploaded_color_images.length > 0) ||
        (item.picked_colors && item.picked_colors.length > 0) ||
        (item.selected_themes && item.selected_themes.length > 0) ||
        (item.selected_backgrounds && item.selected_backgrounds.length > 0) ||
        (item.selected_poses && item.selected_poses.length > 0) ||
        (item.selected_locations && item.selected_locations.length > 0) ||
        (item.selected_colors && item.selected_colors.length > 0)
    )

    if (!hasUploadedContent) {
        return null
    }

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
