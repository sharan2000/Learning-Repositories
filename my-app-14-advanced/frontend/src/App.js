import  { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import RootPage from "./pages/RootPage";
import EventsRootPage from "./pages/EventsRootPage";
import EventsPage, { eventsLoader } from "./pages/EventsPage";
import EditEventPage from "./pages/EditEventPage";
import NewEventPage from "./pages/NewEventPage";
import EventDetailPage, { eventDetailLoader } from "./pages/EventDetailPage";
import ErrorPage from "./pages/Error";
import { eventItemDeleteAction } from "./pages/EventDetailPage";
import { eventFormAction } from "./components/EventForm";
import NewsletterPage, { newsletterAction } from "./pages/NewsLetterPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootPage />,
        children: [
          { index: true,
            element: <EventsPage />,
            loader: eventsLoader
          },
          { path: "new", element: <NewEventPage />, action: eventFormAction },
          {
            path: ":id",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              { index: true, element: <EventDetailPage />, action: eventItemDeleteAction },
              { path: "edit", element: <EditEventPage />, action: eventFormAction },
            ]
          }
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
