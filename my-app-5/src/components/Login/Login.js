import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return { value: action.value, valid: action.value.includes('@') }
  }
  else if (action.type === 'INPUT_BLUR') {
    return { value: state.value, valid: state.value.includes('@') }
  }

  return { value: '', valid: false }
}

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return { value: action.value, valid: action.value.trim().length > 6 }
  }
  else if (action.type === 'INPUT_BLUR') {
    return { value: state.value, valid: state.value.trim().length > 6 }
  }

  return { value: '', valid: false }
}

const Login = () => {
  const ctx = useContext(AuthContext)

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, emailDispatch] = useReducer(emailReducer, { value: '', valid: true })
  const [passwordState, passwordDispatch] = useReducer(passwordReducer, { value: '', valid: true })

  const { valid: emailValid } = emailState
  const { valid: passwordValid } = passwordState

  
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        passwordValid && emailValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailValid, passwordValid]);

  const emailChangeHandler = (event) => {
    // dispatcher
    emailDispatch({ type: 'USER_INPUT', value: event.target.value })

    setFormIsValid(
      event.target.value.includes('@') && passwordState.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    // dispatcher
    passwordDispatch({ type: 'USER_INPUT', value: event.target.value })

    setFormIsValid(
      emailState.valid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    // dispatcher
    emailDispatch({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    // dispatcher
    passwordDispatch({ type: 'INPUT_BLUR' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailValid) {
      emailRef.current.focus()
    } else {
      passwordRef.current.focus()
    }
  };

  const emailRef = useRef()
  const passwordRef = useRef()

  return (
    <Card className={classes.login}>

      <form onSubmit={submitHandler}>
        <Input 
          ref={emailRef}
          valid={emailState.valid}
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          label="E-Mail"
        />
        
        <Input 
          ref={passwordRef}
          valid={passwordState.valid}
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          label="Password"
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

