import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  const [isLoading, error, sendRequest] = useHttp();

  const enterTaskHandler = async (taskText) => {
    await sendRequest(
      {
        url: 'https://backend-store-9d74d-default-rtdb.firebaseio.com/tasks.json',
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json"
        }
      },
      (data) => {
        const generatedId = data.name; // firebase-specific => "name" contains generated id
        const createdTask = { id: generatedId, text: taskText };

        props.onAddTask(createdTask);
      }
    )
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
