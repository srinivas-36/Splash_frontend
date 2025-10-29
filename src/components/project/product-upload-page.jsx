"use client"

import { useState, useEffect, useRef } from "react"
import { Upload, X, CheckCircle, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { apiService } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
export function ProductUploadPage({ project, collectionData, onSave, canEdit = true }) {
    const [selectedFiles, setSelectedFiles] = useState([])
    const [uploadedProducts, setUploadedProducts] = useState([])
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(null)
    const fileInputRef = useRef(null)
    const { token } = useAuth()

    // Load existing product images from collection data
    useEffect(() => {
        if (collectionData?.items?.[0]?.product_images) {
            const existing = collectionData.items[0].product_images
            setUploadedProducts(existing)
        }
    }, [collectionData])

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files)
        if (files.length > 0) {
            setSelectedFiles(prev => [...prev, ...files])
        }
    }

    const handleRemoveFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            setError('Please select at least one image')
            return
        }

        if (!collectionData?.id) {
            setError('No collection found')
            return
        }

        setUploading(true)
        setError(null)

        try {
            const response = await apiService.uploadProductImages(
                collectionData.id,
                selectedFiles,
                token
            )

            if (response.success) {
                // Refresh collection data to get uploaded products
                const updatedCollection = await apiService.getCollection(collectionData.id)
                if (updatedCollection.items?.[0]?.product_images) {
                    setUploadedProducts(updatedCollection.items[0].product_images)
                }

                setSelectedFiles([])
                if (onSave) {
                    await onSave({ productsUploaded: true })
                }
            } else {
                setError(response.error || 'Failed to upload products')
            }
        } catch (err) {
            console.error('Error uploading products:', err)
            setError(err.message || 'Failed to upload products')
        } finally {
            setUploading(false)
        }
    }

    const hasProducts = uploadedProducts.length > 0
    const hasSelectedFiles = selectedFiles.length > 0

    return (
        <div className="mb-12">
            <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 bg-[#e6e6e6] rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-[#708090]" />
                </div>
                <div>
                    <h3 className="font-bold text-[#1a1a1a] text-2xl">Product Upload</h3>
                    <p className="text-sm text-[#708090] mt-1">Upload product images with white or transparent background</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-600">{error}</p>
                </div>
            )}

            {/* Upload Area */}
            <div className="border-2 border-dashed border-[#b0bec5] rounded-lg p-8 mb-6">
                <div className="text-center">
                    <Upload className="w-16 h-16 text-[#708090] mx-auto mb-4" />
                    <h4 className="font-semibold text-[#1a1a1a] mb-2">Upload Product Images</h4>
                    <p className="text-sm text-[#708090] mb-4">
                        Select one or more product images (PNG, JPG)
                    </p>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                        disabled={!canEdit}
                    />

                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="mb-4"
                        disabled={!canEdit}
                        title={canEdit ? "" : "You need Editor or Owner role to upload products"}
                    >
                        Choose Files
                    </Button>

                    {hasSelectedFiles && (
                        <div className="mt-4 space-y-2">
                            <p className="text-sm font-medium text-[#1a1a1a]">Selected Files:</p>
                            {selectedFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-white border border-[#e6e6e6] rounded-lg p-3"
                                >
                                    <div className="flex items-center gap-2">
                                        <ImageIcon className="w-4 h-4 text-[#708090]" />
                                        <span className="text-sm text-[#1a1a1a]">{file.name}</span>
                                        <span className="text-xs text-[#708090]">
                                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFile(index)}
                                        className="text-red-500 hover:text-red-700"
                                        disabled={!canEdit}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}

                            <Button
                                onClick={handleUpload}
                                disabled={uploading || !canEdit}
                                className="bg-[#884cff] hover:bg-[#7a3ff0] text-white w-full mt-4"
                                title={canEdit ? "" : "You need Editor or Owner role to upload products"}
                            >
                                {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} Image(s)`}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Uploaded Products Display */}
            {hasProducts && (
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <h4 className="font-semibold text-[#1a1a1a]">
                            Uploaded Products ({uploadedProducts.length})
                        </h4>
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                        {uploadedProducts.map((product, index) => (
                            <div
                                key={index}
                                className="border-2 border-[#e6e6e6] rounded-lg overflow-hidden hover:border-[#884cff]/50 transition-all"
                            >
                                <img
                                    src={product.uploaded_image_url}
                                    alt={`Product ${index + 1}`}
                                    className="w-full h-48 object-contain bg-white"
                                />
                                <div className="p-3 bg-gray-50">
                                    <p className="text-sm font-medium text-[#1a1a1a]">Product {index + 1}</p>
                                    <p className="text-xs text-[#708090] mt-1">
                                        {product.generated_images?.length || 0} variations generated
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!hasProducts && !hasSelectedFiles && (
                <div className="text-center py-12 border-2 border-dashed border-[#e6e6e6] rounded-lg">
                    <ImageIcon className="w-16 h-16 text-[#708090] mx-auto mb-4" />
                    <p className="text-[#708090] mb-4">No products uploaded yet</p>
                    <p className="text-sm text-[#708090]">Click "Choose Files" to upload product images</p>
                </div>
            )}
        </div>
    )
}
