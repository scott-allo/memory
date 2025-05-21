import './App.css';
import GameLayout from './components/layout/GameLayout';
import Card from './components/card/card';

function App() {
  const handleReset = () => {
    console.log('Jeu réinitialisé');
    // Logique de reset à implémenter plus tard
  };

  return (
    <GameLayout onReset={handleReset} isGameWon={false}>
      {/* Les cartes du jeu seront insérées ici sous forme de composants */}
      <Card
        image="/src/assets/img/clope.jpg"
        isFlipped={true}
        onClick={() => console.log('clic')}
      />
      <Card
        image="/src/assets/img/cannabis.jpg"
        isFlipped={true}
        onClick={() => console.log("Carte cliquée")}
      />
    </GameLayout>
  );
}

export default App;
