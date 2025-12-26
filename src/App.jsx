import { useEffect, useRef, useState } from "react";
import "./FlipBook.css";
import { pages } from "./message.js";
import flipSound from "../sounds/one-page-book-flip-101928.mp3";
import music from "../sounds/let-down.mp3";

export default function App() {
  const [current, setCurrent] = useState(0);
  const audioRef = useRef(null);
  const musicRef = useRef(null);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = 0.2; // subtle volume
      musicRef.current.play().catch((err) => {
        console.log("Autoplay blocked or paused:", err);
      });
    }
  }, []); // empty dependency → runs once on mount

  const next = () => {
    if (current < pages.length) {
      setCurrent(current + 1);
      playSound();
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      playSound();
    }
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // restart
      audioRef.current.play();
    }
  };

  return (
    <div className="container">
      <div className="book-wrapper">
        <div className="book">
          {pages.map((page, index) => (
            <div
              key={index}
              className={`page ${index < current ? "flipped" : ""}`}
              style={{ zIndex: pages.length - index }}
            >
              {page.title && <h1 className="title">{page.title}</h1>}
              <p>{page.text}</p>
              <span className="page-number">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="nav-group">
        <button
          onClick={prev}
          disabled={current === 0}
        >
          ‹
        </button>
        <button
          onClick={next}
          disabled={current === pages.length}
        >
          ›
        </button>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef}>
        <source
          src={flipSound}
          type="audio/mpeg"
        />
      </audio>

      <audio
        ref={audioRef}
        loop
      >
        <source
          src={music}
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}
