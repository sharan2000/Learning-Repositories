import classes from './Checkout.module.css';
import { useRef, useState } from 'react';


const isEmpty = value => value.length === 0;
const isFiveChars = value => value.length === 5;

const Checkout = (props) => {
  const [error, setError] = useState({
    name: false,
    street: false,
    postal: false,
    city: false
  })

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value.trim();
    const street = streetRef.current.value.trim();
    const postal = postalRef.current.value.trim();
    const city = cityRef.current.value.trim();

    const isNameValid = !isEmpty(name);
    const isStreetValid = !isEmpty(street);
    const isPostalValid = isFiveChars(postal);
    const isCityValid = !isEmpty(city);

    setError({
      name: !isNameValid,
      street: !isStreetValid,
      postal: !isPostalValid,
      city: !isCityValid
    })
    if(!isNameValid || !isStreetValid || !isPostalValid || !isCityValid) {      
      return;
    }

    props.onConfirm({
      username: name,
      street: street,
      postalCode: postal,
      city
    })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control + " " + (error.name ? classes.invalid : "" )}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameRef} type='text' id='name' />
        { error.name && <p className={classes["error-text"]}>Name is required</p> }
      </div>
      <div className={classes.control + " " + (error.street ? classes.invalid : "" )}>
        <label htmlFor='street'>Street</label>
        <input ref={streetRef} type='text' id='street' />
        { error.street && <p className={classes["error-text"]}>Street is required</p> }
      </div>
      <div className={classes.control + " " + (error.postal ? classes.invalid : "" )}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalRef} type='text' id='postal' />
        { error.postal && <p className={classes["error-text"]}>Postal code should be 5 characters.</p> }
      </div>
      <div className={classes.control + " " + (error.city ? classes.invalid : "" )}>
        <label htmlFor='city'>City</label>
        <input ref={cityRef} type='text' id='city' />
        { error.city && <p className={classes["error-text"]}>City is required</p> }
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;