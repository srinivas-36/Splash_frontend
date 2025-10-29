import React, { useState, useRef, useEffect } from 'react'
import { Button } from './button'
import { X, Palette, Layers } from 'lucide-react'

export function ColorPicker({ selectedColors = [], onColorsChange, disabled = false }) {
    const [isOpen, setIsOpen] = useState(false)
    const [tempColors, setTempColors] = useState(selectedColors)
    const [showGradientPicker, setShowGradientPicker] = useState(false)
    const [gradientColors, setGradientColors] = useState(['#FF0000', '#0000FF'])
    const colorInputRef = useRef(null)

    // Predefined color palette
    const predefinedColors = [
        '#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80',
        '#00FFFF', '#0080FF', '#0000FF', '#8000FF', '#FF00FF', '#FF0080',
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
        '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA',
        '#F1948A', '#85C1E9', '#F7DC6F', '#D2B4DE', '#AED6F1', '#A9DFBF',
        '#F9E79F', '#D5DBDB', '#AAB7B8', '#566573', '#2C3E50', '#34495E',
        '#7F8C8D', '#95A5A6', '#BDC3C7', '#ECF0F1', '#FFFFFF', '#000000'
    ]

    useEffect(() => {
        setTempColors(selectedColors)
    }, [selectedColors])

    const handleColorSelect = (color) => {
        if (disabled) return

        if (tempColors.includes(color)) {
            setTempColors(tempColors.filter(c => c !== color))
        } else {
            setTempColors([...tempColors, color])
        }
    }

    const handleCustomColorAdd = () => {
        if (colorInputRef.current && colorInputRef.current.value) {
            const customColor = colorInputRef.current.value
            if (!tempColors.includes(customColor)) {
                setTempColors([...tempColors, customColor])
            }
            colorInputRef.current.value = ''
        }
    }

    const handleGradientAdd = () => {
        if (gradientColors.length >= 2) {
            const gradientString = `linear-gradient(45deg, ${gradientColors.join(', ')})`
            if (!tempColors.includes(gradientString)) {
                setTempColors([...tempColors, gradientString])
            }
        }
    }

    const handleGradientColorChange = (index, color) => {
        const newGradientColors = [...gradientColors]
        newGradientColors[index] = color
        setGradientColors(newGradientColors)
    }

    const handleRemoveColor = (colorToRemove) => {
        if (disabled) return
        setTempColors(tempColors.filter(c => c !== colorToRemove))
    }

    const handleApply = () => {
        onColorsChange(tempColors)
        setIsOpen(false)
    }

    const handleCancel = () => {
        setTempColors(selectedColors)
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent justify-start"
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
            >
                <Palette className="w-4 h-4 mr-2" />
                Pick Colors ({selectedColors.length} selected)
            </Button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                    <div className="space-y-4">
                        {/* Selected Colors Display */}
                        {tempColors.length > 0 && (
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Selected Colors:</p>
                                <div className="flex flex-wrap gap-2">
                                    {tempColors.map((color, index) => (
                                        <div key={index} className="relative group">
                                            <div
                                                className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                                                style={{
                                                    background: color.includes('gradient') ? color : undefined,
                                                    backgroundColor: color.includes('gradient') ? 'transparent' : color
                                                }}
                                                title={color}
                                            />
                                            <button
                                                onClick={() => handleRemoveColor(color)}
                                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                disabled={disabled}
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Predefined Colors Grid */}
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Choose Colors:</p>
                            <div className="grid grid-cols-8 gap-2">
                                {predefinedColors.map((color, index) => (
                                    <button
                                        key={index}
                                        className={`w-8 h-8 rounded border-2 transition-all ${tempColors.includes(color)
                                            ? 'border-blue-500 ring-2 ring-blue-200'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleColorSelect(color)}
                                        disabled={disabled}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Custom Color Input */}
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Add Custom Color:</p>
                            <div className="flex gap-2">
                                <input
                                    ref={colorInputRef}
                                    type="color"
                                    className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                                    disabled={disabled}
                                />
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={handleCustomColorAdd}
                                    disabled={disabled}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>

                        {/* Gradient Color Picker */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-gray-700">Add Gradient:</p>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setShowGradientPicker(!showGradientPicker)}
                                    disabled={disabled}
                                >
                                    <Layers className="w-3 h-3 mr-1" />
                                    {showGradientPicker ? 'Hide' : 'Show'}
                                </Button>
                            </div>

                            {showGradientPicker && (
                                <div className="space-y-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                                    <div className="flex gap-2">
                                        {gradientColors.map((color, index) => (
                                            <div key={index} className="flex flex-col items-center gap-1">
                                                <input
                                                    type="color"
                                                    value={color}
                                                    onChange={(e) => handleGradientColorChange(index, e.target.value)}
                                                    className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                                                    disabled={disabled}
                                                />
                                                <span className="text-xs text-gray-500">{index + 1}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Preview gradient */}
                                    <div
                                        className="w-full h-8 rounded border border-gray-300"
                                        style={{
                                            background: `linear-gradient(45deg, ${gradientColors.join(', ')})`
                                        }}
                                    />

                                    <Button
                                        type="button"
                                        size="sm"
                                        onClick={handleGradientAdd}
                                        disabled={disabled}
                                        className="w-full"
                                    >
                                        Add Gradient
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2 border-t">
                            <Button
                                type="button"
                                size="sm"
                                onClick={handleApply}
                                disabled={disabled}
                                className="flex-1"
                            >
                                Apply
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={handleCancel}
                                disabled={disabled}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
