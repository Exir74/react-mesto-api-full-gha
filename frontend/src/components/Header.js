import logo from "../image/logo.svg";
import React from "react";
import {Link} from "react-router-dom";

function Header({isLoginPage, isLoggedIn, userEmail , setUserEmail, setIsLoggedIn}) {

  const [actionText, setActionText] = React.useState('Вход')
  const [actionLink, setActionLink] = React.useState('/sign-in')
  React.useEffect(() => {
    if (!isLoggedIn && isLoginPage) {
      setActionText('Регистрация')
      setActionLink('/sign-up')
    } else if (!isLoggedIn && !isLoginPage) {
      setActionText('Вход')
      setActionLink('/sign-in')
    } else if (isLoggedIn && !isLoginPage) {
      setActionText('Выход')
      setActionLink('/sign-in')
    }},[isLoginPage, isLoggedIn])

  function actionLinkClick () {
    if (userEmail) {
      localStorage.removeItem('token')
      setUserEmail('')
      setIsLoggedIn(false)
    }
  }
  return (
    <header className="header">
      <Link to='/'>
        <img className="header__logo hover"
             src={logo}
             alt="лого"/>
      </Link>
      <div className='header__user-wrapper'>
        <span className='header__user-email '>{userEmail}</span>
        <Link onClick={actionLinkClick} to={actionLink} className='header__user-action hover'>{actionText}</Link>
        {/*{isLoginPage  ? <Link to='/sign-up' className='header__user-action hover'>Регистрация</Link> :*/}
        {/*  <Link to='/sign-in' className='header__user-action hover'>Войти</Link>}*/}

      </div>
    </header>
  )
}

export default Header