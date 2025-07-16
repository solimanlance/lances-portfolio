import React, { useState, useEffect } from 'react';

const RotatingText = () => {
  const phrases = [
    "a computer science student. 💻",
    "a SpongeBob fanatic. 🧽",
    "a caffiene enjoyer. 🍵",
    "a wannabe marathon runner. 🏃",
    "an r&b listener. 🔊"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // for emojis 
  const splitStringWithEmojis = (str) => {
    return [...str]; 
  };
  
  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    const currentPhraseArray = splitStringWithEmojis(currentPhrase);
    const displayTextArray = splitStringWithEmojis(displayText);
    
    if (isTyping) {
      if (displayTextArray.length < currentPhraseArray.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPhraseArray.slice(0, displayTextArray.length + 1).join(''));
        }, 80); // typing speed
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 450); // pause after typing
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayTextArray.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayTextArray.slice(0, -1).join(''));
        }, 40); // deletion speed
        return () => clearTimeout(timeout);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentIndex, phrases]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);
  return (
    <span className="text-xl text-gray-700">
      {displayText}
      <span className={`border-r-2 border-gray-500 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
        &nbsp;
      </span>
    </span>
  );
};

export default RotatingText;