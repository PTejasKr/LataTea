import React, { useState } from 'react';
import { AdminLayout, AdminTab } from './AdminLayout';
import { DashboardView } from './DashboardView';
import { TextView } from './TextView';
import { NavManagerView } from './NavManagerView';
import { ProductManagerView } from './ProductManagerView';
import { ImagePositionEditorView } from './ImagePositionEditorView';
import { MediaLibraryView } from './MediaLibraryView';
import { SectionManagerView } from './SectionManagerView';
import { BrandSettingsView } from './BrandSettingsView';
import { ContactManagerView } from './ContactManagerView';
import { SeoManagerView } from './SeoManagerView';
import { PublishModal } from './PublishModal';
import { PreviewModal } from './PreviewModal';
import { CmsLoginView } from './CmsLoginView';
import { useCMS } from '../../context/CMSContext';

export const AdminView: React.FC = () => {
  const { isCmsAuthenticated, showPreviewModal, setShowPreviewModal } = useCMS();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [showPublishModal, setShowPublishModal] = useState(false);

  if (!isCmsAuthenticated) {
    return <CmsLoginView />;
  }

  return (
    <>
      <AdminLayout
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenPublishModal={() => setShowPublishModal(true)}
      >
        {activeTab === 'dashboard' && (
          <DashboardView
            onSelectTab={setActiveTab}
            onOpenPublishModal={() => setShowPublishModal(true)}
          />
        )}
        {activeTab === 'text' && <TextView />}
        {activeTab === 'navigation' && <NavManagerView />}
        {activeTab === 'products' && <ProductManagerView />}
        {activeTab === 'image-position' && <ImagePositionEditorView />}
        {activeTab === 'media-library' && <MediaLibraryView />}
        {activeTab === 'sections' && <SectionManagerView />}
        {activeTab === 'brand' && <BrandSettingsView />}
        {activeTab === 'contact' && <ContactManagerView />}
        {activeTab === 'seo' && <SeoManagerView />}
      </AdminLayout>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        onOpenPublish={() => setShowPublishModal(true)}
      />

      {/* Publish Modal */}
      <PublishModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
      />
    </>
  );
};
