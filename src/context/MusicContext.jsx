import { createContext, useRef, useCallback } from "react";

export const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const videoRef = useRef(null);

  const playMusic = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <MusicContext.Provider value={{ playMusic }}>
      <video
        ref={videoRef}
        src="/falling-for-you.mp4"
        loop
        playsInline
        preload="auto"
        muted={false}
        aria-label="Falling for You by The 1975"
        style={{
          position: "fixed",
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      {children}
    </MusicContext.Provider>
  );
}
