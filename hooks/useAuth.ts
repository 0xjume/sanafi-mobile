import { useState, useEffect, createContext, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  hasCompletedKYC: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  completeOnboarding: () => void;
  completeKYC: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [hasCompletedKYC, setHasCompletedKYC] = useState(false);

  // Load saved state on initialization
  useEffect(() => {
    // In a real app, you would load this from AsyncStorage or similar
    // For demo purposes, we'll keep the state in memory
    const savedAuth = localStorage?.getItem('auth_state');
    if (savedAuth) {
      try {
        const authState = JSON.parse(savedAuth);
        setIsAuthenticated(authState.isAuthenticated || false);
        setHasCompletedOnboarding(authState.hasCompletedOnboarding || false);
        setHasCompletedKYC(authState.hasCompletedKYC || false);
      } catch (error) {
        console.log('Error loading auth state:', error);
      }
    }
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const authState = {
        isAuthenticated,
        hasCompletedOnboarding,
        hasCompletedKYC,
      };
      localStorage.setItem('auth_state', JSON.stringify(authState));
    }
  }, [isAuthenticated, hasCompletedOnboarding, hasCompletedKYC]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation for demo
    if (email && password.length >= 6) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
    setHasCompletedKYC(false);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('auth_state');
    }
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  const completeKYC = () => {
    setHasCompletedKYC(true);
  };

  return {
    isAuthenticated,
    hasCompletedOnboarding,
    hasCompletedKYC,
    login,
    logout,
    completeOnboarding,
    completeKYC,
  };
}