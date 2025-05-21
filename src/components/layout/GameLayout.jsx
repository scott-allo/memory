import React from 'react';

const GameLayout = ({ children, onReset, isGameWon }) => {
  return (
    <div className="conteneur-jeu">
      <div className="menottes-anim">
        {/* SVG menottes animées */}
        <svg width="80" height="40" viewBox="0 0 80 40">
          <g>
            <circle cx="20" cy="20" r="12" stroke="#FFD700" strokeWidth="4" fill="none">
              <animate attributeName="r" values="12;14;12" dur="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="20" r="12" stroke="#FFD700" strokeWidth="4" fill="none">
              <animate attributeName="r" values="12;14;12" dur="1s" repeatCount="indefinite" />
            </circle>
            <rect x="32" y="18" width="16" height="4" rx="2" fill="#FFD700">
              <animate attributeName="x" values="32;34;32" dur="1s" repeatCount="indefinite" />
            </rect>
          </g>
        </svg>
      </div>
      <h1 className="titre-jeu">Plata o Plomo Memory</h1>
      <button className="btn-reinitialiser" onClick={onReset}>Réinitialiser</button>
      <div className="grille-cartes">
        {children}
      </div>
      {isGameWon && (
        <div className="message-victoire">🎉 Bien joué ! Toutes les paires trouvées 🎉</div>
      )}
    </div>
  );
};

export default GameLayout;
