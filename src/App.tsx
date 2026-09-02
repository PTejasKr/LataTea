import React, { Suspense, lazy } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { RouterProvider } from './router/Router';
import { PublicWebsite } from './components/public/PublicWebsite';

// Dynamic import for Admin/CMS — keeps initial public payload ultra-lean for <100 KB/s connections
const AdminView = lazy(() => import('./components/admin/AdminView'));

const AppContent: React.FC = () => {
  const { activeView } = useCMS();

  return (
    <>
      {activeView === 'admin' ? (
        <Suspense
          fallback={
            <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center text-amber-400 font-mono text-xs gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
              <span>Loading LataTea Editorial CMS...</span>
            </div>
          }
        >
          <AdminView />
        </Suspense>
      ) : (
        <PublicWebsite />
      )}
    </>
  );
};

export function App() {
  return (
    <RouterProvider>
      <CMSProvider>
        <AppContent />
      </CMSProvider>
    </RouterProvider>
  );
}

export default App;
