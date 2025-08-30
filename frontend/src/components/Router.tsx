import React, { createContext, useContext, useState, ReactNode } from 'react';

type Page = 
  | 'home' 
  | 'login' 
  | 'signup' 
  | 'problem-statement'
  | 'ai-optimization'
  | 'system-features'
  | 'benefits'
  | 'operations-research'
  | 'artificial-intelligence'
  | 'real-time-analytics'
  | 'system-integration'
  | 'about-us'
  | 'case-studies'
  | 'contact'
  | 'support'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'cookie-policy'
  | 'learn-more';

type RouterContextType = {
  currentPage: Page;
  navigate: (page: Page) => void;
};

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function Router({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <RouterContext.Provider value={{ currentPage, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a Router');
  }
  return context;
}