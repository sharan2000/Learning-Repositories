import { useLoaderData} from "react-router-dom"
import EventsList from '../components/EventsList';

function EventsPage() {
  const events = useLoaderData();
  return <EventsList events={events} />;
}

export default EventsPage;

export const eventsLoader = async () => {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    throw new Response(JSON.stringify({message: "could not fetch events"}), { status: 500 });
  } else {
    // return response; // can return anything from loader function
    const data = await response.json();
    return data.events;
  }
}