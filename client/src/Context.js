import React, { Component } from "react";
import Data from "./Data";

export const Context = React.createContext();
export class Provider extends Component {
  state = {
    authUser: null,
    password: "",
    course: [],
  };

  constructor() {
    super();
    this.data = new Data();
  }

  //debugging with Jazmin, after several failed attempts, she helped me rearrange the form render and return methods
  render() {
    const { authUser } = this.state;// Variable that hold the state of the authUser
    //A variable named value that holds the authUser, data and actions that may be inputed/changed and passed down the component tree
    const value = {
      authUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    }
    return (
      //The Context.Provider which hold the value of the information and passes it on to all it's children
      <Context.Provider value={value }>
        {this.props.children}
      </Context.Provider>
    );
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
  //   return (
  //     <Context.Provider value={value}>{this.props.children}</Context.Provider>
  //   );
  // }
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
