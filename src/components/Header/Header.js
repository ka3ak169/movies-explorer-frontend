import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src="#" alt="лого" />
      <Link>Регистрация</Link>
      <Link>Войти</Link>
    </header>
  );
}

export default Header;