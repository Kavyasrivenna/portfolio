// src/components/stories.js
import Home from './home';
import About from './about';
import Skills from './skills';
import Education from './Education';
import Experience from './Experience';
import Certification from './Certification';
import Projects from './Projects';
import Contact from './contact';

export const stories = [
  { label: 'Home', component: <Home /> },
  { label: 'About', component: <About /> },
  { label: 'Skills', component: <Skills /> },
  { label: 'Education', component: <Education /> },
  { label: 'Experience', component: <Experience /> },
  { label: 'Certification', component: <Certification /> },
  { label: 'Projects', component: <Projects /> },
  { label: 'Contact', component: <Contact /> },
];
