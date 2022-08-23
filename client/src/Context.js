import React, { Component } from "react";
import Data from "./Data";

export const Context = React.createContext();
export class Provider extends Component {
  state = {
    authUSer: null,
    password: "",
    course: [],
  };

  constructor() {
    super();
    this.data = new Data();
  }

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      user.password = password;
      this.setState(() => {
        return {
          authUser: user,
        };
      });
    }
    return user;
  };

  signOut = () => {
    this.setState({ authUser: null });
  };
  render() {
    const { authUser } = this.state;

    const value = {
      authUser,
      auth: this.authUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}

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
