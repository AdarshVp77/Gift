import { useState, useCallback, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import "./Valentine.css";

const NO_MESSAGES = [
  "Thakudu, Noooo!! 😭",
  "Ponney, Noooo!! 😭",
  "Mwuthey, Noooo!! 😭",
  "Ponnarey, Noooo!! 😭",
  "Mwuthmani, Noooo!! 😭",
  "Shuttu, Noooo!! 😭",
  "Sunke, Noooo!! 😭",
  "Sundhari, Noooo!! 😭",
  "Chakkarey, Noooo!! 😭",
  "Mwuthmani, Noooo!! 😭",
  "Wifey, Noooo!! 😭",
  "Thakkuuuu, Noooo!! 😭",
  "Gopikaeyy, Noooo!! 😭",
  "Gopiiiiii, Noooo!! 😭",
];

function Valentine() {
  const navigate = useNavigate();
  const { playMusic } = useContext(MusicContext);
  const [noPosition, setNoPosition] = useState(null);
  const [hoverCount, setHoverCount] = useState(0);
  const [displayedMessageIndex, setDisplayedMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [messagePosition, setMessagePosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef(null);

  const handleYes = () => {
    playMusic?.();
    navigate("/yes");
  };

  const runAway = useCallback(() => {
    const padding = 12;
    const w = typeof window !== "undefined" ? window.innerWidth : 360;
    const h = typeof window !== "undefined" ? window.innerHeight : 640;

    const btnRect = noButtonRef.current?.getBoundingClientRect();
    const btnW = btnRect?.width ?? 120;
    const btnH = btnRect?.height ?? 52;

    const minLeft = padding;
    const maxLeft = Math.max(padding, w - btnW - padding);
    const minTop = padding;
    const maxTop = Math.max(padding, h - btnH - padding);

    const nextLeft = minLeft + Math.random() * (maxLeft - minLeft);
    const nextTop = minTop + Math.random() * (maxTop - minTop);

    setNoPosition({ left: nextLeft, top: nextTop });
    setHoverCount((prev) => {
      const next = prev + 1;
      // Drive the message sequence off hoverCount (attempt count)
      setDisplayedMessageIndex((next - 1) % NO_MESSAGES.length);
      return next;
    });

    // Calculate message position near the button (viewport coords)
    setTimeout(() => {
      const r = noButtonRef.current?.getBoundingClientRect();
      if (!r) return;
      setMessagePosition({ x: r.left + r.width / 2, y: r.top - 10 });
    }, 0);

    // Show message for this attempt
    setShowMessage(true);
  }, []);

  // Set an initial fixed position next to the Yes button
  useEffect(() => {
    if (noPosition) return;
    
    const setInitialPosition = () => {
      const yesBtn = document.querySelector('.btn-yes');
      const r = yesBtn?.getBoundingClientRect();
      if (!r || r.width === 0) {
        // If Yes button not ready, try again
        setTimeout(setInitialPosition, 50);
        return;
      }
      
      // For mobile, position below the Yes button
      if (window.innerWidth <= 480) {
        setNoPosition({ left: r.left, top: r.bottom + 10 });
      } else {
        // For desktop, position to the right
        setNoPosition({ left: r.right + 16, top: r.top + (r.height / 2) - 21 });
      }
    };
    
    // Start positioning after a small delay
    const timer = setTimeout(setInitialPosition, 200);
    return () => clearTimeout(timer);
  }, [noPosition]);

  // Hide message after 1 second
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <div className="valentine-page">
      <div className="valentine-bg" />
      <div className="hearts-bg" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="floating-heart" style={{ "--i": i }}>
            ♥
          </span>
        ))}
      </div>

      <div className="valentine-card">
        <div className="teddy-container">
          <span className="teddy" role="img" aria-label="teddy bear">
            🧸
          </span>
        </div>
        <h1 className="valentine-quote">Will you be my Valentine? Gopi! 🥰</h1>
        <p className="valentine-sub">Say yes and make my day 💕</p>

        <div className="buttons-wrap">
          <button type="button" className="btn btn-yes" onClick={handleYes}>
            Yes!
          </button>
          <button
            ref={noButtonRef}
            type="button"
            className="btn btn-no"
            style={{
              left: noPosition?.left ?? undefined,
              top: noPosition?.top ?? undefined,
            }}
            onMouseEnter={runAway}
            onTouchStart={runAway}
            onClick={runAway}
          >
            No
          </button>
          {showMessage && (
            <div
              className="no-message"
              style={{
                left: `${messagePosition.x}px`,
                top: `${messagePosition.y}px`,
              }}
            >
              {NO_MESSAGES[displayedMessageIndex]}
            </div>
          )}
        </div>

        {hoverCount > 2 && (
          <p className="hint">Maybe try the other button? 😊</p>
        )}
      </div>
    </div>
  );
}

export default Valentine;
