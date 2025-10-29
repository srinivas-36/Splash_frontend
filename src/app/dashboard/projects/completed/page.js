"use client"

import { ChevronRight, FileText, CheckCircle, Clock, ImageIcon, Search, Filter, Eye, Download, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { apiService } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

function Header() {
    return (
        <div className="border-b border-border bg-card">
            <div className="px-8 py-8">
                <div className="flex items-center px-8 gap-3 mb-2">
                    <h1 className="text-4xl font-bold text-foreground">Completed Projects</h1>
                </div>
                <p className="text-muted-foreground ml-11">Where creativity meets code. Splash into brilliance</p>
            </div>
        </div>
    )
}

function StatsGrid({ projects }) {
    const completedProjects = projects.filter(p => p.status === 'completed')
    const totalImages = completedProjects.reduce((sum, project) => {
        return sum + (project.collection?.items?.[0]?.product_images?.length || 0)
    }, 0)

    const stats = [
        {
            label: "Total Projects",
            value: projects.length.toString(),
            icon: FileText,
            bgColor: "bg-purple-100",
            iconColor: "text-primary",
        },
        {
            label: "Completed",
            value: completedProjects.length.toString(),
            icon: CheckCircle,
            bgColor: "bg-purple-100",
            iconColor: "text-primary",
        },
        {
            label: "Processing",
            value: projects.filter(p => p.status === 'progress').length.toString(),
            icon: Clock,
            bgColor: "bg-purple-100",
            iconColor: "text-primary",
        },
        {
            label: "Total Images",
            value: totalImages.toString(),
            icon: ImageIcon,
            bgColor: "bg-purple-100",
            iconColor: "text-primary",
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-8">
                        <h3 className="text-muted-foreground text-sm font-medium">{stat.label}</h3>
                        <div className={`${stat.bgColor} p-2 rounded-lg`}>
                            <stat.icon size={20} className={stat.iconColor} />
                        </div>
                    </div>
                    <p className="text-4xl font-bold text-primary">{stat.value}</p>
                </div>
            ))}
        </div>
    )
}

function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                    type="text"
                    placeholder="Search projects"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            <button className="px-6 py-3 bg-card border border-border rounded-xl text-foreground hover:bg-secondary transition-colors flex items-center gap-2 font-medium">
                <Filter size={20} />
                Sort By
            </button>
        </div>
    )
}

function ProjectsGrid({ projects, searchQuery }) {
    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        project.status === 'completed'
    )

    if (filteredProjects.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchQuery ? 'No completed projects found' : 'No completed projects yet'}
                </h3>
                <p className="text-gray-600">
                    {searchQuery ? 'Try adjusting your search terms.' : 'Complete some projects to see them here.'}
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
                <div
                    key={project.id}
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                    {/* Project Image */}
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                            <CheckCircle size={48} className="text-green-500" />
                        </div>
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {project.collection?.items?.[0]?.product_images?.length || 0} images
                        </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-foreground mb-4">{project.name}</h3>

                        {/* Project Meta */}
                        <div className="flex gap-6 mb-6 text-sm">
                            <div>
                                <p className="text-primary font-semibold">Images</p>
                                <p className="text-foreground">{project.collection?.items?.[0]?.product_images?.length || 0}</p>
                            </div>
                            <div>
                                <p className="text-primary font-semibold">Date</p>
                                <p className="text-foreground">{new Date(project.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-primary font-semibold">Status</p>
                                <p className="text-green-500 font-semibold">{project.status === 'completed' ? 'Completed' : 'In Progress'}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <Link
                                href={`/dashboard/projects/${project.id}`}
                                className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2 font-medium"
                            >
                                <Eye size={18} />
                                View
                            </Link>
                            <button className="flex-1 bg-card border border-border text-foreground py-2 px-4 rounded-lg hover:bg-secondary transition-colors flex items-center justify-center gap-2 font-medium">
                                <Download size={18} />
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function CompletedProjectsPage() {
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
            <div className="flex min-h-screen bg-background items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-lg text-muted-foreground">Loading completed projects...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex min-h-screen bg-background items-center justify-center">
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
        <div className="flex min-h-screen bg-background">
            <main className="flex-1">
                <Header />
                <div className="p-8">
                    <StatsGrid projects={projects} />
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <ProjectsGrid projects={projects} searchQuery={searchQuery} />

                    {/* Back Button */}
                    <div className="mt-8">
                        <Link href="/dashboard/projects">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium">
                                <ArrowLeft size={18} />
                                Back to Projects
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}