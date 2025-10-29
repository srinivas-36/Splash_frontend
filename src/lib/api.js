// API service layer for communicating with Django backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
import axios from 'axios';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };
        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // HTTP method shortcuts
    async get(endpoint, options = {}) {
        const { params, ...requestOptions } = options;
        let url = endpoint;

        // Handle query parameters
        if (params) {
            const searchParams = new URLSearchParams();
            for (const key of Object.keys(params)) {
                if (params[key] !== undefined && params[key] !== null) {
                    searchParams.append(key, params[key]);
                }
            }
            const queryString = searchParams.toString();
            if (queryString) {
                url += (endpoint.includes('?') ? '&' : '?') + queryString;
            }
        }

        return this.request(url, { ...requestOptions, method: 'GET' });
    }

    async post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }

    // User endpoints   
    async login(email, password) {
        return this.request('/api/login/', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        })
    }
    async register(full_name, username, email, password) {
        console.log(full_name, username, email, password)
        return this.request('/api/register/', {
            method: 'POST',
            body: JSON.stringify({ full_name, username, email, password }),
        })
    }

    // Project endpoints
    async getProjects(token) {
        console.log('Getting projects with token:', token);
        return this.request('/probackendapp/api/projects/', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }

    async getProject(projectId, token) {
        return this.request(`/probackendapp/api/projects/${projectId}/`, {
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    async createProject(projectData, token) {
        return this.request('/probackendapp/api/projects/create/', {
            method: 'POST',
            body: JSON.stringify(projectData),
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    async updateProject(projectId, projectData, token) {
        return this.request(`/probackendapp/api/projects/${projectId}/update/`, {
            method: 'PUT',
            body: JSON.stringify(projectData),
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    async updateProjectStatus(projectId, status, token) {
        return this.request(`/probackendapp/api/projects/${projectId}/update/`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    async deleteProject(projectId) {
        return this.request(`/probackendapp/api/projects/${projectId}/`, {
            method: 'DELETE',

        });
    }

    // Collection endpoints
    async getCollection(collectionId, token) {
        return this.request(`/probackendapp/api/collections/${collectionId}/`, {
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        }

        );
    }

    async updateCollectionDescription(projectId, description, uploadedImage) {
        // If there's an uploaded image, use FormData
        if (uploadedImage) {
            const formData = new FormData();
            formData.append('description', description);
            formData.append('uploaded_image', uploadedImage);

            return fetch(`${this.baseURL}/probackendapp/api/projects/${projectId}/setup/description/`, {
                method: 'POST',
                body: formData,
            }).then(response => response.json());
        }

        // Otherwise, use JSON
        return this.request(`/probackendapp/api/projects/${projectId}/setup/description/`, {
            method: 'POST',
            body: JSON.stringify({ description }),
        });
    }

    async uploadWorkflowImage(projectId, collectionId, category, images, token) {
        const formData = new FormData();
        formData.append('category', category);

        for (const image of images) {
            formData.append('images', image);
        }

        console.log('Uploading workflow image:', {
            projectId,
            collectionId,
            category,
            imageCount: images.length,
            token: token ? 'present' : 'missing'
        });

        return fetch(`${this.baseURL}/probackendapp/api/projects/${projectId}/collections/${collectionId}/upload-workflow-image/`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        }).then(response => {
            console.log('Upload response status:', response.status);
            if (!response.ok) {
                return response.text().then(text => {
                    console.error('Upload failed:', text);
                    throw new Error(`Upload failed: ${response.status} ${text}`);
                });
            }
            return response.json();
        });
    }

    async updateCollectionSelections(projectId, collectionId, selections, uploadedImages = {}) {
        // If there are uploaded images, use FormData
        if (Object.keys(uploadedImages).some(category => uploadedImages[category].length > 0)) {
            const formData = new FormData();

            // Add selections as JSON
            formData.append('selections', JSON.stringify(selections));

            // Add uploaded images for each category
            Object.keys(uploadedImages).forEach(category => {
                uploadedImages[category].forEach((image, index) => {
                    formData.append(`uploaded_${category}_images`, image.file);
                });
            });

            return fetch(`${this.baseURL}/probackendapp/api/projects/${projectId}/collections/${collectionId}/select/`, {
                method: 'POST',
                body: formData,
            }).then(response => response.json());
        }

        // Otherwise, use JSON
        return this.request(`/probackendapp/api/projects/${projectId}/collections/${collectionId}/select/`, {
            method: 'POST',
            body: JSON.stringify(selections),
        });
    }
    async enhanceImage(imageUrl, collectionId, productImagePath, generatedImagePath, token) {
        return this.request(`/probackendapp/api/image/enhance/`, {
            method: 'POST',
            body: JSON.stringify({
                image_url: imageUrl,
                collection_id: collectionId,
                product_image_path: productImagePath,
                generated_image_path: generatedImagePath
            }),
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }

    // AI Image Generation endpoints
    async generateAIImages(collectionId) {
        return this.request(`/probackendapp/api/collections/${collectionId}/generate-images/`, {
            method: 'POST',
        });
    }

    async saveGeneratedImages(collectionId, selectedImages) {
        return this.request(`/probackendapp/api/collections/${collectionId}/save-images/`, {
            method: 'POST',
            body: JSON.stringify({ images: selectedImages }),
        });
    }

    // Product Image endpoints
    async uploadProductImages(collectionId, images, token) {
        const formData = new FormData();
        for (const image of images) {
            formData.append('images', image);
        }

        return fetch(`${this.baseURL}/probackendapp/api/collections/${collectionId}/upload-products/`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        }).then(response => response.json());
    }

    async generateProductModelImages(collectionId, token) {
        return this.request(`/probackendapp/api/collections/${collectionId}/generate-all-product-model-images/`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    async regenerateProductModelImage(collectionId, productImagePath, generatedImagePath, prompt, useDifferentModel = false, newModel = null, token) {
        return this.request(`/probackendapp/api/collections/${collectionId}/regenerate/`, {
            method: 'POST',
            body: JSON.stringify({
                product_image_path: productImagePath,
                generated_image_path: generatedImagePath,
                prompt: prompt,
                use_different_model: useDifferentModel,
                new_model: newModel,
            }),
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    // Model Management endpoints
    async uploadRealModels(collectionId, images) {
        const formData = new FormData();
        for (const image of images) {
            formData.append('images', image);
        }

        return fetch(`${this.baseURL}/probackendapp/api/collections/${collectionId}/upload-real-models/`, {
            method: 'POST',
            body: formData,
        }).then(response => response.json());
    }

    async getAllModels(collectionId) {
        return this.request(`/probackendapp/api/collections/${collectionId}/get-all-models/`);
    }

    async selectModel(collectionId, modelType, modelData) {
        return this.request(`/probackendapp/api/collections/${collectionId}/select-model/`, {
            method: 'POST',
            body: JSON.stringify({
                type: modelType,
                model: modelData,
            }),
        });
    }

    // Collaboration endpoints
    async inviteUser(projectId, email, role, token) {
        return this.request(`/probackendapp/api/${projectId}/invite`, {
            method: 'POST',
            body: JSON.stringify({ email, role }),
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    async acceptInvite(projectId, token) {
        return this.request(`/probackendapp/api/${projectId}/accept-invite`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    async listInvites(projectId, token) {
        return this.request(`/probackendapp/api/${projectId}/invites`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    async getAvailableUsers(projectId, token) {
        return this.request(`/probackendapp/api/${projectId}/available-users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    async updateMemberRole(projectId, userId, role, token) {
        return this.request(`/probackendapp/api/${projectId}/update-member-role`, {
            method: 'POST',
            body: JSON.stringify({ user_id: userId, role }),
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    // Global invite endpoints (for dashboard)
    async getAllInvites(token) {
        return this.request(`/probackendapp/api/invites/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    async acceptInviteById(inviteId, token) {
        return this.request(`/probackendapp/api/invites/${inviteId}/accept`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    async rejectInvite(inviteId, token) {
        return this.request(`/probackendapp/api/invites/${inviteId}/reject`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    // Role and Permission endpoints
    async getUserRole(projectId, token) {
        return this.request(`/probackendapp/api/projects/${projectId}/user-role/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    // Model usage statistics
    async getModelUsageStats(collectionId, token) {
        return this.request(`/probackendapp/api/collections/${collectionId}/model-usage-stats/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    // Image Generation endpoints (imgbackendapp)
    async uploadOrnamentWithBackground(formData, token) {
        const response = await axios.post(`${this.baseURL}/image/`, formData, {
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            }
        });
        return response.data;
    }

    async changeBackground(formData, token) {
        const response = await axios.post(`${this.baseURL}/image/change_background/`, formData, {
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            }
        });
        return response.data;
    }

    async generateModelWithOrnament(formData, token) {
        const response = await axios.post(`${this.baseURL}/image/generate-model/`, formData, {
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            }
        });
        return response.data;
    }

    async generateRealModelWithOrnament(formData, token) {
        const response = await axios.post(`${this.baseURL}/image/generate-real-model/`, formData, {
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            }
        });
        return response.data;
    }

    async generateCampaignShot(formData, token) {
        const response = await axios.post(`${this.baseURL}/image/generate-campaign-shot/`, formData, {
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            }
        });
        return response.data;
    }

    // Regeneration endpoints
    async regenerateImage(imageId, prompt, token) {
        // const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('image_id', imageId);
        formData.append('prompt', prompt);

        const response = await axios.post(
            `${this.baseURL}/image/regenerate/`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token || ''}`,
                }
            }
        );
        return response.data;
    }

    async getUserImages(type = null, page = 1, limit = 20) {
        const token = localStorage.getItem('token');
        const params = { page, limit };
        if (type) {
            params.type = type;
        }

        const response = await axios.get(
            `${this.baseURL}/image/user-images/`,
            {
                params,
                headers: {
                    'Authorization': `Bearer ${token || ''}`,
                }
            }
        );
        return response.data;
    }

    // Recent History endpoints
    async getRecentHistory(token, params = {}) {
        return this.get('/probackendapp/api/recent/history/', {
            params,
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    async getRecentProjects(token, params = {}) {
        return this.get('/probackendapp/api/recent/projects/', {
            params,
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }

    async getRecentProjectHistory(token, params = {}) {
        return this.get('/probackendapp/api/recent/project-history/', {
            params,
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });
    }
}

// Configure axios to add token to all requests
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.url.includes('/imgbackendapp/')) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const apiService = new ApiService();
export default apiService;
