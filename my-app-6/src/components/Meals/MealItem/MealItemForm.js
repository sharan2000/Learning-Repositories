import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {
  const amountRef = useRef();

  const [amountValid, setAmountValid] = useState(true)

  const onSubmitHandler = (event) => {
    event.preventDefault()

    const enteredAmount = amountRef.current.value
    const enteredAmountNumber = +enteredAmount

    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      // thoew error
      setAmountValid(false)
      return
    }
    setAmountValid(true)
    props.onAddItem(enteredAmountNumber)
  }

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input lable='Amount' input={
        {
          type:'number',
          id:`amount-${props.id}`,
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1
        } 
      } 
      ref={amountRef}
      />
      <button>+ Add</button>
      {!amountValid ? <span>Enter Valid Amount (between 1-5)</span> : ''}
    </form>
  )

}

export default MealItemForm;

