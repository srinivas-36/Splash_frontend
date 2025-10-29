"use client"

import {
    ChevronRight,
    ChevronLeft,
    FileText,
    CheckCircle,
    Clock,
    ImageIcon,
    Search,
    Filter,
    Eye,
    Download,
    ArrowLeft,
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { apiService } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

// Header Component
function Header() {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#884cff] rounded flex items-center justify-center">
                    <ChevronRight size={16} className="text-white" />
                </div>
                <h1 className="text-4xl font-bold text-[#1a1a1a]">Ongoing Projects</h1>
            </div>
            <p className="text-[#737373] text-lg">Where creativity meets code. Splash into brilliance</p>
        </div>
    )
}

// Stats Cards Component
function StatsCards({ projects }) {
    const ongoingProjects = projects.filter(p => p.status === 'progress')
    const totalImages = ongoingProjects.reduce((sum, project) => {
        return sum + (project.collection?.items?.[0]?.product_images?.length || 0)
    }, 0)

    const stats = [
        {
            label: "Total Projects",
            value: projects.length.toString(),
            icon: FileText,
            bgColor: "#f0e6ff",
            iconColor: "#884cff",
        },
        {
            label: "Ongoing",
            value: ongoingProjects.length.toString(),
            icon: Clock,
            bgColor: "#f0e6ff",
            iconColor: "#884cff",
        },
        {
            label: "Completed",
            value: projects.filter(p => p.status === 'completed').length.toString(),
            icon: CheckCircle,
            bgColor: "#f0e6ff",
            iconColor: "#884cff",
        },
        {
            label: "Total Images",
            value: totalImages.toString(),
            icon: ImageIcon,
            bgColor: "#f0e6ff",
            iconColor: "#884cff",
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon
                return (
                    <div key={stat.label} className="border border-[#e6e6e6] rounded-2xl p-6 bg-white">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[#737373] font-medium">{stat.label}</span>
                            <div style={{ backgroundColor: stat.bgColor }} className="p-2 rounded-lg">
                                <Icon size={20} style={{ color: stat.iconColor }} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-[#884cff]">{stat.value}</p>
                    </div>
                )
            })}
        </div>
    )
}

// Search Bar Component
function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 flex items-center gap-3 border border-[#e6e6e6] rounded-2xl px-4 py-3 bg-white">
                <Search size={20} className="text-[#737373]" />
                <input
                    type="text"
                    placeholder="Search ongoing projects"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 outline-none text-[#333333] placeholder-[#737373] bg-transparent"
                />
            </div>
            <button className="flex items-center gap-2 border border-[#e6e6e6] rounded-2xl px-4 py-3 bg-white text-[#333333] hover:bg-[#f5f5f5] transition">
                <Filter size={18} />
                <span>Sort By</span>
            </button>
        </div>
    )
}

// Project Card Component
function ProjectCard({ project }) {
    return (
        <div className="border border-[#e6e6e6] rounded-2xl p-6 bg-white overflow-hidden">
            {/* Project Image */}
            <div className="mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 h-40 flex items-center justify-center">
                <Clock size={48} className="text-amber-500" />
            </div>

            {/* Project Title */}
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">{project.name}</h3>

            {/* Project Metadata */}
            <div className="flex gap-6 mb-6 text-sm">
                <div>
                    <p className="text-[#884cff] font-semibold">Images</p>
                    <p className="text-[#333333]">{project.collection?.items?.[0]?.product_images?.length || 0}</p>
                </div>
                <div>
                    <p className="text-[#884cff] font-semibold">Date</p>
                    <p className="text-[#333333]">{new Date(project.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                    <p className="text-[#884cff] font-semibold">Status</p>
                    <p className="text-amber-500 font-semibold">{project.status}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#884cff] text-white rounded-lg py-2 hover:bg-[#7753ff] transition font-medium"
                >
                    <Eye size={18} />
                    Continue
                </Link>
                <button className="flex-1 flex items-center justify-center gap-2 border border-[#333333] text-[#333333] rounded-lg py-2 hover:bg-[#f5f5f5] transition font-medium">
                    <Download size={18} />
                    Export
                </button>
            </div>
        </div>
    )
}

// Projects Grid Component
function ProjectsGrid({ projects, searchQuery }) {
    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        project.status === 'progress'
    )

    if (filteredProjects.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchQuery ? 'No ongoing projects found' : 'No ongoing projects'}
                </h3>
                <p className="text-gray-600 mb-4">
                    {searchQuery ? 'Try adjusting your search terms.' : 'Start a new project to see it here.'}
                </p>
                {!searchQuery && (
                    <Link href="/dashboard/projects/create">
                        <button className="bg-[#884cff] text-white px-6 py-3 rounded-lg hover:bg-[#7753ff] transition-colors">
                            Create Project
                        </button>
                    </Link>
                )}
            </div>
        )
    }

    return (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    )
}

// Back Button Component
function BackButton() {
    return (
        <div className="mt-8">
            <Link href="/dashboard/projects">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f0e6ff] text-[#884cff] hover:bg-[#e6d9ff] transition font-medium">
                    <ChevronLeft size={18} />
                    Back to Projects
                </button>
            </Link>
        </div>
    )
}

// Main Page
export default function OngoingProjectsPage() {
    const { token } = useAuth()
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true)
                const response = await apiService.getProjects(token)
                setProjects(response.projects || [])
            } catch (err) {
                console.error('Error fetching projects:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#884cff] mx-auto mb-4"></div>
                    <p className="text-lg text-[#737373]">Loading ongoing projects...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
                <div className="text-center">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                        <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Projects</h2>
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#fcfcfc]">
            <main className="p-8 max-w-7xl mx-auto">
                <Header />
                <StatsCards projects={projects} />
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <ProjectsGrid projects={projects} searchQuery={searchQuery} />
                <BackButton />
            </main>
        </div>
    )
}