import { useReducer } from "react";

const stateReducer = (prevState, action) => {
  if(action.type === "INPUT") {
    return {
      ...prevState,
      value: action.value,
    }
  }
  else if(action.type === "BLUR") {
    return {
      ...prevState,
      valueTouched: true
    }
  }
  return {
    value: "",
    valueTouched: false
  }
}

const useInputAlt = (validatorFn) => {
  const [state, dispatch] = useReducer(stateReducer, {
    value: "",
    valueTouched: false
  });

  const valueIsValid = validatorFn(state.value);
  const valueHasError = state.valueTouched && !valueIsValid;

  const valueBlurHandler = () => {
    dispatch({
      type: "BLUR",
    });
  }

  const valueChangeHandler = (event) => {
    dispatch({
      type: "INPUT",
      value: event.target.value
    });
  }

  const valueReset = () => {
    dispatch({});
  }

  return {
    value: state.value,
    valueIsValid,
    valueHasError,
    valueBlurHandler,
    valueChangeHandler,
    valueReset
  }
}

export default useInputAlt;