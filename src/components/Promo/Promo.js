import React from 'react';
import { Link } from 'react-router-dom';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <p className="promo__text">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <Link to="https://practicum.yandex.ru/frontend-developer/" className="promo__button">
        Узнать больше
      </Link>
      <div className="promo__img"></div>
    </section>
  );
}

export default Promo;
