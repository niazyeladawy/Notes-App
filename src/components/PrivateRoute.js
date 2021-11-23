
import { Navigate, Route, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  
  if (!(localStorage.getItem("notesToken"))) {
    return <Navigate to="/login"  />;
  }
  else{
    <Route to="/"  />
  }

  return children;
};

export default PrivateRoute;