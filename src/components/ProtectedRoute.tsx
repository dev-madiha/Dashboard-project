import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");

  // if user not found → redirect to signin
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // otherwise render the requested page
  return children;
}
