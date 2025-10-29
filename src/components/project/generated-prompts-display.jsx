"use client"

import { useState } from "react"
import { Sparkles, ChevronDown, ChevronUp, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function GeneratedPromptsDisplay({ collectionData }) {
    const [expanded, setExpanded] = useState(true)
    const [copiedPrompt, setCopiedPrompt] = useState(null)

    const prompts = collectionData?.items?.[0]?.generated_prompts

    if (!prompts || Object.keys(prompts).length === 0) {
        return null
    }

    const handleCopyPrompt = (key, text) => {
        navigator.clipboard.writeText(text)
        setCopiedPrompt(key)
        setTimeout(() => setCopiedPrompt(null), 2000)
    }

    const promptTypes = {
        white_background: {
            title: "White Background",
            description: "Clean product shots with white background",
            color: "bg-blue-50 border-blue-200 text-blue-700"
        },
        background_replace: {
            title: "Background Replace",
            description: "Product with themed backgrounds",
            color: "bg-purple-50 border-purple-200 text-purple-700"
        },
        model_image: {
            title: "Model Image",
            description: "Product worn/held by model",
            color: "bg-green-50 border-green-200 text-green-700"
        },
        campaign_image: {
            title: "Campaign Shot",
            description: "Promotional campaign images",
            color: "bg-orange-50 border-orange-200 text-orange-700"
        }
    }

    return (
        <div className="mt-8 border-2 border-[#884cff]/20 rounded-lg overflow-hidden">
            {/* Header */}
            <div
                className="bg-gradient-to-r from-[#884cff]/10 to-[#884cff]/5 p-4 flex items-center justify-between cursor-pointer hover:from-[#884cff]/15 hover:to-[#884cff]/10 transition-colors"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#884cff] rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#1a1a1a] flex items-center gap-2">
                            AI Generated Prompts
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                Ready
                            </span>
                        </h3>
                        <p className="text-sm text-[#708090]">
                            {Object.keys(prompts).length} image generation prompts created
                        </p>
                    </div>
                </div>
                <Button variant="ghost" size="sm">
                    {expanded ? (
                        <ChevronUp className="w-5 h-5 text-[#708090]" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-[#708090]" />
                    )}
                </Button>
            </div>

            {/* Prompt Cards */}
            {expanded && (
                <div className="p-6 space-y-4 bg-white">
                    {Object.entries(prompts).map(([key, promptText]) => {
                        const promptType = promptTypes[key] || {
                            title: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                            description: "Custom prompt",
                            color: "bg-gray-50 border-gray-200 text-gray-700"
                        }

                        return (
                            <div
                                key={key}
                                className={`border-2 rounded-lg p-4 ${promptType.color.replace('text-', 'border-').split(' ')[1]}`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h4 className={`font-semibold ${promptType.color.split(' ')[2]}`}>
                                            {promptType.title}
                                        </h4>
                                        <p className="text-xs text-[#708090] mt-0.5">
                                            {promptType.description}
                                        </p>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleCopyPrompt(key, promptText)}
                                        className="flex items-center gap-1"
                                    >
                                        {copiedPrompt === key ? (
                                            <>
                                                <Check className="w-3 h-3" />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-3 h-3" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                                <p className="text-sm text-[#1a1a1a] leading-relaxed">
                                    {promptText}
                                </p>
                            </div>
                        )
                    })}

                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-700">
                            💡 <strong>Tip:</strong> These prompts will be used to generate your final product images in Step 4.
                            They are automatically created based on your selected themes, backgrounds, poses, and colors.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

