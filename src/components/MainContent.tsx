import React from 'react';
import { useApp } from '../context/AppContext';
import BlockEditor from './BlockEditor';
import { Menu, Star, MoreHorizontal, MessageSquare, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const MainContent: React.FC = () => {
  const { pages, selectedPageId, toggleSidebar } = useApp();

  const selectedPage = pages.find(page => page.id === selectedPageId);

  const Tag: React.FC<{ tag: { label: string; color: string } }> = ({ tag }) => {
    const colors: { [key: string]: string } = {
      orange: 'bg-orange-100 text-orange-700',
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
    };
    return (
      <span className={`text-sm px-2 py-0.5 rounded-full ${colors[tag.color] || 'bg-gray-100 text-gray-700'}`}>
        {tag.label}
      </span>
    );
  };

  const renderContent = () => {
    if (!selectedPage) {
      return (
        <div className="flex-1 flex items-center justify-center h-full">
          <div className="text-center text-app-text-secondary">
            <p className="text-lg mb-2">Ninguna página seleccionada</p>
            <p className="text-sm">Selecciona una página de la barra lateral para empezar</p>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="px-12 pt-8">
          {selectedPage.icon && <div className="text-6xl mb-4">{selectedPage.icon}</div>}
          <h1 className="text-5xl font-bold text-app-text mb-2 break-words">
            {selectedPage.title}
          </h1>
          {selectedPage.tags && (
            <div className="flex items-center gap-2 mt-4">
              {selectedPage.tags.map(tag => <Tag key={tag.label} tag={tag} />)}
            </div>
          )}
        </div>
        <div className="px-12 py-6 max-w-4xl w-full mx-auto">
          <BlockEditor key={selectedPage.id} pageId={selectedPage.id} />
        </div>
      </>
    );
  };

  return (
    <div className="flex-1 bg-app-bg flex flex-col min-w-0">
      {/* Header */}
      <header className="flex-shrink-0 h-[52px] px-4 flex items-center justify-between border-b border-app-border">
        <div className="flex items-center gap-2">
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100 text-app-text-secondary md:hidden" aria-label="Abrir menú">
            <Menu size={20} />
          </button>
          {selectedPage && (
            <div className="flex items-center gap-1 text-sm font-medium text-app-text">
              <span>{selectedPage.icon}</span>
              <span>{selectedPage.title}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="text-sm font-medium text-app-text-secondary px-3 py-1 rounded hover:bg-gray-100">Share</button>
          <button className="p-1.5 rounded hover:bg-gray-100 text-app-text-secondary"><MessageSquare size={18} /></button>
          <button className="p-1.5 rounded hover:bg-gray-100 text-app-text-secondary"><Star size={18} /></button>
          <button className="p-1.5 rounded hover:bg-gray-100 text-app-text-secondary"><MoreHorizontal size={18} /></button>
        </div>
      </header>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>

      {/* Footer Toolbar */}
      <footer className="h-12 border-t border-app-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded hover:bg-gray-100 text-app-text-secondary"><ChevronLeft size={18} /></button>
          <button className="p-1.5 rounded hover:bg-gray-100 text-app-text-secondary"><ChevronRight size={18} /></button>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-sm text-app-text-secondary">View Tasks</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded hover:bg-gray-100 text-app-text-secondary"><Users size={18} /></button>
          <button className="p-1.5 rounded hover:bg-gray-100 text-app-text-secondary"><Settings size={18} /></button>
        </div>
      </footer>
    </div>
  );
};

export default MainContent;
