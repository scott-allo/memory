import React, { useEffect, useRef, useState } from "react";
import Game from "./components/Game/Game";
import IntroVideo from "./components/IntroVideo";
import "./App.css";

function App() {
  const [phase, setPhase] = useState("start"); // 'start', 'intro', 'jeu'
  const [isGameWon, setIsGameWon] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [targetCards, setTargetCards] = useState([]);
  const audioRef = useRef(null);

  // Prépare l'audio une seule fois
  useEffect(() => {
    audioRef.current = new Audio("src/assets/audio/theme.mp3");
    audioRef.current.volume = 0.5;
    audioRef.current.loop = false;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Fonction pour lancer la musique
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) =>
        console.error("Erreur de lecture audio:", e)
      );
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }, 30000);
    }
  };

  // Phase 1 : écran d'accueil
  if (phase === "start") {
    return (
      <div className="memory-narcos start-screen">
        <h1>Bienvenue en Colombie gringoss</h1>
        <button
          className="narcos-button"
          onClick={() => {
            playAudio();
            setPhase("intro");
          }}
        >
          Commencer le jeu
        </button>
      </div>
    );
  }

  // Phase 2 : vidéo d'intro
  if (phase === "intro") {
    return <IntroVideo onEnd={() => setPhase("jeu")} />;
  }

  // Phase 3 : jeu
  return (
    <div className="memory-narcos">
      <h1>Plata o Plomo</h1>
      <Game
        isGameWon={isGameWon}
        setIsGameWon={setIsGameWon}
        difficultyLevel={difficultyLevel}
        targetCards={targetCards}
        setTargetCards={setTargetCards}
      />
    </div>
  );
}

export default App;
