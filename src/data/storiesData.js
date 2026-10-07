// src/data/storiesData.js
import profileImg from '../assets/1.jpg';
import certImg1 from '../assets/2.jpg.png';
import certImg2 from '../assets/3.jpg.png';
import mentorImg from '../assets/5.jpg.png';

export const storiesData = [
  {
    id: 'story-home',
    label: 'Home',
    title: 'Welcome to Kavyagram',
    category: 'Introduction',
    date: 'Just now',
    image: profileImg,
    description: 'Welcome to my interactive Instagram-style developer portfolio! Explore my journey, featured projects, tech stack, and experience in building scalable full-stack applications.',
    highlights: [
      'Full Stack & MERN Developer (CGPA: 8 / 10)',
      'Undergraduate @ VNRVJIET (2023 - 2027)',
      'Smart Interviews Gold | VibethonX 2025 Finalist',
      'Web Development Mentor (Guided 70+ Students)'
    ],
    tags: ['#FullStack', '#React', '#WebDeveloper', '#Kavyagram'],
    sectionId: 'home',
  },
  {
    id: 'story-about',
    label: 'About',
    title: 'About Kavya Sri Venna',
    category: 'Bio & Background',
    date: 'Today',
    image: profileImg,
    description: 'Computer Science undergraduate at VNRVJIET with a deep passion for building user-first web & mobile applications and solving complex algorithmic challenges.',
    highlights: [
      'Problem Solver with strong DSA fundamentals in C++ and Java',
      'LeetCode (1400) & CodeChef (1420) rating',
      'Active mentor supporting 70+ peers in web technologies',
      'Volunteer at Google Developer Groups & Microsoft Innovation Hub'
    ],
    tags: ['#ComputerScience', '#VNRVJIET', '#AboutMe', '#TechJourney'],
    sectionId: 'about',
  },
  {
    id: 'story-skills',
    label: 'Skills',
    title: 'Technical Arsenal',
    category: 'Core Competencies',
    date: 'Updated recently',
    image: null,
    iconColor: '#61DBFB',
    description: 'Proficient across programming languages, modern frontend/backend stacks, relational & NoSQL databases, and developer tooling.',
    highlights: [
      'Languages: C++, C, Java, Python, JavaScript, SQL',
      'Web & Frameworks: React.js, Node.js, Express.js, HTML5, CSS3, Tailwind CSS, Bootstrap',
      'Databases & Tools: MongoDB, MySQL, Git, GitHub, Postman, VS Code',
      'Fundamentals: Data Structures & Algorithms, OOP, REST APIs, Linux Kernel modules'
    ],
    tags: ['#DSA', '#ReactJS', '#NodeJS', '#MongoDB', '#CPlusPlus', '#SQL'],
    sectionId: 'skills',
  },
  {
    id: 'story-experience',
    label: 'Experience',
    title: 'Work & Mentorship',
    category: 'Professional Experience',
    date: '2024 - Present',
    image: mentorImg,
    description: 'Demonstrated experience in hands-on mentorship, workshop facilitation, and industry-grade project development.',
    highlights: [
      'Infosys Springboard Intern (Internship 6.0): Built "TaxPal" financial & tax estimator',
      'Infosys Springboard Pragati: Path to Future Program Cohort',
      'Web Development Mentor @ VNRVJIET: Guided 70+ students in full-stack engineering and Git workflows'
    ],
    tags: ['#InfosysSpringboard', '#Mentorship', '#TaxPal', '#FullStackDev'],
    sectionId: 'experience',
  },
  {
    id: 'story-projects',
    label: 'Projects',
    title: 'Featured Projects',
    category: 'Software Engineering',
    date: 'Recent Highlights',
    image: null,
    iconColor: '#10b981',
    description: 'A showcase of full-stack engineering, scalable backend design, real-time collaboration, and system-level programming.',
    highlights: [
      'Tutly EduTech Platform: Open-source LMS with attendance tracking, playgrounds & course management (React, Next.js, tRPC)',
      'Blood Donation Platform: Full-stack MERN platform connecting donors and recipients with location-based matching and JWT security',
      'CodePen Clone: Interactive web IDE with live browser rendering and syntax editing',
      'Ecommerce Website: Responsive e-commerce frontend built in GDG/Microsoft sessions'
    ],
    tags: ['#Tutly', '#MERN', '#BloodDonation', '#OpenSource', '#FullStack'],
    sectionId: 'projects',
  },
  {
    id: 'story-certification',
    label: 'Certification',
    title: 'Credentials & Certifications',
    category: 'Continuous Learning',
    date: 'Verified',
    image: certImg1,
    description: 'Recognized industry certifications validating proficiency in cloud platforms, modern JavaScript, and software development methodologies.',
    highlights: [
      'Google Cloud Skills Boost Profile & Cloud Computing Essentials',
      'Infosys Springboard Internship 6.0 Completion Certificate (Verified)',
      'High Impact Presentations & Responsive Web Design'
    ],
    tags: ['#GoogleCloud', '#CloudComputing', '#Certifications', '#InfosysSpringboard'],
    sectionId: 'certification',
  },
  {
    id: 'story-education',
    label: 'Education',
    title: 'Academic Background',
    category: 'Academics',
    date: '2020 - 2027',
    image: certImg2,
    description: 'Solid academic foundation in Computer Science and Engineering with continuous technical and extracurricular engagements.',
    highlights: [
      'B.Tech in Computer Science and Engineering — VNRVJIET (2023 - 2027) | CGPA: 8 / 10',
      'Intermediate (MPC) — Sri Chaitanya Junior College (2021 - 2023)',
      'Secondary School Certificate (SSC) — SRM High School (2020 - 2021)'
    ],
    tags: ['#VNRVJIET', '#BTech', '#CSE', '#Engineering'],
    sectionId: 'education',
  },
  {
    id: 'story-contact',
    label: 'Contact',
    title: 'Connect With Me',
    category: 'Networking',
    date: 'Available',
    image: profileImg,
    description: 'Open to full-stack engineering internships, open-source collaborations, and tech community discussions!',
    highlights: [
      'Email: kavyasrivenna223@gmail.com',
      'GitHub: github.com/Kavyasrivenna',
      'LinkedIn: linkedin.com/in/kavyasri06'
    ],
    tags: ['#Connect', '#OpenToWork', '#HireMe', '#LinkedIn'],
    sectionId: 'contact',
  },
];
