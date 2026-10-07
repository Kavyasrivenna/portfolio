import React from 'react';
import Home from './home';
import About from './about';
import Skills from './skills';
import Certificates from './Certificates';
import Projects from './Projects';
import Contact from './contact';
import Experience from './Experience';

const sectionMap = {
  home: <Home />,
  about: <About />,
  skills: <Skills />,
  certificates: <Certificates />,
  projects: <Projects />,
  contact: <Contact />,
  experience: <Experience />
};

const SearchResult = ({ query }) => {
  const result = sectionMap[query.toLowerCase()];
  return (
    <div style={{ padding: '1rem', color: 'white' }}>
      {result || <p>No section found for "{query}"</p>}
    </div>
  );
};

export default SearchResult;
