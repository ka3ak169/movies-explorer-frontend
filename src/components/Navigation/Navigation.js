import React, { useState, useContext  } from "react";
import { Link } from "react-router-dom";
import SideNavigation from '../SideNavigation/SideNavigation'
import logo from "../../images/logo.svg"
import { LoggedInContext } from '../../contexts/LoggedInContext';


function Navigation({ location }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { loggedIn } = useContext(LoggedInContext);

  let content;

  if ( !loggedIn ) {
  content = (
    <>
      <Link to="/">
        <img className="header__logo" src={logo} alt="лого" />
      </Link>
      <div className="navigation">
        <nav className="navigation__button-container">
          <Link className="navigation__registr" to={"/signin"}>Регистрация</Link>
          <Link className="navigation__signin" to={"/signup"}>Войти</Link> 
        </nav>
      </div>          
    </>
  );
}

  if ( loggedIn ) {  
  content = (    
    <>
    <div className="navigation" style={{ width: '100%' }}>
        <Link to="/">
        <img className="header__logo" src={logo} alt="лого" />
        </Link>
        <nav className="navigation__film-container">
          <Link className="navigation__link" to={"/movies"}>Фильмы</Link>
          <Link className="navigation__link" to={"/saved-movies"}>Сохранённые фильмы</Link>
        </nav>
        <Link className="navigation__account-container" to={"/profile"}>
          <p className="navigation__link">Аккаунт</p>
          <div className="navigation__logo"></div>
        </Link>
        <button className="navigation__burger-button" onClick={() => setMenuOpen(!isMenuOpen)} />
        <SideNavigation isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen}/>
        </div>
    </>
  );
}

  return (
    content
  );
}

export default Navigation;