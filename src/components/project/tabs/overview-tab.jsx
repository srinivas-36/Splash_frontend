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
import { CircleDot, Clock, Calendar, FileText, Image as ImageIcon, Package, User, CheckCircle, Palette, MapPin, Camera, Sparkles } from "lucide-react"
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

    // Calculate generation status counts
    const generationStats = {
        whiteBackground: 0,
        backgroundReplace: 0,
        modelImages: 0,
        campaignImages: 0,
        regenerated: 0
    }

    if (item.product_images) {
        item.product_images.forEach(product => {
            if (product.generated_images) {
                product.generated_images.forEach(img => {
                    if (img.type === 'white_background') generationStats.whiteBackground++
                    else if (img.type === 'background_replace') generationStats.backgroundReplace++
                    else if (img.type === 'model_image') generationStats.modelImages++
                    else if (img.type === 'campaign_image') generationStats.campaignImages++

                    // Count regenerated images
                    if (img.regenerated_images) {
                        generationStats.regenerated += img.regenerated_images.length
                    }
                })
            }
        })
    }

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
                    <InfoCard icon={<Clock className="w-6 h-6 text-[#884cff]" />} label="Latest Updated" value={project?.updated_at ? new Date(project.updated_at).toLocaleDateString() : (project?.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A')} />
                </div>

                {collectionData?.description && <Description label="Collection Description" text={collectionData.description} />}
            </div>

            {/* Selected Themes, Backgrounds, Poses, Locations, Colors Section */}
            <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-8">
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Selected Elements</h2>

                <div className="space-y-6">
                    {/* Themes */}
                    {(item.selected_themes?.length > 0 || item.uploaded_theme_images?.length > 0) && (
                        <SelectionSection
                            title="Themes"
                            icon={<Sparkles className="w-5 h-5 text-[#884cff]" />}
                            selected={item.selected_themes || []}
                            uploadedImages={item.uploaded_theme_images || []}
                        />
                    )}

                    {/* Backgrounds */}
                    {(item.selected_backgrounds?.length > 0 || item.uploaded_background_images?.length > 0) && (
                        <SelectionSection
                            title="Backgrounds"
                            icon={<ImageIcon className="w-5 h-5 text-[#884cff]" />}
                            selected={item.selected_backgrounds || []}
                            uploadedImages={item.uploaded_background_images || []}
                        />
                    )}

                    {/* Poses */}
                    {(item.selected_poses?.length > 0 || item.uploaded_pose_images?.length > 0) && (
                        <SelectionSection
                            title="Poses"
                            icon={<Camera className="w-5 h-5 text-[#884cff]" />}
                            selected={item.selected_poses || []}
                            uploadedImages={item.uploaded_pose_images || []}
                        />
                    )}

                    {/* Locations */}
                    {(item.selected_locations?.length > 0 || item.uploaded_location_images?.length > 0) && (
                        <SelectionSection
                            title="Locations"
                            icon={<MapPin className="w-5 h-5 text-[#884cff]" />}
                            selected={item.selected_locations || []}
                            uploadedImages={item.uploaded_location_images || []}
                        />
                    )}

                    {/* Colors */}
                    {(item.selected_colors?.length > 0 || item.picked_colors?.length > 0 || item.uploaded_color_images?.length > 0) && (
                        <div className="border-t border-[#e6e6e6] pt-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-[#884cff]/10 rounded-lg flex items-center justify-center">
                                    <Palette className="w-5 h-5 text-[#884cff]" />
                                </div>
                                <h3 className="text-lg font-semibold text-[#1a1a1a]">Colors</h3>
                            </div>

                            {/* Selected Colors */}
                            {item.selected_colors?.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-sm text-[#708090] mb-2">Selected Colors:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {item.selected_colors.map((color, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-[#884cff]/10 text-[#884cff] rounded-full text-sm">
                                                {color}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Picked Colors */}
                            {item.picked_colors?.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-sm text-[#708090] mb-2">Picked Colors:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {item.picked_colors.map((color, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <div
                                                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                                                    style={{ backgroundColor: color }}
                                                    title={color}
                                                />
                                                <span className="text-xs text-[#708090]">{color}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Uploaded Color Images */}
                            {item.uploaded_color_images?.length > 0 && (
                                <div>
                                    <p className="text-sm text-[#708090] mb-2">Uploaded Color Images:</p>
                                    <div className="grid grid-cols-4 gap-4">
                                        {item.uploaded_color_images.map((img, idx) => (
                                            <img
                                                key={idx}
                                                src={img.cloud_url || img.local_url}
                                                alt={`Color ${idx + 1}`}
                                                className="w-full h-24 object-cover rounded-lg border border-[#e6e6e6]"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Global Instructions */}
                    {item.global_instructions && (
                        <div className="border-t border-[#e6e6e6] pt-6">
                            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">Global Instructions</h3>
                            <p className="text-[#1a1a1a] bg-gray-50 p-4 rounded-lg">{item.global_instructions}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Two Stat Cards: Model Selection and Products */}
            <div className="grid grid-cols-2 gap-6">
                {/* Model Selection Stat Card */}
                <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#884cff]/10 rounded-lg flex items-center justify-center">
                            <User className="w-5 h-5 text-[#884cff]" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#1a1a1a]">Model Selection</h3>
                    </div>
                    {item.selected_model ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src={item.selected_model.cloud || item.selected_model.local}
                                    alt="Selected Model"
                                    className="w-20 h-20 object-cover rounded-lg border-2 border-[#884cff]"
                                />
                                <div>
                                    <p className="text-sm font-medium text-[#1a1a1a] capitalize">
                                        {item.selected_model.type === 'ai' ? 'AI Model' : 'Real Model'}
                                    </p>
                                    <p className="text-xs text-[#708090]">
                                        {item.selected_model.type === 'ai' ? 'Generated' : 'Uploaded'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-[#708090]">No model selected</p>
                    )}
                </div>

                {/* Products Stat Card */}
                <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#884cff]/10 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-[#884cff]" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#1a1a1a]">Products</h3>
                    </div>
                    <p className="text-3xl font-bold text-[#884cff] mb-2">{stats.products}</p>
                    <p className="text-sm text-[#708090]">Product images uploaded</p>
                </div>
            </div>

            {/* Generation Status Section */}
            <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-8">
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Generation Status</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <GenerationStatCard
                        label="Plain/White Background"
                        value={generationStats.whiteBackground}
                        icon={<ImageIcon className="w-5 h-5 text-[#884cff]" />}
                    />
                    <GenerationStatCard
                        label="Background Replace"
                        value={generationStats.backgroundReplace}
                        icon={<ImageIcon className="w-5 h-5 text-[#884cff]" />}
                    />
                    <GenerationStatCard
                        label="Model Images"
                        value={generationStats.modelImages}
                        icon={<User className="w-5 h-5 text-[#884cff]" />}
                    />
                    <GenerationStatCard
                        label="Campaign Images"
                        value={generationStats.campaignImages}
                        icon={<Camera className="w-5 h-5 text-[#884cff]" />}
                    />
                    <GenerationStatCard
                        label="Regenerated Images"
                        value={generationStats.regenerated}
                        icon={<Sparkles className="w-5 h-5 text-[#884cff]" />}
                    />
                </div>
            </div>

            {/* Model Usage Statistics */}


            {/* Workflow Progress */}


            {/* Preview of Generated Images */}

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

const SelectionSection = ({ title, icon, selected, uploadedImages }) => (
    <div className="border-t border-[#e6e6e6] pt-6 first:border-t-0 first:pt-0">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#884cff]/10 rounded-lg flex items-center justify-center">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-[#1a1a1a]">{title}</h3>
        </div>

        {/* Selected Items */}
        {selected.length > 0 && (
            <div className="mb-4">
                <p className="text-sm text-[#708090] mb-2">Selected {title}:</p>
                <div className="flex flex-wrap gap-2">
                    {selected.map((item, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#884cff]/10 text-[#884cff] rounded-full text-sm">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        )}

        {/* Uploaded Images */}
        {uploadedImages.length > 0 && (
            <div>
                <p className="text-sm text-[#708090] mb-2">Uploaded {title} Images:</p>
                <div className="grid grid-cols-4 gap-4">
                    {uploadedImages.map((img, idx) => (
                        <img
                            key={idx}
                            src={img.cloud_url || img.local_url}
                            alt={`${title} ${idx + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-[#e6e6e6]"
                        />
                    ))}
                </div>
            </div>
        )}
    </div>
)

const GenerationStatCard = ({ label, value, icon }) => (
    <div className="bg-gray-50 border border-[#e6e6e6] rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#884cff]/10 rounded-lg flex items-center justify-center">
                {icon}
            </div>
            <p className="text-2xl font-bold text-[#884cff]">{value}</p>
        </div>
        <p className="text-xs text-[#708090]">{label}</p>
    </div>
)
