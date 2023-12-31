import React from "react";
import { Link, NavLink } from "react-router-dom";

function SideNavigation({ isMenuOpen, setMenuOpen }) {
  const closeSideNavigation = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && <div className="side-navigation__overlay" />}
      <div
        className={`side-navigation ${
          isMenuOpen ? "" : "side-navigation_disabled"
        }`}
      >
        <div
          className="side-navigation__close-btn"
          onClick={closeSideNavigation}
        ></div>
        <nav className="side-navigation__link-container">
          <NavLink
            className="side-navigation__link"
            to={"/"}
            onClick={closeSideNavigation}
          >
            Главная
          </NavLink>
          <NavLink
            className="side-navigation__link"
            to={"/movies"}
            onClick={closeSideNavigation}
          >
            Фильмы
          </NavLink>
          <NavLink
            className="side-navigation__link"
            to={"/saved-movies"}
            onClick={closeSideNavigation}
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link
          className={`navigation__account-container ${
            isMenuOpen ? "navigation__account-container_enabled" : ""
          }`}
          to={"/profile"}
          onClick={closeSideNavigation}
        >
          <p className="navigation__link">Аккаунт</p>
          <div className="navigation__logo"></div>
        </Link>
      </div>
    </>
  );
}

export default SideNavigation;
