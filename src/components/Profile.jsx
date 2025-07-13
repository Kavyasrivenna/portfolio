import React, { useState, useEffect } from "react";
import profileImg from "../assets/1.jpg";
import mentorImage from "../assets/5.jpg.png"; // Mentorship image

const tabs = ["Projects", "About", "Experience", "Education", "Certifications", "Soft Skills"];

const tabContents = {
  Projects: `
1. CodePen Clone  
A real-time HTML/CSS/JS code editor inspired by CodePen, with live preview and responsive layout.  
🔗 GitHub: https://github.com/Kavyasrivenna/codepen

2. GDGC VNRVJIET Website  
Built the official website for GDGC VNRVJIET with modern UI using React and styled-components.  
🔗 GitHub: https://github.com/Kavyasrivenna/gdgc

3. E-Commerce Website  
Developed a complete frontend e-commerce UI using React.js, JavaScript, and Bootstrap.

4. Device Driver Development (Linux Kernel)  
Built low-level device drivers in C for Linux OS to understand kernel programming and system interaction.

5. CodePen Mini Projects  
A collection of creative frontend components made using HTML, CSS, and JavaScript.  
- Expanding Cards: https://codepen.io/Kavyasri-Venna/pen/jEEzEqp  
- FAQ Accordion: https://codepen.io/Kavyasri-Venna/pen/qBzMvmg  
- Blurry Loading UI: https://codepen.io/Kavyasri-Venna/pen/bGPadXJ  
- Split Landing Page: https://codepen.io/Kavyasri-Venna/pen/KKjZdVw  
- Hidden Search Widget: https://codepen.io/Kavyasri-Venna/pen/NWZvvPy  
- Sound Board Buttons: https://codepen.io/Kavyasri-Venna/pen/JjqbQBj
`,

  About: `
Hello! I'm Kavya Sri Venna, a dedicated and enthusiastic Full Stack Developer and Computer Science undergraduate at VNR Vignana Jyothi Institute of Engineering and Technology (2023–2027).

As a full-stack developer, I specialize in building scalable, user-friendly web applications using the MERN stack — MongoDB, Express.js, React.js, and Node.js. I'm passionate about combining elegant frontends with robust backend systems.

My technical experience includes:
- Developing an end-to-end E-Commerce platform using React, Bootstrap, and Node.js with MongoDB.
- Cloning CodePen with live preview functionality using React and Vanilla JS.
- Implementing device drivers in C for the Linux kernel to understand low-level system behavior.
- Designing and consuming RESTful APIs, implementing authentication, and handling state management with Redux.

Currently, I serve as a Web Development Mentor at VNRVJIET, supporting students in both frontend and backend development practices. I'm also an active contributor at GDGC VNRVJIET and the Microsoft Innovation Hub.

Technical Skills:
- Languages: Java, C++, C, JavaScript
- Frontend: HTML, CSS, React.js, Bootstrap, React Native
- Backend: Node.js, Express.js, MongoDB, REST APIs
- Databases: MongoDB, SQL
- Soft Skills: Leadership, Communication, Problem Solving, Teamwork, Adaptability

Contact:
GitHub: github.com/Kavyasrivenna  
LinkedIn: linkedin.com/in/kavyasri06  
Email: kavyasrivenna222@gmail.com
`,

  Experience: {
    text: `
Full Stack Mentor | Web Development  
VNR Vignana Jyothi Institute of Engineering and Technology  
Aug 2023 – Present

As a Full Stack Web Development Mentor, I support fellow students in mastering both frontend and backend technologies including HTML, CSS, JavaScript, React.js, Node.js, and MongoDB.

Responsibilities:
- Conduct hands-on workshops on frontend frameworks (React.js) and backend development using Express.js.
- Guide peers on building RESTful APIs, handling databases (MongoDB), and integrating backend with frontend.
- Mentor on full project development lifecycle — planning, coding, deployment.
- Provide one-on-one code reviews and feedback on MERN stack projects.

My mentorship fosters real-world skills and builds confidence in deploying scalable full-stack applications.
`,
    image: mentorImage,
  },

  Education: `
Bachelor of Technology in Computer Science and Engineering  
VNR Vignana Jyothi Institute of Engineering & Technology, Hyderabad  
Aug 2023 – Present • Currently Pursuing  
Building a strong foundation in computer science with a focus on full-stack web development, data structures, and real-world software applications.

Intermediate (MPC Stream)  
Sri Chaitanya Junior College, Hyderabad  
Jul 2021 – Apr 2023 • Percentage: 94%  
Excelled in mathematics and science, with consistent academic performance and strong analytical skills.

Secondary School Certificate (SSC)  
SRM High School, Kodad  
Jun 2020 – Apr 2021 • GPA: 10/10  
Achieved academic excellence while actively participating in school-level science exhibitions and leadership activities.
`,

  Certifications: "Certified in React, JavaScript, MongoDB, and more.",

  "Soft Skills": `
Soft Skills
- Leadership: Spearheaded peer mentoring initiatives, helped organize workshops and technical events.
- Communication: Strong verbal and written communication skills demonstrated through mentoring and team collaboration.
- Teamwork: Successfully worked with peers on full-stack development projects and hackathons.
- Adaptability: Quick to learn and apply new technologies; comfortable working under pressure in fast-paced environments.

Leadership & Mentorship
- Web Development Mentor at VNRVJIET: Mentored students in frontend and backend web development using the MERN stack.
- Volunteer at GDGC VNRVJIET and Microsoft Innovation Hub: Contributed to tech sessions, peer guidance, and community development.

Extracurricular Activities
- Participated in institute-level hackathons and coding competitions.
- Member of university tech communities.
- Volunteered in college cultural fests and tech talks.
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
        <div style={{ marginLeft: isDesktop ? "2rem" : 0, marginTop: isDesktop ? 0 : "1rem", flex: 1 }}>
          <h2 style={{ fontSize: isDesktop ? "1.8rem" : "1.2rem", marginBottom: "0.5rem" }}>
            Kavya Sri Venna
          </h2>
          <div style={{ display: "flex", gap: "1.5rem", fontSize: isDesktop ? "1.1rem" : "0.9rem", marginBottom: "1rem" }}>
            <div><strong>0</strong> Posts</div>
            <div><strong>{isFollowing ? 1 : 0}</strong> Followers</div>
            <div><strong>0</strong> Following</div>
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
          <p style={{ fontSize: "1rem", lineHeight: "1.6", textAlign: "justify", color: "#ccc", whiteSpace: "pre-wrap" }}>
            {tabContents[activeTab]}
          </p>
        ) : (
          <div>
            <p style={{ fontSize: "1rem", lineHeight: "1.6", textAlign: "justify", color: "#ccc", whiteSpace: "pre-wrap" }}>
              {tabContents[activeTab].text}
            </p>
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
          </div>
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
    paddingBottom: "6rem", // prevents overlap with footer
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
