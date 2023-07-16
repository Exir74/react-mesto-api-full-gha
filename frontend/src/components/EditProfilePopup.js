import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, buttonText}) {
  const currentUser = React.useContext(CurrentUserContext)
  const [values, setValues] = React.useState({})

  React.useEffect(() => {
    setValues({name: currentUser.name, description: currentUser.about})
  }, [isOpen, currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.description,
    })
  }

  return (
    <PopupWithForm title={"Редактировать профиль"} name={"profile-form"} buttonText={buttonText}
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
    >

      <input
        onChange={handleChange}
        className="popup__input popup__input_type_name"
        name="name"
        id="name-input"
        placeholder="Имя"
        type="text"
        value={values.name ?? ''}
        required
        minLength={2}
        maxLength={40}
      />
      <div className="popup__error-wrapper">
        <label
          htmlFor="name-input"
          className="popup__error-message"
          id="name-input-error"
        />
      </div>
      <input
        onChange={handleChange}
        className="popup__input popup__input_type_subtitle"
        name="description"
        id="subtitle-input"
        placeholder="Вид деятельности"
        type="text"
        value={values.description ?? ''}
        required
        minLength={2}
        maxLength={200}
      />
      <div className="popup__error-wrapper">
        <label
          htmlFor="subtitle-input"
          className="popup__error-message"
          id="subtitle-input-error"
        />
      </div>

    </PopupWithForm>
  )
}

export default EditProfilePopup