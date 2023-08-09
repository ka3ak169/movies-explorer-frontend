import React from 'react';
// import pic2 from '../../images/5f04b056ccd99.jpg';
import pic3 from '../../images/Mad Max- Fury Road(1).jpg';
// import pic4 from '../../images/movies_02.jpg';


function MoviesCard({location}) {
    return (
      <div className='moviesCard'>
        <img className='moviesCard__img' src={pic3} alt='Картинка'/>
        <div className='moviesCard__container'>
          <div className='moviesCard__description'>
            <h2 className='moviesCard__name'>33 слова о дизайне</h2>
            <p className='moviesCard__duration'>1 час 37 минут</p>
          </div>          
          {/* <button className={`moviesCard__button moviesCard__button_active ${location === 'saved' ? 'moviesCard__button_delete' : ''}`}/> */}
          <button className={`moviesCard__button ${location === 'saved' ? 'moviesCard__button_delete' : ''}`}/>
        </div>
      </div>
    );
}

export default MoviesCard;