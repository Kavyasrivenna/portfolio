import React, { useState } from 'react';
import {
  FaJava, FaPython, FaHtml5, FaCss3Alt, FaBootstrap,
  FaReact, FaNodeJs, FaHeart, FaRegComment,
  FaShare, FaBookmark, FaRegHeart, FaRegBookmark,
  FaGitAlt, FaDatabase
} from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { DiMongodb } from 'react-icons/di';
import { BsFiletypeSql } from 'react-icons/bs';
import { MdBuild } from 'react-icons/md';
import { SiCplusplus, SiExpress } from 'react-icons/si';
import { TbBinaryTree } from 'react-icons/tb';

const skills = [
  { name: 'C++', category: 'Language', icon: <SiCplusplus size={28} color="#00599C" /> },
  { name: 'DSA', category: 'Core CS', icon: <TbBinaryTree size={28} color="#ec4899" /> },
  { name: 'React.js', category: 'Frontend', icon: <FaReact size={28} color="#61DBFB" /> },
  { name: 'Node.js', category: 'Backend', icon: <FaNodeJs size={28} color="#3C873A" /> },
  { name: 'Express.js', category: 'Backend', icon: <SiExpress size={28} color="#18181b" /> },
  { name: 'MongoDB', category: 'Database', icon: <DiMongodb size={28} color="#47A248" /> },
  { name: 'SQL', category: 'Database', icon: <BsFiletypeSql size={28} color="#00758f" /> },
  { name: 'Java', category: 'Language', icon: <FaJava size={28} color="#f89820" /> },
  { name: 'Python', category: 'Language', icon: <FaPython size={28} color="#3776AB" /> },
  { name: 'JavaScript', category: 'Language', icon: <IoLogoJavascript size={28} color="#f0db4f" /> },
  { name: 'Git & GitHub', category: 'Tool', icon: <FaGitAlt size={28} color="#f05032" /> },
  { name: 'REST APIs', category: 'Backend', icon: <FaDatabase size={28} color="#6366f1" /> },
  { name: 'Bootstrap', category: 'Styling', icon: <FaBootstrap size={28} color="#7952b3" /> },
  { name: 'HTML5', category: 'Frontend', icon: <FaHtml5 size={28} color="#e34c26" /> },
  { name: 'CSS3', category: 'Frontend', icon: <FaCss3Alt size={28} color="#264de4" /> },
];

const Skills = () => {
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

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Explore Kavya Sri Venna's technical skills — C++, DSA, React, Node.js, Express, MongoDB, and SQL!");
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
  };

  return (
    <section id="skills" style={styles.container}>
      {/* Header */}
      <div style={styles.profileBar}>
        <div style={styles.iconCircle}><MdBuild size={16} color="#fff" /></div>
        <span style={styles.username}>Skills</span>
      </div>

      {/* Skills Grid as Post Content */}
      <div style={styles.skillsGrid}>
        {skills.map((skill, idx) => (
          <div key={idx} style={styles.skillItem}>
            <div style={styles.iconWrapper}>{skill.icon}</div>
            <p style={styles.skillName}>{skill.name}</p>
            <span style={styles.skillCategory}>{skill.category}</span>
          </div>
        ))}
      </div>

      {/* Action Icons */}
      <div style={styles.actions}>
        <div style={styles.leftIcons}>
          {liked ? (
            <FaHeart size={20} style={{ ...styles.icon, color: 'red' }} onClick={toggleLike} />
          ) : (
            <FaRegHeart size={20} style={styles.icon} onClick={toggleLike} />
          )}
          <FaRegComment size={20} style={styles.icon} onClick={() => setShowComment(!showComment)} />
          <FaShare size={20} style={styles.icon} onClick={shareToLinkedIn} />
        </div>
        {saved ? (
          <FaBookmark size={20} style={{ ...styles.icon, color: '#000' }} onClick={toggleSave} />
        ) : (
          <FaRegBookmark size={20} style={styles.icon} onClick={toggleSave} />
        )}
      </div>

      {/* Like Count */}
      <p style={styles.likes}>{likes} like{likes === 1 ? '' : 's'}</p>

      {/* Comment Box */}
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
    margin: '2rem auto',
    borderRadius: '12px',
    background: 'linear-gradient(145deg, #d1e9ff, #ffe3f0)',
    border: '1px solid #ccc',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    fontFamily: 'sans-serif',
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
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(85px, 1fr))',
    gap: '0.9rem',
    padding: '1.2rem 1rem',
    textAlign: 'center',
    maxHeight: '380px',
    overflowY: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  skillItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px 4px',
    backgroundColor: '#ffffffaa',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    transition: 'transform 0.15s ease',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '32px',
  },
  skillName: {
    marginTop: '0.35rem',
    fontWeight: '600',
    fontSize: '12px',
    color: '#1f2937',
    marginBottom: '2px',
  },
  skillCategory: {
    fontSize: '10px',
    color: '#6b7280',
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
    padding: '0 0.8rem',
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0.2rem 0',
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

export default Skills;
