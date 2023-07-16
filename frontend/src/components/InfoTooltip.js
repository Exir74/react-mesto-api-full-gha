import React from "react";
import closeIcon from "../image/Close-Icon.svg";
import successRegistration from "../image/successRegistration.png"
import failedRegistration from "../image/failedRegistration.png"

function InfoTooltip({isRegistrationSuccess, onClose, isOpen, isRegistrationSuccessHandler, PopupText}) {
  React.useEffect(()=>{
    isRegistrationSuccessHandler()
  }, [isOpen])
  return (
    <div className={`popup image-popup ${isOpen ? 'popup_open' : ''}`}>
      <div className="popup__content">
        <button type="button" onClick={onClose} className="popup__close hover">
          <img
            className="popup__close-icon"
            src={closeIcon}
            alt="закрыть"
          />
        </button>
        <div className="popup__success">
          <div className="popup__body">
            <img className='popup__registration-img'
                 alt={isRegistrationSuccess ? 'Вы успешно зарегистрировались!' : `Что-то пошло не так!
              Попробуйте ещё раз.`}
                 src={isRegistrationSuccess ? successRegistration : failedRegistration}/>
            <p className='popup__registration-text'>{PopupText}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default InfoTooltip