import React from "react";
import "../styles/card.css";

const Card = ({ item, onRemove }) => {
  return (
    <div className="card">
      <img src={item.image} alt={item.title} className="card-image" />
      <div className="card-details">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-price">${item.price}</p>
        {onRemove && (
          <button
            className="card-remove-button"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
