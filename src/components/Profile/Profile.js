import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormValidation } from "../../utils/useFormValidation";

function Profile({ onChangeInformation, onLogout}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, handleChange, setValue } = useFormValidation();

  const [isButtonActive, setButtonActive] = useState(true); //перенести в App

  const checkForChanges = () => {
    if (values.profileName !== currentUser.name || values.profileEmail !== currentUser.email) {
      setButtonActive(false);
      console.log('добавили');
    } else {
      setButtonActive(true);
      console.log('убрали');
    }
  };

  // Устанавливаем начальные значения из currentUser при первом рендере
  useEffect(() => {
    if (currentUser) {
      setValue("profileName", currentUser.name);
      setValue("profileEmail", currentUser.email);
    }
  }, [currentUser]);

  useEffect(() => {
    checkForChanges();
  }, [values.profileName, values.profileEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {name: values.profileName, email:values.profileEmail};    
    onChangeInformation(newData)
  };

  const handleLogout = (e) => {
    e.preventDefault();
    onLogout();
  };

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        {/* <form className='profile__form profile__form profile__form_active'> */}
        <div className="profile__group">
          <label className="profile__label" htmlFor="name">
            Имя
          </label>
          <input
            className="profile__input"
            onChange={handleChange}
            type="text"
            id="name"
            name="profileName"
            value={values["profileName"] ?? ""}
            minLength="2"
            maxLength="40"
            required
          />
        </div>
        <span className="profile__error">{errors["profileName"]}</span>
        <hr className="profile__divider" />
        <div className="profile__group">
          <label className="profile__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="profile__input"
            onChange={handleChange}
            type="email"
            id="email"
            name="profileEmail"
            value={values["profileEmail"] ?? ""}
            required
          />
        </div>
        <span className="profile__error">{errors["profileEmail"]}</span>

        <div className="profile__btn-container">
          {/* <button className="profile__edit-btn" id="editBtn" type="submit" onSubmit={handleSubmit}> */}
          <button className={`profile__edit-btn ${isButtonActive ? "profile__edit-btn_disable" : ""}`} id="editBtn" type="submit" onSubmit={handleSubmit}>
            
            Редактировать
          </button>
          <button className="profile__exit-btn" type="button" id="exitBtn" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
