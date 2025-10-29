// Utility functions for managing the image gallery

export const saveToGallery = (imageData) => {
    try {
        const existingImages = getGalleryImages()
        const newImage = {
            id: Date.now().toString(),
            url: imageData.generated_image_url,
            prompt: imageData.prompt,
            type: imageData.type,
            date: new Date().toISOString(),
            ...imageData
        }
        const updatedImages = [newImage, ...existingImages]
        localStorage.setItem("generatedImages", JSON.stringify(updatedImages))
        return newImage
    } catch (error) {
        console.error("Error saving to gallery:", error)
        return null
    }
}

export const getGalleryImages = () => {
    try {
        const savedImages = localStorage.getItem("generatedImages")
        return savedImages ? JSON.parse(savedImages) : []
    } catch (error) {
        console.error("Error loading gallery:", error)
        return []
    }
}

export const deleteFromGallery = (imageId) => {
    try {
        const images = getGalleryImages()
        const updatedImages = images.filter((img) => img.id !== imageId)
        localStorage.setItem("generatedImages", JSON.stringify(updatedImages))
        return true
    } catch (error) {
        console.error("Error deleting from gallery:", error)
        return false
    }
}

export const clearGallery = () => {
    try {
        localStorage.removeItem("generatedImages")
        return true
    } catch (error) {
        console.error("Error clearing gallery:", error)
        return false
    }
}

