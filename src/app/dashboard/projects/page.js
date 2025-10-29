// "use client"

// import { Clock, FileText, CheckCircle, Zap, Search, SlidersHorizontal, Eye, Download } from "lucide-react"
// import { useState } from "react"
// import Link from "next/link"

// export default function Dashboard() {
//     const [searchQuery, setSearchQuery] = useState("")

//     const stats = [
//         {
//             label: "Total Projects",
//             value: "3",
//             icon: <FileText size={24} className="text-[#7753ff]" />,
//         },
//         {
//             label: "Completed",
//             value: "1",
//             icon: <CheckCircle size={24} className="text-[#7753ff]" />,
//         },
//         {
//             label: "Processing",
//             value: "1",
//             icon: <Clock size={24} className="text-[#7753ff]" />,
//         },
//         {
//             label: "Available Credits",
//             value: "10",
//             subtext: "Free Credits Expire on 24/06/2025",
//             icon: <Zap size={24} className="text-[#7753ff]" />,
//         },
//     ]

//     const projects = [
//         {
//             id: 1,
//             title: "Festival Collection",
//             image: "/festival-collection-fashion.jpg",
//             images: 12,
//             date: "12/09/2025",
//             status: "Completed",
//         },
//         {
//             id: 2,
//             title: "Summer Collections",
//             image: "/gold-jewelry-on-white-plate.jpg",
//             images: 12,
//             date: "12/09/2025",
//             status: "Completed",
//         },
//         {
//             id: 3,
//             title: "Winter Campaign",
//             image: "/black-and-white-abstract-pattern.jpg",
//             images: 12,
//             date: "12/09/2025",
//             status: "Completed",
//         },
//     ]

//     const filteredProjects = projects.filter((project) => project.title.toLowerCase().includes(searchQuery.toLowerCase()))

//     return (
//         <div className="flex h-screen">
//             <main className="flex-1 overflow-auto">
//                 <div className="p-8">
//                     {/* Dashboard Header */}
//                     <div className="mb-10 fade-in">
//                         <div className="flex items-center gap-3 mb-3">
//                             <div className="w-1 h-12 bg-gradient-to-b from-[#7753ff] to-[#ec4899] rounded-full"></div>
//                             <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#7753ff] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
//                                 Project Management
//                             </h1>
//                         </div>
//                         <p className="text-[#737373] text-lg ml-4 font-medium">Where creativity meets code. Splash into brilliance ✨</p>
//                     </div>

//                     {/* Stat Cards */}
//                     <div className="grid grid-cols-4 gap-6 mb-10">
//                         {stats.map((stat, idx) => (
//                             <div
//                                 key={idx}
//                                 className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-2xl p-6 hover-lift hover:border-purple-300 transition-all duration-300 group scale-in"
//                                 style={{ animationDelay: `${idx * 100}ms` }}
//                             >
//                                 <div className="flex items-start justify-between mb-5">
//                                     <h3 className="text-sm font-semibold text-[#737373] uppercase tracking-wider">{stat.label}</h3>
//                                     <div className="bg-gradient-to-br from-[#f0e6ff] to-[#fce7f3] p-3 rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
//                                         {stat.icon}
//                                     </div>
//                                 </div>
//                                 <p className="text-4xl font-extrabold bg-gradient-to-r from-[#7753ff] to-[#ec4899] bg-clip-text text-transparent mb-2">
//                                     {stat.value}
//                                 </p>
//                                 {stat.subtext && (
//                                     <p className="text-xs text-[#737373] font-medium flex items-center gap-1">
//                                         <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
//                                         {stat.subtext}
//                                     </p>
//                                 )}
//                             </div>
//                         ))}
//                     </div>

