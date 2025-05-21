import './App.css';
import GameLayout from './components/layout/GameLayout';

function App() {
  const handleReset = () => {
    console.log('Jeu réinitialisé');
    // Logique de reset à implémenter plus tard
  };

  return (
    <GameLayout onReset={handleReset} isGameWon={false}>
      {/* Les cartes du jeu seront insérées ici sous forme de composants */}
    </GameLayout>
  );
}

export default App;
