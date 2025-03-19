
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Library } from '@/components/ui/LibraryCard';
import { useToast } from '@/hooks/use-toast';
import { mockLibraries } from '@/data/mockData';

export const AdminPanel = () => {
  const [libraries, setLibraries] = useState<Library[]>(mockLibraries);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingLibrary, setEditingLibrary] = useState<Library | null>(null);
  const [newLibrary, setNewLibrary] = useState<Partial<Library>>({
    name: '',
    category: '',
    version: '',
    lastUpdated: new Date().toLocaleDateString(),
    stars: 0,
    description: '',
    license: '',
    cost: 'Free',
    os: [],
    tags: [],
  });
  
  const { toast } = useToast();
  
  const filteredLibraries = libraries.filter(
    (lib) =>
      lib.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lib.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleEditLibrary = (library: Library) => {
    setEditingLibrary(library);
  };
  
  const handleSaveEdit = () => {
    if (!editingLibrary) return;
    
    setLibraries(
      libraries.map((lib) => (lib.id === editingLibrary.id ? editingLibrary : lib))
    );
    
    setEditingLibrary(null);
    
    toast({
      title: 'Library updated',
      description: `${editingLibrary.name} has been updated successfully.`,
    });
  };
  
  const handleCancelEdit = () => {
    setEditingLibrary(null);
  };
  
  const handleDeleteLibrary = (id: string) => {
    const libraryToDelete = libraries.find((lib) => lib.id === id);
    if (!libraryToDelete) return;
    
    setLibraries(libraries.filter((lib) => lib.id !== id));
    
    toast({
      title: 'Library deleted',
      description: `${libraryToDelete.name} has been deleted successfully.`,
    });
  };
  
  const handleCreateLibrary = () => {
    if (!newLibrary.name || !newLibrary.category || !newLibrary.version) {
      toast({
        title: 'Validation error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    
    const createdLibrary: Library = {
      id: `lib-${Date.now()}`,
      name: newLibrary.name || '',
      category: newLibrary.category || '',
      version: newLibrary.version || '',
      lastUpdated: newLibrary.lastUpdated || new Date().toLocaleDateString(),
      stars: newLibrary.stars || 0,
      description: newLibrary.description || '',
      license: newLibrary.license || '',
      cost: newLibrary.cost || 'Free',
      os: newLibrary.os || [],
      tags: newLibrary.tags || [],
      size: newLibrary.size || '0',
    };
    
    setLibraries([createdLibrary, ...libraries]);
    
    setNewLibrary({
      name: '',
      category: '',
      version: '',
      lastUpdated: new Date().toLocaleDateString(),
      stars: 0,
      description: '',
      license: '',
      cost: 'Free',
      os: [],
      tags: [],
    });
    
    toast({
      title: 'Library created',
      description: `${createdLibrary.name} has been created successfully.`,
    });
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isEditing: boolean
  ) => {
    const { name, value } = e.target;
    
    if (isEditing && editingLibrary) {
      setEditingLibrary({
        ...editingLibrary,
        [name]: value,
      });
    } else {
      setNewLibrary({
        ...newLibrary,
        [name]: value,
      });
    }
  };
  
  const renderLibraryForm = (isEditing: boolean) => {
    const library = isEditing ? editingLibrary : newLibrary;
    if (isEditing && !editingLibrary) return null;
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor={`name-${isEditing ? 'edit' : 'new'}`} className="text-sm font-medium">
              Name *
            </label>
            <Input
              id={`name-${isEditing ? 'edit' : 'new'}`}
              name="name"
              value={library?.name || ''}
              onChange={(e) => handleInputChange(e, isEditing)}
              placeholder="Library name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor={`category-${isEditing ? 'edit' : 'new'}`} className="text-sm font-medium">
              Category *
            </label>
            <Input
              id={`category-${isEditing ? 'edit' : 'new'}`}
              name="category"
              value={library?.category || ''}
              onChange={(e) => handleInputChange(e, isEditing)}
              placeholder="e.g., UI Libraries"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor={`version-${isEditing ? 'edit' : 'new'}`} className="text-sm font-medium">
              Version *
            </label>
            <Input
              id={`version-${isEditing ? 'edit' : 'new'}`}
              name="version"
              value={library?.version || ''}
              onChange={(e) => handleInputChange(e, isEditing)}
              placeholder="e.g., 1.0.0"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor={`license-${isEditing ? 'edit' : 'new'}`} className="text-sm font-medium">
              License
            </label>
            <Input
              id={`license-${isEditing ? 'edit' : 'new'}`}
              name="license"
              value={library?.license || ''}
              onChange={(e) => handleInputChange(e, isEditing)}
              placeholder="e.g., MIT"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor={`cost-${isEditing ? 'edit' : 'new'}`} className="text-sm font-medium">
              Cost
            </label>
            <Input
              id={`cost-${isEditing ? 'edit' : 'new'}`}
              name="cost"
              value={library?.cost || ''}
              onChange={(e) => handleInputChange(e, isEditing)}
              placeholder="e.g., Free, $10/month"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor={`size-${isEditing ? 'edit' : 'new'}`} className="text-sm font-medium">
              Size (KB)
            </label>
            <Input
              id={`size-${isEditing ? 'edit' : 'new'}`}
              name="size"
              type="number"
              value={library?.size || ''}
              onChange={(e) => handleInputChange(e, isEditing)}
              placeholder="e.g., 42"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor={`stars-${isEditing ? 'edit' : 'new'}`} className="text-sm font-medium">
              Stars
            </label>
            <Input
              id={`stars-${isEditing ? 'edit' : 'new'}`}
              name="stars"
              type="number"
              value={library?.stars || 0}
              onChange={(e) => handleInputChange(e, isEditing)}
              placeholder="e.g., 1000"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor={`os-${isEditing ? 'edit' : 'new'}`} className="text-sm font-medium">
              Operating Systems (comma separated)
            </label>
            <Input
              id={`os-${isEditing ? 'edit' : 'new'}`}
              name="os"
              value={Array.isArray(library?.os) ? library?.os.join(', ') : ''}
              onChange={(e) => {
                const value = e.target.value.split(',').map((item) => item.trim());
                if (isEditing && editingLibrary) {
                  setEditingLibrary({
                    ...editingLibrary,
                    os: value,
                  });
                } else {
                  setNewLibrary({
                    ...newLibrary,
                    os: value,
                  });
                }
              }}
              placeholder="e.g., Windows, macOS, Linux"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor={`tags-${isEditing ? 'edit' : 'new'}`} className="text-sm font-medium">
              Tags (comma separated)
            </label>
            <Input
              id={`tags-${isEditing ? 'edit' : 'new'}`}
              name="tags"
              value={Array.isArray(library?.tags) ? library?.tags.join(', ') : ''}
              onChange={(e) => {
                const value = e.target.value.split(',').map((item) => item.trim());
                if (isEditing && editingLibrary) {
                  setEditingLibrary({
                    ...editingLibrary,
                    tags: value,
                  });
                } else {
                  setNewLibrary({
                    ...newLibrary,
                    tags: value,
                  });
                }
              }}
              placeholder="e.g., react, ui, frontend"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor={`description-${isEditing ? 'edit' : 'new'}`} className="text-sm font-medium">
            Description
          </label>
          <textarea
            id={`description-${isEditing ? 'edit' : 'new'}`}
            name="description"
            value={library?.description || ''}
            onChange={(e) => handleInputChange(e, isEditing)}
            placeholder="Library description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          />
        </div>
        
        {isEditing ? (
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCancelEdit}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        ) : (
          <Button onClick={handleCreateLibrary} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Create Library
          </Button>
        )}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="manage">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manage">Manage Libraries</TabsTrigger>
              <TabsTrigger value="add">Add New Library</TabsTrigger>
            </TabsList>
            
            <TabsContent value="manage" className="space-y-4 pt-4">
              <div className="flex items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search libraries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {editingLibrary && (
                <Card className="mb-4 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader>
                    <CardTitle>Edit Library</CardTitle>
                  </CardHeader>
                  <CardContent>{renderLibraryForm(true)}</CardContent>
                </Card>
              )}
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Libraries ({filteredLibraries.length})</h3>
                
                {filteredLibraries.length > 0 ? (
                  <div className="space-y-4">
                    {filteredLibraries.map((library) => (
                      <Card key={library.id} className="overflow-hidden">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-semibold">{library.name}</h4>
                              <p className="text-muted-foreground text-sm">
                                {library.category} • Version {library.version}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditLibrary(library)}
                                disabled={!!editingLibrary}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteLibrary(library.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {library.description}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No libraries found</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="add" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Library</CardTitle>
                </CardHeader>
                <CardContent>{renderLibraryForm(false)}</CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
