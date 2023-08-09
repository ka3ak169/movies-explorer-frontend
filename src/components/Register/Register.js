import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <section className='register'>
      <div className='register__logo'></div>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <form className='register__form'>
        <div className='register__input-container'>
          <label  className='register__label'>Имя</label>
          <input className='register__input register__input_error' placeholder='Имя' type='text' autocomplete="off"/>
        </div>
        {/* что бы увидеть текст ошибок нужно изменить значение visibility у класса "register__error" */}
        <span  className='register__error'>Обратите внимание, что pointer-events: none; не всегда работает в некоторых браузерах, особенно старых, поэтому его использование может зависеть от требований к поддержке браузеров для вашего проекта.</span>
        <div className='register__input-container'>
          <label  className='register__label'>E-mail</label>
          <input className='register__input' type='Email' placeholder='Email'autocomplete="off"/>
        </div>
        <span  className='register__error'>Что-то пошло не так...</span>
        <div className='register__input-container'>
          <label  className='register__label'>Пароль</label>
          <input className='register__input register__input_error' type='password'  placeholder='password' autocomplete="off"/>
        </div>
        <span  className='register__error'>Что-то пошло не так...</span>
      </form>
      <div className='register__button-container'>
        <button className='register__button'>Зарегистрироваться</button>
        <div className='register__link-container'>
          <p className='register__link-label'>Уже зарегистрированы?</p>
          <Link className='register__link' to='#' >Войти</Link>
        </div>
      </div>
      
    </section>
  );
}

export default Register;