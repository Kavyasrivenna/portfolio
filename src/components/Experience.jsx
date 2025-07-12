import React, { useState } from 'react';
import {
  FaHeart, FaRegComment, FaShare,
  FaBookmark, FaRegHeart, FaRegBookmark
} from 'react-icons/fa';
import { HiOfficeBuilding } from 'react-icons/hi';

// ✅ Import the image
import mentorImage from '../assets/5.jpg.png';

const experienceData = [
  {
    role: "Web Development Mentor",
    organization: "VNR Vignana Jyothi Institute of Engineering and Technology (VNR VJIET)",
    year: "2024 - Present",
    description: "Guiding peers and juniors in web technologies, frontend/backend stacks, and real-world project building."
  }
];

const Experience = () => {
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
    const text = encodeURIComponent("Check out my work experience!");
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
  };

  return (
    <section id="experience" style={styles.container}>
      {/* Header */}
      <div style={styles.profileBar}>
        <div style={styles.iconCircle}>
          <HiOfficeBuilding size={16} color="#fff" />
        </div>
        <span style={styles.username}>Experience</span>
      </div>

      {/* Image Section */}
      <div style={styles.postImageWrapper}>
        <img src={mentorImage} alt="Mentorship" style={styles.postImage} />
        <div style={styles.overlayText}>
          Web Development Mentor · 2024 - Present
        </div>
      </div>

      {/* Experience Description */}
      <div style={styles.caption}>
        {experienceData.map((exp, index) => (
          <div key={index}>
            <p><strong>Role:</strong> {exp.role}</p>
            <p><strong>Organization:</strong> {exp.organization}</p>
            <p><strong>Description:</strong> {exp.description}</p>
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

      {/* Likes */}
      <p style={styles.likes}>{likes} like{likes === 1 ? '' : 's'}</p>

      {/* Comment Input */}
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
    background: 'linear-gradient(135deg, #fdfcfb, #f6f8fd)',
    border: '1px solid #ccc',
    borderRadius: '12px',
    fontFamily: 'sans-serif',
    boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
    overflow: 'hidden',
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
    fontSize: '14px',
  },
  postImageWrapper: {
    position: 'relative',
    width: '100%',
    height: 'auto',
  },
 postImage: {
  width: '100%',
  height: '350px',
  objectFit: 'cover',
  objectPosition: '70% center', // 👈 Shift image to the right (adjust % as needed)
},

  overlayText: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    color: '#4f46e5',
    fontWeight: 'bold',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  caption: {
    padding: '1rem',
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.6',
    backgroundColor: '#ffffffcc',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.6rem 0.8rem',
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

export default Experience;
