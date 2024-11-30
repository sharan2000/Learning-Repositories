import useInputAlt from "../hooks/use-input-alt";

const BasicForm = (props) => {
  const {
    value: firstName,
    valueIsValid: firstNameIsValid,
    valueHasError: firstNameHasError,
    valueBlurHandler: firstNameBlurHandler,
    valueChangeHandler: firstNameChangeHandler,
    valueReset: firstNameReset
  } = useInputAlt((value) => value.trim().length > 0);

  const {
    value: lastName,
    valueIsValid: lastNameIsValid,
    valueHasError: lastNameHasError,
    valueBlurHandler: lastNameBlurHandler,
    valueChangeHandler: lastNameChangeHandler,
    valueReset: lastNameReset
  } = useInputAlt((value) => value.trim().length > 0);

  const {
    value: email,
    valueIsValid: emailIsValid,
    valueHasError: emailHasError,
    valueBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
    valueReset: emailReset
  } = useInputAlt((value) => value.trim().length > 0);


  let formValid = false;
  if(firstNameIsValid && lastNameIsValid && emailIsValid) {
    formValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    console.log("values here => ", firstName);
    firstNameReset();
    lastNameReset();
    emailReset();
  }

  const firstNameControlClass = firstNameHasError ? "form-control invalid" : "form-control";
  const lastNameControlClass = lastNameHasError ? "form-control invalid" : "form-control";
  const emailControlClass = emailHasError ? "form-control invalid" : "form-control";


  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameControlClass}>
          <label htmlFor='firstname'>First Name</label>
          <input onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler} value={firstName} type='text' id='firstname' />
          {firstNameHasError && <p className="error-text">Enter valid firstname</p>}
        </div>
        <div className={lastNameControlClass}>
          <label htmlFor='lastname'>Last Name</label>
          <input onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler} value={lastName} type='text' id='lastname' />
          {lastNameHasError && <p className="error-text">Enter valid lastname</p>}
        </div>
      </div>
      <div className={emailControlClass}>
        <label htmlFor='email'>E-Mail Address</label>
        <input onChange={emailChangeHandler} onBlur={emailBlurHandler} value={email} type='text' id='email' />
        {emailHasError && <p className="error-text">Enter valid email</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
