import React from 'react';
import { Link } from 'react-router-dom';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <nav className="portfolio__links">
        <Link className="portfolio__link-container" to="https://github.com/ka3ak169/memories">
          <p className="portfolio__link-text">Статичный сайт</p>
          <div className="portfolio__arrow"></div>
        </Link>
        <hr className="portfolio__divider"/>
        <Link className="portfolio__link-container" to="https://github.com/ka3ak169/react-mesto-auth">
          <p className="portfolio__link-text">Адаптивный сайт</p>
          <div className="portfolio__arrow"></div>
        </Link>
        <hr className="portfolio__divider"/>
        <Link className="portfolio__link-container" to="https://github.com/ka3ak169/russian-travel">
          <p className="portfolio__link-text">Одностраничное приложение</p>
          <div className="portfolio__arrow"></div>
        </Link>
      </nav>
    </section>    
  );
}

export default Portfolio;