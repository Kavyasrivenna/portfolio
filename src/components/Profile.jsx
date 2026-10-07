import React, { useState, useEffect } from "react";
import { FaFileAlt, FaExternalLinkAlt } from "react-icons/fa";
import profileImg from "../assets/1.jpg";
import mentorImage from "../assets/5.jpg.png"; // Mentorship image

const RESUME_URL = "https://drive.google.com/file/d/1tlu6fqaEC-xf_6VPGi4wFJgLEVrEWF1D/view?usp=sharing";

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
    title: "Infosys Springboard Internship 6.0 Certificate",
    link: "https://drive.google.com/file/d/1BiT1kL-dDXis58PCwyIXsOYtgUvwa_ZA/view",
  },
  {
    title: "Certified in Front End Web Development (Infosys Springboard)",
    link: "https://drive.google.com/file/d/1BiT1kL-dDXis58PCwyIXsOYtgUvwa_ZA/view",
  },
  {
    title: "Certified in Google Cloud (Google Cloud Skills Boost)",
    link: "https://www.cloudskillsboost.google/public_profiles/ec48ebe2-2463-4e4d-9093-0717e4636c45",
  },
  {
    title: "Cloud Computing Essentials Certificate",
    link: "https://drive.google.com/file/d/1ZXe4OH3DyavVYa_UU1ynWw3GRO4sb6T8/view?usp=sharing",
  },
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
];

