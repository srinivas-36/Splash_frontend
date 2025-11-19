"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save, X, FileText, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { apiService } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function PromptMasterPage() {
  const { token: authToken } = useAuth();
  const [prompts, setPrompts] = useState([]);
  const [categories, setCategories] = useState(['suggestion', 'template', 'generation', 'other', 'images']);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    prompt_key: '',
    title: '',
    description: '',
    prompt_content: '',
    instructions: '',
    rules: '',
    category: '',
    prompt_type: '',
    is_active: true,
    metadata: {}
  });

  // Get token from auth context or localStorage
  const getToken = () => {
    return authToken || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
  };

  useEffect(() => {
    fetchPrompts();
    // Initialize default prompts if database is empty
    initializePromptsIfNeeded();
  }, []);

  const initializePromptsIfNeeded = async () => {
    try {
      const token = getToken();
      const response = await apiService.getPrompts(token);
      if (response.success && (!response.prompts || response.prompts.length === 0)) {
        // Database is empty, initialize default prompts
        const initResponse = await apiService.initializePrompts(token);
        if (initResponse.success) {
          toast.success(`Initialized ${initResponse.created} default prompts!`);
          fetchPrompts();
        }
      }
    } catch (error) {
      console.error('Error checking/initializing prompts:', error);
    }
  };

  const handleInitializePrompts = async () => {
    try {
      const token = getToken();
      const initResponse = await apiService.initializePrompts(token);
      if (initResponse.success) {
        toast.success(`Initialized prompts! Created: ${initResponse.created}, Already existed: ${initResponse.already_existed || 0}`);
        fetchPrompts();
      } else {
        toast.error('Failed to initialize prompts');
      }
    } catch (error) {
      console.error('Error initializing prompts:', error);
      toast.error('Error initializing prompts');
    }
  };

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await apiService.getPrompts(token);
      if (response.success) {
        setPrompts(response.prompts || []);
        // Update categories from API response if available
        if (response.categories && response.categories.length > 0) {
          setCategories(response.categories);
        } else {
          // Fallback: extract categories from prompts
          const allCategories = [...new Set((response.prompts || []).map(p => p.category).filter(Boolean))];
          if (allCategories.length > 0) {
            setCategories(allCategories.sort());
          }
        }
      } else {
        toast.error('Failed to fetch prompts');
      }
    } catch (error) {
      console.error('Error fetching prompts:', error);
      toast.error('Error loading prompts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      if (!formData.prompt_key || !formData.title || !formData.prompt_content || !formData.category) {
        toast.error('Please fill in all required fields');
        return;
      }

      const token = getToken();
      const response = await apiService.createPrompt(formData, token);
      if (response.success) {
        toast.success('Prompt created successfully!');
        setShowCreateForm(false);
        resetForm();
        fetchPrompts();
      } else {
        toast.error(response.error || 'Failed to create prompt');
      }
    } catch (error) {
      console.error('Error creating prompt:', error);
      toast.error('Error creating prompt');
    }
  };

  const handleUpdate = async (promptId) => {
    try {
      if (!formData.prompt_key || !formData.title || !formData.prompt_content || !formData.category) {
        toast.error('Please fill in all required fields');
        return;
      }

      const token = getToken();
      const response = await apiService.updatePrompt(promptId, formData, token);
      if (response.success) {
        toast.success('Prompt updated successfully!');
        setEditingId(null);
        resetForm();
        fetchPrompts();
      } else {
        toast.error(response.error || 'Failed to update prompt');
      }
    } catch (error) {
      console.error('Error updating prompt:', error);
      toast.error('Error updating prompt');
    }
  };

  const handleDelete = async (promptId) => {
    if (!confirm('Are you sure you want to delete this prompt?')) {
      return;
    }

    try {
      const token = getToken();
      const response = await apiService.deletePrompt(promptId, token);
      if (response.success) {
        toast.success('Prompt deleted successfully!');
        fetchPrompts();
      } else {
        toast.error(response.error || 'Failed to delete prompt');
      }
    } catch (error) {
      console.error('Error deleting prompt:', error);
      toast.error('Error deleting prompt');
    }
  };

  const startEdit = (prompt) => {
    setEditingId(prompt.id);
    setFormData({
      prompt_key: prompt.prompt_key,
      title: prompt.title,
      description: prompt.description || '',
      prompt_content: prompt.prompt_content,
      instructions: prompt.instructions || '',
      rules: prompt.rules || '',
      category: prompt.category,
      prompt_type: prompt.prompt_type || '',
      is_active: prompt.is_active,
      metadata: prompt.metadata || {}
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowCreateForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      prompt_key: '',
      title: '',
      description: '',
      prompt_content: '',
      instructions: '',
      rules: '',
      category: '',
      prompt_type: '',
      is_active: true,
      metadata: {}
    });
  };

  const promptTypes = ['white_background', 'background_replace', 'model_image', 'campaign_image', 'suggestion_prompt'];

  const groupedPrompts = prompts.reduce((acc, prompt) => {
    const category = prompt.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(prompt);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading prompts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Sparkles className="w-8 h-8" />
            Prompt Master
          </h1>
          <p className="text-muted-foreground">Manage and customize all AI prompts used in the system</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleInitializePrompts}
            variant="outline"
            title="Initialize/Update all default prompts in the database"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Initialize Prompts
          </Button>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-[#884cff] hover:bg-[#884cff]/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Prompt
          </Button>
        </div>
      </div>

      {/* Create/Edit Form Modal */}
      <Dialog open={showCreateForm || !!editingId} onOpenChange={(open) => {
        if (!open) {
          cancelEdit();
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Prompt' : 'Create New Prompt'}</DialogTitle>
            <DialogDescription>
              {editingId ? 'Update the prompt details below' : 'Fill in the details to create a new prompt'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prompt_key">Prompt Key *</Label>
                <Input
                  id="prompt_key"
                  value={formData.prompt_key}
                  onChange={(e) => setFormData({ ...formData, prompt_key: e.target.value })}
                  placeholder="e.g., suggestion_prompt, white_background_template"
                  disabled={!!editingId}
                />
                <p className="text-xs text-muted-foreground">Unique identifier for this prompt</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Suggestion Generation Prompt"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of what this prompt does"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt_type">Prompt Type</Label>
                <Select
                  value={formData.prompt_type || 'none'}
                  onValueChange={(value) => setFormData({ ...formData, prompt_type: value === 'none' ? '' : value })}
                >
                  <SelectTrigger id="prompt_type">
                    <SelectValue placeholder="Select type (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {promptTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt_content">Prompt Content *</Label>
              <Textarea
                id="prompt_content"
                value={formData.prompt_content}
                onChange={(e) => setFormData({ ...formData, prompt_content: e.target.value })}
                placeholder="Enter the full prompt text here..."
                className="min-h-[200px] font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Use {'{variable_name}'} for dynamic variables that will be replaced at runtime. Use {'{instructions}'} and {'{rules}'} to insert instructions and rules sections.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Enter instructions for prompt creation (e.g., # INSTRUCTIONS: ...)"
                className="min-h-[150px] font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Instructions that will be inserted into the prompt where {'{instructions}'} is placed
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rules">Rules</Label>
              <Textarea
                id="rules"
                value={formData.rules}
                onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                placeholder="Enter rules for prompt creation (e.g., RULES FOR PROMPT CREATION: ...)"
                className="min-h-[150px] font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Rules that will be inserted into the prompt where {'{rules}'} is placed
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Active (prompt will be used in the system)</Label>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={cancelEdit}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={() => editingId ? handleUpdate(editingId) : handleCreate()}
                className="bg-[#884cff] hover:bg-[#884cff]/90"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingId ? 'Update' : 'Create'} Prompt
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Prompts List */}
      {Object.keys(groupedPrompts).length === 0 ? (
        <Card className="shadow-elegant">
          <CardContent className="py-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Prompts Yet</h3>
            <p className="text-muted-foreground mb-4">Create your first prompt to get started</p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Prompt
            </Button>
          </CardContent>
        </Card>
      ) : (
        Object.keys(groupedPrompts).map((category) => (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground capitalize">
              {category.replace(/_/g, ' ')}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {groupedPrompts[category].map((prompt) => (
                <Card
                  key={prompt.id}
                  className={`shadow-elegant ${!prompt.is_active ? 'opacity-60' : ''}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{prompt.title}</CardTitle>
                          {!prompt.is_active && (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                          <Badge variant="outline">{prompt.category}</Badge>
                          {prompt.prompt_type && (
                            <Badge variant="outline">{prompt.prompt_type}</Badge>
                          )}
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <span className="font-mono text-xs">{prompt.prompt_key}</span>
                        </CardDescription>
                        {prompt.description && (
                          <p className="text-sm text-muted-foreground mt-2">{prompt.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(prompt)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(prompt.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Prompt Content:</Label>
                        <div className="p-3 bg-muted rounded-md">
                          <pre className="text-sm font-mono whitespace-pre-wrap break-words">
                            {prompt.prompt_content}
                          </pre>
                        </div>
                      </div>
                      {prompt.instructions && (
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">Instructions:</Label>
                          <div className="p-3 bg-muted rounded-md">
                            <pre className="text-sm font-mono whitespace-pre-wrap break-words">
                              {prompt.instructions}
                            </pre>
                          </div>
                        </div>
                      )}
                      {prompt.rules && (
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">Rules:</Label>
                          <div className="p-3 bg-muted rounded-md">
                            <pre className="text-sm font-mono whitespace-pre-wrap break-words">
                              {prompt.rules}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Created: {new Date(prompt.created_at).toLocaleDateString()}</span>
                      {prompt.updated_at && (
                        <span>Updated: {new Date(prompt.updated_at).toLocaleDateString()}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
