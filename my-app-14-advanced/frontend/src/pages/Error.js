import { Fragment } from "react";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "Error occured!";
  let message = "Something went wrong."

  if(error.status === 500) {
    title = "Internal Server Error"
    message = JSON.parse(error.data).message
  }
  else if(error.status === 404) {
    title = "404 not found"
    message = "The page or resource is not found"
  }

  return (
    <Fragment>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </Fragment>
  )
}

export default ErrorPage;