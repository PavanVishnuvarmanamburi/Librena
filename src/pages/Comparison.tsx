
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ComparisonTable } from '@/components/comparison/ComparisonTable';
import { VisualComparison } from '@/components/comparison/VisualComparison';
import { Library } from '@/components/ui/LibraryCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Comparison = () => {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    visuals: true,
    table: true,
    examples: true
  });
  
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'You must log in before comparing libraries.',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }
    
    // Get compared libraries from sessionStorage
    const storedLibraries = sessionStorage.getItem('comparedLibraries');
    if (storedLibraries) {
      setLibraries(JSON.parse(storedLibraries));
    } else {
      toast({
        title: 'No libraries selected',
        description: 'Please select libraries to compare from the home page.',
        variant: 'destructive',
      });
      navigate('/');
    }
    
    // Handle scroll button visibility
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuthenticated, navigate, toast]);
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // If no libraries to compare, show loading state
  if (libraries.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg">Loading comparison data...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="mb-8">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Libraries
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Library Comparison
            </h1>
            <p className="text-lg text-muted-foreground">
              Comparing {libraries.map((lib) => lib.name).join(' vs ')}
            </p>
          </div>
          
          <div className="space-y-10">
            <section>
              <div 
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-4 rounded-t-lg cursor-pointer"
                onClick={() => toggleSection('visuals')}
              >
                <h2 className="text-xl font-semibold">Visual Comparison</h2>
                <Button variant="ghost" size="sm">
                  {expandedSections.visuals ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>
              
              {expandedSections.visuals && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-b-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <VisualComparison libraries={libraries} />
                </div>
              )}
            </section>
            
            <section>
              <div 
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-4 rounded-t-lg cursor-pointer"
                onClick={() => toggleSection('table')}
              >
                <h2 className="text-xl font-semibold">Detailed Comparison</h2>
                <Button variant="ghost" size="sm">
                  {expandedSections.table ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>
              
              {expandedSections.table && (
                <div className="bg-white dark:bg-gray-800 rounded-b-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <ComparisonTable libraries={libraries} />
                </div>
              )}
            </section>
            
            <section>
              <div 
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-4 rounded-t-lg cursor-pointer"
                onClick={() => toggleSection('examples')}
              >
                <h2 className="text-xl font-semibold">Implementation Examples</h2>
                <Button variant="ghost" size="sm">
                  {expandedSections.examples ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>
              
              {expandedSections.examples && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-b-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {libraries.map((library) => (
                      <div key={library.id} className="space-y-4">
                        <h3 className="text-lg font-semibold">{library.name} Example</h3>
                        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
                          <pre className="text-sm overflow-x-auto">
                            <code>
                              {`// Example code for ${library.name}
import { ${library.name} } from '${library.name.toLowerCase()}';

// Initialize the library
const ${library.name.toLowerCase()} = new ${library.name}({
  version: '${library.version}',
  config: {
    // Add your configuration here
  }
});

// Use the library
${library.name.toLowerCase()}.init();
${library.name.toLowerCase()}.doSomething();

// Example function using ${library.name}
function myApp() {
  // Your code here
  return ${library.name.toLowerCase()}.render();
}
`}
                            </code>
                          </pre>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">Key Features:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            <li>Easy integration with existing projects</li>
                            <li>Comprehensive documentation and examples</li>
                            <li>Active community and regular updates</li>
                            <li>Performance optimized for production use</li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
          
          <div className="mt-12 text-center">
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Compare Different Libraries
            </Button>
          </div>
        </div>
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

export default Comparison;
