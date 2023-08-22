import React, { useContext  } from "react";
import { Navigate } from "react-router-dom";
import { LoggedInContext } from '../../contexts/LoggedInContext';

function RedirectIfLoggedIn({ element: Component, ...props }) {
  const { loggedIn } = useContext(LoggedInContext);

  return !loggedIn ? (<Component {...props} />) : (<Navigate to="/movies" replace />);
}
export default RedirectIfLoggedIn; 