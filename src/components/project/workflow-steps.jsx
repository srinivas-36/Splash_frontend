"use client"

import { FileText, Zap, Upload, Wand2 } from "lucide-react"

export function WorkflowSteps({ activeStep, setActiveStep }) {
    const steps = [
        { number: 1, title: "Brief & Concept", description: "Define project vision and upload inspiration", icon: FileText },
        { number: 2, title: "Model selection", description: "Choose AI models or upload model photos", icon: Zap },
        { number: 3, title: "Products Upload", description: "Upload product images on white background", icon: Upload },
        { number: 4, title: "Generate and Edit", description: "Create photoshoot images and refine", icon: Wand2 },
    ]

    return (
        <div className="space-y-6">
            {/* Progress Bar */}
            <div>
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">Project Workflow</h2>
                <div className="w-full h-1 bg-[#e6e6e6] rounded-full relative">
                    <div
                        className="h-1 bg-[#884cff] rounded-full absolute top-0 left-0 transition-all duration-300"
                        style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Steps */}
            <div className="flex items-center justify-between gap-4 mt-6">
                {steps.map((step, index) => {
                    const Icon = step.icon
                    const isActive = step.number === activeStep
                    const isCompleted = step.number < activeStep

                    return (
                        <div
                            key={step.number}
                            className="flex-1 flex flex-col items-center cursor-pointer"
                            onClick={() => setActiveStep(step.number)}
                        >
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center 
                  ${isActive ? "bg-[#884cff] text-white" : isCompleted ? "bg-[#a78bfa] text-white" : "bg-[#e6e6e6] text-[#708090]"}`}
                            >
                                <Icon className="w-6 h-6" />
                            </div>
                            <div className="text-center mt-2">
                                <p className="font-semibold text-sm text-[#1a1a1a]">{step.title}</p>
                                <p className="text-xs text-[#708090]">{step.description}</p>
                            </div>
                            {/* Connecting line */}
                            {index !== steps.length - 1 && (
                                <div
                                    className={`h-0.5 w-full mt-2 ${step.number < activeStep ? "bg-[#884cff]" : "bg-[#e6e6e6]"
                                        }`}
                                ></div>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="text-right text-sm text-[#708090] mt-2">
                Step {activeStep} of {steps.length}
            </div>
        </div>
    )
}
