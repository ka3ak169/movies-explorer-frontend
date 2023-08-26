import React from "react";
import Navigation from "../Navigation/Navigation"

function Header({ location }) {
  const headerClass = location === 'home' ? 'header header_home' : 'header';

  return (
    <header className={headerClass}>
      <Navigation
        location={location}
      />
    </header>
  );
}

export default Header;