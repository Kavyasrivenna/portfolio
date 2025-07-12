import React, { useState, useEffect } from 'react';
import {
  FaHeart, FaRegComment, FaShare,
  FaBookmark, FaRegHeart, FaRegBookmark,
  FaGithub, FaLinkedin, FaCode, FaCodeBranch, FaEnvelope
} from 'react-icons/fa';
import { MdConnectWithoutContact } from "react-icons/md";

const contacts = [
  {
    icon: <FaEnvelope size={24} title="Email" />,
    label: 'Email',
    link: 'mailto:kavyasrivenna223@gmail.com',
  },
  {
    icon: <FaGithub size={24} title="GitHub" />,
    label: 'GitHub',
    link: 'https://github.com/Kavyasrivenna',
  },
  {
    icon: <FaLinkedin size={24} title="LinkedIn" />,
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/kavyasri06',
  },
  {
    icon: <FaCode size={24} title="HackerRank" />,
    label: 'HackerRank',
    link: 'https://www.hackerrank.com/profile/kavyasrivenna223',
  },
  {
    icon: <FaCodeBranch size={24} title="CodeChef" />,
    label: 'CodeChef',
    link: 'https://www.codechef.com/users/kavyasrivenna2',
  },
];

const Contact = () => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      .contact-card:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 24px rgba(0,0,0,0.15);
      }
    `;
    document.head.appendChild(styleTag);
  }, []);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const toggleSave = () => {
    setSaved(!saved);
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Let's connect with Kavya Sri Venna!");
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
  };

  return (
    <section id="contact" style={styles.container}>
      {/* Header */}
      <div style={styles.profileBar}>
        <div style={styles.iconCircle}>
          <MdConnectWithoutContact size={22} color="#fff" title="Contact" />
        </div>
        <span style={styles.username}>Contact</span>
      </div>

      {/* Contact Cards */}
      <div style={styles.contactList}>
        {contacts.map((contact, index) => (
          <a
            key={index}
            href={contact.link}
            target={contact.link.startsWith("mailto:") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            style={styles.contactItem}
            className="contact-card"
            title={contact.label}
          >
            <div style={styles.contactIcon}>{contact.icon}</div>
            <span style={styles.contactLabel}>{contact.label}</span>
          </a>
        ))}
      </div>

      {/* Action Icons */}
      <div style={styles.actions}>
        <div style={styles.leftIcons}>
          {liked
            ? <FaHeart size={20} style={{ ...styles.icon, color: 'red' }} onClick={toggleLike} title="Unlike" />
            : <FaRegHeart size={20} style={styles.icon} onClick={toggleLike} title="Like" />
          }
          <FaRegComment size={20} style={styles.icon} onClick={() => setShowComment(!showComment)} title="Comment" />
          <FaShare size={20} style={styles.icon} onClick={shareToLinkedIn} title="Share" />
        </div>
        {saved
          ? <FaBookmark size={20} style={{ ...styles.icon, color: '#000' }} onClick={toggleSave} title="Unsave" />
          : <FaRegBookmark size={20} style={styles.icon} onClick={toggleSave} title="Save" />
        }
      </div>

      {/* Likes Count */}
      <p style={styles.likes}>{likes} like{likes === 1 ? '' : 's'}</p>

      {/* Comment Box */}
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
    margin: '2rem auto',
    background: 'linear-gradient(to bottom right, #fce7f3, #e0f2fe)',
    borderRadius: '16px',
    fontFamily: 'Segoe UI, sans-serif',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  profileBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.9rem 1rem',
    background: 'linear-gradient(90deg, #6366f1, #ec4899)',
    borderBottom: '1px solid #ddd',
  },
  iconCircle: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  },
  username: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
  },
  contactList: {
    padding: '1.5rem 1rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
  },
  contactItem: {
    width: '130px',
    height: '110px',
    background: 'linear-gradient(145deg, #f0f9ff, #ffffff)',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  },
  contactIcon: {
    marginBottom: '0.5rem',
    color: '#9333ea',
  },
  contactLabel: {
    fontWeight: '600',
    fontSize: '14px',
    color: '#1f2937',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.8rem 1rem',
    backgroundColor: '#fff',
    borderTop: '1px solid #e5e7eb',
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
    backgroundColor: '#fef9f9',
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outlineColor: '#6366f1',
    backgroundColor: '#fff',
  },
};

export default Contact;
