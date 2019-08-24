import React from "react";
import { Route, Redirect } from "react-router-dom";
import Edit from '../screens/edit'
import fb from '../firebase';

export const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (
          fb.isUserLoggedIn() ?
            <Edit {...props} /> :
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }} />
        );
      }}
    />
  );
};
