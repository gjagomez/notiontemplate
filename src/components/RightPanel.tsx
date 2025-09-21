import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import clsx from 'clsx';

const RightPanel: React.FC = () => {
  const { isRightPanelVisible } = useApp();

  return (
    <aside className={clsx(
      "bg-app-bg border-l border-app-border flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out",
      isRightPanelVisible ? "w-[300px]" : "w-0"
    )}>
      <div className="p-4 border-b border-app-border flex items-center justify-between overflow-hidden">
        <h2 className="font-semibold text-app-text whitespace-nowrap">Snaps</h2>
        <div className="flex items-center text-app-text-secondary">
          <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={16} /></button>
          <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md border border-app-border p-3">
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-app-text">George D.</p>
                <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
            </div>
            <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center border">
                <img src="https://img-wrapper.vercel.app/image?url=https://placehold.co/300x150/F0F3F8/CCC?text=Preview" alt="Preview" className="rounded-md" />
            </div>
        </div>
        <button className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-center text-sm text-gray-500 hover:border-gray-400">
          <Plus className="mx-auto mb-1" size={16} />
          Add Snap
        </button>
      </div>
      <div className="p-4 border-t border-app-border">
        <button className="w-full bg-gray-100 text-app-text text-sm font-medium py-2 rounded-md hover:bg-gray-200">
          Customize Panel
        </button>
      </div>
    </aside>
  );
};

export default RightPanel;
