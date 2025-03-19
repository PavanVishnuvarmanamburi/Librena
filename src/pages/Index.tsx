
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { ScrollText } from '@/components/home/ScrollText';
import { Features } from '@/components/home/Features';
import { LibraryCard, Library } from '@/components/ui/LibraryCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ChevronUp, Search, RefreshCw } from 'lucide-react';
import { mockLibraries } from '@/data/mockData';

const Index = () => {
  const [libraries, setLibraries] = useState<Library[]>(mockLibraries);
  const [filteredLibraries, setFilteredLibraries] = useState<Library[]>(mockLibraries);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [selectedLibraries, setSelectedLibraries] = useState<Library[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract search parameters from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchFromUrl = searchParams.get('search');
    const categoryFromUrl = searchParams.get('category');
    
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
    
    if (categoryFromUrl) {
      setCategory(categoryFromUrl);
    }
    
    if (searchFromUrl || categoryFromUrl) {
      filterLibraries(searchFromUrl || '', categoryFromUrl);
    }
  }, [location.search]);
  
  // Handle scroll button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const filterLibraries = (query: string, cat: string | null) => {
    setIsSearching(true);
    
    setTimeout(() => {
      let results = mockLibraries;
      
      if (query) {
        results = results.filter((lib) =>
          lib.name.toLowerCase().includes(query.toLowerCase()) ||
          lib.description.toLowerCase().includes(query.toLowerCase()) ||
          lib.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
        );
      }
      
      if (cat) {
        results = results.filter((lib) => lib.category === cat);
      }
      
      setFilteredLibraries(results);
      setIsSearching(false);
    }, 500); // Simulate loading for a smoother UX
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'Please login to search for libraries.',
        variant: 'destructive',
      });
      return;
    }
    
    filterLibraries(searchQuery, category);
    
    // Update URL with search parameters
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.set('search', searchQuery);
    if (category) searchParams.set('category', category);
    
    navigate({
      pathname: '/',
      search: searchParams.toString()
    });
  };
  
  const handleSelectLibrary = (library: Library) => {
    if (selectedLibraries.find((lib) => lib.id === library.id)) {
      // Library is already selected, remove it
      setSelectedLibraries(selectedLibraries.filter((lib) => lib.id !== library.id));
    } else {
      // Library is not selected, add it (but limit to 2)
      if (selectedLibraries.length < 2) {
        setSelectedLibraries([...selectedLibraries, library]);
      } else {
        toast({
          title: 'Maximum selection reached',
          description: 'You can only compare up to 2 libraries at a time.',
          variant: 'destructive',
        });
      }
    }
  };
  
  const handleCompare = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'You must log in before comparing libraries.',
        variant: 'destructive',
      });
      return;
    }
    
    if (selectedLibraries.length !== 2) {
      toast({
        title: 'Selection required',
        description: 'Please select exactly 2 libraries to compare.',
        variant: 'destructive',
      });
      return;
    }
    
    // Store selected libraries in sessionStorage for the comparison page
    sessionStorage.setItem('comparedLibraries', JSON.stringify(selectedLibraries));
    navigate('/comparison');
  };
  
  const handleResetFilters = () => {
    setSearchQuery('');
    setCategory(null);
    setFilteredLibraries(mockLibraries);
    navigate('/');
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Get all unique categories for the filter dropdown
  const categories = Array.from(new Set(mockLibraries.map((lib) => lib.category)));
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <ScrollText />
        <Features />
        
        <section id="libraries" className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore Software Libraries
              </h2>
              <p className="text-lg text-muted-foreground">
                Browse through our collection of software libraries and find the perfect solution for your project.
              </p>
            </div>
            
            {isAuthenticated && (
              <div className="max-w-3xl mx-auto mb-10">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search libraries by name, description, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select
                    value={category || ''}
                    onValueChange={(value) => setCategory(value || null)}
                  >
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button type="submit" className="flex-shrink-0">
                    Search
                  </Button>
                </form>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-muted-foreground">
                    {filteredLibraries.length} libraries found
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetFilters}
                    className="text-sm"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
            
            <div className="mt-8">
              {selectedLibraries.length > 0 && (
                <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <h3 className="font-medium">
                      {selectedLibraries.length === 1
                        ? '1 library selected'
                        : `${selectedLibraries.length} libraries selected`}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedLibraries.length === 2
                        ? 'Ready to compare!'
                        : `Select ${2 - selectedLibraries.length} more to compare`}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedLibraries([])}
                    >
                      Clear Selection
                    </Button>
                    <Button
                      onClick={handleCompare}
                      disabled={selectedLibraries.length !== 2}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                      Compare Libraries
                    </Button>
                  </div>
                </div>
              )}
              
              {isSearching ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : filteredLibraries.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground">No libraries found matching your criteria.</p>
                  <Button
                    variant="outline"
                    onClick={handleResetFilters}
                    className="mt-4"
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLibraries.map((library) => (
                    <LibraryCard
                      key={library.id}
                      library={library}
                      isSelected={!!selectedLibraries.find((lib) => lib.id === library.id)}
                      onSelect={handleSelectLibrary}
                      onViewDetails={(lib) => {
                        // In a real application, this would navigate to a library detail page
                        toast({
                          title: `${lib.name} Details`,
                          description: 'This would show detailed information about the library.',
                        });
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 z-50"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Index;
