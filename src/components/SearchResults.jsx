import React from 'react';
import Home from './home';
import About from './about';
import Skills from './skills';
import Certificates from './Certificates';
import Projects from './Projects';
import Contact from './contact';

const SearchResults = ({ query }) => {
  const sectionMap = {
    home: <Home />,
    about: <About />,
    skills: <Skills />,
    certifications: <Certificates />,
    projects: <Projects />,
    contact: <Contact />,
  };

  const result = sectionMap[query];

  return (
    <div>
      {result ? result : <p style={{ textAlign: 'center' }}>No section found.</p>}
    </div>
  );
};

export default SearchResults;
