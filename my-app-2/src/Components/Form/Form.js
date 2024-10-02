
import { useState } from 'react'
import styles from './Form.module.css'

let Form = (props) => {
  let [userInput, setUserInput] = useState({
    "current-savings": '10000',
    "yearly-contribution": '1200',
    "expected-return": '7',
    "duration": '10'
  })

  let formSubmitHandler = (event) => {
    event.preventDefault()
    console.log('on submit -- ', userInput)
    props.submitData(userInput)
  }

  let inputChangeHandler = (event, key) => {
    setUserInput((oldVal) => {
      let newVal = { ...oldVal }
      newVal[key] = event.target.value
      return newVal
    })
  }

  let resetUserInput = () => {
    setUserInput({
      "current-savings": '10000',
      "yearly-contribution": '1200',
      "expected-return": '7',
      "duration": '10'
    })
  }

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input value={userInput["current-savings"]} type="number" id="current-savings" onChange={(e) => inputChangeHandler(e, "current-savings")} />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input value={userInput["yearly-contribution"]} type="number" id="yearly-contribution" onChange={(e) => inputChangeHandler(e, "yearly-contribution")} />
        </p>
      </div>
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input value={userInput["expected-return"]} type="number" id="expected-return" onChange={(e) => inputChangeHandler(e, "expected-return")} />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input value={userInput["duration"]} type="number" id="duration" onChange={(e) => inputChangeHandler(e, "duration")} />
        </p>
      </div>
      <p className={styles.actions}>
        <button type="reset" className="buttonAlt" onClick={resetUserInput}>
          Reset
        </button>
        <button type="submit" className={styles.button}>
          Calculate
        </button>
      </p>
    </form>
  )
}



export default Form

