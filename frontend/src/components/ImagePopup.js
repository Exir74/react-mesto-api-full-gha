import closeIcon from "../image/Close-Icon.svg";
import React from "react";

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup image-popup ${Object.keys(card).length !== 0 ? 'popup_open' : ''}`}>
      <div className="popup__content">
        <button type="button" onClick={onClose} className="popup__close hover">
          <img
            className="popup__close-icon"
            src={closeIcon}
            alt="закрыть"
          />
        </button>
        <div className="popup__image">
          <img className="popup__full-image" src={card.link} alt={card.name}/>
        </div>
        <div className="popup__image-name">
          <p className="popup__image-text">{card.name}</p>
        </div>
      </div>
    </div>
  )
}

export default ImagePopup