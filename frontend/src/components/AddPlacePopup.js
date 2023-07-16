import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, isRequestSent, buttonText, setSaveText}) {
  const [values, setValues] = React.useState({})

  React.useEffect(() => {
    setSaveText('Создать')
    setValues({name: '', link: ''})
  }, [isOpen, isRequestSent])

  const handleChange = (event) => {
    const {name, value} = event.target
    setValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link
    })
  }

  return (
    <PopupWithForm title={"Новое место"} name={"card-form"} buttonText={buttonText}
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_place-name"
        placeholder="Название"
        name="name"
        id="place-name-input"
        type="text"
        value={values.name ?? ''}
        onChange={handleChange}
        required
        minLength={2}
        maxLength={30}
      />
      <div className="popup__error-wrapper">
        <label
          htmlFor="place-name-input"
          className="popup__error-message"
          id="place-name-input-error"
        />
      </div>
      <input
        className="popup__input popup__input_type_place-url"
        placeholder="Ссылка на картинку"
        name="link"
        id="place-url-input"
        type="url"
        value={values.link ?? ''}
        onChange={handleChange}
        required
      />
      <div className="popup__error-wrapper">
        <label
          htmlFor="place-url-input"
          className="popup__error-message"
          id="place-url-input-error"
        />
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup