import React, { useState } from 'react';
import {
  FaHeart, FaRegComment, FaShare,
  FaBookmark, FaRegBookmark
} from 'react-icons/fa';
import { FcGraduationCap } from 'react-icons/fc';

const educationData = [
  {
    degree: 'B.Tech in Computer Science',
    institution: 'VNR Vignana Jyothi Institute of Engineering and Technology',
    year: '2023 - 2027',
  },
  {
    degree: 'Intermediate (MPC)',
    institution: 'Sri Chaitanya Junior College',
    year: '2021 - 2023',
  },
  {
    degree: 'SSC',
    institution: 'SRM High School',
    year: '2020 - 2021',
  },
];

const Education = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [saved, setSaved] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);
  const [comment, setComment] = useState('');

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const toggleSave = () => {
    setSaved(!saved);
  };

  const handleShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      '_blank'
    );
  };

  return (
    <section id="education" style={styles.container}>
      {/* Header (same as Skills) */}
      <div style={styles.profileBar}>
        <div style={styles.iconCircle}><FcGraduationCap size={16} /></div>
        <span style={styles.username}>Education</span>
      </div>

      {/* Education Content */}
      <div style={styles.postBody}>
        {educationData.map((edu, index) => (
          <div key={index} style={styles.eduCard}>
            <h3 style={styles.degree}>{edu.degree}</h3>
            <p style={styles.institution}>{edu.institution}</p>
            <span style={styles.year}>{edu.year}</span>
          </div>
        ))}
      </div>

      {/* Action Icons */}
      <div style={styles.actions}>
        <div style={styles.leftIcons}>
          <FaHeart
            size={20}
            style={{ ...styles.icon, color: liked ? '#e63946' : '#4b5563' }}
            onClick={toggleLike}
          />
          <FaRegComment
            size={20}
            style={styles.icon}
            onClick={() => setCommentVisible(!commentVisible)}
          />
          <FaShare size={20} style={styles.icon} onClick={handleShare} />
        </div>
        {saved ? (
          <FaBookmark size={20} style={{ ...styles.icon, color: '#000' }} onClick={toggleSave} />
        ) : (
          <FaRegBookmark size={20} style={styles.icon} onClick={toggleSave} />
        )}
      </div>

      {/* Like count */}
      <p style={styles.likes}>{likes} like{likes === 1 ? '' : 's'}</p>

      {/* Comment box */}
      {commentVisible && (
        <div style={styles.commentSection}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={styles.commentInput}
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
    minHeight: '600px',
    margin: '2rem auto',
    background: 'linear-gradient(135deg, #e0f2fe, #fdf2f8)',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontFamily: 'sans-serif',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
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
  postBody: {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  eduCard: {
    background: '#ffffffdd',
    padding: '0.8rem',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
  },
  degree: {
    fontSize: '15px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  institution: {
    fontSize: '14px',
    color: '#374151',
    marginBottom: '2px',
  },
  year: {
    fontSize: '13px',
    color: '#6b7280',
    fontStyle: 'italic',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.6rem 0.8rem',
    borderTop: '1px solid #eee',
  },
  leftIcons: {
    display: 'flex',
    gap: '1rem',
  },
  icon: {
    cursor: 'pointer',
  },
  likes: {
    padding: '0 0.8rem',
    fontWeight: 'bold',
    fontSize: '14px',
    margin: 0,
  },
  commentSection: {
    padding: '0.6rem 0.8rem 1rem',
  },
  commentInput: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
};

export default Education;
