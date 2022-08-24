import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context";
// Use a stateless component to wrap an instance of the <Route> component.
// Use the <Route> component's render property to define a function that renders the component associated with the private route if there's an authenticated user or redirects the user to the /signin route if there's not an authenticated user.
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {(context) => (
        <Route
          {...rest}
          render={(props) =>
            context.authUser ? (
              <Component {...props} />
            ) : (
              <Redirect 
              // Use the <Route> component's render property to define a function that renders the component associated with the private route
                to={{
                  pathname: "/signin",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
};
export default PrivateRoute;
