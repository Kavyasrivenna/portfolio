import React, { useState } from 'react';
import {
  FaHeart, FaRegComment, FaShare,
  FaBookmark, FaRegHeart, FaRegBookmark, FaExternalLinkAlt
} from 'react-icons/fa';
import { HiOfficeBuilding } from 'react-icons/hi';
import mentorImage from '../assets/5.jpg.png';

const experienceData = [
  {
    role: "Full-Stack Software Engineering Intern (Internship 6.0)",
    organization: "Infosys Springboard",
    year: "Sep 2025 - Dec 2025",
    project: "TaxPal: Development of Personal Finance & Tax Estimator for Freelancers",
    description: "Completed Internship 6.0 at Infosys Springboard as a Remote Full-Stack Software Engineering Intern. Built and enhanced scalable backend services and responsive full-stack modules.",
    responsibilities: [
      "Developed & improved scalable backend services, full-stack web modules using React, Node.js and MongoDB.",
      "Designed and implemented RESTful APIs to support integration of intelligent services and external APIs.",
      "Worked in an Agile development environment involving sprint planning, code reviews, and iterative delivery.",
      "Deployed and tested backend services on cloud infrastructure (basic exposure to AWS services).",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "AWS Cloud", "Agile"],
    credentialUrl: "https://drive.google.com/file/d/1BiT1kL-dDXis58PCwyIXsOYtgUvwa_ZA/view",
    credentialLabel: "View Internship Certificate",
  },
  {
    role: "Web Development Mentor",
    organization: "VNR Vignana Jyothi Institute of Engineering and Technology (VNR VJIET)",
    year: "2024 - Present",
    project: "Peer Learning & Technical Mentorship Initiative",
    description: "Guided 70+ students in frontend and full-stack development, core programming stacks, and industry best practices.",
    responsibilities: [
      "Guided 70+ students in frontend and full-stack development covering React.js, Node.js, Express, and MongoDB workflows.",
      "Conducted hands-on workshops, code reviews, and Git/GitHub collaborative sessions.",
      "Advised student teams on architecting clean, scalable semester and hackathon projects.",
      "Fostered peer-to-peer programming culture and collaborative problem-solving.",
    ],
    technologies: ["React.js", "Node.js", "Express", "MongoDB", "Git", "GitHub"],
    credentialUrl: null,
    credentialLabel: null,
  },
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
    const text = encodeURIComponent("Check out my professional experience at Infosys Springboard and VNRVJIET!");
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
        <img src={mentorImage} alt="Mentorship & Work Experience" style={styles.postImage} />
        <div style={styles.overlayText}>
          Infosys Springboard Intern · Web Development Mentor
        </div>
      </div>

      {/* Experience Entries */}
      <div style={styles.caption}>
        {experienceData.map((exp, index) => (
          <div key={index} style={styles.expCard}>
            <div style={styles.cardHeaderRow}>
              <h3 style={styles.roleTitle}>{exp.role}</h3>
              <span style={styles.yearBadge}>{exp.year}</span>
            </div>
            <p style={styles.companyName}>
              <strong>Company / Org:</strong> {exp.organization}
            </p>
            {exp.project && (
              <p style={styles.projectLine}>
                <strong>Project:</strong> <em>{exp.project}</em>
              </p>
            )}
            <p style={styles.descLine}>{exp.description}</p>

            {exp.responsibilities && (
              <div style={styles.bulletBox}>
                <span style={styles.sectionSubHeader}>Key Responsibilities & Deliverables:</span>
                <ul style={styles.bulletList}>
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} style={styles.bulletItem}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            {exp.technologies && (
              <div style={styles.techPillsRow}>
                {exp.technologies.map((tech, i) => (
                  <span key={i} style={styles.techPill}>{tech}</span>
                ))}
              </div>
            )}

            {exp.credentialUrl && (
              <a
                href={exp.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.verifyLink}
              >
                <span>{exp.credentialLabel}</span>
                <FaExternalLinkAlt size={11} />
              </a>
            )}
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
    height: '320px',
    objectFit: 'cover',
    objectPosition: '70% center',
  },
  overlayText: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    right: '10px',
    color: '#4f46e5',
    fontWeight: 'bold',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  caption: {
    padding: '1rem',
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.6',
    backgroundColor: '#ffffffcc',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  expCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '1rem',
    border: '1px solid #e5e7eb',
    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
  },
  cardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '8px',
    marginBottom: '4px',
  },
  roleTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#111827',
    margin: 0,
  },
  yearBadge: {
    fontSize: '11px',
    backgroundColor: '#eef2ff',
    color: '#4f46e5',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  companyName: {
    fontSize: '13px',
    color: '#374151',
    margin: '2px 0 4px',
  },
  projectLine: {
    fontSize: '13px',
    color: '#4b5563',
    margin: '2px 0 6px',
  },
  descLine: {
    fontSize: '13.5px',
    color: '#4b5563',
    margin: '4px 0 8px',
    lineHeight: '1.5',
  },
  bulletBox: {
    margin: '6px 0 8px',
    padding: '6px 8px',
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
  },
  sectionSubHeader: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#374151',
    display: 'block',
    marginBottom: '4px',
  },
  bulletList: {
    margin: 0,
    paddingLeft: '18px',
    fontSize: '12.5px',
    color: '#4b5563',
    lineHeight: '1.5',
  },
  bulletItem: {
    marginBottom: '3px',
  },
  techPillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    margin: '8px 0 6px',
  },
  techPill: {
    fontSize: '11px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    padding: '2px 7px',
    borderRadius: '4px',
    border: '1px solid #e5e7eb',
  },
  verifyLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    color: '#4f46e5',
    fontWeight: '600',
    textDecoration: 'none',
    marginTop: '6px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.6rem 0.8rem',
    backgroundColor: '#fff',
    borderTop: '1px solid #eee',
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
