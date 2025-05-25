// src/components/BallAnimation.jsx
import React, { useEffect, useState, useRef } from 'react';
import './BallAnimation.css';

const BallAnimation = ({ difficultyLevel, targetCards = [] }) => {
  const [balls, setBalls] = useState([]);
  const [currentWave, setCurrentWave] = useState(0);
  const animationRef = useRef(null);
  const audioRef = useRef(null);

  // Fonction pour jouer le son de tir
  const playShootSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Erreur de lecture audio:", e));
    }
  };

  // Déterminer le nombre de balles en fonction du niveau de difficulté
  const getBallsForDifficulty = (level) => {
    switch(level) {
      case 1: return 2;
      case 2: return 4;
      case 3: return 6;
      case 4: return 8;
      case 5: return 12;
      default: return 2;
    }
  };

  // Fonction pour créer une nouvelle vague de balles
  const createNewWave = (waveIndex) => {
    const numberOfBalls = getBallsForDifficulty(difficultyLevel);
    const targetCardsForWave = targetCards.slice(
      waveIndex * numberOfBalls, 
      (waveIndex + 1) * numberOfBalls
    );
    
    // Si plus de cartes cibles, arrêter l'animation
    if (targetCardsForWave.length === 0) {
      return [];
    }
    
    return targetCardsForWave.map((card, index) => {
      // Calculer la position de départ aléatoire (hors écran)
      const startX = Math.random() * 100;
      const startY = -50; // Au-dessus de l'écran
      
      // Obtenir la position de la carte cible
      const cardRect = card.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Convertir en pourcentage
      const targetX = (cardRect.left + cardRect.width / 2) / viewportWidth * 100;
      const targetY = (cardRect.top + cardRect.height / 2) / viewportHeight * 100;
      
      return {
        id: `wave-${waveIndex}-ball-${index}`,
        startX: `${startX}%`,
        startY: `${startY}%`,
        targetX: `${targetX}%`,
        targetY: `${targetY}%`,
        targetCard: card,
        hit: false,
        animationDelay: index * 200, // Délai entre chaque balle
      };
    });
  };

  // Démarrer l'animation par vagues
  useEffect(() => {
    if (!targetCards || targetCards.length === 0) return;
    
    // Créer la première vague
    setBalls(createNewWave(0));
    
    // Configurer l'audio
    if (!audioRef.current) {
      const audio = new Audio('/assets/audio/gunshot.mp3');
      audio.volume = 0.3;
      audioRef.current = audio;
    }
    
    // Jouer le son pour la première vague
    playShootSound();
    
    // Nettoyer
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [targetCards]);

  // Gérer les impacts et les vagues suivantes
  useEffect(() => {
    if (balls.length === 0) return;
    
    // Vérifier les impacts après un délai
    const checkImpacts = () => {
      const allHit = balls.every(ball => ball.hit);
      
      if (allHit) {
        // Passer à la vague suivante
        const nextWave = currentWave + 1;
        const maxWaves = Math.ceil(targetCards.length / getBallsForDifficulty(difficultyLevel));
        
        if (nextWave < maxWaves) {
          setCurrentWave(nextWave);
          setBalls(createNewWave(nextWave));
          playShootSound();
        }
      }
    };
    
    // Vérifier les impacts après que l'animation ait eu le temps de se dérouler
    animationRef.current = setTimeout(checkImpacts, 2000);
    
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [balls, currentWave]);

  // Gérer l'impact d'une balle sur une carte
  const handleBallAnimationEnd = (ballId) => {
    setBalls(prevBalls => 
      prevBalls.map(ball => 
        ball.id === ballId ? { ...ball, hit: true } : ball
      )
    );
  };

  return (
    <div className="ball-animation">
      {balls.map(ball => (
        <div 
          key={ball.id} 
          className="ball" 
          style={{ 
            left: ball.startX, 
            top: ball.startY,
            animationDelay: `${ball.animationDelay}ms`
          }}
          data-target-x={ball.targetX}
          data-target-y={ball.targetY}
          onAnimationEnd={() => handleBallAnimationEnd(ball.id)}
        ></div>
      ))}
    </div>
  );
};

export default BallAnimation;
