import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context";
// Use a stateless component to wrap an instance of the <Route> component.
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {(context) => (
        <Route
          {...rest}
          render={(props) =>
            context.auth ? (
              <Component {...props} />
            ) : (
              <Redirect 
              // Use the <Route> component's render property to define a function that renders the component associated with the private route
                to={{
                  pathname: "/signin",
                  state: { from: props.location },
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
