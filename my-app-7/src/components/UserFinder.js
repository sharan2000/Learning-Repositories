import { Fragment, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/users-context';
import ErrorBoundary from './ErrorBoundary';

class UserFinder extends Component {

  static contextType = UsersContext // can only be used once in a class based component. can access it by using 'context' property.

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: ''
    }
  }

  componentDidMount() {
    // make a http request to the server and get data
    this.setState({
      filteredUsers: this.context.users
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) => user.name.includes(this.state.searchTerm))
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  render() {
    return (
    <Fragment>
      <div className={classes.finder}>
        <input type='search' onChange={this.searchChangeHandler.bind(this)} />
      </div>
      <ErrorBoundary>
        <Users users={this.state.filteredUsers} />
      </ErrorBoundary>
    </Fragment>
    )
  }
}

export default UserFinder;