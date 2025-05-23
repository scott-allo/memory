import React from "react";
import netflixLogo from "../../assets/img/netflix.jpg";

function Card({ id, image, isFlipped, isMatched, onClick }) {
    return (
        <div 
            className={`card ${isFlipped || isMatched ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
            onClick={() => !isMatched && onClick(id)}
        >
            <div className="card-inner">
                <div className="card-front">
                    <img src={image} alt="Narcos character" />
                </div>
                <div className="card-back">
                    <img src={netflixLogo} alt="Netflix logo" className="card-back-logo" /> {/* Remplace le texte ici */}
                </div>
            </div>
        </div>
    );
}

export default Card;