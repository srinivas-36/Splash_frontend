"use client"

import { useState, useEffect } from "react"
import { Download, Image as ImageIcon, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductImagesDisplay } from "../product-images-display"
import { apiService } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

export default function ResultsTab({ project }) {

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
        if (!project?.collection?.id) return;

        setLoading(true);
        try {
            const data = await apiService.getCollection(project.collection.id, token);
            console.log("data", data);
            setCollectionData(data);

            // Calculate stats
            if (data?.items?.[0]) {
                const item = data.items[0];
                const products = item.product_images || [];
                const totalGenerated = products.reduce(
                    (sum, p) => sum + (p.generated_images?.length || 0),
                    0
                );

                const completionSteps = [
                    data.description ? 1 : 0,
                    item.selected_model ? 1 : 0,
                    products.length > 0 ? 1 : 0,
                    totalGenerated > 0 ? 1 : 0
                ].reduce((a, b) => a + b, 0);

                setStats({
                    totalImages: totalGenerated,
                    products: products.length,
                    variations: products.length > 0 ? Math.floor(totalGenerated / products.length) : 0,
                    completion: Math.floor((completionSteps / 4) * 100)
                });
            }

            // Fetch model usage statistics
            try {
                const modelUsageData = await apiService.getModelUsageStats(project.collection.id, token);
                if (modelUsageData.success) {
                    setModelStats({
                        total_models_used: modelUsageData.total_models_used || 0,
                        models_breakdown: modelUsageData.models_breakdown || [],
                        total_generations: modelUsageData.total_generations || 0
                    });
                }
            } catch (err) {
                console.error('Error fetching model statistics:', err);
            }
        } catch (err) {
            console.error("Error loading results:", err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadData()
    }, [project])

    const handleDownloadAll = () => {
        if (!collectionData?.items?.[0]?.product_images) return

        collectionData.items[0].product_images.forEach((product, pIdx) => {
            product.generated_images?.forEach((img, iIdx) => {
                [img, ...(img.regenerated_images || [])].forEach((version, vIdx) => {
                    const link = document.createElement("a");
                    link.href = version.cloud_url;
                    link.download = `product-${pIdx + 1}-${version.type}-v${vIdx}.png`;
                    link.click();
                });
            });
        });

    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#884cff] mx-auto mb-4"></div>
                    <p className="text-[#708090]">Loading results...</p>
                </div>
            </div>
        )
    }

    const hasResults = stats.totalImages > 0

    return (
        <div>
            {/* Stats Cards - Matching Overview Tab */}
            <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#884cff]/10 rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-[#884cff]" />
                        </div>
                        <p className="text-sm text-[#708090]">Total Images</p>
                    </div>
                    <p className="text-3xl font-bold text-[#884cff]">{modelStats.total_generations}</p>
                </div>

                <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#884cff]/10 rounded-lg flex items-center justify-center">
                            <span className="text-xl">📦</span>
                        </div>
                        <p className="text-sm text-[#708090]">Products</p>
                    </div>
                    <p className="text-3xl font-bold text-[#884cff]">{stats.products}</p>
                </div>

                <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#884cff]/10 rounded-lg flex items-center justify-center">
                            <span className="text-xl">👤</span>
                        </div>
                        <p className="text-sm text-[#708090]">Total Models Used</p>
                    </div>
                    <p className="text-3xl font-bold text-[#884cff]">{modelStats.total_models_used}</p>
                </div>

                <div className="bg-white border-2 border-[#e6e6e6] rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#884cff]/10 rounded-lg flex items-center justify-center">
                            <span className="text-xl">✓</span>
                        </div>
                        <p className="text-sm text-[#708090]">Completion</p>
                    </div>
                    <p className="text-3xl font-bold text-[#884cff]">{stats.completion}%</p>
                </div>
            </div>



            {/* Action Bar */}
            {hasResults && (
                <div className="flex items-center justify-between mb-6 p-4 bg-white border-2 border-[#e6e6e6] rounded-lg">
                    <div>
                        <h3 className="font-semibold text-[#1a1a1a]">All Generated Images</h3>
                        <p className="text-sm text-[#708090]">
                            View and download all your generated product images
                        </p>
                    </div>
                    <Button
                        className="bg-[#884cff] hover:bg-[#7a3ff0] text-white gap-2"
                        onClick={handleDownloadAll}
                    >
                        <Download className="w-4 h-4" />
                        Download All
                    </Button>
                </div>
            )}

            {/* Model Usage Statistics */}


            {/* Product Images Display */}
            {hasResults ? (
                <ProductImagesDisplay
                    collectionData={collectionData}
                    showRegenerate={true}
                    onRegenerateSuccess={loadData}
                />
            ) : (
                <div className="text-center py-12 border-2 border-dashed border-[#e6e6e6] rounded-lg">
                    <ImageIcon className="w-16 h-16 text-[#708090] mx-auto mb-4" />
                    <p className="text-[#708090] mb-2">No results yet</p>
                    <p className="text-sm text-[#708090]">
                        Complete the workflow to generate your product images
                    </p>
                </div>
            )}
        </div>
    )
}
