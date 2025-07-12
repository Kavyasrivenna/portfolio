import React, { useState } from 'react';
import Navbar from './components/navbar';
import StoryNavigation from './components/StoryNavigation';
import Footer from './components/footer';
import SearchBar from './components/SearchBar';
import PortfolioGrid from './components/PortfolioGrid';

import Home from './components/home';
import About from './components/about';
import Skills from './components/skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Certification from './components/Certification';
import Projects from './components/Projects';
import Contact from './components/contact';

function App() {
  const [activeStory, setActiveStory] = useState(null);
  const [activePage, setActivePage] = useState('main'); // 'main' or 'search'

  const renderStory = () => {
    switch (activeStory) {
      case 'Home': return <Home />;
      case 'About': return <About />;
      case 'Skills': return <Skills />;
      case 'Education': return <Education />;
      case 'Experience': return <Experience />;
      case 'Certification': return <Certification />;
      case 'Projects': return <Projects />;
      case 'Contact': return <Contact />;
      default: return null;
    }
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff' }}>
      <Navbar />
      <StoryNavigation onStoryClick={(label) => setActiveStory(label)} />

      {/* Show SearchPage when triggered from Footer */}
      {activePage === 'search' ? (
        <>
          <SearchBar />
          <PortfolioGrid />
        </>
      ) : (
        <>
          {activeStory && (
            <div style={overlayStyle}>
              <button onClick={() => setActiveStory(null)} style={closeButtonStyle}>✕</button>
              <div style={storyContentStyle}>
                {renderStory()}
              </div>
            </div>
          )}

          {/* Main scrollable content */}
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

      <Footer onNavigate={(page) => setActivePage(page)} />
    </div>
  );
}

// Overlay Story styles
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: '#000',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  overflowY: 'auto',
};

const storyContentStyle = {
  maxWidth: '500px',
  width: '100%',
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
