import React from "react";

function Score({ moves }) {
    return (
        <div className="score-display">
            <h3>Mouvements: {moves}</h3>
        </div>
    );
}

export default Score;