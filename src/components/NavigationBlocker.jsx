"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useImageGeneration } from "@/context/ImageGenerationContext"

export function NavigationBlocker() {
    const pathname = usePathname()
    const { isGenerating } = useImageGeneration()

    useEffect(() => {
        if (!isGenerating) return

        // Prevent browser back/forward navigation
        const handlePopState = (e) => {
            // Push current path to prevent navigation
            window.history.pushState(null, "", pathname)
            console.warn("Navigation blocked: Image generation in progress")
        }

        // Prevent page unload/refresh
        const handleBeforeUnload = (e) => {
            e.preventDefault()
            e.returnValue = "Image generation is in progress. Are you sure you want to leave?"
            return e.returnValue
        }

        // Add history state to prevent back navigation
        window.history.pushState(null, "", pathname)
        window.addEventListener("popstate", handlePopState)
        window.addEventListener("beforeunload", handleBeforeUnload)

        // Cleanup
        return () => {
            window.removeEventListener("popstate", handlePopState)
            window.removeEventListener("beforeunload", handleBeforeUnload)
        }
    }, [isGenerating, pathname])

    return null
}

