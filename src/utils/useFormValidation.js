import { useCallback, useState } from "react";

export function useFormValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState(false);

  const handleChange = (evt) => {
    const {name, value, validationMessage, form } = evt.target;
    setValues((oldValues) => ({...oldValues, [name]: value}));
    setErrors((oldErrors) => ({...oldErrors, [name]: validationMessage}));
    if (isEmailCheck && form.checkValidity()) {
      setIsValid(form.checkValidity());
    } else {
      setIsValid(false);
    }
  }

  function handleEmailChange(name, evt) {
    const { value, form } = evt.target;
    setValues({...values, [name]: value}); // Обновляем значение в состоянии
    setEmail(value);
  
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(String(value).toLowerCase())) {
      setIsValid(false);
      setIsEmailCheck(false);
      setEmailError("Неверный адрес электронной почты");
    } else {
      setEmailError("");
      if (form.checkValidity()) {
        setIsEmailCheck(true);
        setIsValid(true);
      }
      setIsEmailCheck(true);      
    }
  }
  

  // выставить изначальные значения в поле ввода
  const setValue = useCallback((name, value) => {
    setValues((oldValues) => ({...oldValues, [name]: value}));
  }, [])

  const reset =  useCallback((initialValues = {}) => {
    setValues(initialValues);
    setErrors({});
    setIsValid(false);
  }, [])

  return { values, errors, setErrors, isValid, handleChange, setValue, reset, handleEmailChange, emailError, setEmailError, setEmail }
}