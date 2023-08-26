import React, { useContext  } from "react";
import { Navigate } from "react-router-dom";
import { LoggedInContext } from '../../contexts/LoggedInContext';


function ProtectedRoute({ element: Component, ...props }) {
  const { loggedIn } = useContext(LoggedInContext);

  return loggedIn ? (<Component {...props} />) : (<Navigate to="/" replace />);
}
export default ProtectedRoute; 