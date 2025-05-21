import React from 'react';

const GameLayout = ({ children, onReset, isGameWon }) => {
  return (
    <div className="game-container">
      <h1 className="game-title">Plata o Plomo Memory</h1>
      <button className="reset-btn" onClick={onReset}>Reset</button>

      <div className="cards-grid">
        {children}
      </div>

      {isGameWon && (
        <div className="win-message">🎉 Bien joué ! Toutes les paires trouvées 🎉</div>
      )}
    </div>
  );
};

export default GameLayout;
