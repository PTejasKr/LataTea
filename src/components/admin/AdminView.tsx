import React, { useState } from 'react';
import { AdminLayout, AdminTab } from './AdminLayout';
import { DashboardView } from './DashboardView';
import { StoryManagerView } from './StoryManagerView';
import { CraftManagerView } from './CraftManagerView';
import { TeaStoriesManagerView } from './TeaStoriesManagerView';
import { CategoriesManagerView } from './CategoriesManagerView';
import { ProcessStepsManagerView } from './ProcessStepsManagerView';
import { LanguagesManagerView } from './LanguagesManagerView';
import { NavManagerView } from './NavManagerView';
import { DomainManagerView } from './DomainManagerView';
import { ImagePositionEditorView } from './ImagePositionEditorView';
import { MediaLibraryView } from './MediaLibraryView';
import { SectionManagerView } from './SectionManagerView';
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
        {activeTab === 'story' && <StoryManagerView />}
        {activeTab === 'craft' && <CraftManagerView />}
        {activeTab === 'tea-stories' && <TeaStoriesManagerView />}
        {activeTab === 'categories' && <CategoriesManagerView />}
        {activeTab === 'process-steps' && <ProcessStepsManagerView />}
        {activeTab === 'languages' && <LanguagesManagerView />}
        {activeTab === 'navigation' && <NavManagerView />}
        {activeTab === 'domains' && <DomainManagerView />}
        {activeTab === 'image-position' && <ImagePositionEditorView />}
        {activeTab === 'media-library' && <MediaLibraryView />}
        {activeTab === 'sections' && <SectionManagerView />}
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

export default AdminView;
