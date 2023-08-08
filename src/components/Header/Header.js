import React from "react";
import Navigation from "../Navigation/Navigation"
import logo from "../../images/logo.svg"

function Header({location}) {
  const headerClass = location === 'home' ? 'header header_home' : 'header';

  return (
    <header className={headerClass}>
      <img className="header__logo" src={logo} alt="лого" />
      <Navigation location={location}/>
    </header>
  );
}

export default Header;