import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
  params: {}
});

export const useRouter = () => useContext(RouterContext);

function getNormalizedPath(): string {
  const hash = window.location.hash;
  if (hash) {
    const cleanHash = hash.replace(/^#/, '');
    if (cleanHash.startsWith('/')) {
      return cleanHash;
    }
    if (cleanHash.length > 0) {
      return `/#${cleanHash}`;
    }
  }

  const pathname = window.location.pathname;
  return pathname || '/';
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(getNormalizedPath());

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(getNormalizedPath());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (to: string) => {
    if (to.startsWith('#')) {
      window.location.hash = to;
      const el = document.querySelector(to);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    window.location.hash = `#${to}`;
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const params: Record<string, string> = {};

  return (
    <RouterContext.Provider value={{ path: currentPath, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Link: React.FC<{
  to: string;
  className?: string;
  children: React.ReactNode;
  title?: string;
  onClick?: () => void;
}> = ({ to, className = '', children, title, onClick }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    navigate(to);
  };

  return (
    <a href={`#${to}`} onClick={handleClick} className={className} title={title}>
      {children}
    </a>
  );
};
