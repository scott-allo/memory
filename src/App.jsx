import './App.css';
import GameLayout from './components/layout/GameLayout';
import Card from './components/card/card';

function App() {
  const handleReset = () => {
    console.log('Jeu réinitialisé');
    // Logique de reset à implémenter plus tard
  };

  // Exemple de tableau d'images pour 6 paires (12 cartes)
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

  return (
    <GameLayout onReset={handleReset} isGameWon={false}>
      {images.map((img, index) => (
        <Card
          key={index}
          image={img}
          isFlipped={false} // À remplacer par la logique de jeu
          onClick={() => console.log(`Carte ${index + 1} cliquée`)}
        />
      ))}
    </GameLayout>
  );
}

export default App;
