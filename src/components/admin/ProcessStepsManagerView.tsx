import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Plus, Trash2, ArrowUp, ArrowDown, Video, ChefHat, Truck } from 'lucide-react';
import { ProcessStepItem, RecipeMethodItem, HelpfulVideoItem } from '../../types/cms';

export const ProcessStepsManagerView: React.FC = () => {
  const { draftState, updateDraft } = useCMS();
  const steps = draftState.processSteps || [];
  const recipes = draftState.recipes || [];
  const videos = draftState.helpfulVideos || [];

  // --- Process Steps ---
  const handleUpdateSteps = (updatedSteps: ProcessStepItem[]) => {
    updateDraft(prev => ({ ...prev, processSteps: updatedSteps }));
  };

  const handleChangeStep = (id: number, field: keyof ProcessStepItem, value: string) => {
    const newSteps = steps.map(s => s.id === id ? { ...s, [field]: value } : s);
    handleUpdateSteps(newSteps);
  };

  const handleAddStep = () => {
    const maxId = steps.length > 0 ? Math.max(...steps.map(s => s.id)) : 0;
    const newStep: ProcessStepItem = {
      id: maxId + 1,
      titleEn: 'New Step',
      titleMr: 'नवीन पायरी',
      descEn: 'Description here',
      descMr: 'वर्णन येथे'
    };
    handleUpdateSteps([...steps, newStep]);
  };

  const handleRemoveStep = (id: number) => {
    handleUpdateSteps(steps.filter(s => s.id !== id));
  };

  const handleMoveStep = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === steps.length - 1) return;
    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
    handleUpdateSteps(newSteps);
  };

  // --- Recipes ---
  const handleUpdateRecipes = (updatedRecipes: RecipeMethodItem[]) => {
    updateDraft(prev => ({ ...prev, recipes: updatedRecipes }));
  };

  const handleAddRecipe = () => {
    const maxOrder = recipes.length > 0 ? Math.max(...recipes.map(r => r.displayOrder)) : 0;
    const newRecipe: RecipeMethodItem = {
      id: 'r' + Date.now(),
      titleEn: 'New Recipe',
      titleMr: 'नवीन रेसिपी',
      instructionsEn: 'Step 1...',
      instructionsMr: 'पायरी १...',
      displayOrder: maxOrder + 1,
      isVisible: true
    };
    handleUpdateRecipes([...recipes, newRecipe]);
  };

  const handleChangeRecipe = (id: string, field: keyof RecipeMethodItem, value: any) => {
    const newRecipes = recipes.map(r => r.id === id ? { ...r, [field]: value } : r);
    handleUpdateRecipes(newRecipes);
  };

  const handleRemoveRecipe = (id: string) => {
    handleUpdateRecipes(recipes.filter(r => r.id !== id));
  };

  const handleMoveRecipe = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === recipes.length - 1) return;
    const newRecipes = [...recipes];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    // swap displayOrder
    const tempOrder = newRecipes[index].displayOrder;
    newRecipes[index].displayOrder = newRecipes[targetIndex].displayOrder;
    newRecipes[targetIndex].displayOrder = tempOrder;
    [newRecipes[index], newRecipes[targetIndex]] = [newRecipes[targetIndex], newRecipes[index]];
    handleUpdateRecipes(newRecipes);
  };

  // --- Videos ---
  const handleUpdateVideos = (updatedVideos: HelpfulVideoItem[]) => {
    updateDraft(prev => ({ ...prev, helpfulVideos: updatedVideos }));
  };

  const handleAddVideo = () => {
    const maxOrder = videos.length > 0 ? Math.max(...videos.map(v => v.displayOrder)) : 0;
    const newVideo: HelpfulVideoItem = {
      id: 'v' + Date.now(),
      instagramUrl: 'https://instagram.com/...',
      titleEn: 'New Video',
      titleMr: 'नवीन व्हिडिओ',
      descriptionEn: 'Video description',
      descriptionMr: 'व्हिडिओ वर्णन',
      thumbnailUrl: '',
      displayOrder: maxOrder + 1,
      isVisible: true
    };
    handleUpdateVideos([...videos, newVideo]);
  };

  const handleChangeVideo = (id: string, field: keyof HelpfulVideoItem, value: any) => {
    const newVideos = videos.map(v => v.id === id ? { ...v, [field]: value } : v);
    handleUpdateVideos(newVideos);
  };

  const handleRemoveVideo = (id: string) => {
    handleUpdateVideos(videos.filter(v => v.id !== id));
  };

  const handleMoveVideo = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === videos.length - 1) return;
    const newVideos = [...videos];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    // swap displayOrder
    const tempOrder = newVideos[index].displayOrder;
    newVideos[index].displayOrder = newVideos[targetIndex].displayOrder;
    newVideos[targetIndex].displayOrder = tempOrder;
    [newVideos[index], newVideos[targetIndex]] = [newVideos[targetIndex], newVideos[index]];
    handleUpdateVideos(newVideos);
  };


  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-20">
      
      {/* --- RECIPES SECTION --- */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-4">
          <div className="flex items-center gap-3">
            <ChefHat className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-cms-card font-bold text-white font-rajwada">Recipe Methods</h2>
              <p className="text-cms-body text-neutral-400 mt-1">Manage preparation methods shown on the Process page.</p>
            </div>
          </div>
          <button onClick={handleAddRecipe} className="px-4 py-2 bg-white text-black rounded-sm font-bold text-cms-body flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Recipe
          </button>
        </div>

        <div className="space-y-4">
          {recipes.map((recipe, index) => (
            <div key={recipe.id} className="p-4 sm:p-6 rounded-sm bg-[#111111] border border-[#222] space-y-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-4">
                  <div className="text-cms-body font-bold text-white">Recipe {index + 1}</div>
                  <label className="flex items-center gap-2 text-neutral-300 text-cms-small cursor-pointer">
                    <input type="checkbox" checked={recipe.isVisible} onChange={e => handleChangeRecipe(recipe.id, 'isVisible', e.target.checked)} className="rounded border-[#333] text-white bg-[#0a0a0a] focus:ring-white focus:ring-offset-slate-900" />
                    Visible on site
                  </label>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleMoveRecipe(index, 'up')} disabled={index === 0} className="p-1 text-neutral-400 hover:text-white disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                  <button onClick={() => handleMoveRecipe(index, 'down')} disabled={index === recipes.length - 1} className="p-1 text-neutral-400 hover:text-white disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                  <button onClick={() => handleRemoveRecipe(recipe.id)} className="p-1 text-neutral-400 hover:text-white hover:text-white ml-2"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-cms-small font-bold text-neutral-400 mb-1">Title (EN)</label>
                  <input type="text" value={recipe.titleEn} onChange={e => handleChangeRecipe(recipe.id, 'titleEn', e.target.value)} className="w-full bg-[#0a0a0a] border border-[#222] rounded-sm px-3 py-2 text-cms-body text-white min-h-[48px]" />
                </div>
                <div>
                  <label className="block text-cms-small font-bold text-neutral-400 mb-1">Title (MR)</label>
                  <input type="text" value={recipe.titleMr} onChange={e => handleChangeRecipe(recipe.id, 'titleMr', e.target.value)} className="w-full bg-[#0a0a0a] border border-[#222] rounded-sm px-3 py-2 text-cms-body text-white min-h-[48px]" />
                </div>
                <div>
                  <label className="block text-cms-small font-bold text-neutral-400 mb-1">Instructions (EN) - One step per line</label>
                  <textarea value={recipe.instructionsEn} onChange={e => handleChangeRecipe(recipe.id, 'instructionsEn', e.target.value)} rows={4} className="w-full bg-[#0a0a0a] border border-[#222] rounded-sm px-3 py-2 text-cms-body text-white min-h-[48px]" />
                </div>
                <div>
                  <label className="block text-cms-small font-bold text-neutral-400 mb-1">Instructions (MR) - One step per line</label>
                  <textarea value={recipe.instructionsMr} onChange={e => handleChangeRecipe(recipe.id, 'instructionsMr', e.target.value)} rows={4} className="w-full bg-[#0a0a0a] border border-[#222] rounded-sm px-3 py-2 text-cms-body text-white min-h-[48px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* --- VIDEOS SECTION --- */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-4">
          <div className="flex items-center gap-3">
            <Video className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-cms-card font-bold text-white font-rajwada">Helpful Videos</h2>
              <p className="text-cms-body text-neutral-400 mt-1">Manage Instagram video links and previews.</p>
            </div>
          </div>
          <button onClick={handleAddVideo} className="px-4 py-2 bg-white text-black rounded-sm font-bold text-cms-body flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Video
          </button>
        </div>

        <div className="space-y-4">
          {videos.map((video, index) => (
            <div key={video.id} className="p-4 sm:p-6 rounded-sm bg-[#111111] border border-[#222] space-y-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-4">
                  <div className="text-cms-body font-bold text-white">Video {index + 1}</div>
                  <label className="flex items-center gap-2 text-neutral-300 text-cms-small cursor-pointer">
                    <input type="checkbox" checked={video.isVisible} onChange={e => handleChangeVideo(video.id, 'isVisible', e.target.checked)} className="rounded border-[#333] text-white bg-[#0a0a0a] focus:ring-white focus:ring-offset-slate-900" />
                    Visible on site
                  </label>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleMoveVideo(index, 'up')} disabled={index === 0} className="p-1 text-neutral-400 hover:text-white disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                  <button onClick={() => handleMoveVideo(index, 'down')} disabled={index === videos.length - 1} className="p-1 text-neutral-400 hover:text-white disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                  <button onClick={() => handleRemoveVideo(video.id)} className="p-1 text-neutral-400 hover:text-white hover:text-white ml-2"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-cms-small font-bold text-neutral-400 mb-1">Instagram URL</label>
                  <input type="text" value={video.instagramUrl} onChange={e => handleChangeVideo(video.id, 'instagramUrl', e.target.value)} className="w-full bg-[#0a0a0a] border border-[#222] rounded-sm px-3 py-2 text-cms-body text-white min-h-[48px]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-cms-small font-bold text-neutral-400 mb-1">Thumbnail URL (Optional)</label>
                  <input type="text" value={video.thumbnailUrl || ''} onChange={e => handleChangeVideo(video.id, 'thumbnailUrl', e.target.value)} className="w-full bg-[#0a0a0a] border border-[#222] rounded-sm px-3 py-2 text-cms-body text-white min-h-[48px]" placeholder="e.g. /media_royal_bowl.jpg" />
                </div>
                <div>
                  <label className="block text-cms-small font-bold text-neutral-400 mb-1">Title (EN)</label>
                  <input type="text" value={video.titleEn} onChange={e => handleChangeVideo(video.id, 'titleEn', e.target.value)} className="w-full bg-[#0a0a0a] border border-[#222] rounded-sm px-3 py-2 text-cms-body text-white min-h-[48px]" />
                </div>
                <div>
                  <label className="block text-cms-small font-bold text-neutral-400 mb-1">Title (MR)</label>
                  <input type="text" value={video.titleMr} onChange={e => handleChangeVideo(video.id, 'titleMr', e.target.value)} className="w-full bg-[#0a0a0a] border border-[#222] rounded-sm px-3 py-2 text-cms-body text-white min-h-[48px]" />
                </div>
                <div>
                  <label className="block text-cms-small font-bold text-neutral-400 mb-1">Description (EN)</label>
                  <textarea value={video.descriptionEn} onChange={e => handleChangeVideo(video.id, 'descriptionEn', e.target.value)} rows={2} className="w-full bg-[#0a0a0a] border border-[#222] rounded-sm px-3 py-2 text-cms-body text-white min-h-[48px]" />
                </div>
                <div>
                  <label className="block text-cms-small font-bold text-neutral-400 mb-1">Description (MR)</label>
                  <textarea value={video.descriptionMr} onChange={e => handleChangeVideo(video.id, 'descriptionMr', e.target.value)} rows={2} className="w-full bg-[#0a0a0a] border border-[#222] rounded-sm px-3 py-2 text-cms-body text-white min-h-[48px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* --- ORDER PROCESS STEPS --- */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-4">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-cms-card font-bold text-white font-rajwada">Order Process Steps</h2>
              <p className="text-cms-body text-neutral-400 mt-1">Manage the visual steps from Order to Delivery.</p>
            </div>
          </div>
          <button onClick={handleAddStep} className="px-4 py-2 bg-white text-black rounded-sm font-bold text-cms-body flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Step
          </button>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="p-4 sm:p-6 rounded-sm bg-[#111111] border border-[#222] space-y-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-cms-body font-bold text-white">Step {index + 1}</div>
                <div className="flex gap-2">
                  <button onClick={() => handleMoveStep(index, 'up')} disabled={index === 0} className="p-1 text-neutral-400 hover:text-white disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                  <button onClick={() => handleMoveStep(index, 'down')} disabled={index === steps.length - 1} className="p-1 text-neutral-400 hover:text-white disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                  <button onClick={() => handleRemoveStep(step.id)} className="p-1 text-neutral-400 hover:text-white hover:text-white ml-2"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-cms-small font-bold text-neutral-400 mb-1">Title (EN)</label>
                  <input type="text" value={step.titleEn} onChange={e => handleChangeStep(step.id, 'titleEn', e.target.value)} className="w-full bg-[#0a0a0a] border border-[#222] rounded-sm px-3 py-2 text-cms-body text-white min-h-[48px]" />
                </div>
                <div>
                  <label className="block text-cms-small font-bold text-neutral-400 mb-1">Title (MR)</label>
                  <input type="text" value={step.titleMr} onChange={e => handleChangeStep(step.id, 'titleMr', e.target.value)} className="w-full bg-[#0a0a0a] border border-[#222] rounded-sm px-3 py-2 text-cms-body text-white min-h-[48px]" />
                </div>
                <div>
                  <label className="block text-cms-small font-bold text-neutral-400 mb-1">Description (EN)</label>
                  <textarea value={step.descEn} onChange={e => handleChangeStep(step.id, 'descEn', e.target.value)} rows={2} className="w-full bg-[#0a0a0a] border border-[#222] rounded-sm px-3 py-2 text-cms-body text-white min-h-[48px]" />
                </div>
                <div>
                  <label className="block text-cms-small font-bold text-neutral-400 mb-1">Description (MR)</label>
                  <textarea value={step.descMr} onChange={e => handleChangeStep(step.id, 'descMr', e.target.value)} rows={2} className="w-full bg-[#0a0a0a] border border-[#222] rounded-sm px-3 py-2 text-cms-body text-white min-h-[48px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
