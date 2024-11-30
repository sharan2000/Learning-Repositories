import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameValueChangeHandler,
    valueBlurHandler: nameValueBlurHandler,
    reset: nameReset
  } = useInput(value => value.trim().length > 0);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailValueChangeHandler,
    valueBlurHandler: emailValueBlurHandler,
    reset: emailReset
  } = useInput(value => value.trim().length > 0);

  let isFormValid = false;
  if(nameIsValid && emailIsValid) {
    isFormValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log(enteredName);
    nameReset();
    emailReset();
  }

  const nameControlClass = nameHasError ? 'form-control invalid' : 'form-control';
  const emailControlClass = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={nameControlClass}>
        <label htmlFor='name'>Your Name</label>
        <input onChange={nameValueChangeHandler} onBlur={nameValueBlurHandler} value={enteredName} type='text' id='name' />
        {nameHasError && <p className="error-text">Enter a valid name!</p>}
      </div>

      <div className={emailControlClass}>
        <label htmlFor='email'>Your Email</label>
        <input onChange={emailValueChangeHandler} onBlur={emailValueBlurHandler} value={enteredEmail} type='text' id='email' />
        {emailHasError && <p className="error-text">Enter a valid email!</p>}
      </div>

      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
