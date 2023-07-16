import React, {useEffect} from "react";
import editAvatarImg from "../image/editAvatar.png"
import editButtonImg from "../image/Edit-Button.svg"
import addButtonS from "../image/Add-Button-S.svg"
import addButtonL from "../image/Add-Button-L.svg"
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onCardDelete, setIsLoginPage}) {
  const currentUser = React.useContext(CurrentUserContext)
  useEffect(()=>{
    setIsLoginPage(false)

  })

  return (
    <main className="main-content">
      <section className="profile">
        <button type="button" onClick={onEditAvatar} className="profile__edit">
          <img className="profile__avatar" alt="Аватар" src={currentUser.avatar}/>
          <div className="profile__avatar-wrapper hover">
            <img
              className="profile__edit-avatar hover"
              src={editAvatarImg}
              alt="Аватар"
            />
          </div>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button type="button" onClick={onEditProfile} className="profile__edit-button hover">
            <img
              className="profile__edit-image prof"
              src={editButtonImg}
              alt="изменить"
            />
          </button>
        </div>
        <button type="button" onClick={onAddPlace} className="profile__add-button hover">
          <picture>
            <source
              srcSet={addButtonS}
              media="(min-width: 708px)"
            />
            <img
              className="profile__add-image"
              src={addButtonL}
              alt="добавить"
            />
          </picture>
        </button>
      </section>
      <section className="cards">
        {cards.map(card => {
          return <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike}
                       onCardDelete={onCardDelete}/>
        })
        }
      </section>
    </main>
  )
}

export default Main
