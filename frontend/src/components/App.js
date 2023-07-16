import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [saveText, setSaveText] = React.useState('Сохранить')
  const [isRequestSent, setIsRequestSent] = React.useState(false)
  const [isLoginPage, setIsLoginPage] = React.useState(false)
  const [isRegistrationSuccess, setIsRegistrationSuccess] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
  const [userEmail, setUserEmail] = React.useState('')
  const [registerPopupText, setRegisterPopupText] = React.useState('')
  const navigate = useNavigate()

  function isRegistrationSuccessHandler() {
    if (isRegistrationSuccess) {
      setRegisterPopupText('Вы успешно зарегистрировались!')
    } else {
      setRegisterPopupText('Что-то пошло не так! Попробуйте ещё раз.')
    }
  }

  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then(data => {
        if (data) {
          setIsLoggedIn(true)
          navigate('/', {replace: true})
          setUserEmail(email)
          getCards()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleRegister(password, email) {
    auth.register(password, email)
      .then((res) => {
        if (res.status === 201) {
          setIsInfoTooltipOpen(true)
          setIsRegistrationSuccess(true)
          navigate('/sign-in', {replace: true})
        } else {
          setIsRegistrationSuccess(false)
          setIsInfoTooltipOpen(true)
        }
        setTimeout(() => setIsInfoTooltipOpen(false), 2000)
      })
      .catch(err => console.log(err))

  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsRequestSent(false)
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsRequestSent(false)
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  React.useEffect(() => {
    handleTokenCheck()
  }, [])

  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      if (token) {
        auth.checkToken(token)
          .then((res) => {
            setIsLoggedIn(true)
            setUserEmail(res.data.email)
            navigate("/", {replace: true})
            getCards()
          })
          .catch(err => console.log(err))
      }
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardDelete(card) {
    api.deleteUserCard(card._id).then((newCards) => {
      setCards((state) =>
        state.filter(item => item._id !== card._id)
      )
    })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit({name, link}) {
    setSaveText('Создание...')
    api.addUserCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        setIsRequestSent(true)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setSaveText('Создать')
      })
  }

  function onUpdateUser({name, about}) {
    setSaveText('Сохранение...')
    api.setUserInformation(name, about)
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setSaveText('Сохранить')
      })
  }

  function onUpdateAvatar({avatar}) {
    setSaveText('Сохранение...')
    api.setUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups()
        setIsRequestSent(true)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setSaveText('Сохранить'))
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setSelectedCard({})
    setIsInfoTooltipOpen(false)
  }

  function getCards() {
    api.getInitialCards().then((res) => {
      setCards(res)
    })
      .catch((err) => {
        console.log(err)
      })
    api.getUserInformation().then((res) => {
      setCurrentUser(res)
    })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLoginPage={isLoginPage}
                userEmail={userEmail}
                isLoggedIn={isLoggedIn}
                setUserEmail={setUserEmail}
                setIsLoggedIn={setIsLoggedIn}
        />
        <Routes>
          <Route path='/sign-in'
                 element={<Login setIsLoginPage={setIsLoginPage}
                                 isLoginPage={isLoginPage}
                                 handleLogin={handleLogin}
                 />}/>
          <Route path='/sign-up' element={<Register setIsLoginPage={setIsLoginPage}
                                                    isLoginPage={isLoginPage}
                                                    handleRegister={handleRegister}
          />}/>
          <Route path='/'
                 element={
                   <ProtectedRouteElement
                     element={Main}
                     isLoggedIn={isLoggedIn}
                     setIsLoginPage={setIsLoginPage}
                     onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                     onEditAvatar={handleEditAvatarClick}
                     onCardClick={handleCardClick}
                     onCardLike={handleCardLike}
                     onCardDelete={handleCardDelete}
                     cards={cards}
                   />
                 }
          />
          <Route path='*'
                 element={
                   <ProtectedRouteElement
                     isLoggedIn={isLoggedIn}
                     element={''}
                   />
                 }
          />
        </Routes>
        <Footer/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
                          onUpdateUser={onUpdateUser}
                          buttonText={saveText}
        />
        <AddPlacePopup isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}
                       onAddPlace={handleAddPlaceSubmit}
                       isRequestSent={isRequestSent}
                       buttonText={saveText}
                       setSaveText={setSaveText}
        />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                         onClose={closeAllPopups}
                         onUpdateAvatar={onUpdateAvatar}
                         buttonText={saveText}
                         isRequestSent={isRequestSent}
        />
        <PopupWithForm title={"Вы уверены?"} name={"confirm-form"} buttonText={"Да"}>
        </PopupWithForm>
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}/>
        <InfoTooltip isRegistrationSuccess={isRegistrationSuccess}
                     onClose={closeAllPopups}
                     isOpen={isInfoTooltipOpen}
                     isRegistrationSuccessHandler={isRegistrationSuccessHandler}
                     PopupText={registerPopupText}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}


export default App;
