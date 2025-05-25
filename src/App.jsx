import { useState, useEffect, useRef } from 'react';
import './App.css';
import GameLayout from './components/layout/GameLayout';
import Card from './components/card/card';
import BallAnimation from './BallAnimation';

function App() {
  const [phase, setPhase] = useState('intro'); // 'intro', 'start', 'jeu', 'perdu'
  const [isGameWon, setIsGameWon] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [targetCards, setTargetCards] = useState([]);
  const audioRef = useRef(null);
  const cardsRef = useRef([]);

  // Référence pour les cartes
  const setCardRef = (index, element) => {
    if (!cardsRef.current) {
      cardsRef.current = [];
    }
    cardsRef.current[index] = element;
  };

  // Gestion du son d'entrée
  useEffect(() => {
    // Créer l'élément audio pour le son d'entrée
    if (!audioRef.current) {
      const audio = new Audio('/assets/audio/theme.mp3');
      audio.volume = 0.5;
      audio.loop = false;
      audioRef.current = audio;
      
      // Jouer le son dès le chargement de la page
      audio.play().catch(e => console.error("Erreur de lecture audio:", e));
      
      // Arrêter le son après 30 secondes
      const timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }, 30000);
      
      return () => clearTimeout(timer);
    }
    
    // Si on passe à la phase 'perdu', arrêter le son
    if (phase === 'perdu' && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [phase]);

  // Simuler une défaite pour tester l'animation (à supprimer en production)
  const simulateDefeat = () => {
    // Définir le niveau de difficulté (1-5)
    const level = Math.min(5, Math.max(1, difficultyLevel));
    setDifficultyLevel(level);
    
    // Sélectionner les cartes cibles en fonction du niveau de difficulté
    const cardElements = cardsRef.current.filter(card => card !== null);
    setTargetCards(cardElements);
    
    // Passer à la phase de défaite
    setPhase('perdu');
  };

  const handleReset = () => {
    setPhase('intro');
    setIsGameWon(false);
    setTargetCards([]);
  };

  const handleStart = () => {
    setPhase('jeu');
  };

  const images = [
    '/src/assets/img/0eh6ppko.png',
    '/src/assets/img/m3z0ldlz.png',
    '/src/assets/img/aaei0qje.png',
    '/src/assets/img/41ouh0ta.png',
    '/src/assets/img/cannabis.jpg',
    '/src/assets/img/ktzie79r.png',
    '/src/assets/img/dbns8fv5.png',
    '/src/assets/img/1mpjgmfw.png',
    '/src/assets/img/aaei0qje.png',
    '/src/assets/img/41ouh0ta.png',
    '/src/assets/img/udoa8xyp.png',
    '/src/assets/img/vblhxve2.png',
  ];

  // Vidéo d'intro
  if (phase === 'intro') {
    return (
      <div className="intro-video-container">
        <video
          className="intro-video"
          src="/assets/intro.mp4"
          autoPlay
          // La vidéo n'est plus muette pour une meilleure expérience avec le son
          onEnded={() => setPhase('start')}
          // Synchroniser le démarrage de la vidéo avec le son
          onPlay={() => {
            // Si le son n'est pas déjà en cours de lecture, le démarrer
            if (audioRef.current && audioRef.current.paused) {
              audioRef.current.play().catch(e => console.error("Erreur de lecture audio:", e));
            }
          }}
        />
        {phase === 'intro' && (
          <button className="btn-commencer" onClick={() => setPhase('start')}>
            Commencer
          </button>
        )}
      </div>
    );
  }

  // Affiche le bouton "Commencer" après la vidéo
  if (phase === 'start') {
    return (
      <div className="start-screen">
        <button className="btn-commencer" onClick={handleStart}>
          Commencer le jeu
        </button>
      </div>
    );
  }

  // Animation de défaite
  if (phase === 'perdu') {
    return (
      <div className="defaite-animation">
        <div className="cards-container">
          {images.map((img, index) => (
            <Card
              key={index}
              image={img}
              isFlipped={true}
              ref={el => setCardRef(index, el)}
            />
          ))}
        </div>
        <BallAnimation 
          difficultyLevel={difficultyLevel} 
          targetCards={targetCards}
        />
        <div className="texte-defaite">Plomo ! Tu as perdu...</div>
        <button className="btn-reinitialiser" onClick={handleReset}>
          Réessayer
        </button>
      </div>
    );
  }

  // Jeu normal
  return (
    <GameLayout onReset={handleReset} isGameWon={isGameWon}>
      {images.map((img, index) => (
        <Card
          key={index}
          image={img}
          isFlipped={false}
          ref={el => setCardRef(index, el)}
          onClick={() => console.log(`Carte ${index + 1} cliquée`)}
        />
      ))}
      {/* Bouton temporaire pour tester l'animation de défaite */}
      <button 
        className="btn-test-defaite" 
        onClick={simulateDefeat}
        style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 1000 }}
      >
        Tester Défaite
      </button>
    </GameLayout>
  );
}

export default App;
