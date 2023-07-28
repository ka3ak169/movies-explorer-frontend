import React from 'react';

function AboutProject() {
    return (
      <section className="about-project">
        <h2 className="about-project__title">О проекте</h2>
        <hr className="about-project__divider" />
        <div className="about-project__container">
          <div className="about-project__column">
            <h3 className="about-project__stage-description">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__paragraph">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__column">
            <h3 className="about-project__stage-description">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__paragraph">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__scale">
          <div className="about-project__left-scale">
            <div className="about-project__left-progress">1 неделя</div>
            <div className="about-project__cell-sign">Back-end</div>
          </div>
          <div className="about-project__right-scale">
            <div className="about-project__right-progress">4 недели</div>
            <div className="about-project__cell-sign">Front-end</div>
        </div>
        </div>

      </section>
    );
}

export default AboutProject;