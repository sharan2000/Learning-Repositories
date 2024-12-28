import { redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  let event = useRouteLoaderData("event-detail");
  return <EventItem event={event} />
}

export default EventDetailPage;

export const eventDetailLoader = async ({ request, params }) => {
  const id = params.id;

  const response = await fetch("http://localhost:8080/events/" + id);
  if(!response.ok) {
    throw new Response(JSON.stringify({message: "could not fetch event details"}), { status: 500 });
  }
  let data = await response.json();
  return data.event;
}

export const eventItemDeleteAction = async ({ request, params }) => {
  const id = params.id
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if(!response.ok) {
    throw new Response(JSON.stringify({ message: "could not delete event" }, { status: 500 }))
  }

  return redirect("/events");
}
