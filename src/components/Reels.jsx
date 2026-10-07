import React from 'react';
import Home from './home';
import About from './about';
import Skills from './skills';
import Projects from './Projects';
import Certificates from './Certification';
import Experience from './Experience';
import Contact from './Contact';

const components = [
  { title: 'Home', component: <Home /> },
  { title: 'About', component: <About /> },
  { title: 'Skills', component: <Skills /> },
  { title: 'Projects', component: <Projects /> },
  { title: 'Certificates', component: <Certificates /> },
  { title: 'Experience', component: <Experience /> },
  { title: 'Contact', component: <Contact /> }
];

const Reels = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-black text-white">
      {components.map((item, i) => (
        <div key={i} className="bg-zinc-800 p-4 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300">
          <h2 className="text-center text-lg font-semibold mb-2">{item.title}</h2>
          {item.component}
        </div>
      ))}
    </div>
  );
};

export default Reels;
