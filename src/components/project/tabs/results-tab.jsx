"use client"

import { useState, useEffect, useMemo } from "react"
import { Download, Image as ImageIcon, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"
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
    const [historyData, setHistoryData] = useState(null)
    const [historyLoading, setHistoryLoading] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const [imageFilter, setImageFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const imagesPerPage = 12
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

            // Fetch collection history (filtered by project)
            try {
                setHistoryLoading(true);
                const historyResponse = await apiService.getCollectionHistory(project.collection.id, token);
                if (historyResponse.success) {
                    // Verify that the history belongs to the current project
                    const historyProjectId = historyResponse.project_id;
                    const currentProjectId = project?.id;

                    if (historyProjectId && currentProjectId && historyProjectId === currentProjectId) {
                        // History matches the current project
                        setHistoryData(historyResponse);
                    } else if (!historyProjectId && historyResponse.collection_id === project.collection.id) {
                        // If no project_id in response but collection matches, still show it
                        setHistoryData(historyResponse);
                    } else {
                        // Project mismatch - don't show history
                        console.warn('History project ID mismatch. Expected:', currentProjectId, 'Got:', historyProjectId);
                        setHistoryData(null);
                    }
                } else {
                    setHistoryData(null);
                }
            } catch (err) {
                console.error('Error fetching collection history:', err);
                setHistoryData(null);
            } finally {
                setHistoryLoading(false);
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

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1)
    }, [imageFilter])

    // Collect all generated images from history
    const allGeneratedImages = useMemo(() => {
        if (!historyData?.history_by_product) return [];
        
        const images = [];
        historyData.history_by_product.forEach((productHistory) => {
            productHistory.history.forEach((historyItem) => {
                if (historyItem.image_url) {
                    images.push({
                        id: historyItem.id,
                        image_url: historyItem.image_url,
                        image_type: historyItem.image_type,
                        created_at: historyItem.created_at,
                        parent_image_id: historyItem.parent_image_id
                    });
                }
            });
        });
        
        return images;
    }, [historyData]);

    // Filter images by type
    const filteredImages = useMemo(() => {
        if (imageFilter === 'all') {
            return allGeneratedImages;
        }
        
        const filterMap = {
            'white_background': ['project_white_background'],
            'background_replace': ['project_background_replace'],
            'model_image': ['project_model_image', 'project_ai_model_generation'],
            'campaign_image': ['project_campaign_image']
        };
        
        const allowedTypes = filterMap[imageFilter] || [];
        return allGeneratedImages.filter(img => allowedTypes.includes(img.image_type));
    }, [allGeneratedImages, imageFilter]);

    // Paginate images
    const paginatedImages = useMemo(() => {
        const startIndex = (currentPage - 1) * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
        return filteredImages.slice(startIndex, endIndex);
    }, [filteredImages, currentPage]);

    const totalPages = Math.ceil(filteredImages.length / imagesPerPage);

    const getImageTypeLabel = (imageType) => {
        switch (imageType) {
            case 'project_white_background':
                return 'White Background';
            case 'project_background_replace':
                return 'Background Replace';
            case 'project_model_image':
                return 'Model Image';
            case 'project_campaign_image':
                return 'Campaign Image';
            case 'project_ai_model_generation':
                return 'AI Model Generated';
            case 'project_model_selection':
                return 'Model Selected';
            case 'project_product_upload':
                return 'Product Uploaded';
            default:
                return imageType?.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Generated';
        }
    };

    const downloadImageAsBlob = async (imageUrl, filename) => {
        try {
            // Fetch the image as a blob with no-cors mode if needed
            const response = await fetch(imageUrl, {
                mode: 'cors',
                cache: 'no-cache'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.statusText}`);
            }

            const blob = await response.blob();

            // Create a blob URL
            const blobUrl = window.URL.createObjectURL(blob);

            // Create a temporary link element
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = filename;
            link.style.display = 'none';

            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();

            // Small delay before cleanup to ensure download starts
            setTimeout(() => {
                link.remove();
                window.URL.revokeObjectURL(blobUrl);
            }, 100);
        } catch (error) {
            console.error('Error downloading image:', error);
            // Fallback: try direct download
            try {
                const link = document.createElement("a");
                link.href = imageUrl;
                link.download = filename;
                link.target = '_blank';
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                setTimeout(() => link.remove(), 100);
            } catch (fallbackError) {
                console.error('Fallback download also failed:', fallbackError);
                // Last resort: open in new tab
                window.open(imageUrl, '_blank');
            }
        }
    };

    const handleDownloadImage = async (imageUrl, imageType, productIndex, imageIndex = null, isHistory = false) => {
        // Generate filename based on context
        let filename;
        if (isHistory) {
            const imageTypeLabel = getImageTypeLabel(imageType).toLowerCase().replace(/\s+/g, '-');
            const timestamp = Date.now();
            filename = `product-${productIndex}-${imageTypeLabel}-${timestamp}.png`;
        } else {
            const imageTypeLabel = imageType?.replace(/_/g, '-') || 'generated';
            filename = `product-${productIndex}-${imageTypeLabel}${imageIndex !== null ? `-${imageIndex}` : ''}.png`;
        }

        await downloadImageAsBlob(imageUrl, filename);
    }

    const handleDownloadAll = () => {
        if (isDownloading) {
            console.log('Download already in progress...');
            return;
        }

        setIsDownloading(true);
        const imagesToDownload = [];

        // Collect images from current collection data
        if (collectionData?.items?.[0]?.product_images) {
            collectionData.items[0].product_images.forEach((product, pIdx) => {
                product.generated_images?.forEach((img, iIdx) => {
                    // Add original image
                    if (img.cloud_url) {
                        imagesToDownload.push({
                            url: img.cloud_url,
                            type: img.type,
                            productIndex: pIdx + 1,
                            imageIndex: iIdx + 1,
                            version: 0
                        });
                    }
                    // Add regenerated images
                    if (img.regenerated_images) {
                        img.regenerated_images.forEach((regen, rIdx) => {
                            if (regen.cloud_url) {
                                imagesToDownload.push({
                                    url: regen.cloud_url,
                                    type: regen.type || img.type,
                                    productIndex: pIdx + 1,
                                    imageIndex: iIdx + 1,
                                    version: rIdx + 1
                                });
                            }
                        });
                    }
                    // Add enhanced images
                    if (img.enhanced_images) {
                        img.enhanced_images.forEach((enhanced, eIdx) => {
                            if (enhanced.cloud_url) {
                                imagesToDownload.push({
                                    url: enhanced.cloud_url,
                                    type: 'enhanced',
                                    productIndex: pIdx + 1,
                                    imageIndex: iIdx + 1,
                                    version: `enhanced-${eIdx + 1}`
                                });
                            }
                        });
                    }
                });
            });
        }

        // Collect images from history data
        if (historyData?.history_by_product) {
            historyData.history_by_product.forEach((productHistory, pIdx) => {
                productHistory.history.forEach((historyItem, hIdx) => {
                    if (historyItem.image_url) {
                        imagesToDownload.push({
                            url: historyItem.image_url,
                            type: historyItem.image_type,
                            productIndex: pIdx + 1,
                            imageIndex: hIdx + 1,
                            version: 'history',
                            isHistory: true
                        });
                    }
                });
            });
        }

        // Download all images with a small delay between each
        if (imagesToDownload.length === 0) {
            return;
        }

        // Download all images with a delay between each
        let completedDownloads = 0;
        imagesToDownload.forEach((image, index) => {
            setTimeout(async () => {
                try {
                    let filename;
                    if (image.isHistory) {
                        const imageTypeLabel = getImageTypeLabel(image.type).toLowerCase().replace(/\s+/g, '-');
                        filename = `product-${image.productIndex}-${imageTypeLabel}-history-${image.imageIndex}.png`;
                    } else {
                        const imageTypeLabel = image.type?.replace(/_/g, '-') || 'generated';
                        filename = `product-${image.productIndex}-${imageTypeLabel}-${image.imageIndex}${image.version ? `-v${image.version}` : ''}.png`;
                    }

                    await downloadImageAsBlob(image.url, filename);
                    completedDownloads++;

                    // Reset downloading flag when all downloads complete
                    if (completedDownloads === imagesToDownload.length) {
                        setTimeout(() => setIsDownloading(false), 1000);
                    }
                } catch (error) {
                    console.error(`Error downloading image ${index + 1}:`, error);
                    completedDownloads++;
                    if (completedDownloads === imagesToDownload.length) {
                        setTimeout(() => setIsDownloading(false), 1000);
                    }
                }
            }, index * 500); // 500ms delay between downloads to allow time for blob processing
        });
    }

    const handleDownloadAllHistory = () => {
        if (!historyData?.history_by_product) return;
        if (isDownloading) {
            console.log('Download already in progress...');
            return;
        }

        setIsDownloading(true);
        const imagesToDownload = [];

        historyData.history_by_product.forEach((productHistory, pIdx) => {
            productHistory.history.forEach((historyItem, hIdx) => {
                if (historyItem.image_url) {
                    imagesToDownload.push({
                        url: historyItem.image_url,
                        type: historyItem.image_type,
                        productIndex: pIdx + 1,
                        imageIndex: hIdx + 1
                    });
                }
            });
        });

        if (imagesToDownload.length === 0) {
            return;
        }

        // Download all history images with a delay between each
        let completedDownloads = 0;
        imagesToDownload.forEach((image, index) => {
            setTimeout(async () => {
                try {
                    const imageTypeLabel = getImageTypeLabel(image.type).toLowerCase().replace(/\s+/g, '-');
                    const filename = `product-${image.productIndex}-${imageTypeLabel}-history-${image.imageIndex}.png`;
                    await downloadImageAsBlob(image.url, filename);
                    completedDownloads++;

                    // Reset downloading flag when all downloads complete
                    if (completedDownloads === imagesToDownload.length) {
                        setTimeout(() => setIsDownloading(false), 1000);
                    }
                } catch (error) {
                    console.error(`Error downloading history image ${index + 1}:`, error);
                    completedDownloads++;
                    if (completedDownloads === imagesToDownload.length) {
                        setTimeout(() => setIsDownloading(false), 1000);
                    }
                }
            }, index * 500); // 500ms delay between downloads to allow time for blob processing
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)} hours ago`;
        } else if (diffInHours < 48) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: date.getFullYear() === now.getFullYear() ? undefined : 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }
    };

    const formatDetailedDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

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
            {(hasResults || (historyData?.history_by_product?.length > 0)) && (
                <div className="flex items-center justify-between mb-6 p-4 bg-white border-2 border-[#e6e6e6] rounded-lg">
                    <div>
                        <h3 className="font-semibold text-[#1a1a1a]">All Generated Images</h3>
                        <p className="text-sm text-[#708090]">
                            View and download all your generated product images {historyData?.history_by_product?.length > 0 && '(including history)'}
                        </p>
                    </div>
                    <Button
                        className="bg-[#884cff] hover:bg-[#7a3ff0] text-white gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleDownloadAll}
                        disabled={isDownloading}
                    >
                        <Download className="w-4 h-4" />
                        {isDownloading ? 'Downloading...' : 'Download All'}
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

            {/* Generation History Section - Images Grid */}
            {allGeneratedImages.length > 0 && (
                <div className="mt-12">
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Clock className="w-6 h-6 text-[#884cff]" />
                                <div>
                                    <h2 className="text-2xl font-bold text-[#1a1a1a]">Previously Generated Images</h2>
                                    {historyData?.project_name && (
                                        <p className="text-sm text-[#708090] mt-1">
                                            Project: <span className="font-medium text-[#884cff]">{historyData.project_name}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Button
                                className="bg-[#884cff] hover:bg-[#7a3ff0] text-white gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleDownloadAllHistory}
                                disabled={isDownloading}
                            >
                                <Download className="w-4 h-4" />
                                {isDownloading ? 'Downloading...' : 'Download All'}
                            </Button>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex items-center gap-3 mb-6">
                            <button
                                onClick={() => {
                                    setImageFilter('all');
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                    imageFilter === 'all'
                                        ? 'bg-[#884cff] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => {
                                    setImageFilter('white_background');
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                    imageFilter === 'white_background'
                                        ? 'bg-[#884cff] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                White Background
                            </button>
                            <button
                                onClick={() => {
                                    setImageFilter('background_replace');
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                    imageFilter === 'background_replace'
                                        ? 'bg-[#884cff] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Background Replace
                            </button>
                            <button
                                onClick={() => {
                                    setImageFilter('model_image');
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                    imageFilter === 'model_image'
                                        ? 'bg-[#884cff] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Model Image
                            </button>
                            <button
                                onClick={() => {
                                    setImageFilter('campaign_image');
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                    imageFilter === 'campaign_image'
                                        ? 'bg-[#884cff] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Campaign Image
                            </button>
                        </div>

                        {/* Images Grid - 4 columns */}
                        {paginatedImages.length > 0 ? (
                            <>
                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    {paginatedImages.map((image, index) => (
                                        <div key={image.id || index} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                            <img
                                                src={image.image_url}
                                                alt="Generated"
                                                className="w-full h-full object-cover cursor-pointer"
                                                onClick={() => window.open(image.image_url, "_blank")}
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-image.png';
                                                }}
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                                                {/* Top Badge */}
                                                <div className="flex justify-between items-start">
                                                    <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                                                        {getImageTypeLabel(image.image_type)}
                                                    </div>
                                                    {image.parent_image_id && (
                                                        <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                                                            Regenerated
                                                        </span>
                                                    )}
                                                </div>
                                                {/* Bottom Actions */}
                                                <div className="flex gap-2 justify-center">
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        className="gap-1 text-xs px-2 py-1 h-auto bg-white/90 backdrop-blur-sm hover:bg-white"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.open(image.image_url, "_blank");
                                                        }}
                                                    >
                                                        <ImageIcon className="w-3 h-3" /> View
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        className="gap-1 text-xs px-2 py-1 h-auto bg-white/90 backdrop-blur-sm hover:bg-white"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const globalIndex = (currentPage - 1) * imagesPerPage + index;
                                                            handleDownloadImage(
                                                                image.image_url,
                                                                image.image_type,
                                                                Math.floor(globalIndex / 4) + 1,
                                                                (globalIndex % 4) + 1,
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        <Download className="w-3 h-3" /> Save
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-4 mt-6">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="gap-2"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Previous
                                        </Button>
                                        <span className="text-sm text-gray-700 font-medium">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="gap-2"
                                        >
                                            Next
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}

                                {/* Results Count */}
                                <div className="text-center mt-4 text-sm text-gray-500">
                                    Showing {paginatedImages.length} of {filteredImages.length} images
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                                <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-2">No images found</p>
                                <p className="text-sm text-gray-500">
                                    {imageFilter !== 'all' ? 'Try a different filter' : 'No generated images available'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {historyLoading && (
                <div className="mt-12 flex items-center justify-center py-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#884cff] mx-auto mb-2"></div>
                        <p className="text-sm text-[#708090]">Loading history...</p>
                    </div>
                </div>
            )}
        </div>
    )
}
