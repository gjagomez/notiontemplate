import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Page, Workspace, Block } from '../types';

interface AppContextType {
  workspace: Workspace;
  pages: Page[];
  blocks: Block[];
  selectedPageId: string | null;
  isSidebarCollapsed: boolean;
  isRightPanelVisible: boolean;
  updateWorkspaceName: (name: string) => void;
  updatePageTitle: (pageId: string, title: string) => void;
  updatePageIcon: (pageId: string, icon: string) => void;
  addPage: (parentId?: string) => void;
  deletePage: (pageId: string) => void;
  selectPage: (pageId: string | null) => void;
  togglePageExpansion: (pageId: string) => void;
  toggleSidebar: () => void;
  toggleRightPanel: () => void;
  getPageBlocks: (pageId: string) => Block[];
  getChildBlocks: (parentBlockId: string) => Block[];
  addBlock: (pageId: string, afterBlockId?: string, parentBlockId?: string) => Block;
  updateBlock: (blockId: string, updates: Partial<Block>) => void;
  deleteBlock: (blockId: string) => void;
  toggleBlockExpansion: (blockId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialWorkspace: Workspace = { id: 'workspace-1', name: 'Buunto', icon: 'N' };

const initialPages: Page[] = [
  { id: 'page-1', title: 'Acme Inc.', parentId: null, createdAt: new Date('2025-01-01'), isExpanded: true, icon: '🎯', tags: [{label: '#morning', color: 'orange'}, {label: '#ideas', color: 'blue'}, {label: '#to-dos', color: 'green'}] },
  { id: 'page-2', title: 'Tasks', parentId: null, createdAt: new Date('2025-01-02'), isExpanded: true, icon: '😊' },
  { id: 'page-3', title: 'Deadlines', parentId: null, createdAt: new Date('2025-01-03'), isExpanded: false, icon: '🔔' },
  { id: 'page-4', title: 'Music', parentId: null, createdAt: new Date('2025-01-04'), isExpanded: false, icon: '🎵' },
  { id: 'page-5', title: 'Questions', parentId: null, createdAt: new Date('2025-01-05'), isExpanded: false, icon: '❓' }
];

const initialBlocks: Block[] = [
  { id: 'block-1', type: 'heading', content: 'Quick Notes', pageId: 'page-1' },
  { id: 'block-2', type: 'text', content: 'We are a company that inspires new ways to discover new movies by combining open-source software with ease of use. Our main product is a device that you can use on the go and implements our cloud technology. Our target audience are seniors. We want to convey a sense of victory, while at the same time being calm.', pageId: 'page-1' },
  { id: 'block-3', type: 'todo', content: 'Setting up research meeting', checked: false, pageId: 'page-1' },
  { id: 'block-4', type: 'todo', content: 'Make the logo bigger', checked: false, pageId: 'page-1' },
  { id: 'block-5', type: 'todo', content: 'Check to-do\'s', checked: true, pageId: 'page-1' },
  { id: 'block-6', type: 'todo', content: 'Get feedback on website design', checked: false, pageId: 'page-1' },
  { id: 'block-7', type: 'brief', content: 'Brief', pageId: 'page-1' },
  { id: 'block-8', type: 'text', content: 'You must create a website that will mainly sell the company\'s products. The goal is to make a landingpage that maximizes conversions. Besides the landing page, the website will need a information page, shop page and a privacy policy page.', pageId: 'page-1' },
];

const generateUniqueId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workspace, setWorkspace] = useState<Workspace>(initialWorkspace);
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [selectedPageId, setSelectedPageId] = useState<string | null>('page-1');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isRightPanelVisible, setRightPanelVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarCollapsed(true);
      if (window.innerWidth < 1280) setRightPanelVisible(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev);
  const toggleRightPanel = () => setRightPanelVisible(prev => !prev);

  const updateWorkspaceName = (name: string) => setWorkspace(prev => ({ ...prev, name }));
  const updatePageTitle = (pageId: string, title: string) => setPages(prev => prev.map(p => p.id === pageId ? { ...p, title } : p));
  const updatePageIcon = (pageId: string, icon: string) => setPages(prev => prev.map(p => p.id === pageId ? { ...p, icon } : p));

