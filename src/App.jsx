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

function App() {
  const [showStory, setShowStory] = useState(false);
  const [activePage, setActivePage] = useState('main'); // "main" or "search"

  const closeStory = () => setShowStory(false);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff' }}>
      {/* Navbar only shown on main page */}
      {activePage === 'main' && <Navbar />}
      
      {/* Story navigation only on main page */}
      {activePage === 'main' && (
        <StoryNavigation onStoryClick={() => setShowStory(true)} />
      )}

      {/* Show story overlay */}
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

      {/* Content switch based on activePage */}
      {activePage === 'search' ? (
        <>
          <SearchBar />
          <PortfolioGrid />
        </>
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

      {/* Footer always shown and handles navigation */}
      <Footer onNavigate={(page) => {
        setActivePage(page);
        setShowStory(false); // Close story when switching pages
      }} />
    </div>
  );
}

// Styles
const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0,
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
