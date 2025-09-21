import React from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="bg-[#EBF0F9] min-h-screen p-0 sm:p-2 md:p-4 flex items-center justify-center">
        <div className="w-full h-full sm:h-auto sm:aspect-[16/10] max-h-[100vh] sm:max-h-[960px] sm:max-w-[1800px] bg-app-bg sm:rounded-lg shadow-lg flex overflow-hidden border border-app-border">
          <Sidebar />
          <MainContent />
          <RightPanel />
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
