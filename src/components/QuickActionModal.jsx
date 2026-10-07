// src/components/QuickActionModal.jsx
import React, { useEffect } from 'react';
import {
  FaFileAlt,
  FaBriefcase,
  FaLaptopCode,
  FaTools,
  FaUser,
  FaGraduationCap,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTimes,
} from 'react-icons/fa';

const RESUME_URL = 'https://drive.google.com/file/d/1tlu6fqaEC-xf_6VPGi4wFJgLEVrEWF1D/view?usp=sharing';

const actions = [
  {
    id: 'action-resume',
    label: 'View Resume',
    desc: 'Open official resume (PDF)',
    icon: <FaFileAlt size={20} color="#ec4899" />,
    type: 'link',
    url: RESUME_URL,
    badge: 'Updated',
  },
  {
    id: 'action-experience',
    label: 'Experience',
    desc: 'Infosys & VNRVJIET Mentorship',
    icon: <FaBriefcase size={20} color="#f59e0b" />,
    type: 'scroll',
    target: 'experience',
  },
  {
    id: 'action-projects',
    label: 'Projects',
    desc: 'Blood Donation Platform, CodePen & more',
    icon: <FaLaptopCode size={20} color="#10b981" />,
    type: 'scroll',
    target: 'projects',
  },
  {
    id: 'action-skills',
    label: 'Skills',
    desc: 'C++, DSA, React, Node, MongoDB, SQL',
    icon: <FaTools size={20} color="#6366f1" />,
    type: 'scroll',
    target: 'skills',
  },
  {
    id: 'action-about',
    label: 'About Me',
    desc: 'Background, education & community',
    icon: <FaUser size={20} color="#3b82f6" />,
    type: 'scroll',
    target: 'about',
  },
  {
    id: 'action-education',
    label: 'Education',
    desc: 'B.Tech CSE @ VNRVJIET (2023 - 2027)',
    icon: <FaGraduationCap size={20} color="#8b5cf6" />,
    type: 'scroll',
    target: 'education',
  },
  {
    id: 'action-contact',
    label: 'Contact',
    desc: 'Email & social connections',
    icon: <FaEnvelope size={20} color="#14b8a6" />,
    type: 'scroll',
    target: 'contact',
  },
  {
    id: 'action-github',
    label: 'GitHub',
    desc: 'github.com/Kavyasrivenna',
    icon: <FaGithub size={20} color="#f4f4f5" />,
    type: 'link',
    url: 'https://github.com/Kavyasrivenna',
  },
  {
    id: 'action-linkedin',
    label: 'LinkedIn',
    desc: 'linkedin.com/in/kavyasri06',
    icon: <FaLinkedin size={20} color="#0077b5" />,
    type: 'link',
    url: 'https://www.linkedin.com/in/kavyasri06',
  },
];

const QuickActionModal = ({ isOpen, onClose, onNavigateToSection }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleActionClick = (action) => {
    if (action.type === 'link') {
      window.open(action.url, '_blank', 'noopener,noreferrer');
      onClose();
    } else if (action.type === 'scroll') {
      if (onNavigateToSection) {
        onNavigateToSection(action.target);
      } else {
        const el = document.getElementById(action.target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      onClose();
    }
  };

  return (
    <div
      style={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Quick action navigation menu"
    >
      <div
        style={styles.container}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Quick Actions</h2>
            <p style={styles.subtitle}>Jump to any portfolio section or profile link</p>
          </div>
          <button
            onClick={onClose}
            style={styles.closeBtn}
            aria-label="Close menu"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Action Items Grid */}
        <div style={styles.grid}>
          {actions.map((action) => (
            <div
              key={action.id}
              onClick={() => handleActionClick(action)}
              style={styles.card}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleActionClick(action);
                }
              }}
            >
              <div style={styles.iconCircle}>{action.icon}</div>
              <div style={styles.cardText}>
                <div style={styles.labelRow}>
                  <span style={styles.cardLabel}>{action.label}</span>
                  {action.badge && (
                    <span style={styles.badge}>{action.badge}</span>
                  )}
                </div>
                <span style={styles.cardDesc}>{action.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(6px)',
    zIndex: 9998,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  container: {
    width: '100%',
    maxWidth: '540px',
    backgroundColor: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '18px',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
    overflow: 'hidden',
    animation: 'fadeInUp 0.25s ease-out',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '85vh',
  },
  header: {
    padding: '1.2rem 1.4rem 0.8rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid #27272a',
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#fff',
    margin: 0,
  },
  subtitle: {
    fontSize: '0.85rem',
    color: '#a1a1aa',
    margin: '4px 0 0',
  },
  closeBtn: {
    background: '#27272a',
    border: 'none',
    color: '#a1a1aa',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 0.15s, color 0.15s',
  },
  grid: {
    padding: '1rem 1.2rem 1.5rem',
    overflowY: 'auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
    gap: '0.75rem',
  },
  card: {
    backgroundColor: '#27272a',
    border: '1px solid #3f3f46',
    borderRadius: '12px',
    padding: '0.85rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'transform 0.15s, background-color 0.15s, border-color 0.15s',
  },
  iconCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#18181b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardText: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
  },
  labelRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  cardLabel: {
    color: '#fff',
    fontSize: '0.95rem',
    fontWeight: '600',
  },
  badge: {
    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    color: '#fff',
    fontSize: '10px',
    fontWeight: '700',
    padding: '1px 6px',
    borderRadius: '8px',
    textTransform: 'uppercase',
  },
  cardDesc: {
    color: '#a1a1aa',
    fontSize: '0.78rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: '2px',
  },
};

export default QuickActionModal;
