import React, { useState } from 'react';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certificates from './sections/Certificates';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

const sections = [
  { name: 'home', component: <Home /> },
  { name: 'about', component: <About /> },
  { name: 'skills', component: <Skills /> },
  { name: 'projects', component: <Projects /> },
  { name: 'certificates', component: <Certificates /> },
  { name: 'experience', component: <Experience /> },
  { name: 'contact', component: <Contact /> },
];

const SearchGrid = () => {
  const [search, setSearch] = useState('');

  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Kavyagram</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search: home, about, skills, etc..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-md border border-gray-700 text-black text-lg"
      />

      {/* Grid of section components */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredSections.map((section, index) => (
          <div
            key={index}
            className="bg-zinc-900 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition"
          >
            <h2 className="text-xl font-semibold capitalize mb-3 text-center">
              {section.name}
            </h2>
            {section.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchGrid;
