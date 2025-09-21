import React, { useState } from 'react';
import { ChevronRight, Plus, ChevronsUpDown, File, Download, Hash, Trash2, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';
import clsx from 'clsx';

const Sidebar: React.FC = () => {
  const { 
    workspace, pages, selectedPageId, isSidebarCollapsed,
    addPage, selectPage, togglePageExpansion, toggleSidebar
  } = useApp();
  
  const getChildPages = (parentId: string | null): Page[] => pages.filter(page => page.parentId === parentId);
  const hasChildren = (pageId: string): boolean => pages.some(page => page.parentId === pageId);

  const renderPage = (page: Page, level: number = 0) => {
    const isSelected = selectedPageId === page.id;

    return (
      <div key={page.id} className="select-none text-sm">
        <div
          className={clsx(
            'flex items-center pr-2 rounded cursor-pointer group transition-colors',
            isSelected ? 'bg-gray-200/60' : 'hover:bg-gray-200/40'
          )}
          style={{ paddingLeft: `${level * 16 + 4}px` }}
          onClick={() => selectPage(page.id)}
        >
          <div className={clsx("absolute left-0 h-full w-0.5 bg-app-text", isSelected ? "block" : "hidden")}></div>
          <div className="flex items-center flex-1 min-w-0 py-1.5">
            {hasChildren(page.id) ? (
              <button
                className="p-0.5 rounded hover:bg-gray-300/50 mr-0.5 flex-shrink-0"
                onClick={(e) => { e.stopPropagation(); togglePageExpansion(page.id); }}
              >
                <ChevronRight size={14} className={clsx("transition-transform", page.isExpanded && "rotate-90")} />
              </button>
            ) : <div className="w-[22px] flex-shrink-0" />}
            
            <span className="mr-2 text-base flex-shrink-0">{page.icon || <File size={16} />}</span>
            
            <span className="truncate font-medium text-app-text">{page.title}</span>
          </div>
          
          <button onClick={(e) => { e.stopPropagation(); addPage(page.id); }} title="Añadir sub-página" className="p-1 rounded hover:bg-gray-300/50 opacity-0 group-hover:opacity-100"><Plus size={14} /></button>
        </div>
        
        {page.isExpanded && getChildPages(page.id).map(child => renderPage(child, level + 1))}
      </div>
    );
  };

  const rootPages = getChildPages(null);

  const quickActions = [
    { icon: <Settings size={16} />, label: 'Templates' },
    { icon: <Download size={16} />, label: 'Import' },
    { icon: <Hash size={16} />, label: 'Updates' },
    { icon: <Trash2 size={16} />, label: 'Trash' },
  ];

  return (
    <>
      <div className={clsx("fixed inset-0 z-20 bg-black bg-opacity-30 md:hidden", isSidebarCollapsed ? 'hidden' : '')} onClick={toggleSidebar}></div>
      <aside className={clsx(
        "bg-sidebar-bg flex flex-col z-30 transition-all duration-300 ease-in-out",
        "absolute h-full md:relative",
        isSidebarCollapsed ? "w-0 -translate-x-full md:w-[72px] md:translate-x-0" : "w-64",
      )}>
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
          {/* Workspace */}
          <div className="p-2">
            <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-200/70 cursor-pointer">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-6 h-6 bg-gray-700 rounded-sm flex items-center justify-center font-bold text-white text-sm flex-shrink-0">{workspace.icon}</div>
                <span className="font-semibold text-app-text truncate">{workspace.name}</span>
              </div>
              <ChevronsUpDown size={14} className="text-app-text-secondary flex-shrink-0" />
            </div>
          </div>

          <div className="px-2 mt-2 flex-1">
            {/* Workspace Pages */}
            <div className="mb-4">
              <div className="px-2 text-xs font-semibold text-app-text-secondary mb-1">WORKSPACE</div>
              <div className="space-y-0.5">{rootPages.map(page => renderPage(page))}</div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="px-2 text-xs font-semibold text-app-text-secondary mb-1">QUICK ACTIONS</div>
              <div className="space-y-0.5">
                {quickActions.map(action => (
                  <div key={action.label} className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-200/40 text-sm font-medium text-app-text">
                    <span className="mr-2 text-app-text-secondary">{action.icon}</span>
                    <span className="truncate">{action.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Page Button */}
        <div className="p-2">
          <button onClick={() => addPage()} className="w-full flex items-center p-2 text-sm text-app-text font-medium hover:bg-gray-200/40 rounded-md">
            <Plus size={16} className="mr-2" />
            <span>Add Page</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
