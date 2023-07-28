import React from 'react';

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <hr className="techs__divider" />
      <h3 className="techs__sub-title">7 технологий</h3>
      <p className="techs__description">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div className="techs__container">
        <div className="techs__technology">HTML</div>
        <div className="techs__technology">CSS</div>
        <div className="techs__technology">JS</div>
        <div className="techs__technology">React</div>
        <div className="techs__technology">Git</div>
        <div className="techs__technology">Express.js</div>
        <div className="techs__technology">mongoDB</div>
      </div>
    </section>
  );
}

export default Techs;