//                     {/* Search Bar */}
//                     <div className="flex items-center gap-4 mb-10 slide-in-bottom">
//                         <div className="flex-1 relative group">
//                             <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#737373] group-focus-within:text-[#7753ff] transition-colors" size={20} />
//                             <input
//                                 type="text"
//                                 placeholder="Search your amazing projects..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="w-full bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl pl-14 pr-6 py-4 text-[#1a1a1a] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#7753ff] focus:border-[#7753ff] transition-all duration-300 shadow-sm hover:shadow-md font-medium"
//                             />
//                         </div>
//                         <button className="flex items-center gap-2 px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl text-[#1a1a1a] font-semibold hover:bg-gradient-to-r hover:from-[#7753ff] hover:to-[#a855f7] hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg group">
//                             <SlidersHorizontal size={20} className="group-hover:rotate-90 transition-transform duration-300" />
//                             Sort By
//                         </button>
//                     </div>

//                     {/* Project Cards */}
//                     <div className="grid grid-cols-3 gap-8">
//                         {filteredProjects.map((project, idx) => (
//                             <div
//                                 key={project.id}
//                                 className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-3xl overflow-hidden hover-lift hover:border-purple-300 transition-all duration-300 group scale-in"
//                                 style={{ animationDelay: `${idx * 100}ms` }}
//                             >
//                                 {/* Image */}
//                                 <div className="relative h-56 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
//                                     <img
//                                         src={project.image || "/placeholder.svg"}
//                                         alt={project.title}
//                                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                                     />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                                     <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-[#7753ff] shadow-lg">
//                                         {project.images} Images
//                                     </div>
//                                 </div>

//                                 {/* Content */}
//                                 <div className="p-6">
//                                     <h3 className="text-xl font-extrabold text-[#1a1a1a] mb-5 group-hover:text-[#7753ff] transition-colors duration-300">
//                                         {project.title}
//                                     </h3>

//                                     {/* Stats */}
//                                     <div className="flex justify-between mb-6 text-sm bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
//                                         <div className="text-center">
//                                             <p className="text-[#999] font-semibold text-xs uppercase tracking-wider mb-1">Images</p>
//                                             <p className="text-[#7753ff] font-bold text-lg">{project.images}</p>
//                                         </div>
//                                         <div className="w-px bg-purple-200"></div>
//                                         <div className="text-center">
//                                             <p className="text-[#999] font-semibold text-xs uppercase tracking-wider mb-1">Date</p>
//                                             <p className="text-[#7753ff] font-bold text-lg">{project.date}</p>
//                                         </div>
//                                         <div className="w-px bg-purple-200"></div>
//                                         <div className="text-center">
//                                             <p className="text-[#999] font-semibold text-xs uppercase tracking-wider mb-1">Status</p>
//                                             <p className="text-green-500 font-bold text-lg flex items-center gap-1">
//                                                 <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
//                                                 Done
//                                             </p>
//                                         </div>
//                                     </div>

//                                     {/* Actions */}
//                                     <div className="flex gap-3">
//                                         <Link
//                                             href={`/dashboard/projects/${project.id}`}
//                                             className="flex-1 bg-gradient-to-r from-[#7753ff] to-[#a855f7] hover:from-[#884cff] hover:to-[#b565f8] text-white rounded-xl py-3 px-4 font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 group/btn"
//                                         >
//                                             <Eye size={18} className="group-hover/btn:scale-110 transition-transform" />
//                                             View
//                                         </Link>
//                                         <button className="flex-1 bg-white border-2 border-purple-200 text-[#7753ff] hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-300 rounded-xl py-3 px-4 font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md group/btn">
//                                             <Download size={18} className="group-hover/btn:scale-110 transition-transform" />
//                                             Download
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     )
// }


"use client"

import { Clock, FileText, CheckCircle, Zap, Search, SlidersHorizontal, Eye, Download, Plus, Trash2, Edit2 } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { apiService } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

