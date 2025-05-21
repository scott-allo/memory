import React from 'react';

const DispositionJeu = ({ enfants, surReinitialiser, partieGagnee }) => {
  return (
    <div className="conteneur-jeu">
      <h1 className="titre-jeu">Plata o Plomo Memory</h1>
      <button className="btn-reinitialiser" onClick={surReinitialiser}>Réinitialiser</button>

      <div className="grille-cartes">
        {enfants}
      </div>

      {partieGagnee && (
        <div className="message-victoire">🎉 Bien joué ! Toutes les paires trouvées 🎉</div>
      )}
    </div>
  );
};

export default DispositionJeu;
