import React, { useState } from 'react';
import {
  FaHeart, FaRegComment, FaShare,
  FaBookmark, FaRegHeart, FaRegBookmark, FaLaptopCode, FaGithub
} from 'react-icons/fa';

const projects = [
  {
    id: 'blood-donation',
    title: "🩸 Blood Donation Platform",
    category: "Full Stack — MERN",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "REST APIs"],
    description: "Built scalable backend services and REST APIs for a full-stack web application connecting blood donors and recipients using React, Node.js, Express, and MongoDB. Implemented secure authentication, authorization, and location-based donor search. Designed modular service layers and optimized MongoDB queries for efficient and fault-tolerant data access.",
    keyFeatures: [
      "Real-time blood donor matching by blood group and availability",
      "Secure JWT authentication and role-based access control",
      "Location-based donor search and emergency request broadcasts",
      "Optimized MongoDB aggregations and fault-tolerant service layer"
    ],
    github: "https://github.com/Kavyasrivenna/blood-donation",
    demo: null,
    image: null,
  },
  {
    id: 'codepen-clone',
    title: "⚡ CodePen Clone",
    category: "Frontend Web App",
    techStack: ["React.js", "HTML5", "CSS3", "JavaScript"],
    description: "A simplified CodePen-like browser IDE built with React. Enables users to write HTML, CSS, and JS simultaneously with live preview, syntax formatting, and split-pane layout.",
    keyFeatures: [
      "Live instant preview with sandboxed iframe rendering",
      "Multi-panel code editors with syntax awareness",
      "Responsive layout optimized for rapid prototyping"
    ],
    github: "https://github.com/Kavyasrivenna/codepen",
    demo: null,
    image: null,
  },
  {
    id: 'ecommerce-platform',
    title: "🛒 Ecommerce Website",
    category: "Full Stack / GDG Initiative",
    techStack: ["React.js", "Bootstrap", "JavaScript", "REST APIs"],
    description: "A collaborative project built during GDG and Microsoft Innovation Hub sessions. Features product catalog listing, real-time filtering, responsive cart management, and clean user experience.",
    keyFeatures: [
      "Product catalog filtering and search functionality",
      "Interactive cart state management",
      "Mobile-first responsive styling using Bootstrap"
    ],
    github: "https://github.com/Kavyasrivenna/gdgc",
    demo: null,
    image: null,
  },
  {
    id: 'tutly-platform',
    title: "🎓 Tutly – Open Source EduTech Platform",
    category: "Full Stack / EdTech Open Source",
    techStack: ["React.js", "Next.js 15", "TypeScript", "Tailwind CSS", "tRPC", "Prisma", "Turborepo"],
    description: "Contributed to Tutly, an open-source Learning Management System (LMS) designed with attendance tracking, assignment workflows, interactive code playgrounds, and real-time notifications. Developed reusable and responsive React components for course and content management, integrated frontend modules with backend APIs, and collaborated in an Agile open-source environment.",
    keyFeatures: [
      "Reusable, accessible React components for LMS course & content management",
      "Typesafe API integration with tRPC & Next.js backend services",
      "Interactive code playground & assignment tracking support",
      "Collaborated in Agile open-source monorepo via GitHub issues & PR reviews"
    ],
    github: "https://github.com/TutlyLabs/Tutly",
    demo: "https://www.tutly.in",
    image: null,
  },
];

