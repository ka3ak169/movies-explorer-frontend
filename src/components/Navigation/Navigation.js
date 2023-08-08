import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideNavigation from '../SideNavigation/SideNavigation'

function Navigation({ location }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  let content;

if (location === 'home') {  
  content = (
    <>
      <nav className="navigation__button-container">
        <Link className="navigation__registr" to={"/"}>Регистрация</Link>
        <Link className="navigation__signin" to={"/"}>Войти</Link> 
      </nav>  
    </>
  );
}

if (location === 'main') {
  
  content = (    
    <>
      <nav className="navigation__film-container">
        <Link className="navigation__link" to={"/"}>Фильмы</Link>
        <Link className="navigation__link" to={"/"}>Сохранённые фильмы</Link>
      </nav>
      <Link className="navigation__account-container" to={"/"}>
        <p className="navigation__link" to={"/"}>Аккаунт</p>
        <div className="navigation__logo" to={"/"}></div>
      </Link>
      <button className="navigation__burger-button" onClick={() => setMenuOpen(!isMenuOpen)} />
      <SideNavigation isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen}/>
    </>
  );
}

  return (
    content
  );
}

export default Navigation;