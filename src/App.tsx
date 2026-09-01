import React from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
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
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  );
}

export default App;
