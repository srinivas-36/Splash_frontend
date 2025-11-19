"use client"

import { createContext, useContext, useState } from "react"

const ImageGenerationContext = createContext({
    isGenerating: false,
    setIsGenerating: () => {},
})

export function ImageGenerationProvider({ children }) {
    const [isGenerating, setIsGenerating] = useState(false)

    return (
        <ImageGenerationContext.Provider value={{ isGenerating, setIsGenerating }}>
            {children}
        </ImageGenerationContext.Provider>
    )
}

export function useImageGeneration() {
    const context = useContext(ImageGenerationContext)
    if (!context) {
        throw new Error("useImageGeneration must be used within ImageGenerationProvider")
    }
    return context
}

