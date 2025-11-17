"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Edit2, Trash2, CheckCircle, Clock } from "lucide-react"
import { apiService } from "@/lib/api"
import toast from "react-hot-toast"

export function Header({ project, onProjectUpdate }) {
    const [updating, setUpdating] = useState(false)

    // Normalize incoming data
    const projectData = {
        id: project?.id,
        title: project?.title || project?.name || "Untitled Project",
        status: project?.status?.toLowerCase() || "progress",
        userRole: project?.userRole || "owner",
    }

    const getInitial = (title) => (title ? title.charAt(0).toUpperCase() : "?")

    const isCompleted = projectData.status === "completed"
    const isInProgress = projectData.status === "progress"

    // Toggle between only "progress" and "completed"
    const handleStatusToggle = async () => {
        const newStatus = isCompleted ? "progress" : "completed"
        setUpdating(true)

        try {
            const token = localStorage.getItem("token")
            const response = await apiService.updateProjectStatus(projectData.id, newStatus, token)

            if (response.status || response.id) {
                onProjectUpdate?.({ ...projectData, status: newStatus })
            }
        } catch (error) {
            console.error("Error updating project status:", error)
            toast.error("Failed to update project status. Please try again.")
        } finally {
            setUpdating(false)
        }
    }

    // Styling based on status
    const getStatusStyle = () => {
        if (isCompleted) {
            return {
                border: "border-green-500",
                bg: "bg-green-50",
                dot: "bg-green-500",
                text: "text-green-700",
            }
        }
        return {
            border: "border-amber-500",
            bg: "bg-amber-50",
            dot: "bg-amber-500",
            text: "text-amber-700",
        }
    }

    const statusStyle = getStatusStyle()

    // Human-readable display label
    const displayStatus =
        projectData.status === "progress" ? "In Progress" : "Completed"

    return (
        <div className="border-b border-[#e6e6e6] bg-white px-8 py-6">
            <div className="flex items-center justify-between">
                {/* Left section: Title + Status */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#884cff] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                                {getInitial(projectData.title)}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-[#1a1a1a]">
                            {projectData.title}
                        </h1>
                    </div>

                    {/* Status badge */}
                    <div className="ml-4">
                        <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${statusStyle.border} ${statusStyle.bg}`}
                        >
                            <div
                                className={`w-2 h-2 ${statusStyle.dot} rounded-full ${isCompleted ? "" : "animate-pulse"
                                    }`}
                            ></div>
                            <span className={`text-sm font-medium ${statusStyle.text}`}>
                                {displayStatus}
                            </span>
                        </span>
                    </div>
                </div>

                {/* Right section: Action buttons */}
                {projectData.userRole === "owner" && (
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className={`gap-2 ${isCompleted
                                    ? "border-green-500 text-green-700 hover:bg-green-50"
                                    : "border-amber-500 text-amber-700 hover:bg-amber-50"
                                }`}
                            onClick={handleStatusToggle}
                            disabled={updating}
                        >
                            {isCompleted ? (
                                <>
                                    <Clock className="w-4 h-4" />
                                    {updating ? "Updating..." : "Mark as In Progress"}
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-4 h-4" />
                                    {updating ? "Updating..." : "Mark as Completed"}
                                </>
                            )}
                        </Button>

                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            <Edit2 className="w-4 h-4" />
                            Edit
                        </Button>

                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            <Download className="w-4 h-4" />
                            Download
                        </Button>

                        <Button
                            size="sm"
                            className="gap-2 bg-[#f05656] hover:bg-[#e04545] text-white"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
