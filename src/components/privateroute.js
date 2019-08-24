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
        fb.auth.onAuthStateChanged((user) => {
          if (user) {
            console.log('user is logged in');
          } else {
            console.log('user is not logged in');
          }
        });
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
