import React, { useState } from "react";
import Data from "./Data";
import Cookies from "js-cookie";

export const Context = React.createContext();

export const Provider = (props) => {
  const data = new Data();
  const cookie = Cookies.get("auth-user");

  const [authUser] = useState(cookie ? JSON.parse(cookie) : null);
  const [auth] = useState(authUser ? true : false);

  const signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      user.password = password;
      this.setState(() => {
        return {
          authUser: user,
        };
      });
      Cookies.set("auth-user", JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  const signOut = () => {
    this.setState(() => {
      return {
        authUser: null,
      };
    });
    Cookies.remove("auth-user");
  };

  const value = {
    authUser,
    auth,
    data,
    actions: {
      signIn,
      signOut,
    },
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}