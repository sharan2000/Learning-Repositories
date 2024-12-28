import { Fragment } from "react"
import MainNavigation from "../components/MainNavigation"

const Error = () => {
  return (
    <Fragment>
      <MainNavigation />
      <main>
        <h3>404 not found</h3>
        <p>Could not find the page you are looking for</p>
      </main>
    </Fragment>
  )
}

export default Error