const tabContents = {
  About: (
    <div style={{ fontSize: "1rem", lineHeight: "1.6", color: "#ccc" }}>
      <p>
        Hello! I'm <strong>Kavya Sri Venna</strong>, a Computer Science undergraduate (2023–2027) at <strong>VNR Vignana Jyothi Institute of Engineering and Technology (VNRVJIET)</strong>, Hyderabad (CGPA: <strong>8 / 10</strong>).
      </p>
      <p>
        Software Engineering student with strong foundations in Data Structures, Algorithms, Object-Oriented Programming, and Operating Systems. Experienced in building scalable backend services, full-stack applications, and designing RESTful APIs using modern web technologies like React, Node.js, Express, and MongoDB.
      </p>
      <div style={{ margin: "1rem 0" }}>
        <p style={{ margin: "0 0 0.5rem", color: "#fff", fontWeight: "600" }}>Key Highlights & Credentials:</p>
        <ul style={{ paddingLeft: "1.2rem", margin: 0, color: "#ccc", lineHeight: "1.7" }}>
          <li><strong>CGPA:</strong> 8 / 10 at VNR Vignana Jyothi Institute of Engineering & Technology</li>
          <li><strong>Smart Interviews Gold Certificate:</strong> Top 9,000 rank among 45,000+ students (2024)</li>
          <li><strong>VibethonX 2025:</strong> Hackathon Finalist conducted at CBIT</li>
          <li><strong>Infosys Springboard Pragati:</strong> Selected for Path to Future Program (2025)</li>
          <li><strong>Leadership:</strong> Web Development Mentor guiding 70+ students in full-stack engineering</li>
          <li><strong>Competitive Programming:</strong> LeetCode Rating 1400 | CodeChef Rating 1420</li>
        </ul>
      </div>

      <div style={{ margin: "1.2rem 0" }}>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "6px",
            fontWeight: "600",
            fontSize: "0.95rem",
            textDecoration: "none",
            boxShadow: "0 2px 10px rgba(236, 72, 153, 0.35)",
          }}
          aria-label="View Resume in new tab"
        >
          <FaFileAlt size={14} />
          <span>View Resume</span>
          <FaExternalLinkAlt size={11} />
        </a>
      </div>

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
        <strong>1. Blood Donation Platform (React.js, Node.js, Express, MongoDB, JWT)</strong><br />
        Full-stack MERN application connecting blood donors and recipients. Implemented secure JWT authentication, location-based donor search, and emergency request workflows.<br />
        🔗{" "}
        <a
          href="https://github.com/Kavyasrivenna/blood-donation"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0095f6" }}
        >
          GitHub Repository
        </a>
      </p>

      <p>
        <strong>2. CodePen Clone (HTML, CSS, JavaScript, React.js)</strong><br />
        Online browser-based code editor with real-time live preview and sandboxed rendering.<br />
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
        <strong>3. E-Commerce Website (React.js, Bootstrap)</strong><br />
        Collaborative frontend for product cataloging, category filtering, and cart state.<br />
        🔗{" "}
        <a
          href="https://github.com/Kavyasrivenna/gdgc"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0095f6" }}
        >
          GitHub Repository
        </a>
      </p>

      <p>
        <strong>4. Device Driver Development (Linux Kernel, C)</strong><br />
        Character device driver module demonstrating system-level hardware interfacing and memory buffer handling in Linux.
      </p>

      <p>
        <strong>5. Portfolio Website (React.js, Tailwind CSS)</strong><br />
        Dynamic personal portfolio with Instagram-like story circles, reels viewer, and interactive sections.<br />
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
        <strong>6. Tutly – Open Source EduTech Platform (React.js, Next.js 15, TypeScript, Tailwind CSS, tRPC, Prisma)</strong><br />
        Contributed to Tutly, an open-source Learning Management System (LMS) with attendance tracking, assignment workflows, interactive code playgrounds, and real-time notifications. Developed reusable React components and integrated backend APIs.<br />
        🔗{" "}
        <a
          href="https://github.com/TutlyLabs/Tutly"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0095f6", marginRight: "1rem" }}
        >
          GitHub Repository
        </a>
        🔗{" "}
        <a
          href="https://www.tutly.in"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0095f6" }}
        >
          Live Platform
        </a>
      </p>
    </div>
  ),

  Experience: {
    text: `
1. Full-Stack Software Engineering Intern (Internship 6.0) | Infosys Springboard
Sep 2025 – Dec 2025 (Remote)
Project: TaxPal — Personal Finance & Tax Estimator for Freelancers
Credential: View Internship Certificate (https://drive.google.com/file/d/1BiT1kL-dDXis58PCwyIXsOYtgUvwa_ZA/view)

Responsibilities:
• Developed & improved scalable backend services, full-stack web modules using React, Node.js and MongoDB.
• Designed and implemented RESTful APIs to support integration of intelligent services and external APIs.
• Worked in an Agile development environment involving sprint planning, code reviews, and iterative delivery.
• Deployed and tested backend services on cloud infrastructure (basic exposure to AWS services).

2. Web Development Mentor | VNRVJIET  
2024 – Present  

Responsibilities:  
• Guided 70+ students in frontend and full-stack development covering React.js, Node.js, Express, and MongoDB workflows.  
• Conducted hands-on technical workshops, collaborative coding sessions, and architecture reviews.  
• Mentored student teams on Git/GitHub version control, code hygiene, and cloud deployment pipelines.
`,
    image: mentorImage,
  },

  Education: `
Bachelor of Technology in Computer Science and Engineering (CGPA: 8 / 10)  
VNR Vignana Jyothi Institute of Engineering & Technology, Hyderabad  
Nov 2023 – June 2027  

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
        <strong>🏆 Smart Interviews Gold Certificate (2024)</strong><br />
        Ranked among top 9,000 participants out of 45,000+ students across rigorous data structures, algorithms, and problem-solving benchmarks.
      </p>

      <p>
        <strong>🚀 Finalist at VibethonX 2025 Hackathon</strong><br />
        Selected as a finalist at VibethonX 2025 Hackathon conducted at CBIT, building high-impact software solutions under tight sprint deadlines.
      </p>

      <p>
        <strong>🌟 Infosys Springboard Pragati: Path to Future Program (2025)</strong><br />
        Selected for the prestigious Infosys Springboard Pragati program cohort focusing on advanced industry technical readiness and full-stack engineering.
      </p>

      <p>
        <strong>👥 Web Development Mentorship (70+ Students)</strong><br />
        Guided 70+ students in frontend and full-stack development, modern web frameworks, Git collaboration, and project architecture at VNRVJIET.
      </p>

      <p>
        <strong>💻 Competitive Programming</strong><br />
        • LeetCode Contest Rating: <strong>1400</strong><br />
        • CodeChef Rating: <strong>1420</strong><br />
        Active problem solver across arrays, dynamic programming, trees, and graphs.
      </p>

      <p>
        <strong>🤝 Technical Volunteering</strong><br />
        • Google Developer Groups (GDGC VNRVJIET) volunteer.<br />
        • Microsoft Innovation Hub student coordinator.
      </p>
    </div>
  ),

  "Soft Skills": `
- Leadership: Spearheaded peer mentoring initiatives, guiding 70+ junior students.  
- Teamwork: Collaborated on open-source initiatives (Tutly LMS) and hackathon projects.  
- Communication: Strong verbal and technical writing skills through workshops and presentations.  
- Problem Solving: Analytical thinking for debugging, algorithm design, and system optimization.  
- Time Management & Adaptability: Successfully balanced engineering academics (CGPA: 8/10) with mentorship and full-stack projects.
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
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", alignItems: "center" }}>
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
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.resumeHeaderBtn}
              aria-label="View official resume in new tab"
            >
              <FaFileAlt size={13} style={{ marginRight: "6px" }} />
              <span>View Resume</span>
              <FaExternalLinkAlt size={10} style={{ marginLeft: "5px", opacity: 0.85 }} />
            </a>
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
  resumeHeaderBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.5rem 1rem",
    background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: "0.9rem",
    textDecoration: "none",
    boxShadow: "0 2px 10px rgba(236, 72, 153, 0.4)",
    cursor: "pointer",
    transition: "transform 0.15s, opacity 0.15s",
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
