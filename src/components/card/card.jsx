import React from 'react'
import '/src/card.css'

const Card = ({ image, isFlipped, onClick }) => {
  return (
    <div className="memory-card" onClick={onClick}>
      <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <img src={image} alt="Carte face" />
        </div>
        <div className="card-back">
          <img src="/assets/cards/back.png" alt="Dos de la carte" />
        </div>
      </div>
    </div>
  )
}

export default Card
