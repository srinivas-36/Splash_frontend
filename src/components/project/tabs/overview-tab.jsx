// "use client"

// import { useState, useEffect } from "react"
// import { CircleDot, Clock, Calendar, FileText, Image as ImageIcon, Package, User, CheckCircle } from "lucide-react"
// import { ProductImagesDisplay } from "../product-images-display"
// import { apiService } from "@/lib/api"

// export default function OverviewTab({ project }) {
//     const [collectionData, setCollectionData] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [stats, setStats] = useState({
//         totalImages: 0,
//         products: 0,
//         variations: 0,
//         completion: 0
//     })

//     const loadData = async () => {
//         if (!project?.collection_id) {
//             setLoading(false)
//             return
//         }

//         try {
//             setLoading(true)
//             const data = await apiService.getCollection(project.collection_id)
//             setCollectionData(data)

//             // Calculate stats
//             if (data?.items?.[0]) {
//                 const item = data.items[0]
//                 const products = item.product_images || []
//                 const totalGenerated = products.reduce((sum, p) =>
//                     sum + (p.generated_images?.length || 0), 0
//                 )

//                 // Calculate completion percentage
//                 let completionSteps = 0
//                 if (data.description) completionSteps += 25
//                 if (item.selected_model) completionSteps += 25
//                 if (products.length > 0) completionSteps += 25
//                 if (totalGenerated > 0) completionSteps += 25

//                 setStats({
//                     totalImages: totalGenerated,
//                     products: products.length,
//                     variations: products.length > 0 ? Math.floor(totalGenerated / products.length) : 0,
//                     completion: completionSteps
//                 })
//             }
//         } catch (err) {
//             console.error('Error loading overview:', err)
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         loadData()
//     }, [project])

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center py-12">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#884cff] mx-auto mb-4"></div>
//                     <p className="text-[#708090]">Loading overview...</p>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className="space-y-8">
//             {/* Project Details Card */}
//             <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-8">
//                 <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Project Overview</h2>

//                 <div className="grid grid-cols-2 gap-6">
//                     <div className="flex items-start gap-4">
//                         <div className="w-12 h-12 bg-[#884cff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <FileText className="w-6 h-6 text-[#884cff]" />
//                         </div>
//                         <div>
//                             <p className="text-sm text-[#708090] mb-1">Project Name</p>
//                             <p className="text-lg font-semibold text-[#1a1a1a]">{project?.title || 'Untitled Project'}</p>
//                         </div>
//                     </div>

//                     <div className="flex items-start gap-4">
//                         <div className="w-12 h-12 bg-[#884cff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <CircleDot className="w-6 h-6 text-[#884cff]" />
//                         </div>
//                         <div>
//                             <p className="text-sm text-[#708090] mb-1">Status</p>
//                             <div className="flex items-center gap-2">
//                                 <div className={`w-2 h-2 rounded-full ${project?.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`} />
//                                 <p className="text-lg font-semibold text-[#1a1a1a]">{project?.status || 'In Progress'}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex items-start gap-4">
//                         <div className="w-12 h-12 bg-[#884cff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <Calendar className="w-6 h-6 text-[#884cff]" />
//                         </div>
//                         <div>
//                             <p className="text-sm text-[#708090] mb-1">Created Date</p>
//                             <p className="text-lg font-semibold text-[#1a1a1a]">
//                                 {project?.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A'}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-start gap-4">
//                         <div className="w-12 h-12 bg-[#884cff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <Clock className="w-6 h-6 text-[#884cff]" />
//                         </div>
//                         <div>
//                             <p className="text-sm text-[#708090] mb-1">Last Modified</p>
//                             <p className="text-lg font-semibold text-[#1a1a1a]">
//                                 {project?.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A'}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {project?.description && (
//                     <div className="mt-6 pt-6 border-t border-[#e6e6e6]">
//                         <p className="text-sm text-[#708090] mb-2">Description</p>
//                         <p className="text-[#1a1a1a]">{project.description}</p>
//                     </div>
//                 )}

