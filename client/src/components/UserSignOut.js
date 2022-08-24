// This component is a bit of an oddball as it doesn't render any visual elements. Instead, it signs out the authenticated user and redirects the user to the default route
import React from "react";
import { Redirect } from "react-router-dom";

const UserSignOut = ({ context }) => {
  context.actions.signOut();

  return <Redirect to="/" />;
};
export default UserSignOut;
