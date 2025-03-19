
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated and is an admin
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'You must log in to access the admin panel.',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }
    
    if (!isAdmin) {
      toast({
        title: 'Access denied',
        description: 'You do not have permission to access the admin panel.',
        variant: 'destructive',
      });
      navigate('/');
      return;
    }
  }, [isAuthenticated, isAdmin, navigate, toast]);
  
  // If not authenticated or not admin, show loading state
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg">Checking permissions...</p>
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
          <AdminPanel />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
