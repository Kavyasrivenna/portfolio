import React, { useState } from 'react';
import {
  FaHeart, FaRegComment, FaShare,
  FaBookmark, FaRegHeart, FaRegBookmark
} from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';

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
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=https://your-portfolio-link.com/about`;
    window.open(url, '_blank');
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
          Hi! I'm <strong>Kavya Sri Venna</strong>, a passionate and self-driven Computer Science undergraduate at <em>VNR Vignana Jyothi Institute of Engineering and Technology (VNRVJIET)</em>.
          <br /><br />
          I enjoy building web and mobile applications that solve real-world problems and improve user experience.
          <br /><br />
          My technical skills include Java, C++, C, React.js, JavaScript, HTML, CSS, and MongoDB. I've worked on various projects like an e-commerce site, a CodePen clone, and even explored Linux device driver development.
          <br /><br />
          I'm also a Web Development Mentor at my university and actively volunteer at GDG and Microsoft Innovation Hub, where I engage with the tech community and support peers in their learning journey.
          <br /><br />
          I'm constantly striving to learn, lead, and collaborate — let’s build something meaningful together!
        </p>
        <a
          href="https://drive.google.com/file/d/1u31aEvvBtHGWnC8lZSn1OG5gXzm8r5T-/view"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.resumeLink}
        >
          📄 View Resume
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
    display: 'inline-block',
    marginTop: '1rem',
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#4f46e5',
    fontSize: '14px',
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
