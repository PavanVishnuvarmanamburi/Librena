
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const categories = [
  'UI Libraries',
  'State Management',
  'Data Fetching',
  'Routing',
  'Styling',
  'Testing',
  'Form Handling',
  'Animation',
  'Charts',
  'Date/Time',
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { isAuthenticated, user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    
    navigate(`/?search=${searchQuery}${selectedCategory ? `&category=${selectedCategory}` : ''}`);
  };

  const handleCompareClick = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'You must log in before comparing libraries.',
        variant: 'destructive',
      });
      return;
    }
    
    navigate('/comparison');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/80 dark:bg-theme-dark/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 font-semibold text-xl tracking-tight text-gradient"
            >
              <span className="text-2xl animate-pulse-slow">Librena</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated && (
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search libraries..."
                  className="w-48 lg:w-60 h-9 bg-white/80 dark:bg-theme-dark/50 focus-visible:ring-1 focus-visible:ring-theme-hover transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1 h-9">
                      {selectedCategory || 'Categories'}
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                      All Categories
                    </DropdownMenuItem>
                    {categories.map((category) => (
                      <DropdownMenuItem 
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button type="submit" size="sm" className="h-9">
                  <Search size={16} className="mr-2" />
                  Search
                </Button>
              </form>
            )}
            
            <Button 
              onClick={handleCompareClick} 
              variant="default"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white button-hover"
            >
              Compare Libraries
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9">
                    <User size={16} className="mr-2" />
                    {user?.firstName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  {user?.isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout}>
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  <LogIn size={16} className="mr-2" />
                  Login
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate('/register')}>
                  <UserPlus size={16} className="mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-theme-dark shadow-lg">
          <div className="px-4 py-4 space-y-4">
            {isAuthenticated && (
              <form onSubmit={handleSearch} className="flex flex-col space-y-2">
                <Input
                  type="text"
                  placeholder="Search libraries..."
                  className="w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full flex items-center justify-between">
                      {selectedCategory || 'Categories'}
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                      All Categories
                    </DropdownMenuItem>
                    {categories.map((category) => (
                      <DropdownMenuItem 
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button type="submit" className="w-full">
                  <Search size={16} className="mr-2" />
                  Search
                </Button>
              </form>
            )}
            
            <Button 
              onClick={handleCompareClick}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            >
              Compare Libraries
            </Button>
            
            <div className="pt-2 border-t">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/profile')}>
                    <User size={16} className="mr-2" />
                    Profile
                  </Button>
                  {user?.isAdmin && (
                    <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin')}>
                      Admin Panel
                    </Button>
                  )}
                  <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button variant="ghost" className="w-full" onClick={() => navigate('/login')}>
                    <LogIn size={16} className="mr-2" />
                    Login
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/register')}>
                    <UserPlus size={16} className="mr-2" />
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
