import React, { useState } from 'react';
import {
  FaHeart, FaRegComment, FaShare,
  FaBookmark, FaRegHeart, FaRegBookmark, FaExternalLinkAlt
} from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';

const RESUME_URL = 'https://drive.google.com/file/d/1tlu6fqaEC-xf_6VPGi4wFJgLEVrEWF1D/view?usp=sharing';

const About = () => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const toggleSave = () => {
    setSaved(!saved);
  };

  const handleShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Learn more about Kavya Sri Venna — Full Stack Developer & CS Undergraduate!");
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
  };

  return (
    <section id="about" style={styles.container}>
      {/* Header */}
      <div style={styles.profileBar}>
        <div style={styles.iconCircle}>
          <IoPerson size={16} color="#fff" />
        </div>
        <span style={styles.username}>About Me</span>
      </div>

      {/* Caption */}
      <div style={styles.caption}>
        <p>
          Hello! I'm <strong>Kavya Sri Venna</strong>, a motivated Computer Science undergraduate (2023–2027) at <em>VNR Vignana Jyothi Institute of Engineering and Technology (VNRVJIET)</em>, Hyderabad (CGPA: <strong>8 / 10</strong>).
          <br /><br />
          I specialize in <strong>Full Stack Development</strong> and <strong>Data Structures & Algorithms</strong>. My technical skillset spans <strong>C++</strong>, <strong>Java</strong>, <strong>JavaScript</strong>, <strong>React.js</strong>, <strong>Node.js</strong>, <strong>Express.js</strong>, <strong>MongoDB</strong>, and <strong>SQL</strong>.
          <br /><br />
          Recently, I completed <strong>Infosys Springboard Internship 6.0</strong>, developing scalable backend services and full-stack web modules with React, Node.js, and MongoDB. I also serve as an active <strong>Web Development Mentor</strong> at VNRVJIET (guided 70+ students), and collaborate on campus initiatives through Google Developer Groups (GDGC) and Microsoft Innovation Hub.
          <br /><br />
          Recognized with the <strong>Smart Interviews Gold Certificate</strong> (top 9,000 out of 45,000+ students) and finalist at <strong>VibethonX 2025 Hackathon</strong> (CBIT). Active competitive programmer on <strong>LeetCode (1400)</strong> and <strong>CodeChef (1420)</strong>.
        </p>

        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.resumeLink}
          aria-label="View official resume in new tab"
        >
          <span>📄 View Resume</span>
          <FaExternalLinkAlt size={12} />
        </a>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <div style={styles.leftIcons}>
          {liked
            ? <FaHeart size={20} style={{ ...styles.icon, color: 'red' }} onClick={toggleLike} />
            : <FaRegHeart size={20} style={styles.icon} onClick={toggleLike} />
          }
          <FaRegComment size={20} style={styles.icon} onClick={() => setShowComment(!showComment)} />
          <FaShare size={20} style={styles.icon} onClick={handleShare} />
        </div>
        {saved
          ? <FaBookmark size={20} style={{ ...styles.icon, color: '#000' }} onClick={toggleSave} />
          : <FaRegBookmark size={20} style={styles.icon} onClick={toggleSave} />
        }
      </div>

      <p style={styles.likes}>{likes} like{likes === 1 ? '' : 's'}</p>

      {/* Comment */}
      {showComment && (
        <div style={styles.commentBox}>
          <input
            type="text"
            placeholder="Add a comment..."
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
    background: 'linear-gradient(145deg, #fdf2f8, #dbeafe)',
    border: '1px solid #ccc',
    borderRadius: '12px',
    overflow: 'hidden',
    fontFamily: 'sans-serif',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  },
  profileBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.8rem',
    borderBottom: '1px solid #eee',
    fontWeight: 'bold',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
  iconCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#4f46e5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px',
  },
  username: {
    color: '#000',
    fontSize: '15px',
  },
  caption: {
    padding: '1rem',
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.7',
    backgroundColor: '#ffffffdd',
  },
  resumeLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '1.2rem',
    textDecoration: 'none',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#4f46e5',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '13.5px',
    boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)',
    transition: 'background-color 0.2s',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.6rem 0.8rem',
    borderTop: '1px solid #eee',
    backgroundColor: '#fff',
  },
  leftIcons: {
    display: 'flex',
    gap: '1rem',
  },
  icon: {
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  likes: {
    padding: '0 0.8rem 1rem',
    fontWeight: 'bold',
    fontSize: '14px',
    margin: 0,
    color: '#111827',
  },
  commentBox: {
    padding: '0.8rem 1rem 1.2rem',
    background: '#f1f5f9',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
};

export default About;
