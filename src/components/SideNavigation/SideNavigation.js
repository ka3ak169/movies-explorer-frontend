import React from "react";
import { Link } from "react-router-dom";

function SideNavigation({ isMenuOpen, setMenuOpen }) {
  const closeSideNavigation = () => {
    setMenuOpen(false)
  }

  return (
    <>
      {isMenuOpen && <div className="side-navigation__overlay" />}
      <div className={`side-navigation ${isMenuOpen ? '' : 'side-navigation_disabled'}`}>
        <div className="side-navigation__close-btn" onClick={closeSideNavigation}></div>
        <nav className="side-navigation__link-container">
          <Link className="side-navigation__link" to={'/'} onClick={closeSideNavigation}>Главная</Link>
          <Link className="side-navigation__link" to={'/movies'} onClick={closeSideNavigation}>Фильмы</Link>
          <Link className="side-navigation__link" to={'/saved-movies'} onClick={closeSideNavigation}>Сохранённые фильмы</Link>
        </nav>
        <Link className={`navigation__account-container ${isMenuOpen ? 'navigation__account-container_enabled' : ''}`} to={"/profile"}>
          <p className="navigation__link">Аккаунт</p>
          <div className="navigation__logo"></div>
        </Link>
      </div>
    </>
  );
}

export default SideNavigation;
