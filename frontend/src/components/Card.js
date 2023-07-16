import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id)
  const cardLikeButtonClassName =  (
    `card__like ${isLiked && 'card__like_active'}`
  )

  function handleClick() {
    onCardClick(card)
  }

  function handleDeleteClick(){
    onCardDelete(card)
  }
function handleLikeClick (){
  onCardLike(card)
}

  return (
    <div className="cards__item card">

      {isOwn && <button className='card__trash card__trash_active hover' onClick={handleDeleteClick}  />}
      <button type="button" onClick={handleClick} className="card__button">
        <img className="card__image" src={card.link} alt={card.name}/>
      </button>
      <div className="card__footer">
        <h2 className="card__caption">{card.name}</h2>
        <div className="card__like-wrapper">
          <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
          <p className="card__like-quantity">{card.likes.length}</p>
        </div>
      </div>
    </div>)

}

export default Card