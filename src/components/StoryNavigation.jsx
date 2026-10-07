import React from 'react';
import {
  FaHome, FaLaptopCode,
} from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { GiSkills } from 'react-icons/gi';
import { FcReading } from 'react-icons/fc';
import { HiOfficeBuilding } from 'react-icons/hi';
import { PiCertificate } from 'react-icons/pi';
import { LuContactRound } from 'react-icons/lu';

import { storiesData } from '../data/storiesData';

const iconMap = {
  Home: <FaHome size={22} />,
  About: <IoPerson size={22} />,
  Skills: <GiSkills size={22} />,
  Education: <FcReading size={22} />,
  Experience: <HiOfficeBuilding size={22} />,
  Certification: <PiCertificate size={22} />,
  Projects: <FaLaptopCode size={22} />,
  Contact: <LuContactRound size={22} />,
};

const StoryNavigation = ({ onStoryClick }) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {storiesData.map((story, i) => (
          <div
            key={story.id || i}
            onClick={() => onStoryClick(story, i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onStoryClick(story, i);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Open ${story.label} story`}
            style={styles.link}
          >
            <div style={styles.outerCircle}>
              <div style={styles.innerCircle}>
                {iconMap[story.label] || <FaHome size={22} />}
              </div>
            </div>
            <span style={styles.label}>{story.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    background: '#000',
    padding: '1rem 0.5rem',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    overflowX: 'auto',
  },
  link: {
    textAlign: 'center',
    color: '#fff',
    textDecoration: 'none',
    flex: '0 0 auto',
    cursor: 'pointer',
    width: '80px',
  },
  outerCircle: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    padding: '2px',
    background: 'conic-gradient(red, orange, purple, red)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  },
  innerCircle: {
    width: '66px',
    height: '66px',
    borderRadius: '50%',
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: '12px',
    marginTop: '8px',
    display: 'block',
    color: '#fff',
    wordWrap: 'break-word',
  },
};

export default StoryNavigation;
