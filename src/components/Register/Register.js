import React from 'react';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../utils/useFormValidation'

function Register({ onSubmit }) {
  const { values, errors, isValid, handleChange, reset } = useFormValidation();

  function handleSubmit (evt) {
    evt.preventDefault();
    // console.log(isValid);

    // console.log(values["registerName"], values["registerEmail"], values["registerPassword"]);
    onSubmit(values["registerName"], values["registerEmail"], values["registerPassword"]);
    reset();
  }

  return (
    <section className="register">
      <Link to={"/"} className="register__logo">
        <div className="register__logo"></div>
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit} noValidate>
        <div className="register__input-container">
          <label className="register__label">Имя</label>
          {/* Name */}
          <input
            className={`register__input ${
              errors["registerName"] ? "register__input_error" : ""
            }`}
            name="registerName"
            value={values["registerName"] ?? ""}
            onChange={handleChange}
            placeholder="Имя"
            type="text"
            required
            minLength="2"
            maxLength="40"
            autoComplete="off"
          />
        </div>
        <span className="register__error">{errors["registerName"]}</span>
        <div className="register__input-container">
          <label className="register__label">E-mail</label>
          {/* Email */}
          <input
            className={`register__input ${
              errors["registerEmail"] ? "register__input_error" : ""
            }`}
            name="registerEmail"
            value={values["registerEmail"] ?? ""}
            onChange={handleChange}
            type="Email"
            placeholder="Email"
            required
            autoComplete="off"
          />
        </div>
        <span className="register__error">{errors["registerEmail"]}</span>
        <div className="register__input-container">
          <label className="register__label">Пароль</label>
          {/* Password */}
          <input
            className={`register__input ${
              errors["registerPassword"] ? "register__input_error" : ""
            }`}
            name="registerPassword"
            value={values["registerPassword"] ?? ""}
            onChange={handleChange}
            type="password"
            placeholder="password"
            required
            minLength="8"
            autoComplete="off"
          />
        </div>
        <span className="register__error">{errors["registerPassword"]}</span>
        <div className="register__button-container">
          <button
            className={`register__button ${
              isValid ? "" : "register__button_disabled"
            }`}
            type="submit"
          >
            Зарегистрироваться
          </button>
          <div className="register__link-container">
            <p className="register__link-label">Уже зарегистрированы?</p>
            <Link className="register__link" to="/signup">
              Войти
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Register;