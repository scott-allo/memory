import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import Button from "../button/buttons";
import Score from "../Score/Score";

// La tu mets les images
import pablo from "../../assets/img/pablo 1.png";
import pablo2 from "../../assets/img/pablo 2.png";
import agent from "../../assets/img/conde 1.png";
import agent2 from "../../assets/img/conde 2.png";
import cocaine from "../../assets/img/coco 1.png";
import cocaine2 from "../../assets/img/coco 2.png";
import money from "../../assets/img/moula 1.png";
import money2 from "../../assets/img/moula 2.png";
import talki from "../../assets/img/takli 1.png";
import tel from "../../assets/img/tel 1.png";
import jeep1 from "../../assets/img/Jeep 1.png";
import jeep2 from "../../assets/img/jeep 2.png";

const allImages = [
    pablo, pablo2, agent, agent2, cocaine, cocaine2,
    money, money2, talki, tel, jeep1, jeep2
];

function Game() {
    const [level, setLevel] = useState(1);
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const maxPairs = Math.floor(allImages.length / 2);
    const [hasWon, setHasWon] = useState(false);

    // chaque paire = 2 images)
    const allPairs = [];
    for (let i = 0; i < allImages.length; i += 2) {
        allPairs.push([allImages[i], allImages[i + 1]]);
    }

    useEffect(() => {
        startNewGame(level);
        setHasWon(false);
     
    }, [level]);

    const startNewGame = (newLevel = 1) => {
        // On veut ajouter 2 paires (donc 4 cartes) par niveau, sans dépasser le nombre d'images disponibles
        const numPairs = Math.min(newLevel * 2, allImages.length);
        const selectedImages = [...allImages].slice(0, numPairs);

        // Pour chaque image sélectionnée, crée deux cartes identiques
        let pairs = [];
        selectedImages.forEach((img, idx) => {
            pairs.push({ id: idx * 2, image: img });
            pairs.push({ id: idx * 2 + 1, image: img });
        });

        // Mélange les cartes
        pairs = pairs.sort(() => Math.random() - 0.5);

        setCards(pairs);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
    };

    useEffect(() => {
        const numPairs = Math.min(level * 2, allImages.length);
        if (matched.length === numPairs * 2 && matched.length > 0) {
            if (numPairs === allImages.length) {
                setHasWon(true);
            } else {
                setTimeout(() => setLevel(level + 1), 1000);
            }
        }
    }, [matched, level]);

    const handleCardClick = (id) => {
        if (flipped.includes(id) || matched.includes(id) || flipped.length === 2) return;
        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);
            const [firstId, secondId] = newFlipped;
            const firstCard = cards.find(card => card.id === firstId);
            const secondCard = cards.find(card => card.id === secondId);
            if (
                firstCard &&
                secondCard &&
                firstCard.image === secondCard.image &&
                firstId !== secondId
            ) {
                setTimeout(() => {
                    setMatched([...matched, firstId, secondId]);
                    setFlipped([]);
                }, 500);
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    const handleRestart = () => {
        setLevel(1);
        startNewGame(1);
    };

    return (
        <div className="game-board">
            <Score moves={moves} />
            <Button label="Nouvelle partie" onClick={handleRestart} />
            <div className="cards-grid">
                {cards.map(card => (
                    <Card
                        key={card.id}
                        id={card.id}
                        image={card.image}
                        isFlipped={flipped.includes(card.id) || matched.includes(card.id)}
                        isMatched={matched.includes(card.id)}
                        onClick={handleCardClick}
                    />
                ))}
            </div>
            <div>Niveau : {level}</div>
            {hasWon && (
                <div className="win-message">
                    <h2>Bravo, tu as terminé tous les niveaux !</h2>
                    <p>Ajoute plus d’images pour continuer à augmenter la difficulté.</p>
                </div>
            )}
        </div>
    );
}

export default Game;