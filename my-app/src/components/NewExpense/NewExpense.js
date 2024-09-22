import { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css'

const NewExpense = (props) => {
  const [showForm, setShowForm] = useState(false)

  const saveExpenseDataHandler = (data) => {
    let expenseData = {
      ...data,
      id: Math.random().toString()
    }
    props.onAddExpense(expenseData)
  }

  return (
    <div className='new-expense'>
      { showForm ? (
        <ExpenseForm setShowForm={setShowForm} onSaveExpenseData={saveExpenseDataHandler} />
      ) : (
        <button onClick={() => setShowForm(oldVal => !oldVal)}>Add New Expense</button>
      ) }
    </div>
  )
}


export default NewExpense;