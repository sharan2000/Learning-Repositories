import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";

import './Expenses.css'
import { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpenseChart from "./ExpenseChart";

function Expenses(props) {
  const [filterYear, setFilterYear] = useState('2020')

  const filteredExpenses = props.expenses.filter((expense) => {
    console.log(expense.date.getFullYear())
    return expense.date.getFullYear().toString() === filterYear
  })
  
  return (
    <Card className="expenses">
      <ExpensesFilter onChangeFilterYear={setFilterYear} selectedYear={filterYear} />
      <ExpenseChart filteredExpenses={filteredExpenses}/>
      <ExpensesList items={filteredExpenses} />
    </Card>
  );
}

export default Expenses