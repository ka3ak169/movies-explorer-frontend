import React from "react";
import { Link } from "react-router-dom";
import { useFormValidation } from "../../utils/useFormValidation";

function Login({ onSubmit }) {
  const {
    values,
    errors,
    isValid,
    handleChange,
    reset,
    handleEmailChange,
    emailError,
    setEmail,
    setEmailError,
  } = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();

    console.log(values["loginEmail"], values["loginPassword"]);
    onSubmit(values["loginEmail"], values["loginPassword"]);
    reset();
    setEmail("");
    setEmailError("");
  }

  return (
    <section className="register">
      <Link to={"/"} className="register__logo">
        <div className="register__logo"></div>
      </Link>
      <h2 className="register__title">Рады видеть!</h2>
      <form
        className="register__form login__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="register__input-container">
          <label className="register__label">E-mail</label>
          {/* Email */}
          <input
            className={`register__input ${
              errors["loginEmail"] ? "register__input_error" : ""
            }`}
            name="loginEmail"
            value={values["loginEmail"] ?? ""}
            // onChange={handleChange}
            onChange={(e) => handleEmailChange("loginEmail", e)}
            type="Email"
            required
            placeholder="Email"
            // autoComplete="off"
          />
        </div>
        <span className="register__error">{emailError}</span>
        {/* <span className="register__error">{errors["loginEmail"]}</span> */}
        <div className="register__input-container">
          <label className="register__label">Пароль</label>
          {/* Password */}
          <input
            className={`register__input ${
              errors["loginPassword"] ? "register__input_error" : ""
            }`}
            name="loginPassword"
            value={values["loginPassword"] ?? ""}
            onChange={handleChange}
            required
            minLength="8"
            type="password"
            placeholder="password"
            autoComplete="off"
          />
        </div>
        <span className="register__error">{errors["loginPassword"]}</span>
        <div className="register__button-container">
          <button
            // className="register__button login__button"
            className={`register__button ${
              isValid ? "" : "register__button_disabled"
            }`}
            type="submit"
          >
            Войти
          </button>
          <div className="register__link-container">
            <p className="register__link-label">Ещё не зарегистрированы?</p>
            <Link className="register__link" to="/signin">
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
