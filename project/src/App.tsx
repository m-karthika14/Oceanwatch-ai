import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { HowToUsePage } from './components/HowToUsePage';
import { ModeSelectionScreen } from './components/ModeSelectionScreen';
import { LiveDashboardNew } from './components/LiveDashboardNew';
import { OceanBackground } from './components/OceanBackground';

type AppView = 'home' | 'howto' | 'mode' | 'dashboard';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedMode, setSelectedMode] = useState<'upload' | 'live'>('upload');

  const handleStartMonitoring = () => {
    setCurrentView('mode');
  };

  const handleModeSelection = (mode: 'upload' | 'live') => {
    setSelectedMode(mode);
    setCurrentView('dashboard');
  };

  const handleBack = () => {
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: 'transparent', position: 'relative', zIndex: 0 }}>
      {/* Global animated ocean background – visible on every page */}
      <OceanBackground />
      {currentView === 'home' && (
        <HomePage
          onStartMonitoring={handleStartMonitoring}
          onHowToUse={() => setCurrentView('howto')}
        />
      )}

      {currentView === 'howto' && <HowToUsePage onBack={handleBack} />}

      {currentView === 'mode' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-slide-up">
            <ModeSelectionScreen onSelectMode={handleModeSelection} />
          </div>
        </div>
      )}

      {currentView === 'dashboard' && (
        <div className="animate-slide-up">
          <LiveDashboardNew mode={selectedMode} />
        </div>
      )}
    </div>
  );
}

export default App;