export default function Dashboard() {
    const { token } = useAuth()
    console.log("token :", token)
    const [searchQuery, setSearchQuery] = useState("")
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        processing: 0,
        credits: 10
    })

    // Fetch projects from backend
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true)
                console.log("Auth token in useEffect:", token);

                const response = await apiService.getProjects(token)
                const projectsData = response.projects || []
                setProjects(projectsData)

                // Calculate stats
                const completed = projectsData.filter(p => p.status === 'Completed').length
                const processing = projectsData.filter(p => p.status === 'In Progress').length

                setStats({
                    total: projectsData.length,
                    completed,
                    processing,
                    credits: 10 // This could be fetched from user profile
                })
            } catch (err) {
                console.error('Error fetching projects:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [token])

    const handleDeleteProject = async (projectId) => {
        if (!confirm('Are you sure you want to delete this project?')) return

        try {
            await apiService.deleteProject(projectId)
            setProjects(prev => prev.filter(p => p.id !== projectId))
            setStats(prev => ({
                ...prev,
                total: prev.total - 1,
                completed: projects.filter(p => p.id !== projectId && p.status === 'completed').length,
                processing: projects.filter(p => p.id !== projectId && p.status === 'progress').length
            }))
        } catch (err) {
            console.error('Error deleting project:', err)
            alert('Failed to delete project. Please try again.')
        }
    }

    const statsData = [
        {
            label: "Total Projects",
            value: stats.total.toString(),
            icon: <FileText size={20} className="text-white" />,
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            label: "Completed",
            value: stats.completed.toString(),
            icon: <CheckCircle size={20} className="text-white" />,
            gradient: "from-green-500 to-emerald-500",
        },
        {
            label: "Processing",
            value: stats.processing.toString(),
            icon: <Clock size={20} className="text-white" />,
            gradient: "from-amber-500 to-orange-500",
        },
        {
            label: "Available Credits",
            value: stats.credits.toString(),
            subtext: "Free Credits Expire on 24/06/2025",
            icon: <Zap size={20} className="text-white" />,
            gradient: "from-purple-500 to-pink-500",
        },
    ]

    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Loading projects...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="p-6 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Management</h1>
                            <p className="text-gray-600">Manage and track all your creative projects in one place</p>
                        </div>
                        <Link href="/dashboard/projects/create">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                <Plus size={20} />
                                New Project
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statsData.map((stat, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                    {stat.icon}
                                </div>
                                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                            </div>
                            <h3 className="text-gray-700 font-semibold mb-1">{stat.label}</h3>
                            {stat.subtext && (
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                    {stat.subtext}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Search and Controls */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="flex-1 w-full relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            />
                        </div>
                        <div className="flex gap-3 w-full lg:w-auto">
                            <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl text-gray-700 font-medium transition-all duration-300 flex-1 lg:flex-none justify-center">
                                <SlidersHorizontal size={18} />
                                Sort
                            </button>
                            <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl text-gray-700 font-medium transition-all duration-300 flex-1 lg:flex-none justify-center">
                                Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Your Projects</h2>
                        <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                            {filteredProjects.length} projects
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                            >
                                {/* Project Image */}
                                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                        <FileText size={48} className="text-gray-400" />
                                    </div>
                                    <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                                        {project.collection?.items?.[0]?.product_images?.length || 0} images
                                    </div>
                                    <div className={`absolute top-4 left-4 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${project.status === 'completed'
                                        ? 'bg-green-100/90 text-green-700 border border-green-300'
                                        : 'bg-amber-100/90 text-amber-700 border border-amber-300'
                                        }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'completed' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'
                                            }`}></div>
                                        {project.status}
                                    </div>
                                </div>

                                {/* Project Content */}
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                            {project.name}
                                        </h3>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => handleDeleteProject(project.id)}
                                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                title="Delete project"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Project Meta */}
                                    <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <FileText size={14} />
                                                {project.collection?.items?.[0]?.product_images?.length || 0} files
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {new Date(project.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/dashboard/projects/${project.id}`}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 px-4 font-semibold flex items-center justify-center gap-2 transition-all duration-300 text-sm"
                                        >
                                            <Eye size={16} />
                                            View Details
                                        </Link>
                                        <button className="flex-1 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-lg py-2.5 px-4 font-semibold flex items-center justify-center gap-2 transition-all duration-300 text-sm">
                                            <Download size={16} />
                                            Export
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={24} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {searchQuery ? 'No projects found' : 'No projects yet'}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {searchQuery ? 'Try adjusting your search terms.' : 'Create your first project to get started.'}
                            </p>
                            {!searchQuery && (
                                <Link href="/dashboard/projects/create">
                                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                        Create Project
                                    </button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}