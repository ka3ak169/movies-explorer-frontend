import React from 'react';
import { useNavigate } from 'react-router-dom';


function NotFound() {  
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
    navigate(-1);
  }
  
  return (
    <section className='not-found'>
      <div className='not-found__container'>
        <h2 className='not-found__title'>404</h2>
        <p className='not-found__paragraph'>Страница не найдена</p>
      </div>      
      <button className='not-found__backpage' type='button' onClick={goBack}>Назад</button>
    </section>
  );
}

export default NotFound;