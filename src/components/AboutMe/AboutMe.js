import React from 'react';
import { Link } from 'react-router-dom';
import myPhoto from '../../images/my_photo.jpg'

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <hr className="about-me__divider" />
      <div className="about-me__container">
        <div className="about-me__description">
          <p className="about-me__name">Алексей</p>
          <p className="about-me__prof">Фронтенд-разработчик, 31 год</p>
          <p className="about-me__story">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link className="about-me__git" to='https://github.com/ka3ak169'>Github</Link>
        </div>
        <img className="about-me__img" src={myPhoto} alt="фото" />
      </div>
    </section>
  );
}

export default AboutMe;