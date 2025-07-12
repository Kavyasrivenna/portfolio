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

const items = [
  { icon: <FaHome size={22} />, label: 'Home' },
  { icon: <IoPerson size={22} />, label: 'About' },
  { icon: <GiSkills size={22} />, label: 'Skills' },
  { icon: <FcReading size={22} />, label: 'Education' },
  { icon: <HiOfficeBuilding size={22} />, label: 'Experience' },
  { icon: <PiCertificate size={22} />, label: 'Certification' },
  { icon: <FaLaptopCode size={22} />, label: 'Projects' },
  { icon: <LuContactRound size={22} />, label: 'Contact' },
];

const StoryNavigation = ({ onStoryClick }) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => onStoryClick(item.label)}
            style={styles.link}
          >
            <div style={styles.outerCircle}>
              <div style={styles.innerCircle}>
                {item.icon}
              </div>
            </div>
            <span style={styles.label}>{item.label}</span>
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
