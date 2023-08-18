import React from 'react';

function Preloader({ searching, nomatches, isLoading, films, rowsToShow, filmsToRender, preloaderHidden, onPreloader }) {
  // console.log(filmsToRender.length, rowsToShow );

  if (isLoading) {
    // console.log();
    return (
      <section className='preloader'>
        <div className="preloader__row">
          <div className="preloader__item"></div>
          <div className="preloader__item"></div>
        </div>
      </section>
    );
  }

  if (searching && nomatches) {
    // console.log(searching, nomatches);
    return (
      <section className='preloader'>
        <p className='preloader__nomatches'>Ничего не найдено</p>
      </section>
    );
  }

  if ( searching && !nomatches && preloaderHidden ) {
    // console.log(searching, nomatches);
    return (
      <section className='preloader'>
        <button className='preloader__btn' onClick={onPreloader}>
          Ещё
        </button>
      </section>
    );
  }


}

export default Preloader;