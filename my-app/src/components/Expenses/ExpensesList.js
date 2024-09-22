import ExpenseItem from './ExpenseItem'
import './ExpensesList.css'

const ExpensesList = (props) => {
  if(props.items.length === 0) {
    return <h2 className='expenses-list__fallback'>No expenses found.</h2>
  }

  return (
    <ul className='expenses-list'>
      {props.items.map((exps) => <ExpenseItem key={exps.id} expense={exps} />)}
    </ul>
  )
}


export default ExpensesList