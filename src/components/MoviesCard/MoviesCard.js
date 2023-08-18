import React from 'react';
// import pic2 from '../../images/5f04b056ccd99.jpg';
import pic3 from '../../images/Mad Max- Fury Road(1).jpg';
// import pic4 from '../../images/movies_02.jpg';
import { movieApiPart } from '../../utils/utils';

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} час ${remainingMinutes} минут`;
}


function MoviesCard({ location, film }) {

    return (
      <div className='moviesCard'>
        <img className='moviesCard__img' src={movieApiPart+film.image.url} alt='Картинка'/>
        <div className='moviesCard__container'>
          <div className='moviesCard__description'>
            <h2 className='moviesCard__name'>{film.nameRU}</h2>
            <p className='moviesCard__duration'>{formatDuration(film.duration)}</p>
          </div>          
          {/* <button className={`moviesCard__button moviesCard__button_active ${location === 'saved' ? 'moviesCard__button_delete' : ''}`}/> */}
          <button className={`moviesCard__button ${location === 'saved' ? 'moviesCard__button_delete' : ''}`}/>
        </div>
      </div>
    );
}

export default MoviesCard;