//                 {collectionData?.description && (
//                     <div className="mt-6 pt-6 border-t border-[#e6e6e6]">
//                         <p className="text-sm text-[#708090] mb-2">Collection Description</p>
//                         <p className="text-[#1a1a1a]">{collectionData.description}</p>
//                     </div>
//                 )}
//             </div>

//             {/* Quick Stats */}
//             <div className="grid grid-cols-4 gap-6">
//                 <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-6">
//                     <div className="flex items-center gap-3 mb-3">
//                         <div className="w-10 h-10 bg-[#884cff]/10 rounded-lg flex items-center justify-center">
//                             <ImageIcon className="w-5 h-5 text-[#884cff]" />
//                         </div>
//                         <p className="text-sm text-[#708090]">Total Images</p>
//                     </div>
//                     <p className="text-3xl font-bold text-[#884cff]">{stats.totalImages}</p>
//                 </div>

//                 <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-6">
//                     <div className="flex items-center gap-3 mb-3">
//                         <div className="w-10 h-10 bg-[#884cff]/10 rounded-lg flex items-center justify-center">
//                             <Package className="w-5 h-5 text-[#884cff]" />
//                         </div>
//                         <p className="text-sm text-[#708090]">Products</p>
//                     </div>
//                     <p className="text-3xl font-bold text-[#884cff]">{stats.products}</p>
//                 </div>

//                 <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-6">
//                     <div className="flex items-center gap-3 mb-3">
//                         <div className="w-10 h-10 bg-[#884cff]/10 rounded-lg flex items-center justify-center">
//                             <User className="w-5 h-5 text-[#884cff]" />
//                         </div>
//                         <p className="text-sm text-[#708090]">Model Used</p>
//                     </div>
//                     <p className="text-lg font-bold text-[#884cff]">
//                         {collectionData?.items?.[0]?.selected_model?.type === 'ai' ? 'AI' :
//                             collectionData?.items?.[0]?.selected_model?.type === 'real' ? 'Real' : 'None'}
//                     </p>
//                 </div>

//                 <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-6">
//                     <div className="flex items-center gap-3 mb-3">
//                         <div className="w-10 h-10 bg-[#884cff]/10 rounded-lg flex items-center justify-center">
//                             <CheckCircle className="w-5 h-5 text-[#884cff]" />
//                         </div>
//                         <p className="text-sm text-[#708090]">Completion</p>
//                     </div>
//                     <p className="text-3xl font-bold text-[#884cff]">{stats.completion}%</p>
//                 </div>
//             </div>

//             {/* Workflow Progress */}
//             <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-6">
//                 <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">Workflow Progress</h3>
//                 <div className="space-y-3">
//                     <div className="flex items-center gap-3">
//                         <div className={`w-6 h-6 rounded-full flex items-center justify-center ${collectionData?.description ? 'bg-green-500' : 'bg-gray-300'}`}>
//                             {collectionData?.description && <CheckCircle className="w-4 h-4 text-white" />}
//                         </div>
//                         <p className="text-sm text-[#1a1a1a]">Step 1: Project Setup</p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <div className={`w-6 h-6 rounded-full flex items-center justify-center ${collectionData?.items?.[0]?.selected_model ? 'bg-green-500' : 'bg-gray-300'}`}>
//                             {collectionData?.items?.[0]?.selected_model && <CheckCircle className="w-4 h-4 text-white" />}
//                         </div>
//                         <p className="text-sm text-[#1a1a1a]">Step 2: Model Selection</p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <div className={`w-6 h-6 rounded-full flex items-center justify-center ${stats.products > 0 ? 'bg-green-500' : 'bg-gray-300'}`}>
//                             {stats.products > 0 && <CheckCircle className="w-4 h-4 text-white" />}
//                         </div>
//                         <p className="text-sm text-[#1a1a1a]">Step 3: Product Upload</p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <div className={`w-6 h-6 rounded-full flex items-center justify-center ${stats.totalImages > 0 ? 'bg-green-500' : 'bg-gray-300'}`}>
//                             {stats.totalImages > 0 && <CheckCircle className="w-4 h-4 text-white" />}
//                         </div>
//                         <p className="text-sm text-[#1a1a1a]">Step 4: Image Generation</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Preview of Generated Images */}
//             {stats.totalImages > 0 && (
//                 <div>
//                     <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Generated Images Preview</h3>
//                     <ProductImagesDisplay
//                         collectionData={collectionData}
//                         showRegenerate={false}
//                     />
//                 </div>
//             )}
//         </div>
//     )
// }


