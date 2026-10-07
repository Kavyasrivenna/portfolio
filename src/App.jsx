import React, { useState, useEffect } from 'react';

// Layout components
import Navbar from './components/navbar';
import Footer from './components/footer';

// Story components & data
import StoryNavigation from './components/StoryNavigation';
import StoryCard from './components/storycard';
import { storiesData } from './data/storiesData';

// Main sections
import Home from './components/home';
import About from './components/about';
import Skills from './components/skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Certification from './components/Certification';
import Projects from './components/Projects';
import Contact from './components/Contact';

// Search & reels
import SearchGrid from './components/SearchGrid';
import ReelsViewer from './components/ReelsViewer';

// Profile & quick actions
import Profile from './components/Profile';
import QuickActionModal from './components/QuickActionModal';

function App() {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [activePage, setActivePage] = useState('main'); 
  // main | search | reels | profile

  // Navigate to any section smoothly on the main page
  const handleNavigateToSection = (sectionId) => {
    setActivePage('main');
    setSelectedStoryIndex(null);
    setIsQuickActionOpen(false);

    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  // Lock body scroll when Story, Reels or Quick Action is open
  useEffect(() => {
    if (selectedStoryIndex !== null || isQuickActionOpen || activePage === 'reels') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedStoryIndex, isQuickActionOpen, activePage]);

  // Global Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedStoryIndex !== null) setSelectedStoryIndex(null);
        if (isQuickActionOpen) setIsQuickActionOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStoryIndex, isQuickActionOpen]);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', position: 'relative' }}>

      {/* Navbar only on main page */}
      {activePage === 'main' && (
        <Navbar onLogoClick={() => handleNavigateToSection('home')} />
      )}

      {/* Story Navigation on main page */}
      {activePage === 'main' && (
        <StoryNavigation
          onStoryClick={(story, index) => setSelectedStoryIndex(index)}
        />
      )}

      {/* Dynamic Data-Driven Story Viewer */}
      {selectedStoryIndex !== null && (
        <StoryCard
          stories={storiesData}
          currentIndex={selectedStoryIndex}
          onClose={() => setSelectedStoryIndex(null)}
          onIndexChange={(newIdx) => setSelectedStoryIndex(newIdx)}
          onNavigateToSection={handleNavigateToSection}
        />
      )}

      {/* Quick Action (+) Modal */}
      <QuickActionModal
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Page Content */}
      <main style={{ paddingBottom: activePage === 'reels' ? 0 : '4.5rem' }}>
        {activePage === 'search' ? (
          <SearchGrid
            onNavigateToSection={handleNavigateToSection}
            onBack={() => setActivePage('main')}
          />
        ) : activePage === 'reels' ? (
          <ReelsViewer onClose={() => setActivePage('main')} />
        ) : activePage === 'profile' ? (
          <Profile />
        ) : (
          <>
            <Home />
            <About />
            <Skills />
            <Education />
            <Experience />
            <Certification />
            <Projects />
            <Contact />
          </>
        )}
      </main>

      {/* Footer Navigation Bar */}
      <Footer
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page);
          setSelectedStoryIndex(null);
          setIsQuickActionOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuickAction={() => setIsQuickActionOpen(true)}
      />
    </div>
  );
}

export default App;
