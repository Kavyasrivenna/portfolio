import React, { useState } from 'react';
import Navbar from './components/navbar';
import StoryNavigation from './components/StoryNavigation';
import Home from './components/home';
import About from './components/about';
import Skills from './components/skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Certification from './components/Certification';
import Projects from './components/Projects';
import Contact from './components/contact';
import Footer from './components/footer';
import StoryCard from './components/storycard';
import SearchBar from './components/SearchBar';
import PortfolioGrid from './components/PortfolioGrid';
import ReelsViewer from './components/ReelsViewer';
import Profile from './components/profile'; // ✅ Import Profile

function App() {
  const [showStory, setShowStory] = useState(false);
  const [activePage, setActivePage] = useState('main'); // main | search | reels | profile

  const closeStory = () => setShowStory(false);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff' }}>
      {/* Navbar only on main page */}
      {activePage === 'main' && <Navbar />}

      {/* Story Navigation only on main page */}
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

      {/* Route-based content */}
      {activePage === 'search' ? (
        <>
          <SearchBar />
          <PortfolioGrid />
        </>
      ) : activePage === 'reels' ? (
        <ReelsViewer />
      ) : activePage === 'profile' ? (
        <Profile /> // ✅ Renders your Instagram-style profile UI
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

      {/* Footer always visible */}
      <Footer
        onNavigate={(page) => {
          setActivePage(page);
          setShowStory(false); // Hide story viewer if open
        }}
      />
    </div>
  );
}

// Styles for story overlay
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
