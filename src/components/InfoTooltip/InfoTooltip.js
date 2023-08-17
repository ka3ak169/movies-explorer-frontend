import React from 'react';
import noUnion from '../../images/Union3.svg'
import yesUnion from '../../images/Union2.svg'

function InfoTooltip({ registration, changeInformation, isOpen, onClose }) {
  let message;
  if (changeInformation) {
    message = 'Информация успешно изменена!';
  } else {
    message = registration ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';
  }

  return (
    <div className={`info-popup ${isOpen ? `info-popup_opened` : ``}`}>
      <div className={`info-popup__container`}>
        <div className={'info-popup__picture'} style={{backgroundImage: `url(${registration ? yesUnion : noUnion})`}} ></div>
        <p className={'info-popup__text'}>{message}</p>
        <button
          className={`info-popup__close-button`}
          name="close"
          type="button"
          onClick={onClose}
        ></button>        
      </div>
    </div>
  );
};

export default InfoTooltip;