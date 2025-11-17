"use client"

import { useState } from "react"
import { ChevronDown, Ruler, Sparkles } from "lucide-react"
import { getOrnamentFittingRules } from "@/lib/ornamentRules"

const ORNAMENT_TYPES = [
    // Necklaces
    {
        id: "short_necklace",
        name: "Short Necklace",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 35cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 2cm", unit: "cm" }
        ]
    },
    {
        id: "long_necklace",
        name: "Long Necklace",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 60cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 2cm", unit: "cm" }
        ]
    },
    {
        id: "choker",
        name: "Choker",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 30cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 3cm", unit: "cm" }
        ]
    },
    {
        id: "pendant",
        name: "Pendant",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 4cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 2.5cm", unit: "cm" }
        ]
    },
    {
        id: "pendant_necklace",
        name: "Pendant Necklace",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 45cm", unit: "cm" },
            { id: "pendant_size", label: "Pendant Size", placeholder: "e.g., 3x2cm", unit: "cm" }
        ]
    },
    {
        id: "pendant_necklace_set",
        name: "Pendant Necklace Set",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 45cm", unit: "cm" },
            { id: "pendant_size", label: "Pendant Size", placeholder: "e.g., 3x2cm", unit: "cm" }
        ]
    },
    {
        id: "delicate_necklace",
        name: "Delicate Necklace",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 40cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 1cm", unit: "cm" }
        ]
    },
    {
        id: "layered_necklace",
        name: "Layered Necklace",
        icon: "",
        measurements: [
            { id: "length_1", label: "First Layer", placeholder: "e.g., 35cm", unit: "cm" },
            { id: "length_2", label: "Second Layer", placeholder: "e.g., 40cm", unit: "cm" }
        ]
    },
    {
        id: "necklace_set",
        name: "Necklace Set",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 45cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 2cm", unit: "cm" }
        ]
    },
    {
        id: "black_beads_necklace",
        name: "Black Beads Necklace",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 45cm", unit: "cm" },
            { id: "bead_size", label: "Bead Size", placeholder: "e.g., 0.5cm", unit: "cm" }
        ]
    },
    {
        id: "hasli",
        name: "Hasli",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 35cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 4cm", unit: "cm" }
        ]
    },

    // Earrings
    {
        id: "stud_earrings",
        name: "Stud Earrings",
        icon: "",
        measurements: [
            { id: "diameter", label: "Diameter", placeholder: "e.g., 1cm", unit: "cm" },
            { id: "height", label: "Height", placeholder: "e.g., 0.5cm", unit: "cm" }
        ]
    },
    {
        id: "jhumka_earrings",
        name: "Jhumka / Jhumki Earrings",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 4cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 2cm", unit: "cm" }
        ]
    },
    {
        id: "drop_earrings",
        name: "Drop Earrings",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 5cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 1.5cm", unit: "cm" }
        ]
    },
    {
        id: "hoop_earrings",
        name: "Hoop / Hoop Earrings",
        icon: "",
        measurements: [
            { id: "diameter", label: "Diameter", placeholder: "e.g., 3cm", unit: "cm" },
            { id: "thickness", label: "Thickness", placeholder: "e.g., 0.2cm", unit: "cm" }
        ]
    },
    {
        id: "chandbali",
        name: "Chandbali",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 6cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 3cm", unit: "cm" }
        ]
    },
    {
        id: "damini",
        name: "Damini",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 4cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 2cm", unit: "cm" }
        ]
    },
    {
        id: "ear_chain",
        name: "Ear Chain",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 8cm", unit: "cm" },
            { id: "thickness", label: "Thickness", placeholder: "e.g., 0.1cm", unit: "cm" }
        ]
    },

    // Bracelets & Bangles
    {
        id: "bangle",
        name: "Bangle",
        icon: "",
        measurements: [
            { id: "diameter", label: "Diameter", placeholder: "e.g., 6cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 1.5cm", unit: "cm" }
        ]
    },
    {
        id: "bracelet",
        name: "Bracelet",
        icon: "",
        measurements: [
            { id: "circumference", label: "Circumference", placeholder: "e.g., 18cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 1cm", unit: "cm" }
        ]
    },
    {
        id: "hand_chain",
        name: "Hand Chain",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 20cm", unit: "cm" },
            { id: "thickness", label: "Thickness", placeholder: "e.g., 0.2cm", unit: "cm" }
        ]
    },

    // Rings
    {
        id: "ring",
        name: "Ring",
        icon: "",
        measurements: [
            { id: "size", label: "Ring Size", placeholder: "e.g., 7", unit: "" },
            { id: "width", label: "Band Width", placeholder: "e.g., 0.5cm", unit: "cm" }
        ]
    },
    {
        id: "traditional_ring",
        name: "Traditional Ring",
        icon: "",
        measurements: [
            { id: "size", label: "Ring Size", placeholder: "e.g., 7", unit: "" },
            { id: "width", label: "Band Width", placeholder: "e.g., 0.8cm", unit: "cm" }
        ]
    },
    {
        id: "delicate_ring",
        name: "Delicate Ring",
        icon: "",
        measurements: [
            { id: "size", label: "Ring Size", placeholder: "e.g., 7", unit: "" },
            { id: "width", label: "Band Width", placeholder: "e.g., 0.3cm", unit: "cm" }
        ]
    },
    {
        id: "cocktail_ring",
        name: "Cocktail Ring",
        icon: "",
        measurements: [
            { id: "size", label: "Ring Size", placeholder: "e.g., 7", unit: "" },
            { id: "stone_size", label: "Stone Size", placeholder: "e.g., 1cm", unit: "cm" }
        ]
    },

    // Anklets
    {
        id: "anklets",
        name: "Anklets",
        icon: "",
        measurements: [
            { id: "circumference", label: "Circumference", placeholder: "e.g., 22cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 0.8cm", unit: "cm" }
        ]
    },

    // Head Jewelry
    {
        id: "maang_tikka",
        name: "Maang Tikka",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 8cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 2cm", unit: "cm" }
        ]
    },
    {
        id: "hair_brooch",
        name: "Hair Brooch",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 5cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 3cm", unit: "cm" }
        ]
    },

    // Nose Jewelry
    {
        id: "nose_ring",
        name: "Nose Ring",
        icon: "",
        measurements: [
            { id: "diameter", label: "Diameter", placeholder: "e.g., 1cm", unit: "cm" },
            { id: "thickness", label: "Thickness", placeholder: "e.g., 0.1cm", unit: "cm" }
        ]
    },
    {
        id: "nose_pin",
        name: "Nose Pin",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 2cm", unit: "cm" },
            { id: "diameter", label: "Diameter", placeholder: "e.g., 0.5cm", unit: "cm" }
        ]
    },

    // Arm Jewelry
    {
        id: "armlet",
        name: "Armlet",
        icon: "",
        measurements: [
            { id: "circumference", label: "Circumference", placeholder: "e.g., 25cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 2cm", unit: "cm" }
        ]
    },

    // Waist Jewelry
    {
        id: "waist_band",
        name: "Waist Band",
        icon: "",
        measurements: [
            { id: "circumference", label: "Circumference", placeholder: "e.g., 70cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 3cm", unit: "cm" }
        ]
    },

    // Charms
    {
        id: "charm",
        name: "Charm",
        icon: "",
        measurements: [
            { id: "length", label: "Length", placeholder: "e.g., 2cm", unit: "cm" },
            { id: "width", label: "Width", placeholder: "e.g., 1.5cm", unit: "cm" }
        ]
    }
]