  const addPage = (parentId?: string) => {
    const newPage: Page = {
      id: generateUniqueId('page'),
      title: 'Sin Título',
      parentId: parentId || null,
      createdAt: new Date(),
      isExpanded: true,
      icon: '📄'
    };
    setPages(prev => {
      let updated = [...prev, newPage];
      if (parentId) {
        updated = updated.map(p => p.id === parentId ? { ...p, isExpanded: true } : p);
      }
      return updated;
    });
    setBlocks(prev => [...prev, { id: generateUniqueId('block'), type: 'text', content: '', pageId: newPage.id }]);
    selectPage(newPage.id);
  };

  const deletePage = (pageId: string) => {
    const idsToDelete: string[] = [pageId];
    const findDescendants = (pId: string) => {
      pages.filter(p => p.parentId === pId).forEach(child => {
        idsToDelete.push(child.id);
        findDescendants(child.id);
      });
    };
    findDescendants(pageId);
    const remainingPages = pages.filter(p => !idsToDelete.includes(p.id));
    setPages(remainingPages);
    setBlocks(prev => prev.filter(b => !idsToDelete.includes(b.pageId)));
    if (selectedPageId && idsToDelete.includes(selectedPageId)) {
      selectPage(remainingPages.length > 0 ? remainingPages[0].id : null);
    }
  };

  const selectPage = (pageId: string | null) => {
    setSelectedPageId(pageId);
    if (window.innerWidth < 768) {
      setIsSidebarCollapsed(true);
    }
  };

  const togglePageExpansion = (pageId: string) => setPages(prev => prev.map(p => p.id === pageId ? { ...p, isExpanded: !p.isExpanded } : p));

  const getPageBlocks = (pageId: string): Block[] => blocks.filter(b => b.pageId === pageId && !b.parentBlockId).sort((a, b) => blocks.indexOf(a) - blocks.indexOf(b));
  const getChildBlocks = (parentBlockId: string): Block[] => blocks.filter(b => b.parentBlockId === parentBlockId).sort((a, b) => blocks.indexOf(a) - blocks.indexOf(b));

  const addBlock = (pageId: string, afterBlockId?: string, parentBlockId?: string): Block => {
    const newBlock: Block = { id: generateUniqueId('block'), type: 'text', content: '', pageId, ...(parentBlockId && { parentBlockId }) };
    setBlocks(prev => {
      let newBlocks = [...prev];
      if (afterBlockId) {
        const index = newBlocks.findIndex(b => b.id === afterBlockId) + 1;
        newBlocks.splice(index, 0, newBlock);
      } else {
        newBlocks.push(newBlock);
      }
      if (parentBlockId) {
        newBlocks = newBlocks.map(b => b.id === parentBlockId ? { ...b, children: [...(b.children || []), newBlock.id] } : b);
      }
      return newBlocks;
    });
    return newBlock;
  };

  const updateBlock = (blockId: string, updates: Partial<Block>) => setBlocks(prev => prev.map(b => b.id === blockId ? { ...b, ...updates } : b));

  const deleteBlock = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    let idsToDelete = [blockId];
    if (block?.type === 'toggle' && block.children) {
      idsToDelete = [...idsToDelete, ...block.children];
    }
    setBlocks(prev => prev.filter(b => !idsToDelete.includes(b.id)));
    if (block?.parentBlockId) {
      setBlocks(prev => prev.map(p => p.id === block.parentBlockId ? { ...p, children: p.children?.filter(cId => cId !== blockId) } : p));
    }
  };

  const toggleBlockExpansion = (blockId: string) => setBlocks(prev => prev.map(b => b.id === blockId ? { ...b, isExpanded: !b.isExpanded } : b));

  const value = {
    workspace, pages, blocks, selectedPageId, isSidebarCollapsed, isRightPanelVisible,
    updateWorkspaceName, updatePageTitle, updatePageIcon, addPage, deletePage, selectPage, togglePageExpansion,
    toggleSidebar, toggleRightPanel, getPageBlocks, getChildBlocks, addBlock, updateBlock, deleteBlock, toggleBlockExpansion
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useApp must be used within an AppProvider');
  return context;
};
