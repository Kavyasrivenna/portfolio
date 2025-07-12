import React, { useState, useEffect } from 'react';
import {
  FaHeart, FaRegComment, FaShare,
  FaBookmark, FaRegHeart, FaRegBookmark
} from 'react-icons/fa';
import { PiCertificate } from 'react-icons/pi';
import img2 from '../assets/2.jpg.png';
import img3 from '../assets/3.jpg.png';

const certifications = [
  {
    title: "Google Cloud Skills Boost Profile",
    link: "https://www.cloudskillsboost.google/public_profiles/ec48ebe2-2463-4e4d-9093-0717e4636c45",
    platform: "Google Cloud",
  },
  {
    title: "Cloud Computing Essentials Certificate",
    link: "https://drive.google.com/file/d/1ZXe4OH3DyavVYa_UU1ynWw3GRO4sb6T8/view",
    platform: "Google Drive",
  }
];

const images = [img2, img3];

const Certification = () => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const toggleSave = () => setSaved(!saved);

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out my certifications!");
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 3000); // 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="certification" style={styles.container}>
      {/* Header */}
      <div style={styles.profileBar}>
        <div style={styles.iconCircle}>
          <PiCertificate size={16} color="#fff" />
        </div>
        <span style={styles.username}>Certifications</span>
      </div>

      {/* Carousel */}
      <div style={styles.carousel}>
        <img src={images[currentImage]} alt="Certification" style={styles.carouselImage} />
      </div>

      {/* Certificate List */}
      <div style={styles.cardList}>
        {certifications.map((cert, index) => (
          <div key={index} style={styles.certCard}>
            <h3 style={styles.certTitle}>{cert.title}</h3>
            <p style={styles.certPlatform}>Platform: {cert.platform}</p>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.certButton}
            >
              View Certificate
            </a>
          </div>
        ))}
      </div>

      {/* Actions */}
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
    margin: '2rem auto',
    background: 'linear-gradient(135deg, #fef9f9, #ecfdf5)',
    border: '1px solid #ddd',
    borderRadius: '12px',
    fontFamily: 'sans-serif',
    boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  profileBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.8rem',
    borderBottom: '1px solid #eee',
    backgroundColor: '#fff',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  iconCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px',
  },
  username: {
    color: '#000',
    fontSize: '15px',
  },
  carousel: {
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #a5f3fc, #d8b4fe)',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardList: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  certCard: {
    backgroundColor: '#ffffffd9',
    borderRadius: '10px',
    padding: '1rem',
    boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
  },
  certTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.3rem',
  },
  certPlatform: {
    fontSize: '13px',
    color: '#555',
    marginBottom: '0.6rem',
  },
  certButton: {
    backgroundColor: '#10b981',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    textDecoration: 'none',
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
  },
  likes: {
    padding: '0 0.8rem',
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

export default Certification;
