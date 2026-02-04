import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Celebration.css";

const ROMANTIC_LINES = [
  "You just made me the happiest person today.",
  "Every moment with you feels like a celebration.",
  "I fall for you more every single day.",
  "You're my favorite place to be.",
  "Forever isn't long enough with you.",
];

const SONG_LYRICS = [
  { text: "Don't you see me I", time: 1 },
  { text: "I think I'm falling, I'm falling for you", time: 5, special: true },
  { text: "And don't you need me I", time: 11 },
  { text: "I think I'm falling, I'm falling for you", time: 17, special: true },
  { text: "On this night, and in this light", time: 22 },
  { text: "I think I'm falling, I'm falling for you", time: 28, special: true  },
  { text: "And maybe you, change your mind", time: 33 },
  { text: "I think I'm falling, I think I'm falling", time: 39, special: true },
];

function Celebration() {
  const [activeLyrics, setActiveLyrics] = useState([]);

  useEffect(() => {
    const timeouts = [];
    
    SONG_LYRICS.forEach((lyric) => {
      const timeout = setTimeout(() => {
        const id = Math.random();
        let x, y;
        
        // Position only in bottom area, avoiding center and edges
        x = Math.random() * 60 + 20; // 20-80%
        y = Math.random() * 10 + 75; // 75-85%
        
        const newLyric = {
          id,
          text: lyric.text,
          x,
          y,
          special: lyric.special,
        };
        
        setActiveLyrics(prev => [...prev, newLyric]);
        
        setTimeout(() => {
          setActiveLyrics(prev => prev.filter(l => l.id !== id));
        }, 4000);
      }, lyric.time * 1000);
      
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="celebration-page">
      <div className="celebration-bg" />
      
      {/* Floating lyrics */}
      {activeLyrics.map(lyric => (
        <div
          key={lyric.id}
          className={`floating-lyric ${lyric.special ? 'special-lyric' : ''}`}
          style={{
            left: `${lyric.x}%`,
            top: `${lyric.y}%`,
          }}
        >
          {lyric.text}
        </div>
      ))}
      
      <div className="celebration-content">
        <div className="celebration-gif-wrap">
          <img
            src="https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif"
            alt="Celebration"
            className="celebration-gif"
          />
        </div>
        <h1 className="celebration-title">Yay! My Thakkudu said Yes! 💕</h1>
        <p className="celebration-sub">I'm so happy you're my Valentine, Gopikaeyy 😘</p>
        <p className="celebration-sub">I will never leave you, Gopi. Forever yours, Adhi.💞🤟</p>
        <Link to="/" className="back-link">
          ← Back to the question
        </Link>
      </div>
    </div>
  );
}

export default Celebration;