"use client"

import { useState, useEffect } from "react"
import { CircleDot, Clock, Calendar, FileText, Image as ImageIcon, Package, User, CheckCircle } from "lucide-react"
import { ProductImagesDisplay } from "../product-images-display"
import { apiService } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

export default function OverviewTab({ project }) {
    console.log("project", project);
    const [collectionData, setCollectionData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        totalImages: 0,
        products: 0,
        variations: 0,
        completion: 0
    })
    const [modelStats, setModelStats] = useState({
        total_models_used: 0,
        models_breakdown: [],
        total_generations: 0
    })
    const { token } = useAuth()

    const loadData = async () => {
        if (!project?.collection?.id) {
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            const data = await apiService.getCollection(project.collection.id, token)
            setCollectionData(data)

            if (data?.items?.[0]) {
                const item = data.items[0]
                const products = item.product_images || []
                const totalGenerated = products.reduce((sum, p) => sum + (p.generated_images?.length || 0), 0)

                const completionSteps = [
                    data.description ? 1 : 0,
                    item.selected_model ? 1 : 0,
                    products.length > 0 ? 1 : 0,
                    totalGenerated > 0 ? 1 : 0
                ].reduce((a, b) => a + b, 0)

                setStats({
                    totalImages: totalGenerated,
                    products: products.length,
                    variations: products.length > 0 ? Math.floor(totalGenerated / products.length) : 0,
                    completion: Math.floor((completionSteps / 4) * 100)
                })
            }

            // Fetch model usage statistics
            try {
                const modelUsageData = await apiService.getModelUsageStats(project.collection.id, token)
                if (modelUsageData.success) {
                    setModelStats({
                        total_models_used: modelUsageData.total_models_used || 0,
                        models_breakdown: modelUsageData.models_breakdown || [],
                        total_generations: modelUsageData.total_generations || 0
                    })
                }
            } catch (err) {
                console.error('Error fetching model statistics:', err)
            }
        } catch (err) {
            console.error('Error loading overview:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [project])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#884cff] mx-auto mb-4"></div>
                    <p className="text-[#708090]">Loading overview...</p>
                </div>
            </div>
        )
    }

    const item = collectionData?.items?.[0] || {}

    return (
        <div className="space-y-8">

            {/* Project & Collection Details */}
            <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-8">
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Project Overview</h2>
                <div className="grid grid-cols-2 gap-6">
                    {/* Project Name */}
                    <InfoCard icon={<FileText className="w-6 h-6 text-[#884cff]" />} label="Project Name" value={project?.title || 'Untitled Project'} />
                    {/* Status */}
                    <InfoCard icon={<CircleDot className="w-6 h-6 text-[#884cff]" />} label="Status" value={project?.status || 'progress'} dotColor={project?.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'} />
                    {/* Created Date */}
                    <InfoCard icon={<Calendar className="w-6 h-6 text-[#884cff]" />} label="Created Date" value={project?.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A'} />
                    {/* Last Modified */}
                    <InfoCard icon={<Clock className="w-6 h-6 text-[#884cff]" />} label="Last Modified" value={project?.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A'} />
                </div>

                {project?.about && <Description label="Project Description" text={project.about} />}
                {collectionData?.description && <Description label="Collection Description" text={collectionData.description} />}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-6">
                <StatCard icon={<ImageIcon className="w-5 h-5 text-[#884cff]" />} label="Total Images" value={modelStats.total_generations} />
                <StatCard icon={<Package className="w-5 h-5 text-[#884cff]" />} label="Products" value={stats.products} />
                <StatCard icon={<User className="w-5 h-5 text-[#884cff]" />} label="Total Models Used" value={modelStats.total_models_used} />
                <StatCard icon={<CheckCircle className="w-5 h-5 text-[#884cff]" />} label="Completion" value={`${stats.completion}%`} />
            </div>

            {/* Model Usage Statistics */}
            {modelStats.total_models_used > 0 && (
                <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">Model Usage Statistics</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#884cff]/10 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <div>
                                    <p className="text-sm text-[#708090]">Total Generations</p>
                                    <p className="text-2xl font-bold text-[#884cff]">{modelStats.total_generations}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-[#708090]">Different Models</p>
                                <p className="text-2xl font-bold text-[#884cff]">{modelStats.total_models_used}</p>
                            </div>
                        </div>

                        {/* Models Breakdown */}
                        <div>
                            <p className="text-sm font-medium text-[#708090] mb-3">Models Used:</p>
                            <div className="grid grid-cols-2 gap-3">
                                {modelStats.models_breakdown.map((model, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 border border-[#e6e6e6] rounded-lg hover:border-[#884cff] transition-colors">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${model.type === 'ai' ? 'bg-purple-100' : 'bg-green-100'
                                                }`}>
                                                <span className="text-sm">{model.type === 'ai' ? '🤖' : '👤'}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-[#1a1a1a] capitalize">
                                                    {model.type === 'ai' ? 'AI Model' : model.name || 'Real Model'}
                                                </p>
                                                <p className="text-xs text-[#708090]">
                                                    {model.type === 'ai' ? 'Generated' : 'Uploaded'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-[#884cff]">{model.usage_count}</p>
                                            <p className="text-xs text-[#708090]">uses</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Workflow Progress */}
            <WorkflowProgress
                steps={[
                    { label: 'Project Setup', completed: !!collectionData?.description },
                    { label: 'Model Selection', completed: !!item.selected_model },
                    { label: 'Product Upload', completed: stats.products > 0 },
                    { label: 'Image Generation', completed: stats.totalImages > 0 }
                ]}
            />

            {/* Preview of Generated Images */}
            {stats.totalImages > 0 && (
                <div>
                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Generated Images Preview</h3>
                    <ProductImagesDisplay collectionData={collectionData} showRegenerate={false} />
                </div>
            )}
        </div>
    )
}

// -----------------
// Helper Components
// -----------------
const InfoCard = ({ icon, label, value, dotColor }) => (
    <div className="flex items-start gap-4">
        <div className={`w-12 h-12 bg-[#884cff]/10 rounded-lg flex items-center justify-center flex-shrink-0 ${dotColor ? '' : ''}`}>
            {dotColor && <div className={`w-2 h-2 rounded-full ${dotColor}`} />}
            {!dotColor && icon}
        </div>
        <div>
            <p className="text-sm text-[#708090] mb-1">{label}</p>
            <p className="text-lg font-semibold text-[#1a1a1a]">{value}</p>
        </div>
    </div>
)

const Description = ({ label, text }) => (
    <div className="mt-6 pt-6 border-t border-[#e6e6e6]">
        <p className="text-sm text-[#708090] mb-2">{label}</p>
        <p className="text-[#1a1a1a]">{text}</p>
    </div>
)

const StatCard = ({ icon, label, value }) => (
    <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-6">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#884cff]/10 rounded-lg flex items-center justify-center">{icon}</div>
            <p className="text-sm text-[#708090]">{label}</p>
        </div>
        <p className="text-3xl font-bold text-[#884cff]">{value}</p>
    </div>
)

const WorkflowProgress = ({ steps }) => (
    <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">Workflow Progress</h3>
        <div className="space-y-3">
            {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                        {step.completed && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <p className="text-sm text-[#1a1a1a]">{`Step ${idx + 1}: ${step.label}`}</p>
                </div>
            ))}
        </div>
    </div>
)
