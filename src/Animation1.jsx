import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./styles.css";
import pic from "./pic.png"

const BubbleSplit = () => {
  const [bubbles, setBubbles] = useState([]);
  const [screenWidth, setScreenWidth] = useState(390); // iPhone 12 Pro width
  const [screenHeight, setScreenHeight] = useState(844); // iPhone 12 Pro height
  const popSound = new Audio("/recording.m4a"); // Replace with actual sound path

  useEffect(() => {
    setBubbles([{ id: 1, x: screenWidth / 2 - 200, y: screenHeight / 2 - 200, size: 300 }]);
  }, [screenWidth, screenHeight]);

  const splitBubble = (id, x, y, size) => {
    if (size < 20) return; // Stop splitting when too small
    popSound.play(); // Play sound on split
    const offset = size; // Increase distance between new bubbles
    setBubbles((prevBubbles) =>
      prevBubbles
        .filter((bubble) => bubble.id !== id)
        .concat(
          { id: Math.random(), x: Math.max(0, x - offset), y: y, size: size / 2 },
          { id: Math.random(), x: Math.min(screenWidth - size / 2, x + offset), y: y, size: size / 2 }
        )
    );
  };

  return (
    <div className="container" style={{ width: screenWidth, height: screenHeight }}>
      {bubbles.map(({ id, x, y, size }) => (
        <motion.div
          key={id}
          className="bubble"
          style={{ width: size, height: size, left: x, top: y }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            splitBubble(id, x, y, size);
          }}
          animate={{ y: [y, y - 30, y + 30, y] }}
          transition={{ repeat: Infinity, duration: Math.random() * 3 + 2, ease: "easeInOut" }}
          drag
          dragConstraints={{ top: 0, left: 0, right: screenWidth - size, bottom: screenHeight - size }}
        >
          <img 
            src={pic}
            alt="Bubble Icon" 
            className="bubble-image" 
            style={{ width: size * 0.6, height: size * 0.6 }} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default BubbleSplit;
