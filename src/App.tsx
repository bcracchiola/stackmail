import React from 'react';
import { Mail, PenSquare } from 'lucide-react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import EmailStack from './components/EmailStack';
import EmailSidebar from './components/EmailSidebar';
import EmailView from './components/EmailView';
import ComposeEmail from './components/ComposeEmail';
import SettingsMenu from './components/SettingsMenu';
import { useEmailStore } from './store/emailStore';

function App() {
  const { 
    selectedProvider,
    folders,
    updateFolderOrder,
    toggleCompose
  } = useEmailStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = folders.findIndex((f) => f.id.toString() === active.id);
      const newIndex = folders.findIndex((f) => f.id.toString() === over.id);
      
      const newFolders = arrayMove(folders, oldIndex, newIndex).map((folder, index) => ({
        ...folder,
        order: index
      }));
      
      updateFolderOrder(newFolders);
    }
  };

  const visibleFolders = folders
    .filter(folder => folder.visible)
    .sort((a, b) => {
      if (a.name === 'Inbox') return -1;
      if (b.name === 'Inbox') return 1;
      if (a.name === 'To Do') return -1;
      if (b.name === 'To Do') return 1;
      return a.order - b.order;
    })
    .slice(0, 12);

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="h-6 w-6 text-[#ff6b35]" />
            <h1 className="text-xl font-light tracking-wide text-gray-800">Stack Mail</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleCompose}
              className="flex items-center space-x-2 px-4 py-2 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff8255]"
            >
              <PenSquare className="h-4 w-4" />
              <span>Compose</span>
            </button>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value as 'gmail' | 'outlook')}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-light focus:border-[#ff6b35] focus:outline-none"
            >
              <option value="gmail">Gmail</option>
              <option value="outlook">Outlook</option>
            </select>
            <SettingsMenu />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-light text-gray-800">Your Email Stacks</h2>
          <p className="text-sm text-gray-500">Connected to {selectedProvider}</p>
        </div>
        
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={visibleFolders.map(f => f.id.toString())} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleFolders.map((folder) => (
                <EmailStack key={folder.id} folder={folder} />
              ))}
            </div>
          </SortableContext></DndContext>
      </main>

      <EmailSidebar />
      <EmailView />
      <ComposeEmail />
    </div>
  );
}

export default App;