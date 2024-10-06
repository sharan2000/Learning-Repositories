import Card from "../UI/Card"
import Button from "../UI/Button"

import styles from "./AddUser.module.css"
import { useState } from "react"
import ErrorModal from "../UI/ErrorModal"


let AddUser = (props) => {
  let [enteredUsername, setEnteredUsername] = useState('')
  let [enteredAge, setEnteredAge] = useState('')
  let [error, setError] = useState(null)
  
  let userDataSubmitHandler = (event) => {
    event.preventDefault()
    if(enteredUsername.trim().length < 1 || enteredAge.trim().length < 1) {
      setError({
        title: 'Invalid input.',
        message: 'Please enter a username and age'
      })
      return
    }
    if(+enteredAge < 1) {
      setError({
        title: 'Invalid age.',
        message: 'Please enter a valid age greater than 0.'
      })
      return
    }

    console.log(enteredUsername, enteredAge)
    props.onAddUser(enteredUsername, enteredAge)
    setEnteredUsername('')
    setEnteredAge('')
  }

  let usernameChangeHandler = (e) => {
    setEnteredUsername(e.target.value)
  }

  let ageChangeHandler = (e) => {
    setEnteredAge(e.target.value)
  }

  let closeErrorModal = () => {
    setError(null)
  }
  
  return (
    <div>
      {error ? <ErrorModal title={error.title} message={error.message} closeModalHandler={closeErrorModal} /> : ''}
      <Card className={styles['input']}>
        <form onSubmit={userDataSubmitHandler}>
          <label htmlFor="username">Username</label>
          <input value={enteredUsername} onChange={usernameChangeHandler} type="text" id="username"/>
          <label htmlFor="age">Age (Years)</label>
          <input value={enteredAge} onChange={ageChangeHandler} type="number" id="age"/>
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </div>
  )
}


export default AddUser