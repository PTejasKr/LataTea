import React from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { RouterProvider } from './router/Router';
import { PublicWebsite } from './components/public/PublicWebsite';
import { AdminView } from './components/admin/AdminView';

const AppContent: React.FC = () => {
  const { activeView } = useCMS();

  return (
    <>
      {activeView === 'admin' ? <AdminView /> : <PublicWebsite />}
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
