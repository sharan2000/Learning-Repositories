import { useState } from "react";

const useInput = (validateFn) => {
  const [value, setValue] = useState("");
  const [valueTouched, setValueTouched] = useState(false);

  const valueIsValid = validateFn(value);
  const hasError = valueTouched && !valueIsValid;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  }

  const valueBlurHandler = (event) => {
    setValueTouched(true);
  }

  const reset = () => {
    setValue("");
    setValueTouched(false);
  }

  return {
    value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset
  }
}


export default useInput;