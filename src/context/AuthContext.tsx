
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'isAdmin'> & { password: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Custom admin credentials
      if ((email === 'RAMA' || email === 'rama' || email === 'rbsastryk@gmail.com') && password === 'Kprkvsl1971!') {
        const adminUser = {
          id: 'admin-rama',
          firstName: 'Rama',
          lastName: 'Bhadra',
          email: 'rbsastryk@gmail.com',
          isAdmin: true
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        toast({
          title: 'Welcome, Admin Rama!',
          description: 'You have successfully logged in as an administrator.',
        });
        return true;
      }
      
      // Old admin login - kept for backward compatibility
      if (email === 'admin@example.com' && password === 'admin123') {
        const adminUser = {
          id: 'admin-1',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@example.com',
          isAdmin: true
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        toast({
          title: 'Welcome back, Admin!',
          description: 'You have successfully logged in.',
        });
        return true;
      }
      
      // Regular user login (accept any email/password combination for demo)
      if (email && password.length >= 6) {
        const newUser = {
          id: `user-${Date.now()}`,
          firstName: 'Demo',
          lastName: 'User',
          email: email,
          isAdmin: false
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        return true;
      }
      
      toast({
        title: 'Login failed',
        description: 'Invalid email or password.',
        variant: 'destructive',
      });
      return false;
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'An error occurred during login.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const register = async (userData: Omit<User, 'id' | 'isAdmin'> & { password: string }): Promise<boolean> => {
    try {
      // For demo purposes, we'll simulate a registration
      // In a real app, this would be an API call
      const newUser = {
        id: `user-${Date.now()}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        isAdmin: false
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: 'Registration successful!',
        description: 'Your account has been created.',
      });
      return true;
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'An error occurred during registration.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
