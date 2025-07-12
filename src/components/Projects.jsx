import React, { useState } from 'react';
import {
  FaHeart, FaRegComment, FaShare,
  FaBookmark, FaRegHeart, FaRegBookmark, FaLaptopCode
} from 'react-icons/fa';

const projects = [
  {
    title: "⚡ CodePen Clone",
    description: "A simplified CodePen-like editor using React. Users can write HTML, CSS, and JS with live preview.",
    link: "https://github.com/Kavyasrivenna/codepen",
    image: null, // no image
  },
  {
    title: "🛒 Ecommerce Website",
    description: "A collaborative project built during GDG/Microsoft sessions. Focuses on real-time features and clean UI.",
    link: "https://github.com/Kavyasrivenna/gdgc",
    image: null, // image removed as per your request
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
    const text = encodeURIComponent("Check out some cool projects!");
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
  };

  return (
    <section id="projects" style={styles.container}>
      <div style={styles.profileBar}>
        <div style={styles.iconCircle}>
          <FaLaptopCode size={16} color="#fff" />
        </div>
        <span style={styles.username}>My Projects</span>
      </div>

      <div style={styles.caption}>
        <p>
          🚀 Dive into my hands-on work where I’ve built real-time apps, polished UI, and clean architecture using modern tech like <b>React</b> and <b>JavaScript</b>.
        </p>
      </div>

      <div style={styles.projectsList}>
        {projects.map((project, index) => (
          <div key={index} style={styles.projectCard}>
            {project.image && (
              <img src={project.image} alt={project.title} style={styles.image} />
            )}
            <h3 style={styles.title}>{project.title}</h3>
            <p style={styles.desc}>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer" style={styles.button}>
              🔗 View on GitHub
            </a>
          </div>
        ))}
      </div>

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
    fontSize: '14.5px',
    color: '#374151',
    backgroundColor: '#fefefe',
    lineHeight: '1.8',
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
    padding: '1rem',
    boxShadow: '0 6px 16px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease',
    minHeight: '160px',
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: '180px',
    borderRadius: '8px',
    objectFit: 'cover',
    marginBottom: '0.6rem',
  },
  title: {
    fontSize: '1.2rem',
    color: '#1f2937',
    fontWeight: '600',
    marginBottom: '0.4rem',
  },
  desc: {
    fontSize: '14px',
    color: '#4b5563',
    marginBottom: '0.7rem',
    lineHeight: '1.6',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#10b981',
    color: '#fff',
    padding: '8px 14px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'background 0.3s ease',
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
