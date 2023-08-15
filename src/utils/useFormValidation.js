import { useCallback, useState } from "react";

export function useFormValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const {name, value, validationMessage, form } = evt.target;
    setValues((oldValues) => ({...oldValues, [name]: value}));
    setErrors((oldErrors) => ({...oldErrors, [name]: validationMessage}));
    setIsValid(form.checkValidity());
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

  return { values, errors, isValid, handleChange, setValue, reset }
}