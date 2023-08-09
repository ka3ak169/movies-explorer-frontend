import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <section className='register'>
      <div className='register__logo'></div>
      <h2 className='register__title'>Рады видеть!</h2>
      <form className='register__form'>        
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
        <button className='register__button login__button'>Войти</button>
        <div className='register__link-container'>
          <p className='register__link-label'>Ещё не зарегистрированы?</p>
          <Link className='register__link' to='#' >Регистрация</Link>
        </div>
      </div>
    </section>
  );
}

export default Login;