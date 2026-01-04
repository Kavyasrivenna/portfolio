import React, { useState } from 'react';

// Layout components
import Navbar from './components/navbar';
import Footer from './components/footer';

// Story / navigation
import StoryNavigation from './components/StoryNavigation';
import StoryCard from './components/storycard';

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
import SearchBar from './components/SearchBar';
import SearchGrid from './components/SearchGrid';
import ReelsViewer from './components/ReelsViewer';

// Profile
import Profile from './components/Profile';

function App() {
  const [showStory, setShowStory] = useState(false);
  const [activePage, setActivePage] = useState('main'); 
  // main | search | reels | profile

  const closeStory = () => setShowStory(false);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>

      {/* Navbar only on main page */}
      {activePage === 'main' && <Navbar />}

      {/* Story Navigation */}
      {activePage === 'main' && (
        <StoryNavigation onStoryClick={() => setShowStory(true)} />
      )}

      {/* Story Modal */}
      {showStory && (
        <div style={overlayStyle} onClick={closeStory}>
          <div
            style={storyContainerStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeStory} style={closeButtonStyle}>✕</button>
            <StoryCard />
          </div>
        </div>
      )}

      {/* Page Content */}
      {activePage === 'search' ? (
        <>
          <SearchBar />
          <SearchGrid />
        </>
      ) : activePage === 'reels' ? (
        <ReelsViewer />
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

      {/* Footer */}
      <Footer
        onNavigate={(page) => {
          setActivePage(page);
          setShowStory(false);
        }}
      />
    </div>
  );
}

/* ---------- Styles ---------- */

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.95)',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const storyContainerStyle = {
  position: 'relative',
  width: '100%',
  maxWidth: '500px',
  padding: '1rem',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  fontSize: '1.5rem',
  background: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  cursor: 'pointer',
  zIndex: 10000,
};

export default App;