export function OrnamentSelection({
    selectedType,
    onTypeChange,
    measurements,
    onMeasurementsChange,
    className = ""
}) {
    const [isOpen, setIsOpen] = useState(false)

    const selectedOrnament = ORNAMENT_TYPES.find(type => type.id === selectedType)

    const handleTypeSelect = (typeId) => {
        onTypeChange(typeId)
        setIsOpen(false)
        // Reset measurements when type changes
        onMeasurementsChange({})
    }

    const handleMeasurementChange = (measurementId, value) => {
        onMeasurementsChange({
            ...measurements,
            [measurementId]: value
        })
    }

    const getMeasurementValue = (measurementId) => {
        return measurements[measurementId] || ""
    }

    const getFittingRules = (ornamentType) => {
        return getOrnamentFittingRules(ornamentType)
    }

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Ornament Type Selection */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    Ornament Type
                </label>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            {selectedOrnament ? (
                                <>
                                    <span className="text-lg">{selectedOrnament.icon}</span>
                                    <span>{selectedOrnament.name}</span>
                                </>
                            ) : (
                                <span className="text-gray-400">Select ornament type</span>
                            )}
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                            {ORNAMENT_TYPES.map((type) => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => handleTypeSelect(type.id)}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors first:rounded-t-xl last:rounded-b-xl"
                                >
                                    <span className="text-lg">{type.icon}</span>
                                    <span className="text-gray-700">{type.name}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Measurements */}
            {selectedOrnament && (
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-purple-600" />
                        Measurements
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                        {selectedOrnament.measurements.map((measurement) => (
                            <div key={measurement.id} className="flex items-center gap-2">
                                <label className="text-sm text-gray-600 min-w-[120px]">
                                    {measurement.label}:
                                </label>
                                <div className="flex-1 flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder={measurement.placeholder}
                                        value={getMeasurementValue(measurement.id)}
                                        onChange={(e) => handleMeasurementChange(measurement.id, e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                                    />
                                    {measurement.unit && (
                                        <span className="text-sm text-gray-500 min-w-[20px]">
                                            {measurement.unit}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        💡 Providing accurate measurements helps generate more realistic images
                    </p>
                </div>
            )}

            {/* Fitting Rules Display */}
            {selectedOrnament && (
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        Fitting Guidelines
                    </label>
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {getFittingRules(selectedOrnament.id)}
                        </p>
                        <p className="text-xs text-purple-600 mt-2 font-medium">
                            ✨ These guidelines will be automatically applied to ensure realistic ornament fitting
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
