import { Link, useSubmit } from 'react-router-dom';
import classes from './EventItem.module.css';

function EventItem({ event }) {
  const submit = useSubmit()

  function startDeleteHandler() {
    const ok = window.confirm("Are you sure?")

    if(ok) {
      // below null can also be {}, {name: "rock"}. it will automatically be wrapped in FormData
      submit(null, {
        method: "DELETE",
        // action: "some-other-route-path" // can be used to execute someother route path action. can be added in Form also.
      })
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;