import React, { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  
  let [usersList, setUsersList] = useState([])

  let addUserHandler = (uname, uage) => {
    setUsersList(prevList => {
      return [...prevList, {name: uname, age: uage, id: Math.random().toString()}]
    })
  }

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      {usersList.length > 0 ? <UsersList users={usersList}/> : ''}
    </div>
  );
}

export default App;
