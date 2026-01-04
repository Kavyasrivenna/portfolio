import React, { useState, useEffect } from "react";
import profileImg from "../assets/1.jpg";
import mentorImage from "../assets/5.jpg.png"; // Mentorship image

const tabs = [
  "About",
  "Projects",
  "Experience",
  "Education",
  "Certifications",
  "Achievements",
  "Soft Skills",
];

// Certificates data for grid layout
const certificateList = [
  {
    title: "High Impact Presentations",
    link: "https://drive.google.com/file/d/17bNDk8Ycb-bgwq0P_xswHDRB2FfRueoG/view?usp=sharing",
  },
  {
    title: "JavaScript",
    link: "https://drive.google.com/file/d/1KxG0wL4fU6_28nhboyZs-Ecv0BnitkOW/view?usp=sharing",
  },
  {
    title: "HTML-5: The Language",
    link: "https://drive.google.com/file/d/12pCjwlV8MXxJkGLA8uOLbFexzWjWvGeo/view?usp=sharing",
  },
  {
    title: "Website Creation",
    link: "https://drive.google.com/file/d/1jxQmBu0QuRf_aYI1mMxxyToAo9APEFDc/view?usp=sharing",
  },
  {
    title: "Time Management",
    link: "https://drive.google.com/file/d/1_6_5-RYiHA0hqei8dY0GwoXTM_bdpWI_/view?usp=sharing",
  },
  {
    title: "Creating Responsive Web Pages using Bootstrap",
    link: "https://drive.google.com/file/d/1Y-uwt4pH2XBsmE3TvPVeCb8noNxYpeFQ/view?usp=sharing",
  },
  {
    title: "Angular Web Development Certification",
    link: "https://drive.google.com/file/d/1qCc9rjWa6EdOPdZIKLP9Vgbs6CfSi-cd/view?usp=sharing",
  },
  {
    title: "Google Cloud Skills Boost",
    link: "https://www.cloudskillsboost.google/public_profiles/ec48ebe2-2463-4e4d-9093-0717e4636c45",
  },
  {
    title: "Web Development Certificate",
    link: "https://drive.google.com/file/d/1ZXe4OH3DyavVYa_UU1ynWw3GRO4sb6T8/view?usp=sharing",
  },
];

