"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, FileText, Settings, Share2, Zap, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { apiService } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import axios from "axios"
const CreateProjectPage = () => {
    const [projectName, setProjectName] = useState("")
    const [description, setDescription] = useState("")
    // const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()
    const { token } = useAuth()
    const handleCreateProject = async () => {
        if (!projectName.trim()) {
            setError("Project name is required")
            return
        }

        if (!description.trim()) {
            setError("Description is required")
            return
        }

        try {
            setLoading(true)
            setError(null)

            const projectData = {
                name: projectName.trim(),
                about: description.trim(),

            }
            const response = await axios.post(
                "http://127.0.0.1:8000/probackendapp/api/projects/create/",
                projectData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                }
            )
            console.log(response.data)
            router.push(`/dashboard/projects/${response.data.id}`)
        } catch (err) {
            console.error('Error creating project:', err)
            setError(err.message || 'Failed to create project. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        router.push("/dashboard/projects")
    }

    return (
        <div className="flex min-h-screen bg-[#fcfcfc]">
            {/* Main Content */}
            <div className="flex-1 p-12">
                {/* Header */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-10 h-10 rounded-lg bg-[#884cff] flex items-center justify-center text-white">
                        <ChevronRight size={24} />
                    </div>
                    <h1 className="text-4xl font-bold text-[#1a1a1a]">Create New Project</h1>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {/* Form */}
                <div className="max-w-2xl space-y-8">
                    {/* Project Name Field */}
                    <div>
                        <label className="block text-lg font-semibold text-[#884cff] mb-3">
                            Project Name<span className="text-[#884cff]">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your project name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="w-full px-4 py-3 border border-[#e6e6e6] rounded-lg bg-white text-[#1a1a1a] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#884cff] focus:border-transparent transition-all"
                            disabled={loading}
                        />
                    </div>

                    {/* Description Field */}
                    <div>
                        <label className="block text-lg font-semibold text-[#884cff] mb-3">
                            Description<span className="text-[#884cff]">*</span>
                        </label>
                        <textarea
                            placeholder="Brief description of the product or collection"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={6}
                            className="w-full px-4 py-3 border border-[#e6e6e6] rounded-lg bg-white text-[#1a1a1a] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#884cff] focus:border-transparent transition-all resize-none"
                            disabled={loading}
                        />
                    </div>

                    {/* Category Field */}
                    {/* <div>
                        <label className="block text-lg font-semibold text-[#884cff] mb-3">
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 border border-[#e6e6e6] rounded-lg bg-white text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#884cff] focus:border-transparent transition-all appearance-none cursor-pointer"
                            disabled={loading}
                        >
                            <option value="">Select Category (Optional)</option>
                            <option value="fashion">Fashion</option>
                            <option value="jewelry">Jewelry</option>
                            <option value="accessories">Accessories</option>
                            <option value="home">Home & Living</option>
                            <option value="beauty">Beauty & Cosmetics</option>
                            <option value="electronics">Electronics</option>
                            <option value="other">Other</option>
                        </select>
                    </div> */}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between mt-16">
                    <button
                        className="flex items-center gap-2 px-4 py-2 text-[#1a1a1a] hover:bg-[#f0f0f0] rounded-lg transition-colors"
                        onClick={handleBack}
                        disabled={loading}
                    >
                        <ChevronLeft size={20} />
                        <span className="font-medium">Back</span>
                    </button>

                    <Button
                        onClick={handleCreateProject}
                        disabled={loading || !projectName.trim() || !description.trim()}
                        className="px-6 py-2 bg-[#884cff] text-white font-medium rounded-lg hover:bg-[#7a3ff0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Creating...
                            </>
                        ) : (
                            'Create Project'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateProjectPage