import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
      <section className="footer">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <hr className="portfolio__divider"/>        
        <div className="footer__container">
          <p className="footer__year">&copy; {new Date().getFullYear()}</p>
          <div className="footer__links-container">
            <Link className="footer__link" to='https://practicum.yandex.ru/'>Яндекс.Практикум</Link>
            <Link  className="footer__link" to='https://github.com/ka3ak169'>Github</Link>
          </div>
        </div>
      </section>
    );
}

export default Footer;