const tabContents = {
  About: (
    <div style={{ fontSize: "1rem", lineHeight: "1.6", color: "#ccc" }}>
      <p>
        Hello! I'm <strong>Kavya Sri Venna</strong>, a Computer Science undergraduate (2023–2027) at VNR Vignana Jyothi Institute of Engineering and Technology.
      </p>
      <p>
        I'm an enthusiastic and detail-oriented Full Stack Developer passionate about building scalable, user-friendly applications. I enjoy problem-solving, open-source contributions, and creating impactful software.
      </p>
      <p>
        <strong>Objective:</strong> Seeking opportunities to apply my technical and analytical skills to real-world projects while continuing to learn and grow.
      </p>
      <p>
        <strong>Contact:</strong><br />
        📱{" "}
        <a href="tel:+918639586785" style={{ color: "#0095f6" }}>
          +91 8639586785
        </a>
        <br />
        📧{" "}
        <a href="mailto:kavyasrivenna222@gmail.com" style={{ color: "#0095f6" }}>
          kavyasrivenna222@gmail.com
        </a>
        <br />
        🔗{" "}
        <a
          href="https://github.com/Kavyasrivenna"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0095f6" }}
        >
          GitHub
        </a>
        <br />
        🔗{" "}
        <a
          href="https://www.linkedin.com/in/kavyasri06"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0095f6" }}
        >
          LinkedIn
        </a>
      </p>
    </div>
  ),

  Projects: (
    <div style={{ fontSize: "1rem", lineHeight: "1.6", color: "#ccc" }}>
      <p>
        <strong>1. Device Driver Development (Linux Kernel, C)</strong><br />
        Built a basic character device driver module demonstrating system-level interfacing in Linux.
      </p>

      <p>
        <strong>2. CodePen Clone (HTML, CSS, JavaScript)</strong><br />
        Online HTML/CSS/JS editor with live preview and syntax-aware editing.<br />
        🔗{" "}
        <a
          href="https://github.com/Kavyasrivenna/codepen"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0095f6" }}
        >
          GitHub Repository
        </a>
      </p>

      <p>
        <strong>3. Portfolio Website (React.js)</strong><br />
        Designed a dynamic personal portfolio website. Integrated GitHub repos and certifications.<br />
        🔗{" "}
        <a
          href="https://github.com/Kavyasrivenna/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0095f6" }}
        >
          GitHub Repository
        </a>
      </p>

      <p>
        <strong>4. Tutly — EduTech Platform (Team Project)</strong><br />
        Open-source LMS for student–teacher collaboration. Contributed to UI and module integration.<br />
        🔗{" "}
        <a
          href="https://github.com/TutlyLabs/Tutly"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0095f6" }}
        >
          GitHub Repository
        </a>
      </p>

      <p>
        <strong>5. E-Commerce Website (React.js, Bootstrap)</strong><br />
        Front-end for product listing, search, and filtering. Fully responsive design using Bootstrap.
      </p>
    </div>
  ),

  Experience: {
    text: `
Web Development Mentor | VNRVJIET  
Aug 2023 – Present  

Mentoring juniors on web development fundamentals, full-stack tools, GitHub collaboration, and project development.  

Responsibilities:  
- Guiding peers in frontend (React.js), backend (Node.js, Express), and database (MongoDB) workflows.  
- Conducting hands-on workshops and technical sessions.  
- Providing one-on-one project mentorship and code reviews.  
- Encouraging best practices in version control and deployment.
`,
    image: mentorImage,
  },

  Education: `
Bachelor of Technology in Computer Science and Engineering  
VNR Vignana Jyothi Institute of Engineering & Technology  
2023 – 2027  

Intermediate (MPC)  
Sri Chaitanya Junior College  
2021 – 2023  

Secondary School Certificate (SSC)  
SRM High School, Suryapet  
2020 – 2021
`,

  // ✅ Certificates in Grid Layout
  Certifications: (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1rem",
        fontSize: "1rem",
        color: "#ccc",
      }}
    >
      {certificateList.map((cert, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#111",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #333",
          }}
        >
          <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
            {cert.title}
          </p>
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0095f6" }}
          >
            View Certificate
          </a>
        </div>
      ))}
    </div>
  ),

  Achievements: (
    <div style={{ fontSize: "1rem", lineHeight: "1.6", color: "#ccc" }}>
      <p>
        <strong>Infosys Springboard Pragati: Path to Future Program</strong><br />
        Selected for Apr 2025 – Jul 2025 Cohort.
      </p>

      <p>
        <strong>Leadership & Volunteering</strong><br />
        - Volunteer at GDGC VNRVJIET: Built apps supporting campus tech initiatives and organized events.<br />
        - Volunteer at Microsoft Innovation Hub: Assisted with technical workshops and guided juniors.
      </p>

      <p>
        <strong>Competitions</strong><br />
        Participated in hackathons, coding competitions, and tech events at the institute level.
      </p>
    </div>
  ),

  "Soft Skills": `
- Leadership: Spearheaded peer mentoring initiatives and event organization.  
- Teamwork: Collaborated on projects such as Tutly (EduTech platform) and hackathons.  
- Communication: Strong verbal and written skills through mentoring and presentations.  
- Problem Solving: Applied analytical thinking to debug, design, and optimize solutions.  
- Time Management & Adaptability: Balanced academics, mentoring, and technical projects.
`,
};

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("About");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFollow = () => setIsFollowing((prev) => !prev);

  return (
    <div style={styles.container}>
      {/* Profile Header */}
      <div
        style={{
          ...styles.header,
          flexDirection: isDesktop ? "row" : "column",
          alignItems: isDesktop ? "center" : "flex-start",
        }}
      >
        <img
          src={profileImg}
          alt="Profile"
          style={{
            ...styles.profileImage,
            width: isDesktop ? 120 : 80,
            height: isDesktop ? 120 : 80,
          }}
        />
        <div
          style={{
            marginLeft: isDesktop ? "2rem" : 0,
            marginTop: isDesktop ? 0 : "1rem",
            flex: 1,
          }}
        >
          <h2
            style={{
              fontSize: isDesktop ? "1.8rem" : "1.2rem",
              marginBottom: "0.5rem",
            }}
          >
            Kavya Sri Venna
          </h2>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              fontSize: isDesktop ? "1.1rem" : "0.9rem",
              marginBottom: "1rem",
            }}
          >
            <div>
              <strong>0</strong> Posts
            </div>
            <div>
              <strong>{isFollowing ? 1 : 0}</strong> Followers
            </div>
            <div>
              <strong>0</strong> Following
            </div>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button style={styles.editBtn}>Edit Profile</button>
            <button
              onClick={handleFollow}
              style={{
                ...styles.followBtn,
                backgroundColor: isFollowing ? "#444" : "#0095f6",
              }}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </div>

      <hr style={styles.divider} />

      {/* Tab Bar */}
      <div style={styles.tabBar}>
        {tabs.map((tab) => (
          <span
            key={tab}
            style={{
              ...styles.tab,
              borderBottom: activeTab === tab ? "2px solid #fff" : "none",
              fontWeight: activeTab === tab ? "bold" : "normal",
              color: activeTab === tab ? "#fff" : "#aaa",
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Tab Content */}
      <div style={styles.tabContent}>
        {typeof tabContents[activeTab] === "string" ? (
          <p
            style={{
              fontSize: "1rem",
              lineHeight: "1.6",
              textAlign: "justify",
              color: "#ccc",
              whiteSpace: "pre-wrap",
            }}
          >
            {tabContents[activeTab]}
          </p>
        ) : tabContents[activeTab].text ? (
          <div>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                textAlign: "justify",
                color: "#ccc",
                whiteSpace: "pre-wrap",
              }}
            >
              {tabContents[activeTab].text}
            </p>
            {tabContents[activeTab].image && (
              <img
                src={tabContents[activeTab].image}
                alt="Experience"
                style={{
                  width: "100%",
                  maxWidth: 600,
                  marginTop: "1rem",
                  borderRadius: 10,
                  display: "block",
                }}
              />
            )}
          </div>
        ) : (
          tabContents[activeTab]
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "1rem",
    backgroundColor: "#000",
    color: "#fff",
    minHeight: "100vh",
    paddingBottom: "6rem",
    fontFamily: "sans-serif",
  },
  header: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  profileImage: {
    borderRadius: "50%",
    objectFit: "cover",
  },
  editBtn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#262626",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    fontWeight: "bold",
    cursor: "pointer",
  },
  followBtn: {
    padding: "0.5rem 1rem",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    fontWeight: "bold",
    cursor: "pointer",
  },
  divider: {
    margin: "1.5rem 0",
    borderColor: "#333",
  },
  tabBar: {
    display: "flex",
    overflowX: "auto",
    gap: "1.5rem",
    padding: "0 0.5rem",
    borderBottom: "1px solid #333",
    marginBottom: "1rem",
  },
  tab: {
    cursor: "pointer",
    paddingBottom: "0.5rem",
    fontSize: "1rem",
    whiteSpace: "nowrap",
  },
  tabContent: {
    padding: "0 0.5rem",
  },
};

export default Profile;