const Projects = () => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const toggleSave = () => setSaved(!saved);

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out Kavya Sri Venna's featured projects including the Blood Donation Platform!");
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
  };

  return (
    <section id="projects" style={styles.container}>
      {/* Profile Bar */}
      <div style={styles.profileBar}>
        <div style={styles.iconCircle}>
          <FaLaptopCode size={16} color="#fff" />
        </div>
        <span style={styles.username}>Projects</span>
      </div>

      {/* Caption */}
      <div style={styles.caption}>
        <p>
          🚀 Hands-on software projects spanning full-stack web applications, scalable backend architectures, and developer tooling using modern tech like <b>React</b>, <b>Node.js</b>, <b>Express</b>, and <b>MongoDB</b>.
        </p>
      </div>

      {/* Projects List */}
      <div style={styles.projectsList}>
        {projects.map((project, index) => (
          <div key={project.id || index} style={styles.projectCard}>
            <div style={styles.cardTop}>
              <h3 style={styles.title}>{project.title}</h3>
              <span style={styles.categoryBadge}>{project.category}</span>
            </div>

            <p style={styles.desc}>{project.description}</p>

            {project.keyFeatures && (
              <div style={styles.featuresBox}>
                <span style={styles.featuresHeading}>Key Features:</span>
                <ul style={styles.featuresList}>
                  {project.keyFeatures.map((feature, i) => (
                    <li key={i} style={styles.featureItem}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.techStack && (
              <div style={styles.techStackRow}>
                {project.techStack.map((tech, i) => (
                  <span key={i} style={styles.techBadge}>{tech}</span>
                ))}
              </div>
            )}

            <div style={styles.btnRow}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.githubBtn}
              >
                <FaGithub size={15} />
                <span>View on GitHub</span>
              </a>

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.demoBtn}
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action Icons */}
      <div style={styles.actions}>
        <div style={styles.leftIcons}>
          {liked
            ? <FaHeart size={20} style={{ ...styles.icon, color: 'red' }} onClick={toggleLike} />
            : <FaRegHeart size={20} style={styles.icon} onClick={toggleLike} />
          }
          <FaRegComment size={20} style={styles.icon} onClick={() => setShowComment(!showComment)} />
          <FaShare size={20} style={styles.icon} onClick={shareToLinkedIn} />
        </div>
        {saved
          ? <FaBookmark size={20} style={{ ...styles.icon, color: '#000' }} onClick={toggleSave} />
          : <FaRegBookmark size={20} style={styles.icon} onClick={toggleSave} />
        }
      </div>

      <p style={styles.likes}>{likes} like{likes === 1 ? '' : 's'}</p>

      {showComment && (
        <div style={styles.commentBox}>
          <input
            type="text"
            placeholder="💬 Add a comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            style={styles.input}
          />
        </div>
      )}
    </section>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    width: '100%',
    margin: '2rem auto',
    background: 'linear-gradient(to bottom right, #e0f2fe, #fdf2f8)',
    borderRadius: '14px',
    fontFamily: 'Segoe UI, sans-serif',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  profileBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.9rem 1rem',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
  },
  iconCircle: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '12px',
  },
  username: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
  },
  caption: {
    padding: '1rem',
    fontSize: '14px',
    color: '#374151',
    backgroundColor: '#fefefe',
    lineHeight: '1.7',
  },
  projectsList: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  projectCard: {
    background: '#fff',
    borderRadius: '10px',
    padding: '1.1rem',
    boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
    border: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '8px',
  },
  title: {
    fontSize: '1.15rem',
    color: '#111827',
    fontWeight: '700',
    margin: 0,
  },
  categoryBadge: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#10b981',
    backgroundColor: '#ecfdf5',
    padding: '2px 8px',
    borderRadius: '9999px',
    border: '1px solid #a7f3d0',
    whiteSpace: 'nowrap',
  },
  desc: {
    fontSize: '13.5px',
    color: '#4b5563',
    lineHeight: '1.55',
    margin: 0,
  },
  featuresBox: {
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
    padding: '0.6rem 0.8rem',
    border: '1px solid #f3f4f6',
  },
  featuresHeading: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#374151',
    display: 'block',
    marginBottom: '4px',
  },
  featuresList: {
    margin: 0,
    paddingLeft: '16px',
    fontSize: '12.5px',
    color: '#4b5563',
    lineHeight: '1.45',
  },
  featureItem: {
    marginBottom: '2px',
  },
  techStackRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
  },
  techBadge: {
    fontSize: '11px',
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    padding: '2px 8px',
    borderRadius: '4px',
    border: '1px solid #bfdbfe',
    fontWeight: '500',
  },
  btnRow: {
    display: 'flex',
    gap: '8px',
    marginTop: '4px',
  },
  githubBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#18181b',
    color: '#fff',
    padding: '8px 14px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  },
  demoBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#10b981',
    color: '#fff',
    padding: '8px 14px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '600',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.8rem 1rem',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#fff',
  },
  leftIcons: {
    display: 'flex',
    gap: '1.2rem',
  },
  icon: {
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  likes: {
    padding: '0 1rem 1rem',
    fontWeight: '500',
    fontSize: '14px',
    color: '#1f2937',
  },
  commentBox: {
    padding: '1rem',
    backgroundColor: '#f3f4f6',
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outlineColor: '#6366f1',
  },
};

export default Projects;
