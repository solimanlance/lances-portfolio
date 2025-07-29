import { useState, useEffect } from 'react';
import Image from 'next/image';
import RotatingText from '../components/RotatingText';


export default function Home() {


  const [activeSection, setActiveSection] = useState('home');

  // button ids and labels
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-sky-100">

      {/* 'navbar' which is just buttons at the top */}
      <nav className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 md:px-8 py-4 shadow-lg overflow-x-auto max-w-[90vw]">
          <div className="flex items-center space-x-2 w-max">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 md:px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeSection === section.id
                    ? 'text-white bg-[#01C2DF] shadow-md'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
        {/* sections */}
      <section id="home" className="min-h-[850px] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 mt-20">🙋🏻‍♂️ Hey there! I&apos;m</h1>
          <h1 className="text-8xl font-bold text-gray-800 mb-6">Lance Soliman</h1>
          <div className = "-mt-4"> {/* negative margin */}
           
            <RotatingText />
          </div>
          <button
                onClick={() => scrollToSection("projects")}
                className= "mt-6 px-8 py-3 rounded-full text-medium font-medium transition-all duration-300 text-white bg-[#01C2DF] shadow-md hover:bg-sky-600"
              >
              See what I&apos;ve built!
          </button>
        </div>

        <div className="absolute bottom-20 transform animate-bounce">
          <svg
            className="w-8 h-8 text-[#199eb2]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-7-7m7 7l7-7" />
          </svg>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="heading-2 mb-10">About Me</h2>
          <Image
            src="/img/selfpic3.png"
            alt="Example"
            width={300}
            height={300}
            unoptimized
            className="mx-auto rounded-lg shadow-2xl mb-10"
          />
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mb-10">
            <a 
              href="https://linkedin.com/in/lance-soliman" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-900 hover:text-blue-600 transition-colors duration-300"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            
            <a 
              href="https://github.com/solimanlance" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-900 hover:text-gray-900 transition-colors duration-300"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            <a 
              href="https://instagram.com/lancesolimann" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-900 hover:text-pink-600 transition-colors duration-300"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
            <a 
              href="mailto:lancessoliman@gmail.com"
              className="text-sky-900 hover:text-red-600 transition-colors duration-300"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-.904.732-1.636 1.636-1.636h.85l9.514 7.136 9.514-7.136h.85c.904 0 1.636.732 1.636 1.636z"/>
              </svg>
            </a>
          </div>
          <p className="text-l text-gray-800 max-w-2xl mx-auto">
            I&apos;m currently a 3rd year @ the University of British Columbia pursuing a degree in Computer Science with a minor in Data Science.
          </p>
          <br></br>
          <p className="text-l text-gray-800 max-w-2xl mx-auto">
            Outside of school, you&apos;ll probably spot me staying active in some form - bouldering, hiking, or even training for a half-marathon. 
            Beyond that, I enjoy attending hackathons, videography, and eating at Big Way Hot Pot!
          </p>
          <br>
          </br>
          <p className="text-l text-gray-800 max-w-2xl mx-auto">
            If you wanna connect, you can reach me at the socials above!
          </p>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="heading-2 mb-10">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {[
        { 
          name: "WildlifeDB", 
          description: "A web app with an integrated relational database to track wildlife management relationships.",
          image: "/img/wilddb.png",
          link: "https://github.com/solimanlance/WildlifeDB/",
          stack:"SQL, JavaScript, HTML/CSS"
        },
        { 
          name: "Paper Profit", 
          description: "A virtual stock market simulator providing an environment for users to learn about investing.",
          image: "/img/profit2.png",
          link: "https://github.com/solimanlance/paper-profit",
          stack:"Java, Swing, JUnit"
        },
        { 
          name: "Refine", 
          description: "An AI advisor that provides students with essay feedback using prompt engineering.",
          image: "/img/refine1.png",
          link: "https://github.com/solimanlance/refine-HelloHacks",
          stack:"JavaScript, Node.js, HTML/CSS, Figma"
        },
        { 
          name: "Study With Me", 
          description: "An app focused on connecting UBC students on campus with a dedicated floor plan.",
          image: "/img/study2.png",
          link: "https://github.com/solimanlance/StudyWithMe",
          stack:"Python, Flask, TypeScript, HTML/CSS"
        },
        { 
          name: "PokéPredictor", 
          description: "A classification model to predict Legendary Pokémon status, achiving 76% accuracy.",
          image: "/img/poke.png",
          link: "https://github.com/solimanlance/dsci-100-project",
          stack:".R, rvest, tidyverse, tidymodels"
        },
        { 
          name: "Insightful", 
          description: "A Chrome extension to increase web accessibility for those with visual impairment.",
          image: "/img/insight.png",
          link: "https://github.com/solimanlance/Hackcamp-InSightful",
          stack:"JavaScript, HTML/CSS"
        },
       
      ].map((project, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <img src={project.image} alt={project.name} className="w-full h-60 object-cover shadow-md rounded mb-4" />
          <h3 className="text-xl text-sky-900 font-semibold mb-1">{project.name}</h3>
          <p className="text-gray-700 text-sm italic mb-4">{project.stack}</p>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer" 
             className="text-sky-500 hover:text-blue-800 underline">
            View on GitHub
          </a>
        </div>
      ))}
    </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {['Java', 'Python', 'R', 'HTML/CSS', 'JavaScript', 'C++', 'SQL', 'C', 'Git', 'JUnit', 'Node.js', 'React', 'pandas', 'sckit-learn', 'tidyverse'].map((skill) => (
              <span key={skill} className="bg-blue-100 text-sky-800 px-5 py-2 rounded-full font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Me</h2>
          <p className="text-m text-gray-600 max-w-2xl mx-auto mb-8">
            I&apos;m always open to connect or have a chat, so feel free to use one of the social media platforms below to reach out!
          </p>
          {/* <button className="bg-[#01C2DF] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-sky-600 transition-colors">
            Contact Me
          </button> */}
           {/* Social Media Icons */}
           <div className="flex justify-center space-x-10 mb-3">
            <a 
              href="https://linkedin.com/in/lance-soliman" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-900 hover:text-blue-600 transition-colors duration-300"
            >
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            
            <a 
              href="https://github.com/solimanlance" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-900 hover:text-gray-900 transition-colors duration-300"
            >
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            <a 
              href="https://instagram.com/lancesolimann" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-900 hover:text-pink-600 transition-colors duration-300"
            >
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
            <a 
              href="mailto:lancessoliman@gmail.com"
              className="text-sky-900 hover:text-red-600 transition-colors duration-300"
            >
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-.904.732-1.636 1.636-1.636h.85l9.514 7.136 9.514-7.136h.85c.904 0 1.636.732 1.636 1.636z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}