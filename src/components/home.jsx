import React, { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import {
  FaHeart, FaRegComment, FaShare,
  FaBookmark, FaRegHeart, FaRegBookmark
} from 'react-icons/fa';
import profileImg from '../assets/1.jpg';
import postImg from '../assets/1.jpg';

const Home = () => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
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

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out Kavya Sri Venna's portfolio!");
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
  };

  return (
    <section id="home" style={styles.container}>
      <div style={styles.profileBar}>
        <img src={profileImg} alt="profile" style={styles.profilePic} />
        <span style={styles.username}>kavyasrivenna</span>
      </div>

      <div style={{ position: 'relative' }}>
        <img src={postImg} alt="post" style={styles.postImage} />
        <div style={styles.overlayTypewriter}>
          <Typewriter
            words={['Problem Solver', 'Web Developer', 'App Developer', 'Web Mentor']}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </div>
      </div>

      <div style={styles.actions}>
        <div style={styles.leftIcons}>
          {liked
            ? <FaHeart size={20} style={{ ...styles.icon, color: 'red' }} onClick={toggleLike} />
            : <FaRegHeart size={20} style={styles.icon} onClick={toggleLike} />
          }
          <FaRegComment size={20} style={styles.icon} onClick={() => setCommentVisible(!commentVisible)} />
          <FaShare size={20} style={styles.icon} onClick={shareToLinkedIn} />
        </div>
        {saved
          ? <FaBookmark size={20} style={{ ...styles.icon, color: '#000' }} onClick={toggleSave} />
          : <FaRegBookmark size={20} style={styles.icon} onClick={toggleSave} />
        }
      </div>

      <p style={styles.likes}>{likes} like{likes === 1 ? '' : 's'}</p>

      <p style={styles.caption}>
        <strong>kavyasrivenna</strong> Hi, I am Kavya Sri Venna —{' '}
        <span style={styles.tag}>#FullStack</span> & <span style={styles.tag}>#MERN</span> Enthusiast! ✨🔥
      </p>

      {commentVisible && (
        <div style={styles.commentSection}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={styles.commentInput}
          />
          <button style={styles.commentButton} onClick={() => setComment('')}>Post</button>
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
    background: 'linear-gradient(135deg, #e0f2fe, #fdf2f8)',
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
  profilePic: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    marginRight: '10px',
    border: '2px solid #4f46e5',
  },
  username: {
    color: '#000',
    fontSize: '14px',
  },
  postImage: {
    width: '100%',
    height: '350px',
    objectFit: 'cover',
    borderBottom: '1px solid #eee',
  },
  overlayTypewriter: {
    position: 'absolute',
    bottom: '1rem',
    left: '1rem',
    color: '#4f46e5',
    fontWeight: 'bold',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
    padding: '0 0.8rem',
    fontWeight: 'bold',
    fontSize: '14px',
    margin: 0,
    color: '#111827',
  },
  caption: {
    padding: '0.4rem 0.8rem 1rem',
    fontSize: '14px',
    margin: 0,
    color: '#333',
    lineHeight: '1.5',
    backgroundColor: '#ffffffcc',
  },
  tag: {
    color: '#4f46e5',
    fontWeight: '500',
  },
  commentSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 0.8rem 1rem',
    background: '#f1f5f9',
  },
  commentInput: {
    flex: 1,
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  commentButton: {
    padding: '0.4rem 1rem',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Home;
