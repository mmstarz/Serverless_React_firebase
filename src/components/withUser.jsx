import React from "react";
import { UserContext } from "../providers/UserProvider";

// const getDisplayName = (WrappedComponent) => {
//     return WrappedComponent.displayName || WrappedComponent.name || 'Component';
// }

// creating hight order component with user
const withUser = Component => {
  const WrappedComponent = props => {
    return (
      <UserContext.Consumer>
        {user => <Component user={user} {...props} />}
      </UserContext.Consumer>
    );
  };
  // debugging purpose
  // WrappedComponent.displayName = `WithUser(${getDisplayName(WrappedComponent)})`

  return WrappedComponent;
};

// basically provide user property to wrappedComponent props
export default withUser;
