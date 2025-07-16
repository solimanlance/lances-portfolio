import { useState, useEffect } from 'react';
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
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-8 py-4 shadow-lg">
          <div className="flex items-center space-x-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
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
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">👋 Hey there! I'm</h1>
          <h1 className="text-8xl font-bold text-gray-800 mb-6">Lance Soliman</h1>
          <div className = "-mt-4"> {/* negative margin */}
           
            <RotatingText />
          </div>
          <button
                onClick={() => scrollToSection("projects")}
                className= "mt-6 px-8 py-3 rounded-full text-medium font-medium transition-all duration-300 text-white bg-[#01C2DF] shadow-md hover:bg-sky-600"
              >
              See what I've built!
          </button>
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About Me</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            this is the about section where i'll probably have some intro about me, and some brief talk about my experience and whatnot
          </p>
        </div>
      </section>

      <section id="projects" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3].map((project) => (
              <div key={project} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3">project {project}</h3>
                <p className="text-gray-600">brief description of this project</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'CSS', 'HTML', 'Git'].map((skill) => (
              <span key={skill} className="bg-blue-100 text-blue-800 px-5 py-2 rounded-full font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">get in touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            ready to work or something? contact me
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors">
            Contact Me
          </button>
        </div>
      </section>
    </div>
  );
}