import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [isLoading, error, sendRequest] = useHttp();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    sendRequest(
      {
        url: 'https://backend-store-9d74d-default-rtdb.firebaseio.com/tasks.json',
        method: "GET"
      },
      (data) => {
        const loadedTasks = [];
        for (const taskKey in data) {
          loadedTasks.push({ id: taskKey, text: data[taskKey].text });
        }
        setTasks(loadedTasks);
      }
    )
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
