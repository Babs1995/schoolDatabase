// This component provides the "Sign In" screen by rendering a form that allows a user to sign in using their existing account information. 
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: "",
    errors: [],
  };

  render() {
    const { emailAddress, password, errors } = this.state;
    return (
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  value={emailAddress}
                  onChange={this.change}
                />
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                />
              </React.Fragment>
            )}
          />
          <p>
            It seems you don't have a user account? Click here to{" "}
            <Link to="/signup">sign up</Link>!
          </p>
        </div>
      </main>
    );
  }
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const { emailAddress, password } = this.state;
    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: ["Sign-in was unsuccessful. Try again!"] };
          });
        } else {
          this.props.history.push('/');
        }
      })
      .catch((err) => {
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}
