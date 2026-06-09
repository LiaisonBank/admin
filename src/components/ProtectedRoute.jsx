import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";
    
  console.log(
    "ProtectedRoute:",
    localStorage.getItem("isAuthenticated"),
    isAuthenticated
  );

  // const token = localStorage.getItem("token")

  // if (!token) {
  //   return <Navigate to="/" />
  // }
  

   return isAuthenticated
    ? children
    : <Navigate to="/" replace />;
}