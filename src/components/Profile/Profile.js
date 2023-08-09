import React from 'react';

function Profile() {
    return (
        <section className='profile'>
          <h2 className='profile__title' >Привет, {'Алексей'}!</h2>
          <form className='profile__form profile__form'>
          {/* <form className='profile__form profile__form profile__form_active'> */}
            <div className='profile__group'>
              <label className='profile__label' for="name">Имя</label>
              <input className='profile__input' type="text" id="name" name="name" />
            </div>
            <hr className='profile__divider'/>
            <div className='profile__group'>
              <label className='profile__label' for="email">E-mail</label>
              <input className='profile__input' type="email" id="email" name="email" />
            </div>            
          </form>
          <div className='profile__btn-container'>
            <button className='profile__edit-btn' type="button" id="editBtn">Редактировать</button>
            <button className='profile__exit-btn' type="button" id="exitBtn">Выйти из аккаунта</button>
          </div>          
        </section>
    );
}

export default Profile;