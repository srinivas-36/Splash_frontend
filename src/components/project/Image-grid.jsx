import { useState, useEffect } from "react"
import { ProductImagesDisplay } from "./product-images-display"
import { apiService } from "@/lib/api"

export function ImageGrid({ project, collectionData: initialCollectionData, onDataRefresh, canEdit = true }) {
    const [collectionData, setCollectionData] = useState(initialCollectionData)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        setCollectionData(initialCollectionData)
    }, [initialCollectionData])

    const handleRegenerateSuccess = async () => {
        // Refresh the collection data to show new regenerated image
        if (!project?.collection_id) return

        try {
            setRefreshing(true)
            const updatedData = await apiService.getCollection(project.collection_id)
            setCollectionData(updatedData)

            // Notify parent component if callback is provided
            if (onDataRefresh) {
                onDataRefresh(updatedData)
            }
        } catch (error) {
            console.error('Error refreshing collection data:', error)
        } finally {
            setRefreshing(false)
        }
    }

    if (!collectionData?.items?.[0]?.product_images || collectionData.items[0].product_images.length === 0) {
        return (
            <div className="mb-12">
                <div className="text-center py-12 border-2 border-dashed border-[#e6e6e6] rounded-lg">
                    <p className="text-[#708090] mb-2">No images generated yet</p>
                    <p className="text-sm text-[#708090]">
                        Click "Generate Product Images" above to create your final images
                    </p>
                </div>
            </div>
        )
    }

    const hasAnyGeneratedImages = collectionData.items[0].product_images.some(
        product => product.generated_images && product.generated_images.length > 0
    )

    if (!hasAnyGeneratedImages) {
        return (
            <div className="mb-12">
                <div className="text-center py-12 border-2 border-dashed border-[#e6e6e6] rounded-lg">
                    <p className="text-[#708090] mb-2">No images generated yet</p>
                    <p className="text-sm text-[#708090]">
                        Click "Generate Product Images" above to create your final images
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div>
            {refreshing && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm">
                        ✨ Refreshing images...
                    </p>
                </div>
            )}
            <ProductImagesDisplay
                collectionData={collectionData}
                showRegenerate={canEdit}
                onRegenerateSuccess={handleRegenerateSuccess}
                canEdit={canEdit}
            />
        </div>
    )
}
