import { useState } from 'react'
import './ExpenseForm.css'

const ExpenseForm = (props) => {
  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: '',
  })

  const inputChangeHandler = (identifier, value) => {
    let changedInput = {}

    if(identifier === 'title') {
      changedInput = {
        enteredTitle: value
      }
    }
    else if(identifier === 'amount') {
      changedInput = {
        enteredAmount: value
      }
    }
    else if(identifier === 'date') {
      changedInput = {
        enteredDate: value
      }
    }

    setUserInput((prevState) => {
      return {
        ...prevState,
        ...changedInput
      }
    })
  }

  const submitHandler = (event) => {
    event.preventDefault()

    props.onSaveExpenseData({
      title: userInput.enteredTitle,
      amount: +userInput.enteredAmount,
      date: new Date(userInput.enteredDate),
    })

    setUserInput({
      enteredTitle: '',
      enteredAmount: '',
      enteredDate: '',
    })
  }

  return (
    <form onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input type='text' value={userInput.enteredTitle} onChange={(event) => inputChangeHandler('title', event.target.value)} />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input type='number' value={userInput.enteredAmount} min='0.01' step='0.01' onChange={(event) => inputChangeHandler('amount', event.target.value)} />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input type='date' value={userInput.enteredDate} min='2019-01-01' max='2022-12-31' onChange={(event) => inputChangeHandler('date', event.target.value)} />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type='button' onClick={() => props.setShowForm(false)}>Cancel</button>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  )
}


export default ExpenseForm;