// imageApi.js - Complete API integration for image generation and regeneration
// Author: AI Assistant
// Date: 2025

import api from './api';
import toast from 'react-hot-toast';

/**
 * Base configuration
 * Ensure your backend is running on http://localhost:8000 or update the baseURL in api.js
 */

// ==================== IMAGE GENERATION ENDPOINTS ====================

/**
 * Upload an ornament image and generate with white background
 * @param {File} imageFile - The ornament image file
 * @param {string} prompt - Optional additional prompt
 * @param {string} backgroundColor - Background color (default: "white")
 * @returns {Promise} Response with generated image URLs
 */
export const uploadOrnament = async (imageFile, prompt = '', backgroundColor = 'white') => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('prompt', prompt);
  formData.append('background_color', backgroundColor);

  const response = await api.post('/imgbackendapp/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

/**
 * Change background of an ornament image
 * @param {File} ornamentImage - The ornament image file
 * @param {string} prompt - Prompt for background change
 * @param {File} backgroundImage - Optional reference background image
 * @param {string} backgroundColor - Optional background color
 * @returns {Promise} Response with generated image URLs
 */
export const changeBackground = async (ornamentImage, prompt, backgroundImage = null, backgroundColor = null) => {
  const formData = new FormData();
  formData.append('ornament_image', ornamentImage);
  formData.append('prompt', prompt);

  if (backgroundImage) {
    formData.append('background_image', backgroundImage);
  }

  if (backgroundColor) {
    formData.append('background_color', backgroundColor);
  }

  const response = await api.post('/imgbackendapp/change_background/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

/**
 * Generate AI model wearing ornament
 * @param {File} ornamentImage - The ornament image file
 * @param {string} prompt - Description for the model
 * @param {File} poseStyle - Optional pose reference image
 * @param {string} measurements - Optional measurements
 * @returns {Promise} Response with generated image URLs
 */
export const generateModelWithOrnament = async (ornamentImage, prompt, poseStyle = null, measurements = '') => {
  const formData = new FormData();
  formData.append('ornament_image', ornamentImage);
  formData.append('prompt', prompt);
  formData.append('measurements', measurements);

  if (poseStyle) {
    formData.append('pose_style', poseStyle);
  }

  const response = await api.post('/imgbackendapp/generate-model/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

/**
 * Generate real model wearing ornament
 * @param {File} modelImage - The model image file
 * @param {File} ornamentImage - The ornament image file
 * @param {string} prompt - Description for generation
 * @param {File} poseStyle - Optional pose reference image
 * @param {string} measurements - Optional measurements
 * @returns {Promise} Response with generated image URLs
 */
export const generateRealModelWithOrnament = async (
  modelImage,
  ornamentImage,
  prompt,
  poseStyle = null,
  measurements = ''
) => {
  const formData = new FormData();
  formData.append('model_image', modelImage);
  formData.append('ornament_image', ornamentImage);
  formData.append('prompt', prompt);
  formData.append('measurements', measurements);

  if (poseStyle) {
    formData.append('pose_style', poseStyle);
  }

  const response = await api.post('/imgbackendapp/generate-real-model/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

/**
 * Generate campaign shot with multiple ornaments
 * @param {Array<File>} ornamentImages - Array of ornament image files
 * @param {Array<string>} ornamentNames - Array of ornament names
 * @param {string} prompt - Campaign description
 * @param {string} modelType - "ai_model" or "real_model"
 * @param {File} modelImage - Required if modelType is "real_model"
 * @param {Array<File>} themeImages - Optional theme reference images
 * @returns {Promise} Response with generated image URLs
 */
export const generateCampaignShot = async (
  ornamentImages,
  ornamentNames,
  prompt,
  modelType = 'ai_model',
  modelImage = null,
  themeImages = []
) => {
  const formData = new FormData();

  // Append multiple ornaments
  ornamentImages.forEach((image) => {
    formData.append('ornament_images', image);
  });

  // Append ornament names
  ornamentNames.forEach((name) => {
    formData.append('ornament_names', name);
  });

  formData.append('prompt', prompt);
  formData.append('model_type', modelType);

  if (modelImage && modelType === 'real_model') {
    formData.append('model_image', modelImage);
  }

  // Append theme images
  themeImages.forEach((image) => {
    formData.append('theme_images', image);
  });

  const response = await api.post('/imgbackendapp/generate-campaign-shot/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// ==================== REGENERATE ENDPOINT ====================

/**
 * Regenerate an image from a previously generated image
 * This combines the original prompt with the new prompt
 * Works for all image types
 * @param {string} imageId - MongoDB ID of the image to regenerate
 * @param {string} newPrompt - New prompt to combine with original
 * @returns {Promise} Response with regenerated image URLs
 */
export const regenerateImage = async (imageId, newPrompt) => {
  const formData = new FormData();
  formData.append('image_id', imageId);
  formData.append('prompt', newPrompt);

  const response = await api.post('/imgbackendapp/regenerate/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// ==================== USER IMAGES ENDPOINTS ====================

/**
 * Get all images generated by the authenticated user
 * @param {string} type - Optional filter by image type
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 20)
 * @returns {Promise} Response with user's images and pagination info
 */
export const getUserImages = async (type = null, page = 1, limit = 20) => {
  const params = { page, limit };
  if (type) {
    params.type = type;
  }

  const response = await api.get('/imgbackendapp/user-images/', { params });
  return response.data;
};

/**
 * Get a specific image by ID
 * @param {string} imageId - MongoDB ID of the image
 * @returns {Promise} The image object
 */
export const getImageById = async (imageId) => {
  const response = await getUserImages(null, 1, 1000); // Get large set
  const image = response.images.find(img => img.id === imageId);

  if (!image) {
    throw new Error('Image not found');
  }

  return image;
};

/**
 * Get images by type
 * Image types:
 * - "white_background"
 * - "background_change"
 * - "model_with_ornament"
 * - "real_model_with_ornament"
 * - "campaign_shot_advanced"
 */
export const getImagesByType = async (type, page = 1, limit = 20) => {
  return await getUserImages(type, page, limit);
};

// ==================== EXAMPLE USAGE ====================

/**
 * Example: Upload and regenerate workflow
 */
export const exampleUploadAndRegenerate = async () => {
  try {
    // Step 1: Upload an ornament
    const file = document.getElementById('fileInput').files[0];
    const uploadResult = await uploadOrnament(file, 'Make it shine', 'white');
    console.log('Upload successful:', uploadResult);

    const imageId = uploadResult.ornament_id; // or mongo_id depending on endpoint

    // Step 2: If user doesn't like it, regenerate
    const regenerateResult = await regenerateImage(
      imageId,
      'Make it more vibrant and add gold accents'
    );
    console.log('Regenerated:', regenerateResult);

    // Step 3: Still not satisfied? Regenerate again!
    const secondRegen = await regenerateImage(
      regenerateResult.mongo_id,
      'Add diamond sparkles'
    );
    console.log('Second regeneration:', secondRegen);

    // Step 4: Fetch all user's images
    const userImages = await getUserImages();
    console.log('All user images:', userImages);

  } catch (error) {
    console.error('Error:', error);
  }
};

/**
 * Example: React component for image regeneration
 */
export const ImageRegenerateComponent = `
import React, { useState } from 'react';
import { regenerateImage, getUserImages } from '@/lib/imageApi';

function ImageRegenerate({ imageId, onSuccess }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await regenerateImage(imageId, prompt);
      console.log('Regenerated:', result);
      
      // Call success callback with new image
      onSuccess && onSuccess(result);
      
      // Clear prompt
      setPrompt('');
    } catch (err) {
      setError(err.message || 'Failed to regenerate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="regenerate-container">
      <h3>Regenerate Image</h3>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your modifications (e.g., 'Make it brighter', 'Add more details')"
        rows={3}
        className="w-full p-2 border rounded"
      />
      
      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      <button
        onClick={handleRegenerate}
        disabled={loading || !prompt.trim()}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Regenerating...' : 'Regenerate Image'}
      </button>
    </div>
  );
}

export default ImageRegenerate;
`;

/**
 * Example: Gallery component with regenerate
 */
export const ImageGalleryComponent = `
import React, { useState, useEffect } from 'react';
import { getUserImages, regenerateImage } from '@/lib/imageApi';

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [regeneratePrompt, setRegeneratePrompt] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const result = await getUserImages(null, 1, 50);
      setImages(result.images);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async (imageId) => {
    if (!regeneratePrompt.trim()) return;

    try {
      const result = await regenerateImage(imageId, regeneratePrompt);
      
      // Add the new image to the gallery
      setImages([result, ...images]);
      
      // Clear selection
      setSelectedImage(null);
      setRegeneratePrompt('');
      
      toast.success('Image regenerated successfully!');
    } catch (error) {
      console.error('Error regenerating:', error);
      toast.error('Failed to regenerate image');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="gallery">
      <h2>My Generated Images</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="image-card">
            <img
              src={image.generated_image_url}
              alt={image.prompt}
              className="w-full h-64 object-cover rounded"
            />
            
            <div className="p-3">
              <p className="text-sm text-gray-600">{image.type}</p>
              <p className="text-xs text-gray-500 mt-1">{image.prompt}</p>
              
              <button
                onClick={() => setSelectedImage(image)}
                className="mt-2 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Regenerate
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Regenerate Image</h3>
            
            <img
              src={selectedImage.generated_image_url}
              alt="Selected"
              className="w-full h-64 object-cover rounded mb-4"
            />
            
            <p className="text-sm text-gray-600 mb-2">
              Original prompt: {selectedImage.original_prompt || selectedImage.prompt}
            </p>
            
            <textarea
              value={regeneratePrompt}
              onChange={(e) => setRegeneratePrompt(e.target.value)}
              placeholder="What would you like to change?"
              rows={3}
              className="w-full p-2 border rounded mb-4"
            />
            
            <div className="flex gap-2">
              <button
                onClick={() => handleRegenerate(selectedImage.id)}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Regenerate
              </button>
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setRegeneratePrompt('');
                }}
                className="flex-1 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
`;

// ==================== RESPONSE TYPES ====================

/**
 * Upload Ornament Response:
 * {
 *   success: true,
 *   message: "Image generated successfully",
 *   uploaded_image_url: "https://...",
 *   generated_image_url: "https://...",
 *   prompt: "...",
 *   ornament_id: 123,
 *   type: "white_background"
 * }
 */

/**
 * Regenerate Image Response:
 * {
 *   success: true,
 *   message: "Image regenerated successfully",
 *   mongo_id: "507f1f77bcf86cd799439011",
 *   parent_image_id: "507f1f77bcf86cd799439012",
 *   generated_image_url: "https://...",
 *   uploaded_image_url: "https://...",
 *   combined_prompt: "original prompt. new prompt",
 *   original_prompt: "original prompt",
 *   new_prompt: "new prompt",
 *   type: "white_background"
 * }
 */

/**
 * Get User Images Response:
 * {
 *   success: true,
 *   images: [
 *     {
 *       id: "507f1f77bcf86cd799439011",
 *       prompt: "...",
 *       type: "white_background",
 *       uploaded_image_url: "https://...",
 *       generated_image_url: "https://...",
 *       created_at: "2025-01-01T00:00:00",
 *       parent_image_id: null,
 *       original_prompt: "..."
 *     }
 *   ],
 *   pagination: {
 *     page: 1,
 *     limit: 20,
 *     total: 100,
 *     pages: 5
 *   }
 * }
 */

export default {
  uploadOrnament,
  changeBackground,
  generateModelWithOrnament,
  generateRealModelWithOrnament,
  generateCampaignShot,
  regenerateImage,
  getUserImages,
  getImageById,
  getImagesByType,
};

