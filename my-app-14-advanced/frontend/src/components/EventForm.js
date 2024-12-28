import { Form, useNavigate, useNavigation, useActionData, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const actionData = useActionData(); // will get the closest action method data
  let errorsList
  if(actionData?.errors) {
    errorsList = Object.values(actionData.errors).map(message => <li key={message}>{message}</li>)
  }

  const isSubmitting = navigation.state === "submitting"

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      <ul>
        {errorsList}
      </ul>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ""} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ""} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ""} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ""} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Save"}</button>
      </div>
    </Form>
  );
}

export default EventForm;


export const eventFormAction = async ({request, params}) => {
  const data = await request.formData();
  const payload = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  }

  let url = "http://localhost:8080/events"
  if(request.method === "PATCH") {
    const id = params.id;
    url += `/${id}`
  }

  const response = await fetch(url, {
    method: request.method,
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if(response.status === 422) {
    return response; // since this is a response object it will call ".json()" method and give the data back
    // return response.json()
  }

  if(!response.ok) {
    throw new Response(JSON.stringify({message: "could not save the event data"}), { status: 500 })
  }

  return redirect("/events");
}
