import React from "react";

function Button({ label, onClick }) {
    return (
        <button className="narcos-button" onClick={onClick}>
            {label}
        </button>
    );
}

export default Button;