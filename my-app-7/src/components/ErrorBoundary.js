import { Component } from "react";

class ErrorBoundary extends Component {
  constructor() {
    super()
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(error) {
    console.log("Error occured -- ", error)
    this.setState({
      hasError: true
    })
  }

  render() {
    if(this.state.hasError) {
      return <p>Some error occured</p>
    }
    return this.props.children
  }
}

export default ErrorBoundary