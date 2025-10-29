import React from 'react'
import { Palette, Upload } from 'lucide-react'

export function SelectedColorsDisplay({ collectionData, canEdit = true }) {
    const item = collectionData?.items?.[0]

    if (!item) return null

    const hasPickedColors = item.picked_colors && item.picked_colors.length > 0
    const hasUploadedColors = item.uploaded_color_images && item.uploaded_color_images.length > 0
    const hasSelectedColors = item.selected_colors && item.selected_colors.length > 0

    // Don't show if no colors are selected
    if (!hasPickedColors && !hasUploadedColors && !hasSelectedColors) {
        return null
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#884cff]" />
                <h3 className="font-bold text-[#1a1a1a] text-lg">Selected Colors</h3>
            </div>

            <div className="space-y-3">
                {/* Picked Colors */}
                {hasPickedColors && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4 text-[#884cff]" />
                            <p className="text-sm font-medium text-[#1a1a1a]">Picked Colors ({item.picked_colors.length})</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {item.picked_colors.map((color, index) => (
                                <div key={index} className="relative group">
                                    <div
                                        className="w-8 h-8 rounded border border-gray-300"
                                        style={{
                                            background: color.includes('gradient') ? color : undefined,
                                            backgroundColor: color.includes('gradient') ? 'transparent' : color
                                        }}
                                        title={color}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Uploaded Color Images */}
                {hasUploadedColors && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Upload className="w-4 h-4 text-[#884cff]" />
                            <p className="text-sm font-medium text-[#1a1a1a]">Uploaded Color Images ({item.uploaded_color_images.length})</p>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {item.uploaded_color_images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={image.cloud_url}
                                        alt={image.original_filename}
                                        className="w-full h-16 object-cover rounded border"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Selected Suggested Colors */}
                {hasSelectedColors && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4 text-gray-500" />
                            <p className="text-sm font-medium text-gray-600">Selected Suggestions ({item.selected_colors.length})</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {item.selected_colors.map((color, index) => (
                                <div key={index} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                                    {color}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Color Instructions */}
                {item.color_instructions && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-[#1a1a1a]">Color Instructions:</p>
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{item.color_instructions}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
