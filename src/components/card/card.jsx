import React, { forwardRef, useState, useEffect } from 'react'
import '/src/card.css'

const Card = forwardRef(({ image, isFlipped, onClick }, ref) => {
  const [isHit, setIsHit] = useState(false);
  const [bulletHoles, setBulletHoles] = useState([]);

  // Fonction pour ajouter un trou de balle à la carte
  const addBulletHole = () => {
    const newHole = {
      id: Date.now(),
      left: Math.random() * 80 + 10 + '%', // Position aléatoire sur la carte
      top: Math.random() * 80 + 10 + '%'
    };
    
    setBulletHoles(prev => [...prev, newHole]);
    setIsHit(true);
    
    // Réinitialiser l'animation après un court délai
    setTimeout(() => {
      setIsHit(false);
    }, 500);
  };

  // Exposer la fonction addBulletHole via la ref
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref({
          addBulletHole,
          element: document.querySelector('.memory-card')
        });
      } else {
        ref.current = {
          addBulletHole,
          element: document.querySelector('.memory-card')
        };
      }
    }
  }, [ref]);

  return (
    <div 
      className={`memory-card ${isHit ? 'card-hit' : ''}`} 
      onClick={onClick}
      ref={ref}
    >
      <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <img src={image} alt="Carte face" />
          {bulletHoles.map(hole => (
            <div 
              key={hole.id} 
              className="bullet-hole" 
              style={{ left: hole.left, top: hole.top }}
            />
          ))}
        </div>
        <div className="card-back">
          <img src="/assets/cards/back.png" alt="Dos de la carte" />
          {bulletHoles.map(hole => (
            <div 
              key={hole.id} 
              className="bullet-hole" 
              style={{ left: hole.left, top: hole.top }}
            />
          ))}
        </div>
      </div>
    </div>
  )
});

export default Card
